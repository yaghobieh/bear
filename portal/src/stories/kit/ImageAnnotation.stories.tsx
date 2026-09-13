import type { Meta, StoryObj } from '@storybook/react';
import { ImageAnnotation, BearProvider, Flex } from '@forgedevstack/bear';
import type { Annotation } from '@forgedevstack/bear';

const meta: Meta<typeof ImageAnnotation> = {
  title: 'Components/ImageAnnotation',
  component: ImageAnnotation,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ImageAnnotation from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ImageAnnotation anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    src: '/bear.svg',
    alt: 'Bear demo',
    editable: false,
    pinSize: 0,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    editable: { control: 'boolean' },
    pinColor: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof ImageAnnotation>;

const ANNOTATIONS: Annotation[] = [
  { id: 'demo-1', x: 30, y: 40, text: 'Mark' },
  { id: 'demo-2', x: 65, y: 70, text: 'Note' },
];

export const Basic: Story = {
  args: {
    src: '/bear.svg',
    annotations: ANNOTATIONS,
  },
  render: (args) => <ImageAnnotation {...args} />,
};

export const ReadOnly: Story = {
  render: () => (
    <ImageAnnotation
      src="/bear.svg"
      alt="Bear"
      annotations={[
        { id: 'c-1', x: 25, y: 35, text: 'Summit', color: '#3b82f6' },
        { id: 'c-2', x: 70, y: 65, text: 'Base camp', color: '#10b981' },
      ]}
      editable={false}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <ImageAnnotation src="/bear.svg" alt="Bear" annotations={ANNOTATIONS} />
        <ImageAnnotation src="/bear.svg" alt="Bear" annotations={ANNOTATIONS} editable={false} />
      </Flex>
    </BearProvider>
  ),
};
