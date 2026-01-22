import { defineStories } from '@forgedevstack/kiln';
import { OTPInput } from './OTPInput';

export default defineStories({
  title: 'OTPInput',
  component: OTPInput,
  description: 'One-time password input.',
  stories: [
    {
      name: 'Default',
      component: () => <OTPInput />,
      code: `<OTPInput onChange={(otp) => setOtp(otp)} />`,
      description: '6-digit OTP input',
    },
    {
      name: '4 Digits',
      component: () => <OTPInput length={4} />,
      code: `<OTPInput length={4} />`,
      description: '4-digit PIN',
    },
    {
      name: 'With Value',
      component: () => <OTPInput value="123456" />,
      code: `<OTPInput value="123456" />`,
      description: 'Pre-filled value',
    },
    {
      name: 'Disabled',
      component: () => <OTPInput disabled />,
      code: `<OTPInput disabled />`,
      description: 'Disabled state',
    },
  ],
});

