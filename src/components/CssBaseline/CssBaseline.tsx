import { useEffect } from 'react';
import { resolveBearId, useBearId } from '@utils';
import type { CssBaselineProps } from './CssBaseline.types';
import { CSS_BASELINE_RULES, CSS_BASELINE_STYLE_ID } from './CssBaseline.const';

export const CssBaseline = ({ id, testId, ...props }: CssBaselineProps) => {
  const generatedId = useBearId('CssBaseline');
  const domId = resolveBearId(id, generatedId);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    let style = document.getElementById(CSS_BASELINE_STYLE_ID) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement('style');
      style.id = CSS_BASELINE_STYLE_ID;
      document.head.appendChild(style);
    }
    style.textContent = CSS_BASELINE_RULES;
  }, []);

  return (
    <style
      id={domId}
      data-testid={testId}
      {...props}
    />
  );
};
