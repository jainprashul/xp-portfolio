/**
 * Copyright Highway9 Networks Inc.
 */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

type Callback = (immediate?: boolean) => void;

/**
 * @param {function} callback - The function to be called every interval
 * @param {number | null} delay - The interval in milliseconds
 * @param {boolean} immediate - Whether to call the function immediately
 * @param {any[]} deps - The dependencies to be passed to useEffect
 * @returns ClearInterval - A function to clear the interval
 */
export function useInterval(callback : Callback, delay : number | null | boolean, immediate = false, deps : unknown[] = []) {
  const savedCallback = useRef<Callback>();
  let intervalId : NodeJS.Timeout;

  /**
   * Cancels the current interval
   */
  function ClearInterval() {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Execute callback if immediate is set.
  useEffect(() => {
    if (!immediate) return;
    if (delay === null || delay === false) return;
    savedCallback.current!(true);
  }, [immediate, ...deps]);

  // Set up the interval.
  useEffect(() => {
    if (delay === null || delay === false) return undefined;
    const tick = async () => {
      savedCallback.current!();
    };

    // Alternate to the setInterval function but for performance reasons. It will call after first callback is done.
    intervalId = setTimeout(function call() {
      try {
        // make sure the interval is called after execution of the callback function
        tick().finally(() => {
          intervalId = setTimeout(call, delay as number);
        });
      } catch (error) {
        intervalId = setTimeout(tick, delay as number * 2);
      }
    }, delay as number);
    return () => ClearInterval();
  }, [delay]);

  return { ClearInterval };
}

/**
 * refresh every n seconds for particular duration of time and then stop refreshing
 *
 * @param {number} interval in milliseconds
 * @param {number} duration in milliseconds
 * @param {function} callback
 */
export function refreshEvery(interval : number, duration : number, callback : () => void) {
  // const intervalId = setInterval(callback, interval);
  // setTimeout(() => clearInterval(intervalId), duration + 1000);

  const intervalID = setInterval(() => {
    callback();
    console.count(`refresh every ${interval / 1000} seconds`);
  }, 10000);
  setTimeout(() => {
    clearInterval(intervalID);
    console.log(`refresh every ${interval / 1000} seconds stopped`);
  }, duration + 1000);
}
