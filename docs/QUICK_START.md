# Quick Start Guide

Get up and running with Format Transformer in 5 minutes!

## 📦 Prerequisites

- **Node.js**: v18 or higher ([Download](https://nodejs.org/))
- **Package Manager**: npm (comes with Node) or pnpm
- **Git**: For cloning the repository
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

## 🚀 Installation (3 steps)

### 1. Clone the Repository

```bash
git clone https://github.com/TheChieft/format-transformer-json-toon-sld.git
cd format-transformer-json-toon-sld
```

### 2. Install Dependencies

```bash
npm install
```

*Or with pnpm:*
```bash
pnpm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173/format-transformer-json-toon-sld/`

## ✅ Verify Installation

You should see:
- ✅ Terminal shows "VITE ready" message
- ✅ Browser opens with the application
- ✅ Three-column editor is visible
- ✅ Example data is loaded
- ✅ Dark/light mode toggle works

## 🎯 First Usage

1. **View Example**: Example data is pre-loaded on startup
2. **Edit Any Column**: Click any editor and start typing
3. **Watch Sync**: All three formats update automatically
4. **Check Metrics**: See character count, tokens, readability below each column
5. **Toggle Theme**: Click sun/moon icon in navbar

## 🧪 Run Tests

```bash
npm test
```

All tests should pass ✅

## 🏗️ Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

Preview the build:
```bash
npm run preview
```

## 🎨 Customize

### Change Theme Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#YOUR_COLOR',
        // ...
      }
    }
  }
}
```

### Add Example Data

Edit `src/lib/utils/examples.ts`:
```typescript
export function getExample(format: DataFormat): string {
  // Add your example data here
}
```

### Modify Formats

Add new formats by creating:
1. Parser in `src/lib/parsers/yourFormat.ts`
2. Transformer in `src/lib/transformers/toYourFormat.ts`
3. Update `formatRouter.ts`

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Vite will automatically use another port
# Or specify a port:
npm run dev -- --port 3000
```

### Dependencies Error
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Check for errors without running
npx tsc --noEmit
```

### Build Fails
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

## 📝 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm test                 # Run tests once
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report

# Code Quality
npm run lint             # Check code
npm run lint:fix         # Auto-fix issues
npm run format           # Format with Prettier
```

## 🌐 Deployment

### Quick Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Quick Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages (Automatic)

Push to `main` branch and GitHub Actions will auto-deploy!

## 💡 Next Steps

1. **Read Documentation**: Check [README.md](../README.md)
2. **Understand Architecture**: See [ARCHITECTURE.md](ARCHITECTURE.md)
3. **Contribute**: Read [CONTRIBUTING.md](../CONTRIBUTING.md)
4. **Report Issues**: Use [GitHub Issues](https://github.com/TheChieft/format-transformer-json-toon-sld/issues)

## 🆘 Get Help

- **Issues**: [GitHub Issues](https://github.com/TheChieft/format-transformer-json-toon-sld/issues)
- **Discussions**: [GitHub Discussions](https://github.com/TheChieft/format-transformer-json-toon-sld/discussions)
- **Email**: Contact via GitHub profile

## 🎉 You're Ready!

Start transforming data and exploring the codebase. Happy coding!

---

**Need more details?** Check the full [README.md](../README.md)
