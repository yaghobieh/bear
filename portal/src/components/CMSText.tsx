/**
 * CMSText - Renders translatable text from Ember CMS
 * 
 * Usage:
 * <CMSText namespace="portal" textKey="richEditor.description" />
 * <CMSText namespace="portal" textKey="button.label" fallback="Click me" />
 */

import { FC, ReactNode } from 'react';
import { useContent } from '@/services';

interface CMSTextProps {
  namespace: string;
  textKey: string;
  fallback?: string;
  language?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: ReactNode; // Fallback content
}

export const CMSText: FC<CMSTextProps> = ({
  namespace,
  textKey,
  fallback,
  language = 'en',
  as: Component = 'span',
  className,
  children,
}) => {
  const { t, isLoading } = useContent(namespace, language);

  if (isLoading) {
    // Return fallback or children while loading
    return (
      <Component className={className}>
        {fallback || children || textKey}
      </Component>
    );
  }

  const text = t(textKey, fallback || (typeof children === 'string' ? children : undefined));

  return (
    <Component className={className}>
      {text}
    </Component>
  );
};

/**
 * Hook for getting CMS text in components
 * 
 * Usage:
 * const { t } = useCMSText('portal');
 * <p>{t('richEditor.description', 'Default description')}</p>
 */
export { useContent as useCMSText } from '@/services';

export default CMSText;

