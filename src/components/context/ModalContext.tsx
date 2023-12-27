import React, { useRef } from 'react';
import Modal from '../shared/Modal';

type ModalContextType = {
    openModal: (title: string, content: React.ReactNode) => void;
};

const modalContext = React.createContext<ModalContextType | null>(null);


export const useModal = () => {
    const context = React.useContext(modalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

type Props = {
    children: React.ReactNode;
};

export const ModalProvider = ({ children }: Props) => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState('');
    const [modalContent, setModalContent] = React.useState<React.ReactNode>(null);

    const history = useRef<Record<string, unknown>[]>([]);
    const goBack = () => {
        if (history.current.length > 1) {
            const previous = history.current.pop();
            setModalTitle(previous?.title as string);
            setModalContent(previous?.content as React.ReactNode);
        }
    };

    const openModal = (title: string, content: React.ReactNode) => {
        setModalOpen(true);
        setModalTitle(title);
        setModalContent(content);
        history.current.push({ title: modalTitle, content: modalContent });
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalTitle('');
        setModalContent(null);
        history.current = [];
    };

    return (
        <modalContext.Provider value={{ openModal }}>
            {children}
            <Modal open={modalOpen} onClose={closeModal} title={modalTitle} back={
                history.current.length > 1} goBack={goBack}>
                {modalContent}
            </Modal>
        </modalContext.Provider>
    );
};


