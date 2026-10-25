import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Flex, Typography } from '@forgedevstack/bear';

const Tokens = () => (
  <Flex direction="column" gap={2}>
    <Typography variant="h5">bear_flutter</Typography>
    <Typography variant="body2">Button, TextField, Card, AppBar, List, Dialog, and BottomSheet share these Bear tokens.</Typography>
    <Flex gap={2}>
      <span style={{ width: 40, height: 40, borderRadius: 8, background: '#ec4899' }} />
      <Badge variant="primary">primary #EC4899</Badge>
    </Flex>
  </Flex>
);

const meta: Meta<typeof Tokens> = {
  title: 'Packages/Bear Flutter/Tokens',
  component: Tokens,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tokens>;

export const TokensStory: Story = { name: 'Tokens' };
