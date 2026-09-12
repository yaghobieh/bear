import { Chart, Flex } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import {
  CHART_AREA_CODE,
  CHART_BAR_CODE,
  CHART_BAR_HEIGHT,
  CHART_DONUT_CODE,
  CHART_FUNNEL_CODE,
  CHART_FUNNEL_DATA,
  CHART_FUNNEL_HEIGHT,
  CHART_LINE_CODE,
  CHART_LINE_HEIGHT,
  CHART_PIE_CODE,
  CHART_PIE_DATA,
  CHART_PIE_HEIGHT,
  CHART_PROPS,
  CHART_RADAR_CODE,
  CHART_RADAR_DATA,
  CHART_RADAR_HEIGHT,
  CHART_SAMPLE_DATA,
  CHART_STACKED_CODE,
  CHART_STACKED_DATA,
} from './ChartPage.const';

const ChartPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title="Chart" description={t.chartDesc} componentName="Chart">
      <ComponentPreview title={t.chartBar} description={t.chartBarDesc} code={CHART_BAR_CODE}>
        <Chart type="bar" data={CHART_SAMPLE_DATA} height={CHART_BAR_HEIGHT} showLabels showValues />
      </ComponentPreview>

      <ComponentPreview title={t.chartStacked} description={t.chartStackedDesc} code={CHART_STACKED_CODE}>
        <Chart type="stacked" data={CHART_STACKED_DATA} height={CHART_BAR_HEIGHT} showLabels showValues />
      </ComponentPreview>

      <ComponentPreview title={t.chartLine} description={t.chartLineDesc} code={CHART_LINE_CODE}>
        <Flex direction="column" gap={4} className="w-full">
          <Chart type="line" data={CHART_SAMPLE_DATA} height={CHART_LINE_HEIGHT} showLabels />
          <Chart type="line" data={CHART_SAMPLE_DATA} height={CHART_LINE_HEIGHT} showLabels stepped />
        </Flex>
      </ComponentPreview>

      <ComponentPreview title={t.chartArea} description={t.chartAreaDesc} code={CHART_AREA_CODE}>
        <Chart type="area" data={CHART_SAMPLE_DATA} height={CHART_BAR_HEIGHT} showLabels />
      </ComponentPreview>

      <ComponentPreview title={t.chartPie} description={t.chartPieDesc} code={CHART_PIE_CODE}>
        <Flex gap={6} wrap="wrap" justify="center">
          <Chart type="pie" data={CHART_PIE_DATA} height={CHART_PIE_HEIGHT} />
          <Chart type="pie" data={CHART_PIE_DATA} height={CHART_PIE_HEIGHT} pieView="half" />
          <Chart type="pie" data={CHART_PIE_DATA} height={CHART_PIE_HEIGHT} pieView="rose" explodeIndex={0} />
        </Flex>
      </ComponentPreview>

      <ComponentPreview title={t.chartDonut} description={t.chartDonutDesc} code={CHART_DONUT_CODE}>
        <Chart type="donut" data={CHART_PIE_DATA} height={CHART_PIE_HEIGHT} />
      </ComponentPreview>

      <ComponentPreview title={t.chartRadar} description={t.chartRadarDesc} code={CHART_RADAR_CODE}>
        <Chart type="radar" data={CHART_RADAR_DATA} height={CHART_RADAR_HEIGHT} showLabels />
      </ComponentPreview>

      <ComponentPreview title={t.chartFunnel} description={t.chartFunnelDesc} code={CHART_FUNNEL_CODE}>
        <Chart type="funnel" data={CHART_FUNNEL_DATA} height={CHART_FUNNEL_HEIGHT} />
      </ComponentPreview>

      <PropsTable title={t.props} rows={CHART_PROPS} />
    </DocPage>
  );
};

export default ChartPage;
