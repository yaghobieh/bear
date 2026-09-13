import type { Meta, StoryObj } from '@storybook/react';
import { PageNav, BearProvider, Flex } from '@forgedevstack/bear';

const PREV = { label: 'Button', onClick: () => undefined };
const NEXT = { label: 'Input', onClick: () => undefined };

const meta: Meta<typeof PageNav> = {
  title: 'Components/PageNav',
  component: PageNav,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'PageNav from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse PageNav anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    variant: 'default',
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'outlined', 'filled'] },
  },
};

export default meta;

type Story = StoryObj<typeof PageNav>;

export const Basic: Story = {
  render: (args) => <PageNav {...args} />,
};

export const Outlined: Story = {
  render: () => (
    <PageNav
      variant="outlined"
      prev={{ label: 'Installation', onClick: () => undefined }}
      next={{ label: 'Theming', onClick: () => undefined }}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <PageNav prev={PREV} next={NEXT} />
        <PageNav
          variant="filled"
          prev={{ label: 'Getting Started', onClick: () => undefined }}
          next={{ label: 'Components', onClick: () => undefined }}
        />
      </Flex>
    </BearProvider>
  ),
};
