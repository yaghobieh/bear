import { FIGMA_KIT_URL, GITHUB_COMPONENT_TREE } from './marketing.const';
import { GITHUB_URL } from './navigation.const';

export const buildComponentGithubUrl = (componentName: string): string => {
  return `${GITHUB_COMPONENT_TREE}/${componentName}`;
};

export const resolveDocGithubUrl = (componentName?: string, githubHref?: string): string => {
  if (githubHref) {
    return githubHref;
  }
  if (componentName) {
    return buildComponentGithubUrl(componentName);
  }
  return GITHUB_URL;
};

export const resolveDocFigmaUrl = (figmaHref?: string): string => {
  return figmaHref ?? FIGMA_KIT_URL;
};

export const isExternalHref = (href: string): boolean => {
  return href.startsWith('http://') || href.startsWith('https://');
};
