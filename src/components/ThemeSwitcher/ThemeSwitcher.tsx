import { COMPONENT_NAME_THEME_SWITCHER } from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import { useBear } from '../../context/BearProvider';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { THEME_SWITCHER_DEFAULT_TRANSLATIONS, THEME_SWITCHER_OPTIONS } from './ThemeSwitcher.const';
import type { ThemeSwitcherProps } from './ThemeSwitcher.types';

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const { id, testId, value, onChange, translations, className } = props;
  const generatedId = useBearId(COMPONENT_NAME_THEME_SWITCHER);
  const domId = resolveBearId(id, generatedId);
  const { colorScheme, setColorScheme } = useBear();
  const selected = value ?? colorScheme;
  const labels = { ...THEME_SWITCHER_DEFAULT_TRANSLATIONS, ...translations };

  const handleChange = (scheme: typeof selected) => {
    if (value === undefined) {
      setColorScheme(scheme);
    }
    onChange?.(scheme);
  };

  return (
    <Flex
      id={domId}
      testId={testId}
      className={cn('Bear-ThemeSwitcher', className)}
      align="center"
      gap={1}
    >
      {THEME_SWITCHER_OPTIONS.map((option) => (
        <Button
          key={option.value}
          type="button"
          size="sm"
          variant={selected === option.value ? 'primary' : 'ghost'}
          onClick={() => handleChange(option.value)}
        >
          {labels[option.labelKey]}
        </Button>
      ))}
    </Flex>
  );
};
