import {
  FORMAT_DOC_ACRONYM_BOUNDARY,
  FORMAT_DOC_CAMEL_BOUNDARY,
  FORMAT_DOC_CAMEL_SPACE,
  FORMAT_DOC_FIRST_CHAR_INDEX,
  FORMAT_DOC_PATH_SEPARATOR,
  FORMAT_DOC_REST_START_INDEX,
  FORMAT_DOC_SLUG_SEPARATOR,
  FORMAT_DOC_WORD_SEPARATOR,
} from './formatDocTitle.const';

const capitalizeWord = (word: string): string =>
  `${word.charAt(FORMAT_DOC_FIRST_CHAR_INDEX).toUpperCase()}${word.slice(FORMAT_DOC_REST_START_INDEX)}`;

const toTitleCase = (value: string): string =>
  value
    .split(FORMAT_DOC_WORD_SEPARATOR)
    .filter(Boolean)
    .map(capitalizeWord)
    .join(FORMAT_DOC_WORD_SEPARATOR);

export const formatDocTitle = (input: string): string => {
  const slug = input.includes(FORMAT_DOC_PATH_SEPARATOR)
    ? (input.split(FORMAT_DOC_PATH_SEPARATOR).pop() ?? input)
    : input;
  const spaced = slug.includes(FORMAT_DOC_SLUG_SEPARATOR)
    ? slug.split(FORMAT_DOC_SLUG_SEPARATOR).join(FORMAT_DOC_WORD_SEPARATOR)
    : slug
        .replace(FORMAT_DOC_CAMEL_BOUNDARY, FORMAT_DOC_CAMEL_SPACE)
        .replace(FORMAT_DOC_ACRONYM_BOUNDARY, FORMAT_DOC_CAMEL_SPACE);
  return toTitleCase(spaced);
};

export const formatDocTitleFromPath = (path: string): string => {
  const segment = path.split(FORMAT_DOC_PATH_SEPARATOR).filter(Boolean).pop() ?? path;
  return formatDocTitle(segment);
};
