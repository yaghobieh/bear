import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Accordion from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Accordion anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  subcomponents: { AccordionItem },
  args: {
    allowMultiple: true,
  },
  argTypes: {
    allowMultiple: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Basic: Story = {
  render: (args) => (
    <Accordion {...args} defaultOpen={['one']}>
      <AccordionItem id="one" title="What is Bear?">
        <Typography>A React UI kit with theme tokens.</Typography>
      </AccordionItem>
      <AccordionItem id="two" title="How do I reuse it?">
        <Typography>Wrap once in BearProvider, then use components anywhere below.</Typography>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion allowMultiple defaultOpen={['a']}>
      <AccordionItem id="a" title="First"><Typography>Open</Typography></AccordionItem>
      <AccordionItem id="b" title="Second"><Typography>Also open</Typography></AccordionItem>
    </Accordion>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Accordion defaultOpen={['one']}>
          <AccordionItem id="one" title="First accordion"><Typography>Content</Typography></AccordionItem>
        </Accordion>
        <Accordion defaultOpen={['two']}>
          <AccordionItem id="two" title="Reused accordion"><Typography>Same provider</Typography></AccordionItem>
        </Accordion>
      </Flex>
    </BearProvider>
  ),
};
