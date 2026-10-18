import { FC, useState } from 'react';
import { Chart, Flex, Select } from '@forgedevstack/bear';
import type { ChartDataPoint, ChartMotion, ChartType, PieView } from '@forgedevstack/bear';
import { CHART_MOTION_OPTIONS } from './ChartPage.const';

interface ChartLiveProps {
  id: string;
  type: ChartType;
  data: ChartDataPoint[];
  pieView?: PieView;
  height: number;
}

const scrollTarget = (id: string) => (node: HTMLDivElement | null) => {
  if (node && window.location.hash === `#${id}`) {
    node.scrollIntoView();
  }
};

export const ChartLive: FC<ChartLiveProps> = (props) => {
  const { id, type, data, pieView, height } = props;
  const [motion, setMotion] = useState<ChartMotion>('grow');
  const [showLabels, setShowLabels] = useState(true);
  const [showValues, setShowValues] = useState(type === 'bar' || type === 'stacked');

  return (
    <div id={id} ref={scrollTarget(id)} className="scroll-mt-28 w-full">
      <Flex direction="column" gap={3}>
        <Chart
          key={`${type}-${motion}-${String(showLabels)}-${String(showValues)}`}
          type={type}
          data={data}
          height={height}
          pieView={pieView}
          motion={motion}
          animated={motion !== 'none'}
          showLabels={showLabels}
          showValues={showValues}
        />
        <Flex wrap="wrap" gap={3}>
          <div className="min-w-[180px]">
            <Select
              label="Effect"
              options={CHART_MOTION_OPTIONS}
              value={motion}
              onChange={(value) => setMotion(value as ChartMotion)}
              fullWidth
            />
          </div>
          <div className="min-w-[180px]">
            <Select
              label="Labels"
              options={[
                { value: 'on', label: 'Labels on' },
                { value: 'off', label: 'Labels off' },
              ]}
              value={showLabels ? 'on' : 'off'}
              onChange={(value) => setShowLabels(value === 'on')}
              fullWidth
            />
          </div>
          <div className="min-w-[180px]">
            <Select
              label="Values"
              options={[
                { value: 'on', label: 'Values on' },
                { value: 'off', label: 'Values off' },
              ]}
              value={showValues ? 'on' : 'off'}
              onChange={(value) => setShowValues(value === 'on')}
              fullWidth
            />
          </div>
        </Flex>
      </Flex>
    </div>
  );
};
