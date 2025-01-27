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
    blockquote?: string = '';
}
// Define el tipo para una regla de Markdown
type MarkdownRule = [RegExp, (match: RegExpExecArray, classnames: HTMLTags) => string];

// Reglas para el parser Markdown
const rules: MarkdownRule[] = [
    // Encabezados
    [/#{6}\s?([^\n]+)/g, (match, classnames) => `<h6 class="${classnames.h6 || ''}">${match[1]}</h6>`],
    [/#{5}\s?([^\n]+)/g, (match, classnames) => `<h5 class="${classnames.h5 || ''}">${match[1]}</h5>`],
    [/#{4}\s?([^\n]+)/g, (match, classnames) => `<h4 class="${classnames.h4 || ''}">${match[1]}</h4>`],
    [/#{3}\s?([^\n]+)/g, (match, classnames) => `<h3 class="${classnames.h3 || ''}">${match[1]}</h3>`],
    [/#{2}\s?([^\n]+)/g, (match, classnames) => `<h2 class="${classnames.h2 || ''}">${match[1]}</h2>`],
    [/#{1}\s?([^\n]+)/g, (match, classnames) => `<h1 class="${classnames.h1 || ''}">${match[1]}</h1>`],

    // Código en línea
    [/`([^`]+)`/g, (match, classnames) => `<code class="${classnames.code || ''}">${match[1]}</code>`],

    // Negritas y cursivas 
    [/\*\*\s?([^\n]+)\*\*/g, (match, classnames) => `<b class="${classnames.b || ''}">${match[1]}</b>`],
    [/\*\s?([^\n]+)\*/g, (match, classnames) => `<i class="${classnames.i || ''}">${match[1]}</i>`],
    [/__([^_]+)__/g, (match, classnames) => `<b class="${classnames.b || ''}">${match[1]}</b>`],
    [/_([^_`]+)_/g, (match, classnames) => `<i class="${classnames.i || ''}">${match[1]}</i>`],

    // Citas
    // [/(^>\s?.*(\n>.*)*)/gm, (match, classnames) => {
    [/(^>(?:.*(?:\n|$))*)/gm, (match, classnames) => {
        const content = match[0]
            .split('\n')
            .map(line => line.replace(/^>\s?/, ''))
            .join('<br>');
        return `<blockquote class="${classnames.blockquote || ''}">${content}</blockquote>`;
    }],

    // Texto suelto -> <p>
    [/^([^\n]+)$/gm, (match, classnames) => `<p class="${classnames.p || ''}">${match[1]}</p>`],

    // Enlaces
    [/\[([^\]]+)\]\(([^)]+)\)/g, (match, classnames) => `<a class="${classnames.a || ''}" href="${match[2]}">${match[1]}</a>`],

    // Listas
    [/^\+\s(.+)/gm, (match, classnames) => `<ul class="${classnames.ul || ''}"><li class="${classnames.li || ''}">${match[1]}</li></ul>`],
    [/^\*\s(.+)/gm, (match, classnames) => `<ul class="${classnames.ul || ''}"><li class="${classnames.li || ''}">${match[1]}</li></ul>`],

    // Imágenes
    [/!\[([^\]]+)\]\(([^)]+)\s"([^")]+)"\)/g, (match, classnames) => `<img class="${classnames.img || ''}" src="${match[2]}" alt="${match[1]}" title="${match[3]}" />`],
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
            html = html.replace(rule, (...args) => {
                const match = args.slice(0, -2) as RegExpExecArray;
                return template(match, classnames);
            });
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
