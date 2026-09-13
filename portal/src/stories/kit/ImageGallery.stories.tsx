import type { Meta, StoryObj } from '@storybook/react';
import { ImageGallery, BearProvider, Flex } from '@forgedevstack/bear';
import type { GalleryImage } from '@forgedevstack/bear';

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
  args: {
    gap: 2,
    rounded: false,
    enableLightbox: false,
    thumbnailHeight: 240,
  },
  argTypes: {
    rounded: { control: 'boolean' },
    enableLightbox: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ImageGallery>;

const IMAGES: GalleryImage[] = [
  { src: '/bear.svg', alt: 'Bear one', caption: 'Mark' },
  { src: '/bear.svg', alt: 'Bear two', caption: 'Track' },
  { src: '/bear.svg', alt: 'Bear three', caption: 'Note' },
];

export const Basic: Story = {
  args: {
    images: IMAGES,
  },
  render: (args) => <ImageGallery {...args} />,
};

export const ThreeColumns: Story = {
  render: () => (
    <ImageGallery images={IMAGES} columns={3} gap={8} rounded enableLightbox={false} />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <ImageGallery images={IMAGES} />
        <ImageGallery images={IMAGES} columns={2} rounded />
      </Flex>
    </BearProvider>
  ),
};
