import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ModelSelect, BearProvider, Flex } from '@forgedevstack/bear';
import type { ModelSelectOption } from '@forgedevstack/bear';

const meta: Meta<typeof ModelSelect> = {
  title: 'Components/ModelSelect',
  component: ModelSelect,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ModelSelect from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ModelSelect anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    label: 'Label',
    placeholder: 'Type here',
    disabled: false,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ModelSelect>;

const MODELS: ModelSelectOption[] = [
  { id: 'forge-small', label: 'Forge Small' },
  { id: 'forge-large', label: 'Forge Large' },
];

const EXTRA_MODELS: ModelSelectOption[] = [
  { id: 'forge-small', label: 'Forge Small' },
  { id: 'forge-large', label: 'Forge Large' },
  { id: 'forge-vision', label: 'Forge Vision', disabled: true },
];

export const Basic: Story = {
  args: {
    models: MODELS,
  },
  render: (args) => <ModelSelect {...args} />,
};

export const Controlled: Story = {
  render: () => {
    const [model, setModel] = useState(MODELS[0].id);
    return (
      <ModelSelect
        models={EXTRA_MODELS}
        value={model}
        onChange={setModel}
        label="Model"
        placeholder="Pick a model"
      />
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <ModelSelect models={MODELS} />
        <ModelSelect models={EXTRA_MODELS} placeholder="Reuse below the same provider" />
      </Flex>
    </BearProvider>
  ),
};
