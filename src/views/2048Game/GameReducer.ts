/* eslint-disable no-case-declarations */
// import { uuid } from "@/utils/helper"
import { TileMeta } from "./Tile"

const size = 5

type TileMap = Record<string, TileMeta>
type ContextTileType = TileMeta
type Board = (string | undefined)[][]

type State = {
    size: number,
    board: (string | undefined)[][],
    tiles: TileMap,
    score: number,
    hasChanged: boolean,
    tilesByIds: string[],
}

type Action =
    | { type: 'MOVE_UP' }
    | { type: 'MOVE_DOWN' }
    | { type: 'MOVE_LEFT' }
    | { type: 'MOVE_RIGHT' }
    | { type: 'ADD_TILE', payload: TileMeta }
    | { type: 'CLEAN' }
    | { type: 'RESET' }


function createBoard(size: number) {
    const board = Array.from({ length: size }, () => Array.from({ length: size }, () => undefined)) as (string | undefined)[][]
    return board
}

export const initState: State = {
    size: size,
    board: createBoard(size),
    tiles: {},
    score: 0,
    hasChanged: false,
    tilesByIds: [],
}

let counter = 0;

// Helper function to process a single line for 2048 game logic
interface ProcessLineOutput {
    processedLine: (ContextTileType | undefined)[]; // Tiles in their new 1D positions, with updated values for merges
    scoreGenerated: number;
    lineChanged: boolean; // Indicates if this specific line had any change (shift or merge)
}

function processLine(lineInput: (ContextTileType | undefined)[], gameSize: number): ProcessLineOutput {
    const filteredLine: ContextTileType[] = lineInput.filter(tile => tile !== undefined) as ContextTileType[];
    const newLine: ContextTileType[] = [];
    let scoreGenerated = 0;
    let lineChanged = false;

    if (filteredLine.length === 0) {
        const paddedEmptyLine = Array(gameSize).fill(undefined);
        // Check if original line was also all empty
        if (lineInput.some(tile => tile !== undefined)) {
            lineChanged = true; // Original had tiles, now it's empty
        }
        return { processedLine: paddedEmptyLine, scoreGenerated: 0, lineChanged };
    }

    // Check for initial shifts before merging
    let currentFilteredIndex = 0;
    for(let i = 0; i < lineInput.length; i++) {
        if (lineInput[i]) { // If there's a tile in the original line
            if (currentFilteredIndex >= filteredLine.length || lineInput[i]!.id !== filteredLine[currentFilteredIndex].id) {
                lineChanged = true; // A tile must have shifted due to zero removal
                break;
            }
            currentFilteredIndex++;
        } else if (currentFilteredIndex < filteredLine.length) {
             // A zero was found in original line before all filtered tiles were accounted for
             lineChanged = true;
             break;
        }
    }


    for (let i = 0; i < filteredLine.length; i++) {
        if (i + 1 < filteredLine.length && filteredLine[i].value === filteredLine[i + 1].value) {
            const mergedValue = filteredLine[i].value * 2;
            scoreGenerated += mergedValue;
            // The merged tile keeps the ID of the first tile (filteredLine[i])
            // It might be beneficial to also store which tile ID was merged into it for animation (e.g., using mergeWith property)
            newLine.push({
                ...filteredLine[i],
                value: mergedValue,
                // mergeWith: filteredLine[i+1].id // Example if Tile type supports this
            });
            i++; // Skip the next tile as it has been merged
            lineChanged = true; // A merge always constitutes a change
        } else {
            newLine.push(filteredLine[i]);
            // If no merge, but we already determined lineChanged due to shift, it remains true.
            // If not changed by shift, check if this tile is different from original position if not merged.
            // This is covered by the initial shift check.
        }
    }

    // Pad newLine with undefined to match the original gameSize
    const paddedNewLine: (ContextTileType | undefined)[] = Array(gameSize).fill(undefined);
    for (let i = 0; i < newLine.length; i++) {
        paddedNewLine[i] = newLine[i];
    }
    
    // Final check for lineChanged: if paddedNewLine is different from lineInput
    if (!lineChanged) { // If no merges or obvious shifts detected so far
        for (let i = 0; i < gameSize; i++) {
            if ((lineInput[i]?.id !== paddedNewLine[i]?.id) || (lineInput[i]?.value !== paddedNewLine[i]?.value)) {
                lineChanged = true;
                break;
            }
        }
    }

    return { processedLine: paddedNewLine, scoreGenerated, lineChanged };
}

