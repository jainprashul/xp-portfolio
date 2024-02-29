import React, { useEffect } from "react";
import { TileMeta } from "./Tile";
import { gameReducer, initState } from "./GameReducer";

type GameContextType = {
    score: number;
    boardSize: number;
    moveTiles: (direction: MoveDirection) => void;
    resetGame: () => void;
    getTiles: () => TileMeta[];
    startGame: () => void;
};

type MoveDirection = 'MOVE_UP' | 'MOVE_DOWN' | 'MOVE_LEFT' | 'MOVE_RIGHT';


const gameContext = React.createContext<GameContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useGame = () => {
    const context = React.useContext(gameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};


type Props = {
    children: React.ReactNode;
};

const GameProvider = ({ children }: Props) => {
    const [gameState, dispatch] = React.useReducer(gameReducer, initState);

    function getEmptyTileCells() {
        const res: [number, number][] = [];
        for (let i = 0; i < gameState.size; i++) {
            for (let j = 0; j < gameState.size; j++) {
                // check if the cell is empty
                if (!gameState.board[i][j]) {
                    res.push([i, j]);
                }
            }
        }
        return res;
    }

    function addRandomTile() {
        const emptyCells = getEmptyTileCells();
        if (!emptyCells.length) {
            throw new Error('No empty cells');
        }
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomCell = emptyCells[randomIndex];
        const tile: TileMeta = ({ position: randomCell, value: 2 });
        dispatch({ type: 'ADD_TILE', payload: tile });
    }

    const moveTiles = (direction: MoveDirection) => {
        dispatch({ type: direction });
    }

    const getTiles = () => {
        return gameState.tilesByIds.map(id => gameState.tiles[id]);
    }

    const resetGame = () => {
        dispatch({ type: 'RESET' });
    }

    const startGame = () => {
        dispatch({ type: "ADD_TILE", payload: { position: [0, 1], value: 2 } });
        dispatch({ type: "ADD_TILE", payload: { position: [0, 2], value: 2 } });
    }

    useEffect(() => {
        if (gameState.hasChanged) {
            setTimeout(() => {
                dispatch({ type: 'CLEAN' });
                addRandomTile();
            }, 100);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState.hasChanged]);



    return (
        <gameContext.Provider value={{ 
            score: gameState.score, 
            boardSize: gameState.size,
            moveTiles, 
            resetGame, 
            getTiles, 
            startGame,
         }}>
            {children}
        </gameContext.Provider>
    );
};

export default GameProvider;
