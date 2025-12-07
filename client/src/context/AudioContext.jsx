import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within AudioProvider');
    }
    return context;
};

export const AudioProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(false);

    // Audio refs (we'll use HTML5 Audio API)
    const backgroundMusicRef = useRef(null);
    const soundEffectsRef = useRef({
        click: null,
        correct: null,
        wrong: null,
        timer: null,
        success: null
    });

    // Initialize audio on mount
    useEffect(() => {
        // Note: Actual audio files need to be placed in public/audio/
        // For now, we'll create the structure without actual files

        // Background music would be initialized here
        // backgroundMusicRef.current = new Audio('/audio/background-music.mp3');
        // backgroundMusicRef.current.loop = true;
        // backgroundMusicRef.current.volume = 0.3;

        // Sound effects would be initialized here
        // soundEffectsRef.current.click = new Audio('/audio/click.mp3');
        // soundEffectsRef.current.correct = new Audio('/audio/correct.mp3');
        // soundEffectsRef.current.wrong = new Audio('/audio/wrong.mp3');
        // soundEffectsRef.current.timer = new Audio('/audio/timer.mp3');
        // soundEffectsRef.current.success = new Audio('/audio/success.mp3');

        return () => {
            // Cleanup
            if (backgroundMusicRef.current) {
                backgroundMusicRef.current.pause();
                backgroundMusicRef.current = null;
            }
        };
    }, []);

    // Play background music
    const playBackgroundMusic = useCallback(() => {
        if (backgroundMusicRef.current && !isMuted) {
            backgroundMusicRef.current.play().catch(err => {
                console.log('Background music play failed:', err);
            });
            setIsBackgroundMusicPlaying(true);
        }
    }, [isMuted]);

    // Pause background music
    const pauseBackgroundMusic = useCallback(() => {
        if (backgroundMusicRef.current) {
            backgroundMusicRef.current.pause();
            setIsBackgroundMusicPlaying(false);
        }
    }, []);

    // Play sound effect
    const playSound = useCallback((soundName) => {
        if (!isMuted && soundEffectsRef.current[soundName]) {
            const sound = soundEffectsRef.current[soundName].cloneNode();
            sound.volume = 0.5;
            sound.play().catch(err => {
                console.log(`Sound ${soundName} play failed:`, err);
            });
        }
    }, [isMuted]);

    // Toggle mute
    const toggleMute = useCallback(() => {
        setIsMuted(prev => {
            const newMuted = !prev;

            if (backgroundMusicRef.current) {
                backgroundMusicRef.current.muted = newMuted;
            }

            return newMuted;
        });
    }, []);

    // Update mute state for all audio
    useEffect(() => {
        if (backgroundMusicRef.current) {
            backgroundMusicRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const value = {
        isMuted,
        isBackgroundMusicPlaying,
        playBackgroundMusic,
        pauseBackgroundMusic,
        playSound,
        toggleMute
    };

    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};
