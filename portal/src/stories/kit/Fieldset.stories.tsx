import type { Meta, StoryObj } from '@storybook/react';
import { Fieldset, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Fieldset> = {
  title: 'Components/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Fieldset from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Fieldset anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Fieldset>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Fieldset {...args}>
      <Typography>Fieldset</Typography>
    </Fieldset>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Fieldset {...args}>
        <Typography>First</Typography>
      </Fieldset>
      <Fieldset>
        <Typography>Second</Typography>
      </Fieldset>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Fieldset anywhere below.</Typography>
        <Fieldset {...args}>
          <Typography>First use</Typography>
        </Fieldset>
        <Fieldset>
          <Typography>Second use</Typography>
        </Fieldset>
      </Flex>
    </BearProvider>
  ),
};
