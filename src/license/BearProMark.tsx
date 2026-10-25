import type { FC, ReactNode } from 'react';
import { BEAR_PRO_MARK_LABEL } from './license.const';

export interface BearProMarkProps {
  children: ReactNode;
  active: boolean;
  label?: string;
}

export const BearProMark: FC<BearProMarkProps> = ({ children, active, label = BEAR_PRO_MARK_LABEL }) => {
  if (!active) return children;

  return (
    <div className="Bear-ProMark" style={{ position: 'relative' }}>
      {children}
      <div
        className="Bear-ProMark__label"
        style={{
          position: 'absolute',
          right: 12,
          bottom: 12,
          padding: '4px 8px',
          borderRadius: 6,
          background: 'rgba(236, 72, 153, 0.92)',
          color: '#fff',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.02em',
          pointerEvents: 'none',
        }}
      >
        {label}
      </div>
    </div>
  );
};
