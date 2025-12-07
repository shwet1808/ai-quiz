import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Music2 } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

/**
 * AudioControls Component
 * Renders a persistent floating UI widget for controlling global audio settings.
 * Features:
 * - Toggle Mute (Global)
 * - Play/Pause Background Music
 * - Volume Slider (revealed on hover)
 */
const AudioControls = () => {
    // Access global audio state from context
    const { isMuted, setIsMuted, volume, setVolume, isPlaying, togglePlay } = useAudio();

    // Local state to handle the slide-out animation of the volume slider
    const [showSlider, setShowSlider] = useState(false);

    // Don't render until hydrated (if using SSR), though here it's client-side React.

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-background-secondary/80 backdrop-blur-md p-2 rounded-full border border-border shadow-lg transition-all duration-300 hover:bg-background-secondary">

            {/* Volume Slider (Slide-out Animation) 
                - Width transitions from w-0 to w-24 based on showSlider state 
            */}
            <div className={`overflow-hidden transition-all duration-300 ${showSlider ? 'w-24 opacity-100 mr-2' : 'w-0 opacity-0'}`}>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-24 h-1 bg-background-tertiary rounded-lg appearance-none cursor-pointer accent-accent"
                    aria-label="Background Volume"
                />
            </div>

            {/* Play/Pause Background
                - Toggles background music playback
                - changes icon based on isPlaying state
            */}
            <button
                onClick={togglePlay}
                className={`p-2 rounded-full transition-colors ${isPlaying ? 'text-accent' : 'text-text-secondary hover:text-text'}`}
                aria-label={isPlaying ? "Pause Background Music" : "Play Background Music"}
                title="Background Music"
            >
                {isPlaying ? <Music className="w-5 h-5" /> : <Music2 className="w-5 h-5" />}
            </button>

            {/* Mute Toggle & Slider Trigger 
                - Toggles global mute state
                - Hovering reveals the volume slider
            */}
            <button
                onClick={() => setIsMuted(!isMuted)}
                onMouseEnter={() => setShowSlider(true)}
                className={`p-2 rounded-full transition-colors ${isMuted ? 'text-status-error' : 'text-text hover:text-accent'}`}
                aria-label={isMuted ? "Unmute All" : "Mute All"}
                title="Master Volume"
            >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Invisible area to keep slider open when moving mouse between button and slider 
                - Improves UX by preventing slider from snapping shut accidentally
            */}
            {showSlider && (
                <div
                    className="absolute inset-0 -top-4 -bottom-4 -left-28 -right-4 z-[-1]"
                    onMouseLeave={() => setShowSlider(false)}
                />
            )}
        </div>
    );
};

export default AudioControls;
