import { FC, ReactNode } from 'react';

export interface VisuallyHiddenProps {
  children: ReactNode;
}

export const VisuallyHidden: FC<VisuallyHiddenProps> = ({ children }) => (
  <span
    className="Bear-VisuallyHidden"
    style={{
      position: 'absolute',
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      borderWidth: 0,
    }}
  >
    {children}
  </span>
);

export default VisuallyHidden;
