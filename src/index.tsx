import React, { JSX } from "react";

// type TagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'code' | 'b' | 'i' | 'p' | 'a' | 'ul' | 'li' | 'img';

class HTMLTags {
    h1?: string = '';
    h2?: string = '';
    h3?: string = '';
    h4?: string = '';
    h5?: string = '';
    h6?: string = '';
    code?: string = '';
    b?: string = '';
    i?: string = '';
    p?: string = '';
    a?: string = '';
    ul?: string = '';
    li?: string = '';
    img?: string = '';
}
// Define el tipo para una regla de Markdown
type MarkdownRule = [RegExp, (classnames: HTMLTags) => string];

// Reglas para el parser Markdown
const rules: MarkdownRule[] = [
    // Encabezados
    [/#{6}\s?([^\n]+)/g, (classnames) => `<h6 class="${classnames.h6 || ''}">$1</h6>`],
    [/#{5}\s?([^\n]+)/g, (classnames) => `<h5 class="${classnames.h5 || ''}">$1</h5>`],
    [/#{4}\s?([^\n]+)/g, (classnames) => `<h4 class="${classnames.h4 || ''}">$1</h4>`],
    [/#{3}\s?([^\n]+)/g, (classnames) => `<h3 class="${classnames.h3 || ''}">$1</h3>`],
    [/#{2}\s?([^\n]+)/g, (classnames) => `<h2 class="${classnames.h2 || ''}">$1</h2>`],
    [/#{1}\s?([^\n]+)/g, (classnames) => `<h1 class="${classnames.h1 || ''}">$1</h1>`],

    // Código en línea
    [/`([^`]+)`/g, (classnames) => `<code class="${classnames.code || ''}">$1</code>`],

    // Negritas y cursivas
    [/\*\*\s?([^\n]+)\*\*/g, (classnames) => `<b class="${classnames.b || ''}">$1</b>`],
    [/\*\s?([^\n]+)\*/g, (classnames) => `<i class="${classnames.i || ''}">$1</i>`],
    [/__([^_]+)__/g, (classnames) => `<b class="${classnames.b || ''}">$1</b>`],
    [/_([^_`]+)_/g, (classnames) => `<i class="${classnames.i || ''}">$1</i>`],

    // Texto suelto -> <p>
    [/^([^\n]+)$/gm, (classnames) => `<p class="${classnames.p || ''}">$1</p>`],

    // Enlaces
    [/\[([^\]]+)\]\(([^)]+)\)/g, (classnames) => `<a class="${classnames.a || ''}" href="$2">$1</a>`],

    // Listas
    [/^\+\s(.+)/gm, (classnames) => `<ul class="${classnames.ul || ''}"><li class="${classnames.li || ''}">$1</li></ul>`],
    [/^\*\s(.+)/gm, (classnames) => `<ul class="${classnames.ul || ''}"><li class="${classnames.li || ''}">$1</li></ul>`],

    // Imágenes
    [/!\[([^\]]+)\]\(([^)]+)\s"([^")]+)"\)/g, (classnames) => `<img class="${classnames.img || ''}" src="$2" alt="$1" title="$3" />`],
];

// Define las props para el componente
interface MarkdownParserProps {
    markdown: string;
    classnames?: HTMLTags;
}
// Componente MarkdownParser
const MarkdownParser = ({ markdown, classnames = new HTMLTags() }: MarkdownParserProps): JSX.Element | null => {
    if (typeof markdown !== "string") {
        console.error("Expected markdown to be a string but got:", typeof markdown);
        return null;
    }
    const parseMarkdown = (text: string) => {
        // Asegúrate de que siempre sea una cadena válida
        if (typeof text !== 'string') return '';
        let html = text;
        rules.forEach(([rule, template]) => {
            html = html.replace(rule, (_, ...args) => template(classnames));
        });
        return html;
    };

    const html = parseMarkdown(markdown || "");
    console.log(html);


    return (
        <div dangerouslySetInnerHTML={{ __html: html, }}></div>
    );
};

export default MarkdownParser;
