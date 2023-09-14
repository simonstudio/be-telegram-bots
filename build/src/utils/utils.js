"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapseStringContentTelegram = void 0;
const escapseStringContentTelegram = (str = '') => {
    if (!str)
        return '';
    str = str
        .replace(/\./g, '\\.')
        .replace(/\,/g, '\\,')
        .replace(/\@/g, '\\@')
        .replace(/\$/g, '\\$')
        .replace(/\%/g, '\\%')
        .replace(/\^/g, '\\^')
        .replace(/\&/g, '\\&')
        .replace(/\_/g, '\\_')
        .replace(/\*/g, '\\*')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/\~/g, '\\~')
        .replace(/\`/g, '\\`')
        .replace(/\>/g, '\\>')
        .replace(/\#/g, '\\#')
        .replace(/\+/g, '\\+')
        .replace(/\=/g, '\\=')
        .replace(/\|/g, '\\|')
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/\!/g, '\\!')
        .replace(/\-/g, '\\-');
    return str;
};
exports.escapseStringContentTelegram = escapseStringContentTelegram;
