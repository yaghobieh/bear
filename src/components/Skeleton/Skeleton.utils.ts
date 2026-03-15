import { SKELETON_WAVE_STYLES } from './Skeleton.const';

const STYLE_ID = 'bear-skeleton-styles';

export const injectStyles = () => {
  if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = SKELETON_WAVE_STYLES;
    document.head.appendChild(style);
  }
};
