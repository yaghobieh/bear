import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, ToggleGroup, ToggleGroupItem } from '@forgedevstack/bear';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component:
          'ToggleGroup and ToggleGroupItem from @forgedevstack/bear. Supports single selection (segmented controls) or multiple selection (toolbars) with WAI-ARIA roving tabindex navigation.',
      },
    },
  },
  args: {
    type: 'single',
    variant: 'subtle',
    size: 'md',
    orientation: 'horizontal',
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
    },
    variant: {
      control: 'radio',
      options: ['subtle', 'outline', 'filled'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Single: Story = {
  render: (args) => (
    <ToggleGroup {...args} defaultValue="center">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['bold', 'italic']} variant="outline">
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ToggleGroup orientation="vertical" type="single" defaultValue="daily">
      <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
      <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
      <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const WithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <ToggleGroup type="single" defaultValue="1" size="sm">
          <ToggleGroupItem value="1">Small 1</ToggleGroupItem>
          <ToggleGroupItem value="2">Small 2</ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup type="single" defaultValue="1" size="lg" variant="outline">
          <ToggleGroupItem value="1">Large 1</ToggleGroupItem>
          <ToggleGroupItem value="2">Large 2</ToggleGroupItem>
        </ToggleGroup>
      </Flex>
    </BearProvider>
  ),
};
