# Contributing to Format Transformer

Thank you for your interest in contributing to Format Transformer! This document provides guidelines and instructions for contributing.

## 🌟 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear title** describing the enhancement
- **Provide detailed description** of the suggested enhancement
- **Explain why** this enhancement would be useful
- **List examples** of how it would be used

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** following our code style
3. **Add tests** if you've added code that should be tested
4. **Update documentation** if you've changed APIs or added features
5. **Ensure tests pass**: `npm test`
6. **Lint your code**: `npm run lint`
7. **Format your code**: `npm run format`
8. **Create the Pull Request**

## 🎨 Code Style

We use ESLint and Prettier to maintain code quality:

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix

# Format code with Prettier
npm run format
```

### TypeScript Guidelines

- Use explicit types for function parameters and return values
- Avoid `any` types when possible
- Use interfaces for object shapes
- Export types that are used across multiple files

### React Guidelines

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use meaningful component and prop names

### CSS/Tailwind Guidelines

- Use Tailwind utility classes when possible
- Group related classes logically
- Use custom CSS sparingly and document why
- Maintain dark mode support for new features

## 🧪 Testing

We use Vitest for testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Writing Tests

- Write tests for new features
- Maintain or improve code coverage
- Test edge cases and error conditions
- Use descriptive test names

Example:
```typescript
import { describe, it, expect } from 'vitest';
import { transformData } from './formatRouter';

describe('transformData', () => {
  it('should convert JSON to TOON correctly', () => {
    const input = '{"users":[{"id":1,"name":"Alice"}]}';
    const result = transformData(input, 'JSON', 'TOON');
    expect(result).toContain('users[1]{id,name}:');
  });
});
```

## 📁 Project Structure

```
src/
├── components/       # React components
├── contexts/         # React contexts
├── lib/
│   ├── parsers/      # Format parsers
│   ├── transformers/ # Format transformers
│   ├── utils/        # Utility functions
│   └── types.ts      # TypeScript types
└── tests/            # Test files
```

## 🔄 Development Workflow

1. **Create an issue** for significant changes
2. **Fork and clone** the repository
3. **Create a branch**: `git checkout -b feature/my-feature`
4. **Make changes** and commit regularly
5. **Write tests** for new functionality
6. **Run tests**: `npm test`
7. **Update documentation** as needed
8. **Push changes**: `git push origin feature/my-feature`
9. **Create Pull Request** with clear description

## 📝 Commit Messages

Use clear, descriptive commit messages:

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and PRs when applicable

Examples:
```
Add TOON to SLD direct transformation
Fix readability calculation for edge cases
Update README with new deployment instructions
```

## 🐛 Debugging

### Development Tips

```bash
# Start dev server with debugging
npm run dev

# Build with source maps
npm run build

# Preview production build locally
npm run preview
```

### Common Issues

1. **Type errors**: Run `npx tsc --noEmit` to check types
2. **Styling issues**: Check Tailwind classes and dark mode support
3. **Test failures**: Ensure all dependencies are installed

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Vitest Documentation](https://vitest.dev/)

## 🎯 Areas for Contribution

Looking for ways to contribute? Consider:

- **New format support**: Add YAML, TOML, or other formats
- **Performance optimizations**: Improve transformation speed
- **UI improvements**: Enhance user experience
- **Documentation**: Improve guides and examples
- **Tests**: Increase test coverage
- **Accessibility**: Improve a11y features
- **Internationalization**: Add language support

## 📧 Questions?

If you have questions, feel free to:

- Open an issue with the "question" label
- Start a discussion in GitHub Discussions
- Contact the maintainers

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!
