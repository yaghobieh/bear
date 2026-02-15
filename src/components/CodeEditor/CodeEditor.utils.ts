import type { CodeEditorLanguage, SyntaxToken, TokenType } from './CodeEditor.types';
import { LANGUAGE_KEYWORDS, BUILTIN_FUNCTIONS } from './CodeEditor.const';

/**
 * Simple tokenizer for syntax highlighting
 * Produces tokens for a single line of code
 */
export const tokenizeLine = (line: string, language: CodeEditorLanguage): SyntaxToken[] => {
  if (language === 'plaintext' || language === 'markdown') {
    return [{ type: 'default', value: line }];
  }

  const tokens: SyntaxToken[] = [];
  const keywords = LANGUAGE_KEYWORDS[language] ?? [];
  let i = 0;

  const pushToken = (type: TokenType, value: string) => {
    if (value) tokens.push({ type, value });
  };

  while (i < line.length) {
    // Comments
    if (line[i] === '/' && line[i + 1] === '/') {
      pushToken('comment', line.slice(i));
      break;
    }
    if (line[i] === '/' && line[i + 1] === '*') {
      const end = line.indexOf('*/', i + 2);
      const val = end === -1 ? line.slice(i) : line.slice(i, end + 2);
      pushToken('comment', val);
      i += val.length;
      continue;
    }
    if (line[i] === '#' && (language === 'python' || language === 'shell' || language === 'yaml')) {
      pushToken('comment', line.slice(i));
      break;
    }

    // Strings
    if (line[i] === '"' || line[i] === "'" || line[i] === '`') {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === '\\') j++;
        j++;
      }
      pushToken('string', line.slice(i, j + 1));
      i = j + 1;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(line[i]) && (i === 0 || /[^a-zA-Z_$]/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[0-9.xXa-fA-F_eEn]/.test(line[j])) j++;
      pushToken('number', line.slice(i, j));
      i = j;
      continue;
    }

    // Words (identifiers / keywords)
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++;
      const word = line.slice(i, j);

      if (word === 'true' || word === 'false') {
        pushToken('boolean', word);
      } else if (word === 'null' || word === 'undefined' || word === 'None' || word === 'NaN') {
        pushToken('null', word);
      } else if (keywords.includes(word)) {
        pushToken('keyword', word);
      } else if (BUILTIN_FUNCTIONS.includes(word)) {
        pushToken('builtin', word);
      } else if (j < line.length && line[j] === '(') {
        pushToken('function', word);
      } else if (i > 0 && line[i - 1] === '.') {
        pushToken('property', word);
      } else {
        pushToken('variable', word);
      }
      i = j;
      continue;
    }

    // HTML tags
    if (line[i] === '<' && (language === 'html' || language === 'jsx' || language === 'tsx' || language === 'xml')) {
      if (line[i + 1] === '/') {
        pushToken('tag', '</');
        i += 2;
      } else {
        pushToken('tag', '<');
        i += 1;
      }
      continue;
    }
    if (line[i] === '>' && (language === 'html' || language === 'jsx' || language === 'tsx' || language === 'xml')) {
      pushToken('tag', '>');
      i += 1;
      continue;
    }

    // Operators
    if (/[+\-*/%=!<>&|^~?:]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[+\-*/%=!<>&|^~?:]/.test(line[j])) j++;
      pushToken('operator', line.slice(i, j));
      i = j;
      continue;
    }

    // Punctuation
    if (/[(){}[\],;.]/.test(line[i])) {
      pushToken('punctuation', line[i]);
      i++;
      continue;
    }

    // Whitespace & others
    if (/\s/.test(line[i])) {
      let j = i;
      while (j < line.length && /\s/.test(line[j])) j++;
      pushToken('default', line.slice(i, j));
      i = j;
      continue;
    }

    // Unknown
    pushToken('default', line[i]);
    i++;
  }

  return tokens;
};
