import React from "react";
import Popup from "../shared/Popup";

type PopoverContextType = {
    openPopover: (anchorEl: HTMLElement, content: React.ReactNode) => void;
};

const popoverContext = React.createContext<PopoverContextType | null>(null);

export const usePopover = () => {
    const context = React.useContext(popoverContext);
    if (!context) {
        throw new Error('usePopover must be used within a PopoverProvider');
    }
    return context;
};

type Props = {
    children: React.ReactNode;
};

const PopoverProvider = ({ children }: Props) => {
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const [popoverAnchorEl, setPopoverAnchorEl] = React.useState<HTMLElement | null>(null);
    const [popoverContent, setPopoverContent] = React.useState<React.ReactNode>(null);

    const openPopover = (anchorEl: HTMLElement, content: React.ReactNode) => {
        setPopoverOpen(true);
        setPopoverAnchorEl(anchorEl);
        setPopoverContent(content);
    };

    const closePopover = () => {
        setPopoverOpen(false);
        setPopoverContent(null);
        setPopoverAnchorEl(null);
    };

    return (
        <popoverContext.Provider value={{ openPopover }}>
            {children}
            <Popup open={popoverOpen} onClose={closePopover} anchorEl={popoverAnchorEl}>
                {popoverContent}
            </Popup>
        </popoverContext.Provider>
    );
};

export default PopoverProvider;
