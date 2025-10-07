# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Security Considerations

### Data Privacy

This application:
- ✅ Processes audio locally in your browser
- ✅ Does not store audio recordings permanently
- ✅ Does not send audio data to external servers (except Web Speech API)
- ✅ Generates summaries locally using client-side algorithms
- ✅ Creates downloads locally without server interaction

### Browser Permissions

The application requests:
- **Microphone access**: Required for speech recording
- **File downloads**: For saving generated notes

### Third-party Services

- **Web Speech API**: Used for speech-to-text conversion (Google/Browser service)
- **jsPDF**: Client-side PDF generation library (no external calls)

## Reporting a Vulnerability

If you discover a security vulnerability, please:

1. **Do NOT open a public issue**
2. **Email us directly**: security@yourdomain.com
3. **Include details**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 7 days  
- **Resolution**: Varies based on severity
- **Disclosure**: After fix is deployed

## Security Best Practices

When using this application:

1. **Use HTTPS**: Always access via secure connection
2. **Keep browsers updated**: Use latest browser versions
3. **Review permissions**: Only grant necessary permissions
4. **Private sessions**: Use private/incognito mode for sensitive content
5. **Clear data**: Clear browser data after sensitive sessions

## Known Limitations

- Audio is processed by Web Speech API (browser/Google service)
- Transcript data exists in browser memory during session
- Downloads are created locally but stored in browser's download folder

## Updates and Patches

Security updates will be:
- Released as soon as possible
- Documented in release notes
- Announced via GitHub releases
- Tagged with security labels

## Contact

For security-related questions:
- 🔒 Security Email: security@yourdomain.com
- 💬 General Issues: GitHub Issues (for non-security bugs)
- 📧 General Contact: your.email@example.com