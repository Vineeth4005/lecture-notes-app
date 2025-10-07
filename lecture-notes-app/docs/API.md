# API Documentation

## LectureRecorder Class

The main application class that handles speech recognition and summarization.

### Constructor

```javascript
new LectureRecorder()
```

Creates a new instance of the Lecture Recorder application.

### Methods

#### `init()`
Initializes the application, sets up DOM elements, and checks browser compatibility.

#### `startRecording()`
Starts the speech recognition process.
- Requests microphone permission
- Initializes Web Speech API
- Begins real-time transcription

#### `stopRecording()`
Stops the recording and generates summary.
- Stops speech recognition
- Processes transcript
- Generates AI summary
- Shows download options

#### `generateSummary()`
Creates an AI-powered summary using extractive summarization.

**Algorithm:**
1. Sentence segmentation
2. Word frequency analysis
3. Sentence scoring based on:
   - Word frequency
   - Position in text
   - Sentence length
4. Top sentence selection
5. Summary generation

#### `downloadPDF()`
Generates and downloads a PDF file containing:
- Title page with timestamp
- Full transcript section
- AI summary section
- Professional formatting

#### `downloadText()`
Generates and downloads a text file with:
- Header with metadata
- Full transcript
- AI summary
- Proper formatting

### Events

The application responds to various browser and user events:

- `DOMContentLoaded`: Initialize application
- `click`: Handle button interactions
- `keydown`: Keyboard shortcuts (Ctrl/Cmd+R)
- `visibilitychange`: Handle tab switching
- `beforeunload`: Warn about unsaved recordings

### Configuration

The application can be configured through the `config` object:

```javascript
config: {
    speechRecognition: {
        language: 'en-US',
        continuous: true,
        interimResults: true,
        maxAlternatives: 1
    },
    summarization: {
        summaryRatio: 0.3,
        minSentences: 2,
        maxSentences: 10,
        minWords: 50
    },
    ui: {
        loadingDelay: 1500,
        autoScrollDelay: 100
    }
}
```

### Error Handling

The application handles various error scenarios:

- Microphone permission denied
- Browser compatibility issues
- Network connectivity problems
- Speech recognition failures
- File generation errors

### Browser Support

| Feature | Chrome | Edge | Firefox | Safari | Opera |
|---------|--------|------|---------|--------|-------|
| Speech Recognition | ✅ | ✅ | ⚠️ | ⚠️ | ❌ |
| MediaRecorder | ✅ | ✅ | ✅ | ✅ | ✅ |
| PDF Generation | ✅ | ✅ | ✅ | ✅ | ✅ |
| File Download | ✅ | ✅ | ✅ | ✅ | ✅ |

## Global Functions

### `showAbout()`
Displays the about modal with application information.

### `showHelp()`
Shows the help modal with usage instructions.

## CSS Custom Properties

The application uses CSS custom properties for theming:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #f093fb;
    --success-color: #4ade80;
    --danger-color: #f87171;
    /* ... more variables ... */
}
```

## Keyboard Shortcuts

- `Ctrl/Cmd + R`: Start/Stop recording
- `Escape`: Close modals
- `Tab`: Navigate through interface elements

## Performance Considerations

- Speech recognition uses continuous listening which can be CPU intensive
- Large transcripts may impact summarization performance
- PDF generation is done client-side and may be slow for very long content
- Audio permission requests may be blocked by browser security policies