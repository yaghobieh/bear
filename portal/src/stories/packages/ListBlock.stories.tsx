import type { Meta, StoryObj } from '@storybook/react';
import { ListBlock } from '@forgedevstack/bear-blocks';

const meta: Meta<typeof ListBlock> = {
  title: 'Packages/Bear Blocks/ListBlock',
  component: ListBlock,
  tags: ['autodocs'],
  args: {
    title: 'List',
    items: [
      { id: 'core', title: 'Core', detail: 'Free components' },
      { id: 'blocks', title: 'Blocks', detail: 'Finished screens' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof ListBlock>;

export const Free: Story = {};
