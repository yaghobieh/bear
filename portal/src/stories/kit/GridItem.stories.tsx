import type { Meta, StoryObj } from '@storybook/react';
import { Grid, GridItem, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof GridItem> = {
  title: 'Components/Grid/GridItem',
  component: GridItem,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'GridItem from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    colSpan: 2,
    rowSpan: 1,
    children: 'Cell',
  },
  argTypes: {
    colSpan: { control: 'select', options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'full'] },
    rowSpan: { control: 'select', options: [1, 2, 3, 4, 5, 6] },
  },
};

export default meta;

type Story = StoryObj<typeof GridItem>;

export const Basic: Story = {
  render: (args) => (
    <Grid cols={3} gap={2}>
      <GridItem {...args}>
        <Typography>{args.children ?? 'Cell'}</Typography>
      </GridItem>
      <GridItem>
        <Typography>Next</Typography>
      </GridItem>
    </Grid>
  ),
};
