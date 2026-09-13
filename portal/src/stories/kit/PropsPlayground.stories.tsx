import type { Meta, StoryObj } from '@storybook/react';
import { PropsPlayground, Badge, Button, BearProvider, Flex } from '@forgedevstack/bear';
import type { PropsConfig } from '@forgedevstack/bear';

const meta: Meta<typeof PropsPlayground> = {
  title: 'Components/PropsPlayground',
  component: PropsPlayground,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'PropsPlayground from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse PropsPlayground anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    title: 'Title',
    defaultCollapsed: false,
    showReset: true,
  },
  argTypes: {
    defaultCollapsed: { control: 'boolean' },
    showReset: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof PropsPlayground>;

const BUTTON_CONFIG: PropsConfig = {
  variant: {
    type: 'select',
    default: 'primary',
    options: [
      { value: 'primary', label: 'Primary' },
      { value: 'secondary', label: 'Secondary' },
      { value: 'outline', label: 'Outline' },
      { value: 'ghost', label: 'Ghost' },
    ],
  },
  disabled: { type: 'boolean', default: false },
  label: { type: 'string', default: 'Click me', placeholder: 'Button text' },
};

const BADGE_CONFIG: PropsConfig = {
  variant: {
    type: 'select',
    default: 'primary',
    options: [
      { value: 'primary', label: 'Primary' },
      { value: 'success', label: 'Success' },
      { value: 'warning', label: 'Warning' },
    ],
  },
  label: { type: 'string', default: 'New' },
};

const badgeVariant = (value: string | number | boolean) => {
  if (value === 'primary' || value === 'success' || value === 'warning' || value === 'neutral') {
    return value;
  }
  return 'primary' as const;
};

export const Basic: Story = {
  render: (args) => <PropsPlayground {...args} />,
};

export const BadgePlayground: Story = {
  render: () => (
    <PropsPlayground
      title="Badge"
      config={BADGE_CONFIG}
      columns={2}
      render={(values) => (
        <Badge variant={badgeVariant(values.variant)}>{String(values.label)}</Badge>
      )}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <PropsPlayground
          config={BUTTON_CONFIG}
          render={(values) => (
            <Button variant={String(values.variant)}>{String(values.label)}</Button>
          )}
        />
        <PropsPlayground
          config={BADGE_CONFIG}
          render={(values) => (
            <Badge variant={badgeVariant(values.variant)}>{String(values.label)}</Badge>
          )}
        />
      </Flex>
    </BearProvider>
  ),
};
