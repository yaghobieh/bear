import type { Meta, StoryObj } from '@storybook/react';
import { PhoneInput, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof PhoneInput> = {
  title: 'Components/PhoneInput',
  component: PhoneInput,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'PhoneInput from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse PhoneInput anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    placeholder: 'Type here',
    label: 'Label',
    helperText: 'Helper text',
    disabled: false,
    required: false,
    searchable: false,
    showFlags: true,
    showDialCode: true,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    onlyCountries: { action: 'onlyCountries' },
    searchable: { control: 'boolean' },
    showFlags: { control: 'boolean' },
    showDialCode: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof PhoneInput>;

export const Basic: Story = {
  render: (args) => <PhoneInput {...args} />,
};

export const PreferredCountries: Story = {
  render: () => (
    <PhoneInput
      label="Mobile"
      placeholder="Enter a number"
      defaultCountry="GB"
      preferredCountries={['GB', 'US', 'DE']}
      searchable
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <PhoneInput label="Work" placeholder="(555) 010-0100" defaultCountry="US" />
        <PhoneInput label="Reuse" placeholder="Mobile" size="sm" variant="outline" />
      </Flex>
    </BearProvider>
  ),
};
