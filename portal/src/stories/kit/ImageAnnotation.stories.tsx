import type { Meta, StoryObj } from '@storybook/react';
import { ImageAnnotation, Flex, Typography, BearProvider } from '@forgedevstack/bear';

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
};

export default meta;

type Story = StoryObj<typeof ImageAnnotation>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <ImageAnnotation {...args}>
      <Typography>ImageAnnotation</Typography>
    </ImageAnnotation>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <ImageAnnotation {...args}>
        <Typography>First</Typography>
      </ImageAnnotation>
      <ImageAnnotation>
        <Typography>Second</Typography>
      </ImageAnnotation>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ImageAnnotation anywhere below.</Typography>
        <ImageAnnotation {...args}>
          <Typography>First use</Typography>
        </ImageAnnotation>
        <ImageAnnotation>
          <Typography>Second use</Typography>
        </ImageAnnotation>
      </Flex>
    </BearProvider>
  ),
};
