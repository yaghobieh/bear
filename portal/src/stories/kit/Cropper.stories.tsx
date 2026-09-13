import type { Meta, StoryObj } from '@storybook/react';
import { Cropper, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Cropper> = {
  title: 'Components/Cropper',
  component: Cropper,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Cropper from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Cropper anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    src: '/bear.svg',
    aspectRatio: 0,
    zoom: 0,
    minZoom: 0,
    maxZoom: 100,
    rotation: 0,
    showZoomSlider: true,
    showRotationSlider: true,
    showGrid: true,
    gridOpacity: 0,
    borderWidth: 320,
  },
  argTypes: {
    onCropChange: { action: 'onCropChange' },
    onCropComplete: { action: 'onCropComplete' },
    onZoomChange: { action: 'onZoomChange' },
    onRotationChange: { action: 'onRotationChange' },
    showZoomSlider: { control: 'boolean' },
    showRotationSlider: { control: 'boolean' },
    showGrid: { control: 'boolean' },
    overlayColor: { control: 'color' },
    borderColor: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof Cropper>;

export const Basic: Story = {
  render: (args) => <Cropper {...args} />,
};

export const CircleCrop: Story = {
  render: () => (
    <Cropper
      src="/bear.svg"
      shape="circle"
      aspectRatio="1:1"
      showZoomSlider
      height={280}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Cropper src="/bear.svg" height={240} />
        <Cropper src="/bear.svg" shape="circle" aspectRatio="1:1" height={240} />
      </Flex>
    </BearProvider>
  ),
};
