import React from "react";

type GameContextType = {
    score: number;
};


const gameContext = React.createContext<GameContextType | null>(null);

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
    const [score] = React.useState(0);

    return (
        <gameContext.Provider value={{ score }}>
            {children}
        </gameContext.Provider>
    );
};

export default GameProvider;
