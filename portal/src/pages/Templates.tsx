import { FC } from 'react';
import { Typography, Card, Skeleton, CardHeader, CardBody } from '@forgedevstack/bear';

const TemplatesPage: FC = () => (
  <div className="fade-in">
    <div className="flex items-center gap-3 mb-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Templates</h1>
    </div>
    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
      Pre-built templates for dashboards, forms, and layouts. Built with Bear UI components.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
      {[1, 2, 3].map((i) => (
        <Card key={i} variant="outlined" padding="lg" className="opacity-60 pointer-events-none">
          <CardHeader>
            <Skeleton width="60%" height={24} />
          </CardHeader>
          <CardBody className="space-y-3">
            <Skeleton width="100%" height={16} />
            <Skeleton width="90%" height={16} />
            <Skeleton width="70%" height={16} />
            <div className="pt-4 flex gap-2">
              <Skeleton width={80} height={36} borderRadius={8} />
              <Skeleton width={80} height={36} borderRadius={8} />
            </div>
          </CardBody>
        </Card>
      ))}
    </div>

    <Card variant="outlined" padding="lg" className="max-w-xl mt-8 opacity-60 pointer-events-none">
      <div className="text-center py-8">
        <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
          Dashboard layouts, form templates, and auth flows will be available soon.
        </Typography>
      </div>
    </Card>
  </div>
);

export default TemplatesPage;
