# md-parser-react

A simple React Markdown parser.

## Installation

```bash
npm install md-parser-react
```

## Usage
```tsx
import MarkdownParser from "markdown-parser-react";

const markdownText = `
# Hello World
- **Bold**
- _Italic_
`;

const App = () => <MarkdownParser markdown={markdownText} />;
export default App;
```