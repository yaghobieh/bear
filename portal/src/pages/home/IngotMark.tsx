import { useId } from 'react';

const LEFT = 'M336 300 L124 512 L336 724';
const RIGHT = 'M688 300 L900 512 L688 724';
const SLASH = { x1: 578, y1: 250, x2: 446, y2: 774 };
const DOTS = [
  { cx: 452, fill: '#D9A04E' },
  { cx: 512, fill: '#FFFFFF' },
  { cx: 572, fill: '#D9A04E' },
];

const shapes = () => (
  <>
    <path className="im-left" d={LEFT} />
    <path className="im-right" d={RIGHT} />
    <line className="im-slash" x1={SLASH.x1} y1={SLASH.y1} x2={SLASH.x2} y2={SLASH.y2} />
  </>
);

export const IngotMark = () => {
  const id = useId().replace(/:/g, '');

  return (
    <svg className="brand-mark brand-mark-loop" viewBox="0 0 1024 1024" width="84" height="84" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9CC0FF" />
          <stop offset=".5" stopColor="#3B7BF0" />
          <stop offset="1" stopColor="#2350B0" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="1" y2=".3">
          <stop offset="0" stopColor="#E3EEFF" stopOpacity="0" />
          <stop offset=".5" stopColor="#E3EEFF" stopOpacity=".95" />
          <stop offset="1" stopColor="#E3EEFF" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
        <mask id={`${id}-mask`}>
          <g fill="none" stroke="#fff" strokeWidth="92" strokeLinecap="round" strokeLinejoin="round">{shapes()}</g>
        </mask>
      </defs>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g className="im-glow" stroke="#3B6FD9" strokeWidth="116" filter={`url(#${id}-glow)`}>{shapes()}</g>
        <g stroke="#1B2647" strokeOpacity=".92" strokeWidth="110">{shapes()}</g>
        <g stroke={`url(#${id}-fill)`} strokeWidth="92">{shapes()}</g>
      </g>
      <g mask={`url(#${id}-mask)`}>
        <rect className="im-shine" x="-400" y="0" width="360" height="1024" fill={`url(#${id}-shine)`} />
      </g>
      <g className="im-dots" stroke="#1B2647" strokeWidth="10">
        {DOTS.map((dot) => (
          <circle key={dot.cx} cx={dot.cx} cy="512" r="30" fill={dot.fill} />
        ))}
      </g>
    </svg>
  );
};
