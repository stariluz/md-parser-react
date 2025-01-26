"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// Reglas para el parser Markdown
const rules = [
    // Encabezados
    [/#{6}\s?([^\n]+)/g, "<h6>$1</h6>"],
    [/#{5}\s?([^\n]+)/g, "<h5>$1</h5>"],
    [/#{4}\s?([^\n]+)/g, "<h4>$1</h4>"],
    [/#{3}\s?([^\n]+)/g, "<h3>$1</h3>"],
    [/#{2}\s?([^\n]+)/g, "<h2>$1</h2>"],
    [/#{1}\s?([^\n]+)/g, "<h1>$1</h1>"],
    // Negritas, cursivas y párrafos
    [/\*\*\s?([^\n]+)\*\*/g, "<b>$1</b>"],
    [/\*\s?([^\n]+)\*/g, "<i>$1</i>"],
    [/__([^_]+)__/g, "<b>$1</b>"],
    [/_([^_`]+)_/g, "<i>$1</i>"],
    [/([^\n]+\n?)/g, "<p>$1</p>"],
    // Enlaces
    [/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#2A5DB0;text-decoration: none;">$1</a>'],
    // Resaltados
    [/(`)(\s?[^\n,]+\s?)(`)/g, '<code style="background-color:grey;color:black;text-decoration: none;border-radius: 3px;padding:0 2px;">$2</code>'],
    // Listas
    [/^\+\s(.+)/gm, "<ul><li>$1</li></ul>"],
    [/^\*\s(.+)/gm, "<ul><li>$1</li></ul>"],
    // Imágenes
    [/!\[([^\]]+)\]\(([^)]+)\s"([^\")]+)"\)/g, '<img src="$2" alt="$1" title="$3" />'],
];
// Componente MarkdownParser
const MarkdownParser = ({ markdown }) => {
    const parseMarkdown = (text) => {
        let html = text;
        rules.forEach(([rule, template]) => {
            html = html.replace(rule, template);
        });
        return html;
    };
    return (<div dangerouslySetInnerHTML={{
            __html: parseMarkdown(markdown || ""),
        }}></div>);
};
exports.default = MarkdownParser;