// Helper to get a line of Tile objects from board and tiles state
function getLineTiles(
    board: Board, 
    tiles: TileMap, 
    index: number, 
    direction: 'ROW' | 'COL', 
    gameSize: number
): (ContextTileType | undefined)[] {
    const line: (ContextTileType | undefined)[] = [];
    for (let i = 0; i < gameSize; i++) {
        const tileId = direction === 'ROW' ? board[index][i] : board[i][index];
        line.push(tileId ? tiles[tileId] : undefined);
    }
    return line;
}

// Helper to reverse a line
function reverseLine<T>(line: T[]): T[] {
    return [...line].reverse();
}

/**
 * Reducer function for the game state.
 *
 * @param state - The current state of the game.
 * @param action - The action to be performed on the state.
 * @returns The new state after applying the action.
 */
export function gameReducer(state: State = initState, action: Action): State {
    switch (action.type) {
        case 'CLEAN':
            {
                const flattened = state.board.flat()
                const newTiles: TileMap = flattened.reduce((result, tileID) => {
                    if (tileID && state.tiles[tileID]) { // Ensure tileID exists and tile data exists
                        result[tileID] = state.tiles[tileID]
                    }
                    return result
                }, {} as TileMap)
                return {
                    ...state,
                    tiles: newTiles,
                    hasChanged: false, // CLEAN itself doesn't count as a game-altering change usually
                    tilesByIds: Object.keys(newTiles)
                }
            }
        case 'ADD_TILE':
            {
                const tilePayload = action.payload as Omit<ContextTileType, 'id'>; // Assuming id is assigned here

                const tileID = (counter++).toString()
                const [x, y] = tilePayload.position;
                const newBoard = structuredClone(state.board);
                
                if (y < 0 || y >= state.size || x < 0 || x >= state.size) {
                    console.error("ADD_TILE: Position out of bounds", tilePayload.position);
                    return state; // Or handle error appropriately
                }
                if (newBoard[y][x]) {
                     console.warn("ADD_TILE: Cell already occupied", tilePayload.position, newBoard[y][x]);
                     // Find an empty cell or decide game over if no space
                     // For now, let's allow overwrite for simplicity if this is part of init or specific scenarios
                     // However, for random add, this should pick an empty cell.
                }

                newBoard[y][x] = tileID;

                // console.log('newTile', action.payload.position, tileID,)
                // console.table(newBoard)

                const newTileEntry: ContextTileType = {
                    ...(tilePayload as ContextTileType), // Cast if necessary, ensure all fields of ContextTileType are present
                    id: tileID 
                };

                return {
                    ...state,
                    board: newBoard,
                    tiles: {
                        ...state.tiles,
                        [tileID]: newTileEntry
                    },
                    tilesByIds: [...state.tilesByIds, tileID]
                }
            }
        case 'MOVE_LEFT': {
            const gameSize = state.size;
            const newBoard = createBoard(gameSize);
            const newTiles: TileMap = {};
            let newScore = state.score;
            let overallBoardChanged = false;

            for (let i = 0; i < gameSize; i++) { // Iterate over rows
                const currentLine = getLineTiles(state.board, state.tiles, i, 'ROW', gameSize);
                const { processedLine, scoreGenerated, lineChanged } = processLine(currentLine, gameSize);
                
                newScore += scoreGenerated;
                if (lineChanged) {
                    overallBoardChanged = true;
                }

                processedLine.forEach((tile, j) => {
                    if (tile && typeof tile.id !== 'undefined') {
                        const tileIdStr = String(tile.id);
                        newBoard[i][j] = tileIdStr;
                        newTiles[tileIdStr] = { ...tile, position: [j, i] }; 
                    }
                });
            }

            if (!overallBoardChanged) {
                return state; 
            }

            return {
                ...state,
                board: newBoard,
                tiles: newTiles,
                score: newScore,
                hasChanged: true, 
                tilesByIds: Object.keys(newTiles),
            };
        }
        case 'MOVE_UP':
            {
                const gameSize = state.size;
                const newBoard = createBoard(gameSize);
                const newTiles: TileMap = {};
                let newScore = state.score;
                let overallBoardChanged = false;

                for (let i = 0; i < gameSize; i++) { 
                    const currentLine = getLineTiles(state.board, state.tiles, i, 'COL', gameSize);
                    const { processedLine, scoreGenerated, lineChanged } = processLine(currentLine, gameSize);

                    newScore += scoreGenerated;
                    if (lineChanged) {
                        overallBoardChanged = true;
                    }

                    processedLine.forEach((tile, j) => { 
                        if (tile && typeof tile.id !== 'undefined') {
                            const tileIdStr = String(tile.id);
                            newBoard[j][i] = tileIdStr;
                            newTiles[tileIdStr] = { ...tile, position: [i, j] };
                        }
                    });
                }
                if (!overallBoardChanged) return state;
                return { ...state, board: newBoard, tiles: newTiles, score: newScore, hasChanged: true, tilesByIds: Object.keys(newTiles) };
            }
        case 'MOVE_DOWN':
            {
                const gameSize = state.size;
                const newBoard = createBoard(gameSize);
                const newTiles: TileMap = {};
                let newScore = state.score;
                let overallBoardChanged = false;

                for (let i = 0; i < gameSize; i++) { 
                    const currentLine = getLineTiles(state.board, state.tiles, i, 'COL', gameSize);
                    const reversedOriginalLine = reverseLine(currentLine); 
                    const { processedLine: processedReversedLine, scoreGenerated, lineChanged } = processLine(reversedOriginalLine, gameSize);
                    
                    newScore += scoreGenerated;
                    if (lineChanged) {
                        overallBoardChanged = true;
                    }

                    const finalLineInColumn = reverseLine(processedReversedLine); 

                    finalLineInColumn.forEach((tile, j) => { 
                        if (tile && typeof tile.id !== 'undefined') {
                            const tileIdStr = String(tile.id);
                            newBoard[j][i] = tileIdStr;
                            newTiles[tileIdStr] = { ...tile, position: [i, j] };
                        }
                    });
                }
                if (!overallBoardChanged) return state;
                return { ...state, board: newBoard, tiles: newTiles, score: newScore, hasChanged: true, tilesByIds: Object.keys(newTiles) };
            }
        case 'MOVE_RIGHT':
            {
                const gameSize = state.size;
                const newBoard = createBoard(gameSize);
                const newTiles: TileMap = {};
                let newScore = state.score;
                let overallBoardChanged = false;

                for (let i = 0; i < gameSize; i++) { 
                    const currentLine = getLineTiles(state.board, state.tiles, i, 'ROW', gameSize);
                    const reversedOriginalLine = reverseLine(currentLine);
                    const { processedLine: processedReversedLine, scoreGenerated, lineChanged } = processLine(reversedOriginalLine, gameSize);

                    newScore += scoreGenerated;
                    if (lineChanged) {
                        overallBoardChanged = true;
                    }
                    
                    const finalLineInRow = reverseLine(processedReversedLine);

                    finalLineInRow.forEach((tile, j) => { 
                        if (tile && typeof tile.id !== 'undefined') {
                            const tileIdStr = String(tile.id);
                            newBoard[i][j] = tileIdStr;
                            newTiles[tileIdStr] = { ...tile, position: [j, i] };
                        }
                    });
                }
                if (!overallBoardChanged) return state;
                return { ...state, board: newBoard, tiles: newTiles, score: newScore, hasChanged: true, tilesByIds: Object.keys(newTiles) };
            }

        case 'RESET':
            // Assuming initState is defined elsewhere and is the correct initial state structure
            // Ensure initState also has a 'size' property if createBoard relies on it directly or via context.
            // For now, let's reinitialize based on current state's size or a default.
            const resetSize = state.size || 4; // Or however initState gets its size
            const newInitState: State = {
                ...initState, // Spread the global initState
                size: resetSize, // Ensure size is correctly set
                board: createBoard(resetSize), // Create a fresh board
                tiles: {},
                tilesByIds: [],
                score: 0,
                hasChanged: true, // Reset is a change
                // Ensure other fields from State are correctly initialized by initState
            };
            return newInitState;
        default:
            return state
    }
}