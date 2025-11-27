# 🔄 Multi-Format Data Transformer

[![Deploy to GitHub Pages](https://github.com/TheChieft/format-transformer-json-toon-sld/actions/workflows/deploy.yml/badge.svg)](https://github.com/TheChieft/format-transformer-json-toon-sld/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue.svg)](https://www.typescriptlang.org/)

> **Transform data between 6+ formats optimized for different use cases: APIs, LLMs, spreadsheets, configs, and more.**

A modern, open-source web application for converting data between serialization formats. Choose the right format for your needs: minimize LLM costs with TOON, ensure universal compatibility with JSON, or maximize simplicity with CSV.

🌐 **[Live Demo](https://thechieft.github.io/format-transformer-json-toon-sld/)**

---

## ✨ Features

- **🔄 Dual-Column Editor**: Input and output side-by-side with format selectors
- **📊 Performance Comparison**: Real-time metrics showing character count, tokens, and readability
- **📈 Visual Analytics**: Bar charts comparing efficiency between formats
- **💰 Cost Savings**: Reduce AI API costs by up to 40% with TOON format
- **🎨 Modern UI/UX**: Beautiful, responsive design with dark mode support
- **⚡ Fast & Lightweight**: Built with Vite for optimal performance
- **📥 Export Options**: Copy to clipboard or download files in any format

---

## 🎯 Supported Formats

### **For LLM Prompts** (Token Efficiency)
- **TOON** – 40% fewer tokens than JSON, optimized for LLM input  
- **SLD** – Experimental compact format

### **For APIs & Web**
- **JSON** – Universal data interchange format

### **For Spreadsheets & Analytics**
- **CSV** – Pure tabular data, maximum simplicity  
- **TSV** – Tab-separated for Unix pipelines

### **For Configuration Files**
- **YAML** – Human-readable, used in Kubernetes, Docker, CI/CD *(coming soon)*

---

## 📊 Format Comparison Matrix

| Format | Structure | Token Efficiency | Human Readability | Use Case |
|--------|-----------|------------------|-------------------|----------|
| **TOON** | High | ⭐⭐⭐⭐⭐ (Best) | ⭐⭐⭐⭐ | LLM prompts |
| **JSON** | High | ⭐⭐⭐ | ⭐⭐⭐ | APIs, universal |
| **CSV** | Low | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Flat tables |
| **YAML** | High | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Config files |
| **TSV** | Low | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Unix pipes |
| **SLD** | High | ⭐⭐⭐⭐ | ⭐⭐⭐ | Experimental |

---

## 🧬 Origins & Motivations

### TOON (Token-Oriented Object Notation)

> **From the official TOON repository:**
> 
> *"Token-Oriented Object Notation is a compact, human-readable encoding of the JSON data model that minimizes tokens and makes structure easy for models to follow. It's intended for LLM input as a drop-in, lossless representation of your existing JSON."*

**Problem Solved**: LLM tokens cost money. JSON is verbose and token-expensive.

**Key Innovation**: 
- Combines YAML's indentation with CSV's tabular layout
- Explicit `[N]` lengths and `{fields}` headers for LLM guardrails
- **73.9% accuracy vs JSON's 69.7% while using 39.6% fewer tokens**

**When to Use**: Uniform arrays of objects, LLM prompts, token cost matters

**When to Avoid**: Deeply nested data, non-uniform structures

**Official Repository**: [github.com/toon-format/toon](https://github.com/toon-format/toon)

---

### CSV (Comma Separated Values)

**Born**: 1970s, IBM mainframes

**Problem Solved**: Simple data export/import between systems without complex formats

**Still Relevant**: Universal format, maximum simplicity, smallest file size for flat data

**When to Use**: 
- Spreadsheet applications (Excel, Google Sheets)
- Database exports
- Data science workflows
- ETL pipelines

**When to Avoid**:
- Nested data structures
- Need for type safety
- Complex relationships

---

### YAML (Yet Another Markup Language)

**Born**: 2001, by Clark Evans

**Problem Solved**: XML was too verbose and hard to write manually

**Still Relevant**: Configuration files need human editability + hierarchy

**When to Use**:
- Kubernetes manifests
- Docker Compose files
- CI/CD pipelines (GitHub Actions, GitLab CI)
- Application configuration

**Trade-offs**: 
- ❌ Indentation sensitivity
- ❌ Ambiguities (Norway problem: `NO` → `false`)
- ❌ Slower parsing than JSON

---

### TSV (Tab Separated Values)

**Born**: Unix/Linux ecosystems for command-line data processing

**Problem Solved**: CSV's comma conflicts with natural language; tabs are rarer in text

**Still Relevant**: Bioinformatics, Unix pipelines, scientific data

**When to Use**:
- `awk`, `cut`, `paste` workflows
- Bioinformatics formats (BED, GTF, VCF)
- Data where commas appear frequently

**When to Avoid**:
- GUI applications (tabs are invisible)
- Data that may contain literal tabs

---

## 🔄 How Transformations Work Internally

### Intermediate Representation

All formats convert to a unified internal structure:

```typescript
interface ParsedData {
  collectionName: string;    // Name of the data collection
  records: Record<string, string | number>[];  // Array of objects
  fields: string[];          // Field names in order
}
```

### Transformation Flow

```
Input Format → Parse → Validate → Intermediate → Transform → Output Format
```

### Format-Specific Decisions

**CSV/TSV**:
- First line = headers → field names
- Remaining lines → records
- Type inference: numbers, booleans, strings
- ⚠️ **Loss**: Everything is flat, no nesting possible

**JSON**:
- Direct parse to intermediate structure
- Arrays within objects flattened to pipe-separated strings for CSV/TOON
- ⚠️ **Loss**: None (JSON preserves all structure)

**TOON**:
- Tabular format for uniform arrays
- Indentation for nested objects
- ⚠️ **Loss**: Comments not preserved

**YAML** *(coming soon)*:
- Direct parse to object → same as JSON
- ⚠️ **Loss**: Comments, anchors, multi-line string formatting

---

## ⚠️ Limitations by Format

### What You Lose Converting From:

**CSV/TSV → JSON/TOON**:
- ✅ No loss (gain structure)

**JSON → CSV/TSV**:
- ❌ Nested objects flattened or lost
- ❌ Arrays converted to pipe-separated strings
- ❌ Only works for uniform arrays

**JSON/TOON → CSV**:
- ❌ Hierarchy becomes flat
- ❌ Non-uniform data may fail conversion

### Validation Warnings

The tool will warn you when:
- Converting nested data to flat format (data loss)
- Non-uniform arrays (TOON won't be optimal)
- Type ambiguity (CSV inferring types)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm, pnpm, or yarn

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

Visit `http://localhost:5173` to see the app in action!

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

---

## 🎮 Using the Tool

1. **Select Input Format** from dropdown (JSON, TOON, SLD, CSV, TSV, YAML)
2. **Paste your data** in left editor
3. **Select Output Format** from dropdown
4. **Click Transform** (or press `Ctrl+Enter`)
5. **Compare metrics** in bar chart below
6. **Copy or Download** output using buttons

### Keyboard Shortcuts

- `Ctrl+Enter` (or `Cmd+Enter` on Mac) – Transform data
- Standard text editing shortcuts work in both editors

---

## 📈 Efficiency Comparison (Real Benchmarks)

From official TOON repository benchmarks:

### Mixed-Structure Data (290K tokens)
```
TOON          226,613 tokens  (baseline)
JSON compact  197,270 tokens  (+14.9% vs TOON) ⚡ Winner for non-uniform
JSON          289,901 tokens  (+21.8%)
YAML          239,958 tokens  (+5.6%)
XML           328,191 tokens  (+31.0%)
```

### Flat Tabular Data (164K tokens)
```
CSV            63,854 tokens  (baseline) ⭐ Winner for pure tables
TOON           67,695 tokens  (+6.0% vs CSV)
JSON compact  104,526 tokens  (+35.2%)
JSON          164,254 tokens  (+58.8%)
YAML          130,697 tokens  (+48.2%)
```

**Key Insight**: Choose format based on data structure!

---

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 18.3, TypeScript 5.6
- **Build Tool**: Vite 5.4
- **Styling**: TailwindCSS 3.4
- **Testing**: Vitest 1.1
- **Deployment**: GitHub Pages (automated via Actions)

### Project Structure

```
src/
├── lib/
│   ├── parsers/          # Format parsers (JSON, TOON, SLD, CSV, TSV, YAML)
│   ├── transformers/     # Format transformers + router
│   ├── utils/            # Token estimator, readability calculator
│   └── types.ts          # TypeScript definitions
├── components/
│   ├── DualColumnEditor.tsx      # Main 2-column editor
│   ├── FormatComparisonTable.tsx # Static format info
│   ├── HowItWorksSection.tsx     # Documentation section
│   └── Navbar.tsx                # Navigation with theme toggle
└── App.tsx               # Main application component
```

---

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding New Formats

To add a new format (e.g., TOML, INI):

1. Create parser in `src/lib/parsers/yourFormat.ts`
2. Create transformer in `src/lib/transformers/toYourFormat.ts`
3. Update `DataFormat` type in `src/lib/types.ts`
4. Add routes in `src/lib/transformers/formatRouter.ts`
5. Update `FORMAT_OPTIONS` in `src/components/DualColumnEditor.tsx`
6. Add format info to `FormatComparisonTable.tsx`

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **TOON Format**: Inspired by the amazing work at [toon-format/toon](https://github.com/toon-format/toon)
- **Community**: Thanks to all contributors and users providing feedback

---

## 📞 Contact

- **GitHub**: [@TheChieft](https://github.com/TheChieft)
- **Issues**: [Report bugs or request features](https://github.com/TheChieft/format-transformer-json-toon-sld/issues)

---

## 🗺️ Roadmap

- [x] Dual-column editor with format selectors
- [x] CSV/TSV support
- [x] Performance comparison charts
- [x] Format comparison table
- [ ] Full YAML support (currently stub)
- [ ] TOML format support
- [ ] INI format support
- [ ] Markdown table support
- [ ] Plain text heuristic parsing
- [ ] Batch file processing
- [ ] API endpoint for programmatic access
- [ ] VS Code extension
- [ ] CLI tool

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=TheChieft/format-transformer-json-toon-sld&type=Date)](https://star-history.com/#TheChieft/format-transformer-json-toon-sld&Date)

---

Made with ❤️ by [TheChieft](https://github.com/TheChieft)
