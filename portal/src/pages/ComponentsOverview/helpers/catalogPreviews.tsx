import type { ReactNode } from 'react';
import {
  ActivityItem,
  Alert,
  ApprovalCard,
  ArtifactCard,
  Avatar,
  Badge,
  Button,
  Card,
  CardSkeleton,
  Chart,
  ChatBubble,
  ChatError,
  Checkbox,
  Chip,
  CitationList,
  ContextMeter,
  Divider,
  EmptyState,
  Flex,
  FormSkeleton,
  Input,
  MessageActions,
  ModelSelect,
  Progress,
  PromptSuggestions,
  Rating,
  Skeleton,
  Spinner,
  StatCard,
  Switch,
  TableSkeleton,
  ToggleGroup,
  ToggleGroupItem,
  ToolCall,
  Typography,
} from '@forgedevstack/bear';
import { CATALOG_PREVIEW_CHART_HEIGHT } from '../ComponentsOverview.const';
import type { CatalogPreviewMap } from '../ComponentsOverview.types';

const CHART_PREVIEW_DATA = [
  { label: 'A', value: 28 },
  { label: 'B', value: 52 },
  { label: 'C', value: 36 },
  { label: 'D', value: 64 },
];

const PIE_PREVIEW_DATA = [
  { label: 'A', value: 40 },
  { label: 'B', value: 32 },
  { label: 'C', value: 28 },
];

export const CATALOG_PREVIEWS: CatalogPreviewMap = {
  '/components/button': <Button size="sm">Button</Button>,
  '/components/toggle-group': (
    <ToggleGroup type="single" defaultValue="a" size="sm">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
    </ToggleGroup>
  ),
  '/components/badge': <Badge variant="primary">New</Badge>,
  '/components/chip': <Chip size="sm" color="primary">Chip</Chip>,
  '/components/avatar': <Avatar initials="BE" size="md" />,
  '/components/alert': <Alert severity="info">Heads up</Alert>,
  '/components/input': <Input size="sm" placeholder="Search" />,
  '/components/checkbox': <Checkbox label="Remember" defaultChecked />,
  '/components/switch': <Switch defaultChecked />,
  '/components/rating': <Rating value={4} readOnly />,
  '/components/progress': <Progress value={64} />,
  '/components/spinner': <Spinner size="md" />,
  '/components/skeleton': <Skeleton width={160} height={16} />,
  '/components/card-skeleton': <CardSkeleton />,
  '/components/form-skeleton': <FormSkeleton fields={2} />,
  '/components/table-skeleton': <TableSkeleton rows={2} columns={3} />,
  '/components/divider': <Divider />,
  '/components/typography': <Typography variant="h6">Aa</Typography>,
  '/components/empty-state': <EmptyState preset="empty" title="Nothing here" />,
  '/components/card': (
    <Card variant="outlined" padding="sm">
      <Typography variant="body2">Card</Typography>
    </Card>
  ),
  '/components/stat-card': <StatCard title="Users" value="1.2k" />,
  '/components/activity-item': (
    <ActivityItem icon={<Badge variant="primary" size="sm">A</Badge>} title="Published" time="2m" />
  ),
  '/components/chart': (
    <Chart type="bar" data={CHART_PREVIEW_DATA} height={CATALOG_PREVIEW_CHART_HEIGHT} animated={false} showLabels={false} />
  ),
  '/components/bar-chart': (
    <Chart type="bar" data={CHART_PREVIEW_DATA} height={CATALOG_PREVIEW_CHART_HEIGHT} animated={false} showLabels={false} />
  ),
  '/components/line-chart': (
    <Chart type="line" data={CHART_PREVIEW_DATA} height={CATALOG_PREVIEW_CHART_HEIGHT} animated={false} showLabels={false} />
  ),
  '/components/pie-chart': (
    <Chart type="pie" data={PIE_PREVIEW_DATA} height={CATALOG_PREVIEW_CHART_HEIGHT} legendPosition="none" animated={false} />
  ),
  '/components/radar-chart': (
    <Chart type="radar" data={CHART_PREVIEW_DATA} height={CATALOG_PREVIEW_CHART_HEIGHT} animated={false} showLabels={false} />
  ),
  '/components/funnel-chart': (
    <Chart type="funnel" data={CHART_PREVIEW_DATA} height={CATALOG_PREVIEW_CHART_HEIGHT} animated={false} showLabels={false} />
  ),
  '/components/chat-bubble': (
    <ChatBubble message={{ id: 'p', content: 'Hello from Bear', sender: 'bot' }} showAvatar={false} showTimestamp={false} showStatus={false} />
  ),
  '/components/chat-error': <ChatError>Timed out</ChatError>,
  '/components/prompt-suggestions': (
    <PromptSuggestions suggestions={[{ id: 'a', label: 'Draft a plan' }, { id: 'b', label: 'Cite sources' }]} />
  ),
  '/components/message-actions': <MessageActions onCopy={() => undefined} />,
  '/components/tool-call': <ToolCall name="searchDocs" kind="search" status="success" />,
  '/components/citation-list': (
    <CitationList citations={[{ id: '1', title: 'Chat API' }]} />
  ),
  '/components/approval-card': (
    <ApprovalCard title="Apply edit" onApprove={() => undefined} onReject={() => undefined} />
  ),
  '/components/model-select': (
    <ModelSelect models={[{ id: 'small', label: 'Small' }, { id: 'large', label: 'Large' }]} value="small" />
  ),
  '/components/context-meter': <ContextMeter used={72} max={100} />,
  '/components/artifact-card': (
    <ArtifactCard title="composer.tsx" kind="code">
      <Typography variant="code">PromptComposer</Typography>
    </ArtifactCard>
  ),
};

export const renderCatalogFallback = (label: string): ReactNode => (
  <Flex align="center" justify="center" className="Bear-CatalogCard__fallback">
    <Typography variant="h6" color="muted">
      {label.slice(0, 2)}
    </Typography>
  </Flex>
);
