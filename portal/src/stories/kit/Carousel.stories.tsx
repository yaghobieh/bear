import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Carousel from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Carousel anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    autoPlay: 0,
    showDots: true,
    showArrows: true,
    loop: false,
    slidesToShow: 1,
    gap: 2,
    pauseOnHover: false,
    transitionDuration: 300,
    thumbnailSize: 0,
    keyboard: false,
    draggable: false,
    showProgress: true,
    showCounter: true,
  },
  argTypes: {
    showDots: { control: 'boolean' },
    showArrows: { control: 'boolean' },
    loop: { control: 'boolean' },
    pauseOnHover: { control: 'boolean' },
    onSlideChange: { action: 'onSlideChange' },
    keyboard: { control: 'boolean' },
    draggable: { control: 'boolean' },
    showProgress: { control: 'boolean' },
    showCounter: { control: 'boolean' },
    activeColor: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

const SLIDES = (
  <>
    <Typography variant="h5">Slide one</Typography>
    <Typography variant="h5">Slide two</Typography>
    <Typography variant="h5">Slide three</Typography>
  </>
);

export const Basic: Story = {
  render: (args) => <Carousel {...args}>{SLIDES}</Carousel>,
};

export const Fade: Story = {
  render: () => (
    <Carousel transition="fade" showCounter showProgress>
      {SLIDES}
    </Carousel>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Carousel>{SLIDES}</Carousel>
        <Carousel transition="fade">{SLIDES}</Carousel>
      </Flex>
    </BearProvider>
  ),
};
