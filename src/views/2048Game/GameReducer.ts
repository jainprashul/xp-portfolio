/* eslint-disable no-case-declarations */
import { uuid } from "@/utils/helper"
import { TileMeta as Tile } from "./Tile"

const size = 5

type TileMap = Record<string, Tile>

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
    | { type: 'ADD_TILE', payload: Tile }
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
                    if (tileID) {
                        result[tileID] = state.tiles[tileID]
                    }
                    return result
                }, {} as TileMap)
                return {
                    ...state,
                    tiles: newTiles,
                    hasChanged: false,
                    tilesByIds: Object.keys(newTiles)
                }
            }
        case 'ADD_TILE':
            {
                const tileID = uuid()
                const [x, y] = action.payload.position;
                const newBoard = structuredClone(state.board);
                newBoard[y][x] = tileID;

                console.log('newTile', action.payload.position, tileID,)
                console.table(newBoard)

                return {
                    ...state,
                    board: newBoard,
                    tiles: {
                        ...state.tiles,
                        [tileID]: {
                            ...action.payload,
                            id: tileID
                        }
                    },
                    tilesByIds: [...state.tilesByIds, tileID]
                }
            }
        case 'MOVE_UP':
            {
                const newBoard = createBoard(state.size);
                const newTiles: TileMap = {};

                let hasChanged = false;
                let score = state.score;

                for (let x = 0; x < size; x++) {
                    let newY = 0;
                    let prevTile: Tile | undefined;
                    for (let y = 0; y < size; y++) {
                        const tileID = state.board[y][x]
                        if (!tileID) continue;

                        const currentTile = state.tiles[tileID]

                        if (prevTile && prevTile.value === currentTile.value) {
                            // increment score
                            score += prevTile.value * 2;
                            // merge tiles
                            newTiles[prevTile.id as string] = {
                                ...prevTile,
                                value: prevTile.value * 2,
                            }
                            // update position of the merged tile to the new position
                            newTiles[tileID] = {
                                ...currentTile,
                                position: [x, newY - 1],
                            }
                            // remove the old tile
                            prevTile = undefined;
                            hasChanged = true;
                            continue;
                        }
                        // update the board with the new position
                        newBoard[newY][x] = tileID;
                        console.log(tileID, currentTile.position, "move to", [x, newY])
                        // if there is a gap, move the tile to the new position
                        newTiles[tileID] = {
                            ...currentTile,
                            position: [x, newY],
                        }
                        prevTile = newTiles[tileID];
                        // check if the tile has changed position to update the state accordingly
                        if ([x, newY].toString() !== currentTile.position.toString()) {
                            hasChanged = true;
                        }
                        newY++;
                    }

                }
                return {
                    ...state,
                    board: newBoard,
                    tiles: newTiles,
                    score,
                    hasChanged,
                }
            }
        case 'MOVE_DOWN':
            {
                const newBoard = createBoard(state.size);
                const newTiles: TileMap = {};

                let hasChanged = false;
                let score = state.score;

                for (let x = 0; x < size; x++) {
                    let newY = size - 1;
                    let prevTile: Tile | undefined;
                    for (let y = size - 1; y >= 0; y--) {
                        const tileID = state.board[y][x]
                        if (!tileID) continue;
                        const currentTile = state.tiles[tileID]


                        if (prevTile && prevTile.value === currentTile.value) {
                            // increment score
                            score += prevTile.value * 2;
                            // merge tiles
                            newTiles[prevTile.id as string] = {
                                ...prevTile,
                                value: prevTile.value * 2,
                            }
                            // update position of the merged tile to the new position
                            newTiles[tileID] = {
                                ...currentTile,
                                position: [x, newY + 1],
                            }
                            // remove the old tile
                            prevTile = undefined;
                            hasChanged = true;
                            continue;
                        }
                        // update the board with the new position
                        newBoard[newY][x] = tileID;
                        console.log(tileID, currentTile.position, "move to", [x, newY])
                        // if there is a gap, move the tile to the new position
                        newTiles[tileID] = {
                            ...currentTile,
                            position: [x, newY],
                        }
                        prevTile = newTiles[tileID];
                        // check if the tile has changed position to update the state accordingly
                        if ([x, newY].toString() !== currentTile.position.toString()) {
                            hasChanged = true;
                        }
                        newY--;

                    }
                }
                return {
                    ...state,
                    board: newBoard,
                    tiles: newTiles,
                    score,
                    hasChanged,
                }
            }
        case 'MOVE_LEFT':
            {
                const newBoard = createBoard(state.size);
                const newTiles: TileMap = {};

                let hasChanged = false;
                let score = state.score;

                for (let y = 0; y < size; y++) {
                    let newX = 0;
                    let prevTile: Tile | undefined;
                    for (let x = 0; x < size; x++) {
                        const tileID = state.board[y][x]
                        if (!tileID) continue;

                        const currentTile = state.tiles[tileID]

                        if (prevTile && prevTile.value === currentTile.value) {
                            // increment score
                            score += prevTile.value * 2;
                            // merge tiles
                            newTiles[prevTile.id as string] = {
                                ...prevTile,
                                value: prevTile.value * 2,
                            }
                            // update position of the merged tile to the new position
                            newTiles[tileID] = {
                                ...currentTile,
                                position: [newX - 1, y],
                            }
                            // remove the old tile
                            prevTile = undefined;
                            hasChanged = true;
                            continue;
                        }
                        // update the board with the new position
                        newBoard[y][newX] = tileID;
                        console.log(tileID, currentTile.position, "move to", [newX, y])
                        // if there is a gap, move the tile to the new position
                        newTiles[tileID] = {
                            ...currentTile,
                            position: [newX, y],
                        }
                        prevTile = newTiles[tileID];
                        // check if the tile has changed position to update the state accordingly
                        if ([newX, y].toString() !== currentTile.position.toString()) {
                            hasChanged = true;
                        }
                        newX++;
                    }
                }
                return {
                    ...state,
                    board: newBoard,
                    tiles: newTiles,
                    score,
                    hasChanged,
                }
            }
        case 'MOVE_RIGHT':
            {
                const newBoard = createBoard(state.size);
                const newTiles: TileMap = {};

                let hasChanged = false;
                let score = state.score;

                for (let y = 0; y < size; y++) {
                    let newX = size - 1;
                    let prevTile: Tile | undefined;
                    for (let x = size - 1; x >= 0; x--) {
                        const tileID = state.board[y][x]
                        if (!tileID) continue;

                        const currentTile = state.tiles[tileID]

                        if (prevTile && prevTile.value === currentTile.value) {
                            // increment score
                            score += prevTile.value * 2;
                            // merge tiles
                            newTiles[prevTile.id as string] = {
                                ...prevTile,
                                value: prevTile.value * 2,
                            }
                            // update position of the merged tile to the new position
                            newTiles[tileID] = {
                                ...currentTile,
                                position: [newX + 1, y],
                            }
                            // remove the old tile
                            prevTile = undefined;
                            hasChanged = true;
                            continue;
                        }
                        // update the board with the new position
                        newBoard[y][newX] = tileID;
                        console.log(tileID, currentTile.position, "move to", [newX, y])
                        // if there is a gap, move the tile to the new position
                        newTiles[tileID] = {
                            ...currentTile,
                            position: [newX, y],
                        }
                        prevTile = newTiles[tileID];
                        // check if the tile has changed position to update the state accordingly
                        if ([newX, y].toString() !== currentTile.position.toString()) {
                            hasChanged = true;
                        }
                        newX--;
                    }
                }
                return {
                    ...state,
                    board: newBoard,
                    tiles: newTiles,
                    score,
                    hasChanged,
                }
            }

        case 'RESET':
            return initState
        default:
            return state
    }
}