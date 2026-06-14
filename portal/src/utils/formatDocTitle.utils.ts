export const formatDocTitle = (input: string): string => {
  const slug = input.includes('/') ? (input.split('/').pop() ?? input) : input;
  if (slug.includes('-')) {
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return slug
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
};

export const formatDocTitleFromPath = (path: string): string => {
  const segment = path.split('/').filter(Boolean).pop() ?? path;
  return formatDocTitle(segment);
};
