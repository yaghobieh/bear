import type { Meta, StoryObj } from '@storybook/react';
import { Image, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Image from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Image anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Image>;

export const Basic: Story = {
  render: () => (
    <Image src="https://picsum.photos/seed/bear/320/180" alt="Bear demo" aspectRatio="16:9" rounded="md" />
  ),
};

export const Cover: Story = {
  render: () => (
    <Image src="https://picsum.photos/seed/forge/320/180" alt="Cover" objectFit="cover" aspectRatio="4:3" rounded="lg" />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3} wrap="wrap">
        <Image src="https://picsum.photos/seed/one/200/120" alt="First" rounded="md" />
        <Image src="https://picsum.photos/seed/two/200/120" alt="Reuse" rounded="md" />
      </Flex>
    </BearProvider>
  ),
};
