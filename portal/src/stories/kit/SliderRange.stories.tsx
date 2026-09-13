import type { Meta, StoryObj } from '@storybook/react';
import { SliderRange, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof SliderRange> = {
  title: 'Components/SliderRange',
  component: SliderRange,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'SliderRange from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse SliderRange anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
  },
  argTypes: {
    color: { control: 'color' },
    disabled: { control: 'boolean' },
    onChange: { action: 'onChange' },
    onChangeCommitted: { action: 'onChangeCommitted' },
  },
};

export default meta;

type Story = StoryObj<typeof SliderRange>;

export const Basic: Story = {
  render: (args) => <SliderRange {...args} />,
};

export const Success: Story = {
  render: () => <SliderRange defaultValue={[20, 70]} color="success" size="lg" />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={5}>
        <SliderRange defaultValue={[10, 40]} />
        <SliderRange defaultValue={[30, 80]} color="info" size="sm" />
      </Flex>
    </BearProvider>
  ),
};
