export const escapseStringContentTelegram = (str: string = '') => {
  if (!str) return '';
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
