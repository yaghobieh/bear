import type { Meta, StoryObj } from '@storybook/react';
import { Slider, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Slider from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Slider anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    value: 42,
    defaultValue: 42,
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    marks: false,
    disabled: false,
    orientation: 'horizontal',
  },
  argTypes: {
    color: { control: 'color' },
    showValue: { control: 'boolean' },
    marks: { control: 'boolean' },
    disabled: { control: 'boolean' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    onChange: { action: 'onChange' },
    onChangeCommitted: { action: 'onChangeCommitted' },
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Basic: Story = {
  render: (args) => <Slider {...args} />,
};

export const WithValue: Story = {
  render: () => <Slider defaultValue={40} showValue marks min={0} max={100} step={10} ariaLabel="Progress" />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={5}>
        <Slider defaultValue={25} ariaLabel="First slider" />
        <Slider defaultValue={70} color="success" showValue ariaLabel="Reuse" />
      </Flex>
    </BearProvider>
  ),
};
