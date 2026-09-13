import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof AccordionItem> = {
  title: 'Components/Accordion/AccordionItem',
  component: AccordionItem,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'AccordionItem from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    title: 'What is Bear?',
    children: 'A React UI kit with theme tokens.',
    disabled: false,
    id: 'one',
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof AccordionItem>;

export const Basic: Story = {
  render: (args) => (
    <Accordion defaultOpen={['one']}>
      <AccordionItem {...args} />
    </Accordion>
  ),
};
