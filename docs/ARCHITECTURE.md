# Technical Architecture

## Overview

Format Transformer is a modern web application built with React, TypeScript, and Vite. It follows best practices for maintainability, scalability, and performance.

## Tech Stack

### Core
- **React 18.2**: UI library with hooks and concurrent features
- **TypeScript 5.2**: Static typing for robust code
- **Vite 5.0**: Fast build tool and dev server

### Styling
- **TailwindCSS 3.4**: Utility-first CSS framework
- **Custom animations**: Gradient effects, transitions
- **Dark mode**: CSS class-based theme switching

### Testing
- **Vitest 1.1**: Fast unit testing framework
- **Testing Library**: Component testing utilities

### Quality
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript strict mode**: Enhanced type safety

## Architecture Patterns

### Component Structure

```
├── App.tsx (Main container)
│   ├── Navbar (Navigation + theme toggle)
│   ├── Hero Section
│   │   └── ThreeColumnEditor
│   │       ├── EditorColumn (JSON)
│   │       ├── EditorColumn (TOON)
│   │       └── EditorColumn (SLD)
│   ├── HowItWorksSection
│   └── Footer
```

### State Management

- **Local State**: React `useState` for component-specific state
- **Context API**: Theme management via `ThemeContext`
- **No external state library**: Kept simple for this scope

### Data Flow

```
User Input → Parser → Transformer → Formatter → Display
     ↓                                              ↑
  onChange                                    Real-time sync
```

1. User types in any column
2. Input is parsed by format-specific parser
3. Parsed data is transformed to other formats
4. All three columns update automatically
5. Metrics recalculate on each change

## Core Modules

### Parsers (`src/lib/parsers/`)

**Purpose**: Convert string input to structured data

- `jsonParser.ts`: JSON validation and parsing
- `toonParser.ts`: TOON format parsing with header extraction
- `sldParser.ts`: SLD format parsing with delimiter handling

**Common Interface**:
```typescript
export interface ParsedData {
  collectionName: string;
  fields: string[];
  records: Record<string, string | number>[];
}
```

### Transformers (`src/lib/transformers/`)

**Purpose**: Convert between formats

- `toJson.ts`: Convert any format → JSON
- `toToon.ts`: Convert JSON → TOON
- `toSld.ts`: Convert JSON → SLD
- `formatRouter.ts`: Route transformation requests

**Architecture**:
- All transformations go through JSON as intermediate
- JSON is the "universal" format
- TOON ↔ SLD: JSON → TOON/SLD

### Utilities (`src/lib/utils/`)

**Token Estimator** (`tokenEstimator.ts`):
- Approximates token count for LLM usage
- Heuristic-based (not official tokenizer)
- Considers words, symbols, numbers

**Readability Calculator** (`readabilityCalculator.ts`):
- Multi-factor scoring (0-100)
- Factors: structure, density, symbols, line length
- Returns score + rating + detailed breakdown

**Examples** (`examples.ts`):
- Sample datasets for each format
- Used for "Load Example" functionality

## Component Design

### ThreeColumnEditor

**Features**:
- Real-time synchronization with 500ms debounce
- Active editor tracking
- Error handling and display
- Metrics calculation per column

**State**:
```typescript
const [jsonContent, setJsonContent] = useState('');
const [toonContent, setToonContent] = useState('');
const [sldContent, setSldContent] = useState('');
const [activeFormat, setActiveFormat] = useState<DataFormat>('JSON');
const [error, setError] = useState('');
```

**Performance Optimizations**:
- `useCallback` for memoized functions
- `setTimeout` debouncing for transformations
- Conditional rendering for metrics

### Theme System

**Implementation**:
```typescript
// Context Provider
<ThemeProvider>
  <App />
</ThemeProvider>

// Usage
const { theme, toggleTheme } = useTheme();
```

**Persistence**:
- localStorage for user preference
- System preference detection
- CSS class-based switching (`dark` class on `<html>`)

## Performance Considerations

### Build Optimization
- **Tree shaking**: Vite removes unused code
- **Code splitting**: Dynamic imports where needed
- **Minification**: Production builds are minified
- **Source maps**: Available for debugging

