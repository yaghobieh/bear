import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, Tab, TabList, TabPanel, Tabs, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Tab> = {
  title: 'Components/Tabs/Tab',
  component: Tab,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Tab from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    children: 'One',
    disabled: false,
    id: 'one',
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Tab>;

export const Basic: Story = {
  render: (args) => (
    <Tabs defaultTab="one">
      <TabList>
        <Tab {...args} />
        <Tab id="two">Two</Tab>
      </TabList>
      <TabPanel tabId="one"><Typography>Panel</Typography></TabPanel>
    </Tabs>
  ),
};
