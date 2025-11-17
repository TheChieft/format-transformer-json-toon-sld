# Format Transformer: JSON ↔ TOON ↔ SLD

A modern web application for transforming data between JSON, TOON, and SLD formats, with built-in metrics to compare token efficiency for AI applications.

![Format Transformer Screenshot](https://github.com/user-attachments/assets/4905408f-6fc5-4f0d-9aac-d1273e08f97b)

## 🎯 Purpose

This portfolio project demonstrates full-stack development skills with React, TypeScript, and modern web technologies. It provides practical utility for developers working with AI APIs who need to optimize their data formats for token efficiency.

## ✨ Features

- **Multi-format Support**: Transform between JSON, TOON, and SLD formats
- **Real-time Metrics**: Character count, token estimation, and savings percentage
- **Dark Mode**: Fully functional dark/light theme toggle
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Example Data**: Load sample data with one click to test transformations
- **Copy & Download**: Easy export of transformed data
- **Comprehensive Documentation**: In-app explanations of each format

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm (or pnpm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/TheChieft/format-transformer-json-toon-sld.git
cd format-transformer-json-toon-sld

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Building
npm run build        # Build for production
npm run preview      # Preview production build locally

# Testing
npm test             # Run tests
npm run test:ui      # Run tests with UI

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 🏗️ Project Structure

```
format-transformer-json-toon-sld/
├── src/
│   ├── components/           # React components
│   │   ├── FormatSelector.tsx    # Format dropdown selector
│   │   ├── TextAreaPanel.tsx     # Input/output text areas
│   │   ├── MetricsPanel.tsx      # Metrics display
│   │   └── InfoSection.tsx       # Documentation section
│   ├── lib/
│   │   ├── parsers/             # Format parsers
│   │   │   ├── jsonParser.ts
│   │   │   ├── toonParser.ts
│   │   │   └── sldParser.ts
│   │   ├── transformers/        # Transformation logic
│   │   │   └── formatRouter.ts
│   │   ├── utils/               # Utility functions
│   │   │   ├── tokenEstimator.ts
│   │   │   └── examples.ts
│   │   └── types.ts             # TypeScript type definitions
│   ├── test/                    # Test setup
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles (Tailwind)
├── public/                      # Static assets
├── package.json
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md
```

## 📚 Format Specifications

### JSON (JavaScript Object Notation)
Standard data interchange format. Example:
```json
{
  "users": [
    { "id": 1, "name": "Alice", "role": "admin" },
    { "id": 2, "name": "Bob", "role": "user" }
  ]
}
```

### TOON (Tabular Object Optimized Notation)
Header-based compact format. Grammar:
```
collectionName[count]{field1,field2,...}:
value1,value2,...
value1,value2,...
```

Example:
```
users[2]{id,name,role}:
1,Alice,admin
2,Bob,user
```

### SLD (Single Line Data)
Ultra-compact single-line format. Grammar:
```
collectionName|count|field1,field2,...|row1val1,row1val2;row2val1,row2val2
```

Example:
```
users|2|id,name,role|1,Alice,admin;2,Bob,user
```

## 🔧 Architecture & Technical Decisions

### Why React + TypeScript + Vite?

- **React**: Component-based architecture for maintainable UI
- **TypeScript**: Type safety prevents runtime errors and improves developer experience
- **Vite**: Lightning-fast HMR (Hot Module Replacement) and optimized builds
- **TailwindCSS**: Utility-first CSS for rapid, consistent styling

### Token Estimation Method

The token counter uses a simplified heuristic approach:
1. Split text by whitespace and common delimiters
2. Count alphanumeric sequences as tokens
3. Count punctuation and special characters
4. Apply adjustments for structural elements

While not as precise as actual tokenizers (like OpenAI's tiktoken), it provides a reasonable approximation for comparison purposes.

### Format Grammar Design

**TOON** and **SLD** were designed with these principles:
- **Eliminate redundancy**: Field names appear once, not per record
- **Minimize structural characters**: Use simple delimiters (`,`, `|`, `;`)
- **Maintain parseability**: Simple, deterministic grammar rules
- **Trade-off clarity for compactness**: Optimize for machines over humans

## 🧪 Testing

The project includes unit tests for core functionality:

```bash
npm test
```

Tests cover:
- JSON parsing and validation
- TOON format parsing and generation
- SLD format parsing and generation
- Format transformations
- Token estimation (basic coverage)

## 🚢 Deployment

### Deploy to Netlify

1. **Via Netlify UI**:
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy!

2. **Via Netlify CLI**:
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to Vercel

1. **Via Vercel UI**:
   - Import your GitHub repository
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Deploy!

2. **Via Vercel CLI**:
```bash
npm install -g vercel
npm run build
vercel --prod
```

### Environment Variables

No environment variables are required for this application.

## 📝 Publishing to GitHub

If you're starting from scratch:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: JSON/TOON/SLD transformer app"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/format-transformer-json-toon-sld.git

# Push to GitHub
git push -u origin main
```

## 🎨 Customization

### Adding New Formats

1. Create a new parser in `src/lib/parsers/yourFormat.ts`
2. Implement validation, parsing, and serialization functions
3. Add format to `Format` type in `src/lib/types.ts`
4. Update `formatRouter.ts` to handle the new format
5. Add example data in `src/lib/utils/examples.ts`

### Styling

The app uses TailwindCSS v4. Customize styles by:
- Modifying `src/index.css` for global styles
- Adjusting component classes in `.tsx` files
- Extending Tailwind theme (if using v3, in `tailwind.config.js`)

## 🐛 Known Limitations

- Token estimation is approximate, not production-accurate
- Assumes homogeneous objects in arrays (all items have same structure)
- TOON and SLD formats support single collection per transformation
- No support for nested objects/arrays (intentionally simplified)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🤝 Contributing

This is a portfolio project, but suggestions and improvements are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 🔗 Links

- **Live Demo**: [Add your deployment URL here]
- **GitHub**: https://github.com/TheChieft/format-transformer-json-toon-sld
- **Portfolio**: [Add your portfolio link here]

---

Built with ❤️ using React + TypeScript + Vite + TailwindCSS
