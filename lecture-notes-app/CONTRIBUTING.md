# Contributing to Lecture to Notes Application

First off, thank you for considering contributing to this project! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)

## Code of Conduct

This project follows a simple code of conduct:

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/lecture-notes-app.git
   cd lecture-notes-app
   ```
3. **Set up the development environment**:
   ```bash
   # Install dependencies (optional)
   npm install

   # Start local server
   npm start
   ```
4. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/amazing-feature
   ```

## How to Contribute

### Reporting Bugs 🐛

Before creating bug reports, please check existing issues. When creating a bug report, include:

- Clear, descriptive title
- Detailed description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and version information
- Screenshots if applicable

### Suggesting Features ✨

Feature suggestions are welcome! Please:

- Check existing feature requests
- Provide clear use case and benefits
- Consider implementation complexity
- Be open to discussion and feedback

### Code Contributions 💻

Areas where contributions are especially welcome:

- **Browser compatibility improvements**
- **Accessibility enhancements**
- **Performance optimizations**
- **UI/UX improvements**
- **Additional export formats**
- **Multi-language support**
- **Bug fixes**
- **Documentation improvements**

## Development Process

### Setting Up Development Environment

1. **Prerequisites**:
   - Modern web browser
   - Text editor (VS Code recommended)
   - Basic knowledge of HTML, CSS, JavaScript

2. **Local Development**:
   ```bash
   # Serve files locally
   python -m http.server 8000
   # Or use VS Code Live Server extension
   ```

3. **Testing Changes**:
   - Test in multiple browsers
   - Verify on different screen sizes
   - Test speech recognition functionality
   - Validate download features

### File Structure

```
lecture-notes-app/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Styles
├── js/
│   └── app.js         # Application logic
├── assets/            # Static assets
├── docs/              # Documentation
└── README.md          # Project documentation
```

## Pull Request Process

1. **Before submitting**:
   - Test your changes thoroughly
   - Update documentation if needed
   - Follow coding standards
   - Write clear commit messages

2. **Submitting PR**:
   - Use clear, descriptive title
   - Reference related issues
   - Describe changes made
   - Include screenshots for UI changes
   - Mark as draft if work in progress

3. **After submission**:
   - Respond to feedback promptly
   - Make requested changes
   - Keep PR updated with main branch

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Other: ___

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested on mobile
- [ ] Speech recognition tested
- [ ] Download features tested

## Screenshots
Include relevant screenshots

## Additional Notes
Any additional information
```

## Coding Standards

### JavaScript

- Use ES6+ features
- Follow consistent naming conventions
- Add JSDoc comments for functions
- Handle errors gracefully
- Use `const` and `let` instead of `var`

```javascript
/**
 * Generate summary from transcript text
 * @param {string} text - The transcript text
 * @returns {string} Generated summary
 */
generateSummary(text) {
    // Implementation
}
```

### CSS

- Use CSS custom properties for theming
- Follow mobile-first responsive design
- Use semantic class names
- Group related styles together
- Comment complex calculations

```css
/* Component: Recording Button */
.btn--recording {
    --btn-color: var(--primary-color);
    background: var(--btn-color);
    /* ... */
}
```

### HTML

- Use semantic HTML5 elements
- Include proper ARIA attributes
- Ensure keyboard accessibility
- Optimize for screen readers
- Validate markup

```html
<button 
    id="startBtn" 
    class="btn btn--primary"
    aria-label="Start recording lecture"
    role="button">
    Start Recording
</button>
```

### Commit Messages

Use clear, descriptive commit messages:

```bash
# Good
git commit -m "Add keyboard shortcuts for recording controls"
git commit -m "Fix speech recognition error handling"
git commit -m "Improve mobile responsive design"

# Avoid
git commit -m "Fix bug"
git commit -m "Update stuff"
git commit -m "Changes"
```

## Testing

### Manual Testing Checklist

- [ ] Application loads without errors
- [ ] Start/stop recording works
- [ ] Speech recognition transcribes accurately
- [ ] Summary generation works
- [ ] PDF download functions correctly
- [ ] Text download functions correctly
- [ ] Responsive design works on mobile
- [ ] Keyboard shortcuts work
- [ ] Error handling works properly
- [ ] Browser compatibility verified

### Browser Testing

Test in these browsers (latest versions):
- Chrome (primary)
- Firefox
- Safari
- Edge

### Accessibility Testing

- Test with screen readers
- Verify keyboard navigation
- Check color contrast
- Test with assistive technologies

## Getting Help

- 💬 Join discussions in GitHub Discussions
- 🐛 Report issues in GitHub Issues
- 📧 Contact maintainers via email
- 📚 Check documentation in `/docs`

## Recognition

All contributors will be:
- Listed in the README
- Credited in release notes
- Invited to join the contributors team

Thank you for contributing! 🙏