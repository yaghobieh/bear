import type { Preview } from '@storybook/react';
import { BearProvider } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';
import '../src/styles/globals.css';
import { bearDarkTheme, bearLightTheme } from './theme';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'sun',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'bear-light',
      values: [
        { name: 'bear-light', value: '#ffffff' },
        { name: 'bear-black', value: '#09090b' },
        { name: 'bear-pink', value: '#fdf2f8' },
      ],
    },
    docs: {
      toc: true,
      theme: bearLightTheme,
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story, context) => {
      const mode = context.globals.theme === 'dark' ? 'dark' : 'light';
      const docsTheme = mode === 'dark' ? bearDarkTheme : bearLightTheme;
      context.parameters.docs = {
        ...(context.parameters.docs ?? {}),
        theme: docsTheme,
      };
      context.parameters.backgrounds = {
        ...(context.parameters.backgrounds ?? {}),
        default: mode === 'dark' ? 'bear-black' : 'bear-light',
      };
      return (
        <BearProvider defaultMode={mode} key={mode}>
          <div className={mode === 'dark' ? 'dark' : undefined}>
            <Story />
          </div>
        </BearProvider>
      );
    },
  ],
};

export default preview;
