/**
 * Lecture to Notes Application
 * Real-time speech recognition with AI-powered summarization
 * 
 * @author Your Name
 * @version 1.0.0
 * @license MIT
 */

class LectureRecorder {
    constructor() {
        // Application state
        this.isRecording = false;
        this.recognition = null;
        this.startTime = null;
        this.timerInterval = null;
        this.transcript = '';
        this.summary = '';
        this.recordingTimeout = null;
        this.finalTranscript = '';

        // Configuration
        this.config = {
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
        };

        // Initialize application
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        console.log('🎓 Initializing Lecture to Notes Application...');

        this.initializeElements();
        this.setupEventListeners();
        this.initializeUI();
        this.checkBrowserCompatibility();

        console.log('✅ Application initialized successfully');
    }

    /**
     * Initialize DOM elements
     */
    initializeElements() {
        // Main controls
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.recordingStatus = document.getElementById('recordingStatus');
        this.timer = document.getElementById('timer');

        // Content areas
        this.transcriptElement = document.getElementById('transcript');
        this.summaryElement = document.getElementById('summary');
        this.transcriptContainer = document.getElementById('transcriptContainer');

        // Download section
        this.downloadSection = document.getElementById('downloadSection');
        this.downloadPdfBtn = document.getElementById('downloadPdf');
        this.downloadTextBtn = document.getElementById('downloadText');

        // Modals
        this.permissionModal = document.getElementById('permissionModal');
        this.errorModal = document.getElementById('errorModal');
        this.aboutModal = document.getElementById('aboutModal');
        this.helpModal = document.getElementById('helpModal');
        this.errorMessage = document.getElementById('errorMessage');
        this.loadingOverlay = document.getElementById('loadingOverlay');

        console.log('📋 DOM elements initialized');
    }

    /**
     * Initialize UI state
     */
    initializeUI() {
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.recordingStatus.classList.add('hidden');
        this.downloadSection.style.display = 'none';
        this.resetContent();

        console.log('🎨 UI initialized');
    }

    /**
     * Reset content areas
     */
    resetContent() {
        this.transcriptElement.innerHTML = '<p class="placeholder-text">Start recording to see your lecture transcript appear here in real-time...</p>';
        this.summaryElement.innerHTML = '<p class="placeholder-text">Summary will appear here after you stop recording...</p>';
        this.transcript = '';
        this.summary = '';
        this.finalTranscript = '';
        this.transcriptContainer.classList.remove('transcript-active');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Recording controls
        this.startBtn?.addEventListener('click', () => this.handleStartRecording());
        this.stopBtn?.addEventListener('click', () => this.handleStopRecording());

        // Download buttons
        this.downloadPdfBtn?.addEventListener('click', () => this.downloadPDF());
        this.downloadTextBtn?.addEventListener('click', () => this.downloadText());

        // Modal controls
        document.getElementById('requestPermissionBtn')?.addEventListener('click', () => {
            this.hideModal('permissionModal');
            this.startRecording();
        });

        document.getElementById('cancelPermissionBtn')?.addEventListener('click', () => {
            this.hideModal('permissionModal');
        });

        document.getElementById('closeErrorBtn')?.addEventListener('click', () => {
            this.hideModal('errorModal');
        });

        document.getElementById('closeAboutBtn')?.addEventListener('click', () => {
            this.hideModal('aboutModal');
        });

        document.getElementById('closeHelpBtn')?.addEventListener('click', () => {
            this.hideModal('helpModal');
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        console.log('👂 Event listeners setup complete');
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(event) {
        // Ctrl/Cmd + R to start/stop recording
        if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
            event.preventDefault();
            if (this.isRecording) {
                this.handleStopRecording();
            } else {
                this.handleStartRecording();
            }
        }

        // Escape to close modals
        if (event.key === 'Escape') {
            this.hideAllModals();
        }
    }

    /**
     * Check browser compatibility
     */
    checkBrowserCompatibility() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            this.showError('🚫 Speech recognition is not supported in your browser. Please use Chrome, Edge, Firefox, or Safari for the best experience.');
            this.startBtn.disabled = true;
            return false;
        }

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            this.showError('🎤 Microphone access is not supported in your browser. Please update your browser or use a modern alternative.');
            this.startBtn.disabled = true;
            return false;
        }

