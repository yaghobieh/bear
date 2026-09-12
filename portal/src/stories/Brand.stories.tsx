import type { Meta, StoryObj } from '@storybook/react';
import { BearLogo, Flex, Typography } from '@forgedevstack/bear';
import { STORYBOOK_COLOR_GROUPS, STORYBOOK_LOGO_SIZE } from '@/pages/Storybook/Storybook.const';
import { StoryColorSwatch } from './helpers';

const meta: Meta<typeof BearLogo> = {
  title: 'Brand',
  component: BearLogo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Bear brand mark and color tokens. The Storybook chrome uses the black Bear theme plus this icon.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BearLogo>;

export const Logo: Story = {
  render: () => (
    <Flex direction="column" align="center" gap={3}>
      <BearLogo size={STORYBOOK_LOGO_SIZE} />
      <Typography variant="h4">Bear UI</Typography>
    </Flex>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap={6}>
      {STORYBOOK_COLOR_GROUPS.map((group) => (
        <Flex key={group.title} direction="column" gap={3}>
          <Typography variant="h5">{group.title}</Typography>
          <Flex wrap="wrap" gap={3}>
            {group.tokens.map((token) => (
              <StoryColorSwatch key={token.variable} token={token} />
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};
