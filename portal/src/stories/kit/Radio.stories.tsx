import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Radio from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Radio anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  subcomponents: { RadioGroup },
  args: {
    label: 'Label',
    color: '#EA0A8E',
    disabled: false,
    error: false,
    helperText: 'Helper text',
  },
  argTypes: {
    color: { control: 'color' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Basic: Story = {
  render: (args) => <Radio {...args} />,
};

export const Group: Story = {
  render: () => (
    <RadioGroup name="plan" defaultValue="pro" label="Plan" direction="column" gap={2}>
      <Radio label="Starter" value="starter" />
      <Radio label="Pro" value="pro" />
      <Radio label="Team" value="team" />
    </RadioGroup>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Radio name="notify" label="First option" value="on" checked />
        <Radio name="notify" label="Reuse" value="off" />
      </Flex>
    </BearProvider>
  ),
};
