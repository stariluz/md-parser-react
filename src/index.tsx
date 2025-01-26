import React, { JSX } from "react";

// Define el tipo para una regla de Markdown
type MarkdownRule = [RegExp, string];

// Reglas para el parser Markdown
const rules: MarkdownRule[] = [
    // Encabezados
    [/#{6}\s?([^\n]+)/g, "<h6>$1</h6>"],
    [/#{5}\s?([^\n]+)/g, "<h5>$1</h5>"],
    [/#{4}\s?([^\n]+)/g, "<h4>$1</h4>"],
    [/#{3}\s?([^\n]+)/g, "<h3>$1</h3>"],
    [/#{2}\s?([^\n]+)/g, "<h2>$1</h2>"],
    [/#{1}\s?([^\n]+)/g, "<h1>$1</h1>"],
    
    // Código en línea
    [/`([^`]+)`/g, '<code style="background-color:grey;color:black;text-decoration: none;border-radius: 3px;padding:0 2px;">$1</code>'],

    // Negritas, cursivas y párrafos
    [/\*\*\s?([^\n]+)\*\*/g, "<b>$1</b>"],
    [/\*\s?([^\n]+)\*/g, "<i>$1</i>"],
    [/__([^_]+)__/g, "<b>$1</b>"],
    [/_([^_`]+)_/g, "<i>$1</i>"],
    
    // Texto suelto -> <p>
    [/^([^\n]+)$/gm, "<p>$1</p>"],
    

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

// Define las props para el componente
interface MarkdownParserProps {
    markdown: string;
}
// Componente MarkdownParser
const MarkdownParser = ({ markdown }: MarkdownParserProps): JSX.Element | null => {
    if (typeof markdown !== "string") {
        console.error("Expected markdown to be a string but got:", typeof markdown);
        return null;
    }
    const parseMarkdown = (text: string) => {
        // Asegúrate de que siempre sea una cadena válida
        console.log(text);
        if (typeof text !== 'string') return '';
        let html = text;
        rules.forEach(([rule, template]) => {
            html = html.replace(rule, template);
        });
        console.log(html);
        return html;
    };

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: parseMarkdown(markdown || ""),
            }}
        ></div>
    );
};

export default MarkdownParser;
