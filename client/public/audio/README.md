# Audio Files Directory

This directory is intended for audio files used in the AI Quiz Generator application.

## Required Audio Files

Place the following audio files in this directory:

### Background Music
- `background-music.mp3` - Looping background music for the application

### Sound Effects
- `click.mp3` - Button click sound
- `correct.mp3` - Correct answer sound
- `wrong.mp3` - Wrong answer sound
- `timer.mp3` - Timer ticking sound (optional)
- `success.mp3` - Quiz completion/success sound

## File Format Recommendations

- **Format**: MP3 or OGG for best browser compatibility
- **Size**: Keep files small (< 500KB) for faster loading
- **Volume**: Normalize audio levels for consistent playback

## Usage

The audio files are automatically loaded by the AudioContext provider. Make sure filenames match exactly as listed above.

## Optional

If you don't have audio files, the application will work fine without them. The audio system is designed to fail gracefully if files are missing.
