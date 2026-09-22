import { useContext } from 'react';
import { ToggleGroupContext } from '../ToggleGroup.context';

export const useToggleGroupContext = () => {
  return useContext(ToggleGroupContext);
};
