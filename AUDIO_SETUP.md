# Audio Setup Guide

This project supports custom Background Music and UI Click Sounds. By default, it uses high-quality placeholder sounds.

## Use Your Own Audio (Google Cloud Storage)

Hosting your own audio on Google Cloud Storage (GCS) is recommended for low latency and reliability.

### 1. Upload Files
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/storage/).
2.  Create a new Bucket (or use an existing one).
3.  Upload your `.mp3` or `.wav` files (e.g., `ambient-loop.mp3`, `click.mp3`).
4.  **Important**: Make the files **publicly accessible** (Grant `Storage Object Viewer` to `allUsers`).

### 2. Configure CORS
Browser security requires Cross-Origin Resource Sharing (CORS) headers to allow your site to play audio from GCS.

1.  Create a file named `cors.json` on your computer:
    ```json
    [
      {
        "origin": ["http://localhost:5173", "https://your-production-domain.com"],
        "method": ["GET"],
        "responseHeader": ["Content-Type"],
        "maxAgeSeconds": 3600
      }
    ]
    ```
2.  Apply this configuration to your bucket using `gsutil` (Cloud Shell):
    ```bash
    gsutil cors set cors.json gs://YOUR_BUCKET_NAME
    ```

### 3. Update Code
Open `src/context/AudioContext.jsx` and replace the placeholder URLs:

```javascript
// src/context/AudioContext.jsx

const BG_MUSIC_URL = 'https://storage.googleapis.com/YOUR_BUCKET_NAME/ambient-loop.mp3';
const CLICK_SOUND_URL = 'https://storage.googleapis.com/YOUR_BUCKET_NAME/click.mp3';
```

## Google Drive (Not Recommended)
Google Drive is often too slow for low-latency audio and has strict rate limits. If you must use it, use a direct link generator, but be aware of potential playback failures.
