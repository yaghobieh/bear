import { defineStories } from '@forgedevstack/kiln';
import { CopyButton } from './CopyButton';

export default defineStories({
  title: 'CopyButton',
  component: CopyButton,
  description: 'Copy to clipboard with feedback.',
  stories: [
    {
      name: 'Default',
      component: () => <CopyButton textToCopy="npm install @forgedevstack/bear" />,
      code: `<CopyButton textToCopy="npm install @forgedevstack/bear" />`,
      description: 'Icon button',
    },
    {
      name: 'With Text',
      component: () => (
        <CopyButton textToCopy="Hello World">
          Copy Text
        </CopyButton>
      ),
      code: `<CopyButton textToCopy="...">Copy Text</CopyButton>`,
      description: 'Text button',
    },
    {
      name: 'Custom Success',
      component: () => (
        <CopyButton textToCopy="Copied!" successText="Done!" timeout={3000}>
          Copy
        </CopyButton>
      ),
      code: `<CopyButton successText="Done!" timeout={3000}>...</CopyButton>`,
      description: 'Custom feedback',
    },
  ],
});

