import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleGroupItem } from '@forgedevstack/bear';

const meta: Meta<typeof ToggleGroupItem> = {
  title: 'Components/ToggleGroup/ToggleGroupItem',
  component: ToggleGroupItem,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ToggleGroupItem from @forgedevstack/bear. Used inside a ToggleGroup component.',
      },
    },
  },
  args: {
    value: 'item-1',
    disabled: false,
    children: 'Toggle Item',
  },
  argTypes: {
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleGroupItem>;

export const Basic: Story = {
  render: (args) => (
    <ToggleGroup type="single" defaultValue="item-1">
      <ToggleGroupItem {...args} />
      <ToggleGroupItem value="item-2">Second Item</ToggleGroupItem>
      <ToggleGroupItem value="item-3">Third Item</ToggleGroupItem>
    </ToggleGroup>
  ),
};
