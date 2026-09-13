import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, CheckboxCard, CheckboxCardGroup, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof CheckboxCard> = {
  title: 'Components/CheckboxCard',
  component: CheckboxCard,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CheckboxCard from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse CheckboxCard anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  subcomponents: { CheckboxCardGroup },
  args: {
    checked: false,
    label: 'Label',
    disabled: false,
    variant: 'default',
    size: 'sm',
  },
  argTypes: {
    checked: { control: 'boolean' },
    onChange: { action: 'onChange' },
    disabled: { control: 'boolean' },
    variant: { control: 'select', options: ['default', 'outline', 'filled'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxCard>;

export const Basic: Story = {
  render: (args) => <CheckboxCard {...args} />,
};

export const WithDescription: Story = {
  render: () => (
    <CheckboxCard
      label="SMS"
      description="Text message alerts"
      value="sms"
      variant="outline"
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3} wrap="wrap">
        <CheckboxCard label="Email" description="Get notified by email" />
        <CheckboxCard label="Push" description="Mobile notifications" />
      </Flex>
    </BearProvider>
  ),
};