        console.log('✅ Browser compatibility check passed');
        return true;
    }

    /**
     * Handle start recording button click
     */
    async handleStartRecording() {
        try {
            console.log('🎙️ Requesting microphone access...');
            await navigator.mediaDevices.getUserMedia({ audio: true });
            this.startRecording();
        } catch (error) {
            console.error('❌ Microphone access error:', error);

            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                this.showModal('permissionModal');
            } else if (error.name === 'NotFoundError') {
                this.showError('🎤 No microphone found. Please connect a microphone and try again.');
            } else {
                this.showError(`🚫 Unable to access microphone: ${error.message}`);
            }
        }
    }

    /**
     * Start recording process
     */
    startRecording() {
        if (this.isRecording) return;

        try {
            console.log('▶️ Starting speech recognition...');

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();

            // Configure speech recognition
            Object.assign(this.recognition, this.config.speechRecognition);

            // Setup event handlers
            this.recognition.onstart = () => this.onRecordingStart();
            this.recognition.onresult = (event) => this.handleSpeechResult(event);
            this.recognition.onerror = (event) => this.handleRecognitionError(event.error);
            this.recognition.onend = () => this.handleRecognitionEnd();

            // Start recognition
            this.recognition.start();

        } catch (error) {
            console.error('❌ Error starting recording:', error);
            this.showError(`Failed to start recording: ${error.message}`);
        }
    }

    /**
     * Handle recording start
     */
    onRecordingStart() {
        console.log('✅ Recording started');

        this.isRecording = true;
        this.startTime = Date.now();

        // Update UI
        this.startBtn.disabled = true;
        this.stopBtn.disabled = false;
        this.recordingStatus.classList.remove('hidden');
        this.transcriptContainer.classList.add('transcript-active');
        this.downloadSection.style.display = 'none';

        // Clear previous content
        this.resetContent();
        this.transcriptElement.innerHTML = '<p class="placeholder-text">🎧 Listening for speech...</p>';

        // Start timer
        this.startTimer();
    }

    /**
     * Handle speech recognition results
     */
    handleSpeechResult(event) {
        let interimTranscript = '';
        let finalTranscript = '';

        // Process all results
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;

            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        // Update transcript
        if (finalTranscript) {
            this.finalTranscript += finalTranscript;
            this.transcript = this.finalTranscript;
        }

        // Display current text
        const currentText = this.finalTranscript + interimTranscript;
        if (currentText.trim()) {
            this.displayTranscript(currentText);
        }
    }

    /**
     * Display transcript with formatting
     */
    displayTranscript(text) {
        const formattedText = this.formatTranscript(text);
        this.transcriptElement.innerHTML = `<div class="transcript-text">${formattedText}</div>`;

        // Auto-scroll to bottom
        setTimeout(() => {
            this.transcriptContainer.scrollTop = this.transcriptContainer.scrollHeight;
        }, this.config.ui.autoScrollDelay);
    }

    /**
     * Format transcript text
     */
    formatTranscript(text) {
        return text
            .replace(/\n/g, '<br>')
            .replace(/\. /g, '. <br><br>')
            .trim();
    }

    /**
     * Handle recognition errors
     */
    handleRecognitionError(error) {
        console.warn('⚠️ Recognition error:', error);

        const errorMessages = {
            'no-speech': '🔇 No speech detected. Please try speaking closer to the microphone.',
            'audio-capture': '🎤 No microphone found or microphone access denied.',
            'not-allowed': '🚫 Microphone access denied. Please allow access and try again.',
            'network': '🌐 Network error occurred. Please check your internet connection.',
            'service-not-allowed': '⛔ Speech recognition service not allowed.'
        };

        // Only show error for critical issues
        if (error !== 'no-speech' && error !== 'aborted') {
            const message = errorMessages[error] || `Speech recognition error: ${error}`;
            console.error('❌ Critical recognition error:', message);
            // Could show error to user for critical errors
        }
    }

    /**
     * Handle recognition end
     */
    handleRecognitionEnd() {
        if (this.isRecording) {
            // Restart recognition if still recording
            try {
                setTimeout(() => {
                    if (this.isRecording && this.recognition) {
                        this.recognition.start();
                    }
                }, 100);
            } catch (e) {
                console.log('Could not restart recognition:', e);
            }
        }
    }

    /**
     * Handle stop recording
     */
    handleStopRecording() {
        console.log('⏹️ Stopping recording...');
        this.stopRecording();
    }

    /**
     * Stop recording process
     */
    stopRecording() {
        if (!this.isRecording) return;

        this.isRecording = false;

        // Stop recognition
        if (this.recognition) {
            this.recognition.stop();
            this.recognition = null;
        }

        // Update UI
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.recordingStatus.classList.add('hidden');
        this.transcriptContainer.classList.remove('transcript-active');

        // Stop timer
        this.stopTimer();

        // Generate summary
        if (this.transcript.trim()) {
            console.log('📝 Generating summary...');
            this.generateSummary();
        } else {
            this.transcriptElement.innerHTML = '<p class="placeholder-text">❌ No speech was recorded. Please try again and speak clearly.</p>';
            this.summaryElement.innerHTML = '<p class="placeholder-text">No content available for summary.</p>';
        }

        console.log('✅ Recording stopped');
    }

    /**
     * Start recording timer
     */
    startTimer() {
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            this.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    /**
     * Stop recording timer
     */
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    /**
     * Generate AI summary
     */
    generateSummary() {
        const text = this.transcript.trim();

        if (!text) {
            this.summaryElement.innerHTML = '<p class="placeholder-text">No content to summarize.</p>';
            return;
        }

        if (text.split(' ').length < this.config.summarization.minWords) {
            this.summaryElement.innerHTML = `<div class="summary-text">${text}</div>`;
            this.downloadSection.style.display = 'block';
            return;
        }

        // Show loading
        this.showLoading();

        setTimeout(() => {
            try {
                this.summary = this.extractiveSummarization(text);
                this.summaryElement.innerHTML = `<div class="summary-text">${this.summary}</div>`;
                this.downloadSection.style.display = 'block';
                console.log('✅ Summary generated successfully');
            } catch (error) {
                console.error('❌ Summarization error:', error);
                this.summaryElement.innerHTML = '<p class="placeholder-text">❌ Error generating summary. Please try again.</p>';
            } finally {
                this.hideLoading();
            }
        }, this.config.ui.loadingDelay);
    }

    /**
     * Extractive summarization algorithm
     */
    extractiveSummarization(text) {
        // Clean and prepare text
        const cleanText = text.trim().replace(/\s+/g, ' ');

        if (cleanText.length < 100) {
            return cleanText; // Too short to summarize
        }

        // Split into sentences
        const sentences = cleanText
            .split(/[.!?]+/)
            .map(s => s.trim())
            .filter(s => s.length > 15);

        if (sentences.length <= this.config.summarization.minSentences) {
            return cleanText;
        }

        // Calculate word frequencies
        const words = cleanText.toLowerCase()
            .replace(/[^a-zA-Z\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 3 && !this.isStopWord(word));

        const wordFreq = {};
        words.forEach(word => {
            wordFreq[word] = (wordFreq[word] || 0) + 1;
        });

        // Score sentences
        const sentenceScores = sentences.map((sentence, index) => {
            const sentenceWords = sentence.toLowerCase()
                .replace(/[^a-zA-Z\s]/g, '')
                .split(/\s+/)
                .filter(word => word.length > 3 && !this.isStopWord(word));

            let score = 0;
            sentenceWords.forEach(word => {
                if (wordFreq[word]) {
                    score += wordFreq[word];
                }
            });

            // Normalize by sentence length
            score = score / Math.max(sentenceWords.length, 1);

            // Position bonus (earlier sentences get slight bonus)
            const positionBonus = (sentences.length - index) / sentences.length * 0.1;
            score += positionBonus;

            // Length penalties/bonuses
            if (sentence.length < 30) score *= 0.5;
            if (sentence.length > 200) score *= 0.8;
            if (sentence.length >= 50 && sentence.length <= 150) score *= 1.1;

            return { sentence, score, index };
        });

        // Select top sentences
        const summaryLength = Math.max(
            this.config.summarization.minSentences,
            Math.min(
                Math.floor(sentences.length * this.config.summarization.summaryRatio),
                this.config.summarization.maxSentences
            )
        );

        const topSentences = sentenceScores
            .sort((a, b) => b.score - a.score)
            .slice(0, summaryLength)
            .sort((a, b) => a.index - b.index);

        return topSentences.map(item => item.sentence).join('. ') + '.';
    }

    /**
     * Check if word is a stop word
     */
    isStopWord(word) {
        const stopWords = new Set([
            'the', 'and', 'that', 'this', 'with', 'for', 'are', 'was', 'will', 'been',
            'have', 'has', 'had', 'but', 'not', 'you', 'all', 'can', 'her', 'him',
            'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who',
            'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use'
        ]);
        return stopWords.has(word.toLowerCase());
    }

    /**
     * Download as PDF
     */
    downloadPDF() {
        try {
            console.log('📄 Generating PDF...');

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            const timestamp = new Date().toLocaleString();
            const title = 'Lecture Notes';

            // Add title and metadata
            doc.setFontSize(24);
            doc.setFont(undefined, 'bold');
            doc.text(title, 20, 30);

            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text(`Generated: ${timestamp}`, 20, 45);
            doc.text('Created with Lecture to Notes Application', 20, 52);

            let yPosition = 70;

            // Add transcript section
            doc.setFontSize(18);
            doc.setFont(undefined, 'bold');
            doc.text('📝 Full Transcript', 20, yPosition);
            yPosition += 15;

            doc.setFontSize(11);
            doc.setFont(undefined, 'normal');
            const transcriptText = this.transcript || 'No transcript available.';
            const splitTranscript = doc.splitTextToSize(transcriptText, 170);
            doc.text(splitTranscript, 20, yPosition);
            yPosition += (splitTranscript.length * 5) + 25;

            // Add new page if needed
            if (yPosition > 250) {
                doc.addPage();
                yPosition = 30;
            }

            // Add summary section
            doc.setFontSize(18);
            doc.setFont(undefined, 'bold');
            doc.text('📋 AI Summary', 20, yPosition);
            yPosition += 15;

            doc.setFontSize(11);
            doc.setFont(undefined, 'normal');
            const summaryText = this.summary || 'No summary available.';
            const splitSummary = doc.splitTextToSize(summaryText, 170);
            doc.text(splitSummary, 20, yPosition);

            // Add footer
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.text(`Page ${i} of ${pageCount}`, 20, 285);
                doc.text('Lecture to Notes Application', 150, 285);
            }

            // Generate filename
            const date = new Date().toISOString().split('T')[0];
            const filename = `lecture-notes-${date}-${Date.now()}.pdf`;

            doc.save(filename);
            console.log('✅ PDF downloaded successfully');

        } catch (error) {
            console.error('❌ PDF generation error:', error);
            this.showError('Failed to generate PDF. Please try again or use a different browser.');
        }
    }

    /**
     * Download as text file
     */
    downloadText() {
        try {
            console.log('📝 Generating text file...');

            const timestamp = new Date().toLocaleString();
            const wordCount = this.transcript.split(' ').length;

            let content = `LECTURE NOTES\n`;
            content += `${'='.repeat(50)}\n`;
            content += `Generated: ${timestamp}\n`;
            content += `Word Count: ${wordCount}\n`;
            content += `Created with: Lecture to Notes Application\n\n`;

            content += `FULL TRANSCRIPT\n`;
            content += `${'-'.repeat(30)}\n`;
            content += `${this.transcript || 'No transcript available.'}\n\n`;

            content += `AI SUMMARY\n`;
            content += `${'-'.repeat(30)}\n`;
            content += `${this.summary || 'No summary available.'}\n\n`;

            content += `${'='.repeat(50)}\n`;
            content += `End of Document\n`;

            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');

            const date = new Date().toISOString().split('T')[0];
            const filename = `lecture-notes-${date}-${Date.now()}.txt`;

            a.href = url;
            a.download = filename;
            a.style.display = 'none';

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            console.log('✅ Text file downloaded successfully');

        } catch (error) {
            console.error('❌ Text file generation error:', error);
            this.showError('Failed to generate text file. Please try again or use a different browser.');
        }
    }

    /**
     * Show modal
     */
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            console.log(`📱 Showing modal: ${modalId}`);
        }
    }

    /**
     * Hide modal
     */
    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            console.log(`📱 Hiding modal: ${modalId}`);
        }
    }

    /**
     * Hide all modals
     */
    hideAllModals() {
        const modals = ['permissionModal', 'errorModal', 'aboutModal', 'helpModal'];
        modals.forEach(modalId => this.hideModal(modalId));
    }

    /**
     * Show error message
     */
    showError(message) {
        console.error('❌ Error:', message);
        this.errorMessage.textContent = message;
        this.showModal('errorModal');
    }

    /**
     * Show loading overlay
     */
    showLoading() {
        this.loadingOverlay?.classList.remove('hidden');
    }

    /**
     * Hide loading overlay
     */
    hideLoading() {
        this.loadingOverlay?.classList.add('hidden');
    }
}

/**
 * Global utility functions
 */

/**
 * Show about modal
 */
function showAbout() {
    const recorder = window.lectureRecorder;
    if (recorder) {
        recorder.showModal('aboutModal');
    }
}

/**
 * Show help modal
 */
function showHelp() {
    const recorder = window.lectureRecorder;
    if (recorder) {
        recorder.showModal('helpModal');
    }
}

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Starting Lecture to Notes Application...');

    // Create global instance
    window.lectureRecorder = new LectureRecorder();

    console.log('🎉 Application loaded successfully!');
});

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.lectureRecorder?.isRecording) {
        console.log('⚠️ Page hidden while recording - consider stopping recording');
    }
});

/**
 * Handle page unload
 */
window.addEventListener('beforeunload', (event) => {
    if (window.lectureRecorder?.isRecording) {
        event.preventDefault();
        event.returnValue = 'You are currently recording. Are you sure you want to leave?';
    }
});