import type { Meta, StoryObj } from '@storybook/react';
import { DiffSquares, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof DiffSquares> = {
  title: 'Components/DiffSquares',
  component: DiffSquares,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'DiffSquares from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse DiffSquares anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    cubeCount: 0,
    gap: 2,
  },
  argTypes: {
    additionColor: { control: 'color' },
    deletionColor: { control: 'color' },
    onCubeClick: { action: 'onCubeClick' },
    onCubeHover: { action: 'onCubeHover' },
  },
};

export default meta;

type Story = StoryObj<typeof DiffSquares>;

export const Basic: Story = {
  render: (args) => <DiffSquares {...args} />,
};

export const MixedCubes: Story = {
  render: () => (
    <DiffSquares
      additionsText="+53"
      cubes={[
        { fill: 'full' },
        { fill: 'full' },
        { fill: 'half', secondaryColor: '#ea580c' },
        { fill: 'striped', color: '#38bdf8', secondaryColor: '#ea580c' },
        { gradient: 'linear-gradient(90deg,#38bdf8,#a855f7)' },
      ]}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <DiffSquares additionsText="+8" deletionsText="-2" cubeCount={5} />
        <DiffSquares additionsText="+3" deletionsText="-1" cubeCount={4} />
      </Flex>
    </BearProvider>
  ),
};
