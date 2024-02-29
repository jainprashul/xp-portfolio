import React, { useCallback } from 'react'
export type SwipeInput = {
    deltaX: number,
    deltaY: number,
    direction?: 'up' | 'down' | 'left' | 'right'
}

type Props = {
    children: React.ReactNode;
    onSwipe: ({deltaX, deltaY, direction}: SwipeInput) => void;
}

/**
 * The `MobileSwiper` component in TypeScript React allows for detecting swipe gestures on mobile
 * devices and triggering a callback function with swipe direction and delta values.
 * @param Props - The code you provided is a React component called `MobileSwiper` that handles
 * touch events for swiping on mobile devices. Here's an explanation of the parameters and functions
 * used in the component:
 * @param children - The `children` prop is a React node that represents the content to be rendered
 * inside the `MobileSwiper` component.
 * @param onSwipe - The `onSwipe` prop is a callback function that takes an object with `deltaX`,
 * `deltaY`, and `direction` properties as parameters. The `onSwipe` function is triggered when a swipe
 * gesture is detected, and it receives the swipe direction and delta values as parameters.
 * - The `deltaX` parameter represents the horizontal distance of the swipe gesture.
 * - The `deltaY` parameter represents the vertical distance of the swipe gesture.
 * - The `direction` parameter represents the direction of the swipe gesture, which
 * can be one of the following values: 'up', 'down', 'left', or 'right'.
 * @returns The `MobileSwiper` component is returning a `div` element with a `ref` set to `wrapperRef`,
 * and rendering the `children` prop inside the `div`. The component sets up touch event listeners for
 * `touchstart` and `touchend` on the wrapper `div` element to handle swipe gestures on mobile devices.
 * When a swipe gesture is detected, the `onSwipe `callback function is triggered with the swipe direction
 * and delta values as parameters.
 * @example
 * ```tsx
 * <MobileSwiper onSwipe={({deltaX, deltaY, direction}) => {
 *    console.log('Swipe detected:', direction, 'Delta X:', deltaX, 'Delta Y:', deltaY);
 * }}>
 *   {children}
 * </MobileSwiper>
 * ```
 */
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