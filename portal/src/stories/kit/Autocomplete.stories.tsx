import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Autocomplete from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Autocomplete anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Autocomplete>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Autocomplete {...args}>
      <Typography>Autocomplete</Typography>
    </Autocomplete>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Autocomplete {...args}>
        <Typography>First</Typography>
      </Autocomplete>
      <Autocomplete>
        <Typography>Second</Typography>
      </Autocomplete>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Autocomplete anywhere below.</Typography>
        <Autocomplete {...args}>
          <Typography>First use</Typography>
        </Autocomplete>
        <Autocomplete>
          <Typography>Second use</Typography>
        </Autocomplete>
      </Flex>
    </BearProvider>
  ),
};
