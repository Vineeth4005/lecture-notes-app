# 🎓 Lecture to Notes Application

A modern web-based application that transforms your lectures into organized notes using real-time speech recognition and AI-powered summarization.

![Lecture to Notes](assets/screenshot.png)

## ✨ Features

- **🎙️ Real-time Speech Recognition**: Convert speech to text instantly using Web Speech API
- **🤖 AI-Powered Summarization**: Automatically generate concise summaries using advanced algorithms
- **📄 Multiple Export Formats**: Download your notes as PDF or text files
- **🎨 Modern UI/UX**: Clean, responsive design that works on all devices
- **⌨️ Keyboard Shortcuts**: Quick controls with Ctrl/Cmd+R
- **🌍 Cross-Platform**: Works on Windows, macOS, and Linux
- **📱 Mobile Friendly**: Responsive design for tablets and smartphones

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lecture-notes-app.git
   cd lecture-notes-app
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js (with http-server)
     npx http-server

     # Using VS Code Live Server extension
     # Right-click on index.html > "Open with Live Server"
     ```

3. **Start recording**
   - Click "Start Recording" 
   - Allow microphone access when prompted
   - Speak naturally and watch your words appear in real-time
   - Click "Stop Recording" to generate summary
   - Download your notes!

## 🖥️ Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Recommended for best experience |
| Edge | ✅ Full | Excellent compatibility |
| Firefox | ✅ Good | Some minor limitations |
| Safari | ✅ Good | Works well on macOS/iOS |
| Opera | ❌ Limited | Speech recognition not supported |

## 📋 System Requirements

- Modern web browser with microphone support
- Internet connection (for speech recognition)
- Microphone access permission
- Minimum 2GB RAM recommended

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Speech Recognition**: Web Speech API
- **PDF Generation**: jsPDF
- **Summarization**: Custom extractive algorithm
- **Styling**: Modern CSS with custom properties
- **Icons**: Unicode emojis for universal support

## 📁 Project Structure

```
lecture-notes-app/
├── index.html              # Main application file
├── css/
│   └── style.css           # Styles and responsive design
├── js/
│   └── app.js             # Application logic
├── assets/
│   ├── favicon.ico        # Favicon
│   └── screenshot.png     # Application screenshot
├── docs/
│   └── API.md            # API documentation
├── README.md             # This file
└── LICENSE               # MIT License
```

## 🎯 How It Works

1. **Speech Recognition**: Uses Web Speech API to convert audio to text in real-time
2. **Text Processing**: Cleans and formats the transcribed text
3. **AI Summarization**: Applies extractive summarization algorithm that:
   - Analyzes sentence importance based on word frequency
   - Considers sentence position and length
   - Generates concise summaries (20-30% of original length)
4. **Export**: Creates downloadable files with both transcript and summary

## ⚙️ Configuration

The application can be configured by modifying the `config` object in `js/app.js`:

```javascript
config: {
    speechRecognition: {
        language: 'en-US',           // Recognition language
        continuous: true,            // Continuous recognition
        interimResults: true,        // Show interim results
        maxAlternatives: 1          // Number of alternatives
    },
    summarization: {
        summaryRatio: 0.3,          // Summary length (30% of original)
        minSentences: 2,            // Minimum sentences in summary
        maxSentences: 10,           // Maximum sentences in summary
        minWords: 50                // Minimum words to trigger summarization
    }
}
```

## 🎨 Customization

### Themes
The application uses CSS custom properties for easy theming:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #f093fb;
    --success-color: #4ade80;
    /* ... more variables ... */
}
```

### Languages
To add support for different languages, modify the `language` setting:

```javascript
speechRecognition: {
    language: 'es-ES', // Spanish
    // language: 'fr-FR', // French
    // language: 'de-DE', // German
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow ES6+ JavaScript standards
- Use semantic HTML5 elements
- Maintain responsive design principles
- Add comments for complex functions
- Test across different browsers

## 🐛 Troubleshooting

### Common Issues

**Microphone not working:**
- Check browser permissions
- Ensure microphone is connected and working
- Try refreshing the page

**Speech recognition not transcribing:**
- Speak clearly and at normal volume
- Check internet connection
- Try using Chrome for best compatibility

**Summary not generating:**
- Ensure you clicked "Stop Recording"
- Make sure transcript has sufficient content (50+ words)
- Wait a few seconds for processing

**Downloads not working:**
- Check browser download settings
- Ensure pop-ups are not blocked
- Try a different browser

### Error Codes

- `NotAllowedError`: Microphone permission denied
- `NotFoundError`: No microphone detected
- `NetworkError`: Internet connection issue
- `InvalidStateError`: Speech recognition state issue

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Web Speech API documentation and community
- jsPDF library for PDF generation
- Modern CSS techniques and best practices
- Open source community for inspiration and tools

## 📞 Support

- 📧 Email: your.email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/lecture-notes-app/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/lecture-notes-app/discussions)

## 🗺️ Roadmap

- [ ] Multi-language support
- [ ] Cloud storage integration
- [ ] Voice commands
- [ ] Speaker identification
- [ ] Export to more formats (Word, Markdown)
- [ ] Real-time collaboration
- [ ] Mobile app versions

---

**Made with ❤️ by [Your Name]**

⭐ If you found this project helpful, please give it a star on GitHub!