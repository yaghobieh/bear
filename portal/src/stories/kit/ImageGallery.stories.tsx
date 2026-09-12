import type { Meta, StoryObj } from '@storybook/react';
import { ImageGallery, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ImageGallery> = {
  title: 'Components/ImageGallery',
  component: ImageGallery,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ImageGallery from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ImageGallery anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ImageGallery>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <ImageGallery {...args}>
      <Typography>ImageGallery</Typography>
    </ImageGallery>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <ImageGallery {...args}>
        <Typography>First</Typography>
      </ImageGallery>
      <ImageGallery>
        <Typography>Second</Typography>
      </ImageGallery>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ImageGallery anywhere below.</Typography>
        <ImageGallery {...args}>
          <Typography>First use</Typography>
        </ImageGallery>
        <ImageGallery>
          <Typography>Second use</Typography>
        </ImageGallery>
      </Flex>
    </BearProvider>
  ),
};
