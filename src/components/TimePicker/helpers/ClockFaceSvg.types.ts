export interface ClockFaceSvgProps {
  values: readonly number[] | number[];
  isHourMode: boolean;
  format: '12h' | '24h';
  selectedHour: number;
  selectedMinute: number;
  onSelect: (v: number) => void;
  className?: string;
}
