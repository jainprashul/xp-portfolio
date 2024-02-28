import React, { useCallback } from 'react'

type Props = {
    children: React.ReactNode;
    onSwipe: ({deltaX, deltaY, direction}: {deltaX: number, deltaY: number, direction?: string}) => void;
}

const MobileSwiper = ({
    children,
    onSwipe,
}: Props) => {
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [startX, setStartX] = React.useState(0);
    const [startY, setStartY] = React.useState(0);

    const handleTouchStart = useCallback((e: TouchEvent) => {

        if(!wrapperRef.current?.contains(e.target as Node)) return;
        e.preventDefault();

        setStartX(e.touches[0].clientX);
        setStartY(e.touches[0].clientY);

    }, []);

    const handleTouchEnd = useCallback((e: TouchEvent) => {
        if(!wrapperRef.current?.contains(e.target as Node)) return;
        e.preventDefault();

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;

        const diffX = endX - startX;
        const diffY = endY - startY;

        const threshold = 10;

        if(Math.abs(diffX) < threshold && Math.abs(diffY) < threshold) return;

        const direction = Math.abs(diffX) > Math.abs(diffY) ? diffX > 0 ? 'right' : 'left' : diffY > 0 ? 'down' : 'up';

        onSwipe({deltaX: diffX, deltaY: diffY, direction});
        
    }, [onSwipe, startX, startY]);

    React.useEffect(() => {
        const wrapper = wrapperRef.current;
        if(!wrapper) return;

        wrapper.addEventListener('touchstart', handleTouchStart);
        wrapper.addEventListener('touchend', handleTouchEnd);

        return () => {
            wrapper.removeEventListener('touchstart', handleTouchStart);
            wrapper.removeEventListener('touchend', handleTouchEnd);
        }
    }, [handleTouchStart, handleTouchEnd]);




  return (
    <div ref={wrapperRef}>
        {children}
    </div>
  )
}

export default MobileSwiper