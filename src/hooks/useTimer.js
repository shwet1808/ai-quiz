import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for countdown timer
 * @param {number} initialTime - Initial time in seconds
 * @param {function} onTimeUp - Callback when timer reaches 0
 * @param {boolean} autoStart - Whether to start timer automatically
 */
export const useTimer = (initialTime = 15, onTimeUp, autoStart = false) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(autoStart);
    const intervalRef = useRef(null);
    const onTimeUpRef = useRef(onTimeUp);

    // Update the callback ref when it changes
    useEffect(() => {
        onTimeUpRef.current = onTimeUp;
    }, [onTimeUp]);

    // Start timer
    const start = useCallback(() => {
        setIsRunning(true);
    }, []);

    // Pause timer
    const pause = useCallback(() => {
        setIsRunning(false);
    }, []);

    // Reset timer
    const reset = useCallback((newTime = initialTime) => {
        setTimeLeft(newTime);
        setIsRunning(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, [initialTime]);

    // Restart timer
    const restart = useCallback((newTime = initialTime) => {
        setTimeLeft(newTime);
        setIsRunning(true);
    }, [initialTime]);

    // Timer logic
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        setIsRunning(false);
                        if (onTimeUpRef.current) {
                            onTimeUpRef.current();
                        }
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    // Get percentage of time remaining
    const getPercentage = useCallback(() => {
        return (timeLeft / initialTime) * 100;
    }, [timeLeft, initialTime]);

    // Check if timer is in warning state (less than 5 seconds)
    const isWarning = timeLeft <= 5 && timeLeft > 0;

    // Check if timer is critical (less than 3 seconds)
    const isCritical = timeLeft <= 3 && timeLeft > 0;

    return {
        timeLeft,
        isRunning,
        isWarning,
        isCritical,
        start,
        pause,
        reset,
        restart,
        getPercentage
    };
};
