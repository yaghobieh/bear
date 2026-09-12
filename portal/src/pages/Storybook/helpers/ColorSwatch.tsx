import { Flex, Typography } from '@forgedevstack/bear';
import type { StoryColorToken } from '../Storybook.types';

export const ColorSwatch = (props: { token: StoryColorToken }) => {
  const { token } = props;
  return (
    <Flex direction="column" gap={1} className="Bear-Storybook__swatch">
      <div className="Bear-Storybook__chip" style={{ background: `var(${token.variable}, ${token.value})` }} />
      <Typography variant="caption">{token.name}</Typography>
      <Typography variant="caption" color="muted">
        {token.variable}
      </Typography>
    </Flex>
  );
};