### Runtime Performance
- **React.memo**: Used for expensive components
- **useCallback/useMemo**: Prevent unnecessary re-renders
- **Debouncing**: 500ms delay for transformations
- **Virtual scrolling**: Not needed for current dataset sizes

## Security

### Input Validation
- JSON parsing with try-catch
- TOON/SLD format validation
- Error messages without stack traces (no info leak)

### XSS Prevention
- React's built-in XSS protection
- No `dangerouslySetInnerHTML` usage
- Sanitized user input display

### Dependencies
- Regular updates via Dependabot
- No known vulnerabilities (audit with `npm audit`)

## Accessibility (a11y)

- **Keyboard navigation**: All interactive elements accessible
- **ARIA labels**: Proper labeling for screen readers
- **Color contrast**: WCAG AA compliant
- **Focus indicators**: Visible focus states
- **Semantic HTML**: Proper heading hierarchy

## SEO Optimization

### Meta Tags
- Open Graph for social sharing
- Twitter Cards for Twitter previews
- Structured data (Schema.org) for search engines

### Performance
- Lighthouse score > 90
- Fast initial load
- Optimized images (when added)

## Deployment

### GitHub Pages
- Automated via GitHub Actions
- Build on push to `main`
- Deployed to `gh-pages` branch

### Configuration
```typescript
// vite.config.ts
export default defineConfig({
  base: '/format-transformer-json-toon-sld/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
```

## Testing Strategy

### Unit Tests
- Parser correctness
- Transformation roundtrips
- Token estimation accuracy
- Readability calculation

### Integration Tests
- Component rendering
- User interactions
- Theme switching
- Format transformations

### Future: E2E Tests
- Full user workflows
- Cross-browser testing
- Mobile responsiveness

## Monitoring & Analytics

### Future Considerations
- Google Analytics or Plausible
- Error tracking (Sentry)
- Performance monitoring (Web Vitals)

## Scalability

### Current Limitations
- Client-side only (no backend)
- Large datasets (>10MB) may lag
- No persistence (refresh loses data)

### Future Enhancements
- Backend API for heavy processing
- WebWorkers for parsing
- IndexedDB for local storage
- Progressive Web App (PWA)

## Development Workflow

### Local Development
```bash
npm run dev    # Start dev server
npm run test   # Run tests
npm run lint   # Check code quality
```

### Pre-commit Checklist
- [ ] Tests pass
- [ ] No ESLint errors
- [ ] Code formatted with Prettier
- [ ] TypeScript compiles
- [ ] No console errors

### Release Process
1. Update CHANGELOG.md
2. Bump version in package.json
3. Create GitHub release
4. Push to main (auto-deploys)

## Code Organization

### Naming Conventions
- **Components**: PascalCase (`Navbar.tsx`)
- **Utilities**: camelCase (`tokenEstimator.ts`)
- **Types**: PascalCase interfaces (`ParsedData`)
- **Constants**: UPPER_SNAKE_CASE

### File Structure
- One component per file
- Co-locate tests with source (`*.test.ts`)
- Group by feature, not by type
- Export from index files where appropriate

## Dependencies

### Production
- `react`: UI library
- `react-dom`: React renderer

### Development
- `@vitejs/plugin-react`: Vite plugin
- `typescript`: Language
- `eslint`: Linting
- `prettier`: Formatting
- `tailwindcss`: Styling
- `vitest`: Testing

### Zero Runtime Dependencies
- No lodash, moment, etc.
- Minimal bundle size
- Vanilla JS where possible

## Future Architecture

### Potential Improvements
1. **Microservices**: Separate API for transformations
2. **Caching**: Cache transformation results
3. **WebAssembly**: WASM for parsing performance
4. **Service Worker**: Offline support
5. **Real-time Collaboration**: Multiple users, one document

### Plugin System
Allow users to add custom formats:
```typescript
interface FormatPlugin {
  name: string;
  parse: (input: string) => ParsedData;
  format: (data: ParsedData) => string;
}
```

## Conclusion

This architecture balances simplicity with extensibility. The codebase is maintainable, testable, and ready for future enhancements while remaining accessible to contributors.
