import { FC } from 'react';
import type { PageHeaderProps } from './PageHeader.types';
import {
  PAGE_HEADER_ACTIONS_CLASSES,
  PAGE_HEADER_BASE_CLASSES,
  PAGE_HEADER_DESCRIPTION_CLASSES,
  PAGE_HEADER_ROOT_CLASS,
  PAGE_HEADER_ROW_CLASSES,
  PAGE_HEADER_TITLE_CLASSES,
} from './PageHeader.const';
import { Typography } from '../Typography';
import { Flex } from '../Flex';
import { cn, resolveBearId, useBearId } from '@utils';

export const PageHeader: FC<PageHeaderProps> = (props) => {
  const {
    id,
    testId,
    title,
    description,
    breadcrumbs,
    actions,
    className,
  } = props;

  const generatedId = useBearId('PageHeader');
  const domId = resolveBearId(id, generatedId);

  return (
    <header
      id={domId}
      data-testid={testId}
      className={cn(PAGE_HEADER_ROOT_CLASS, PAGE_HEADER_BASE_CLASSES, className)}
    >
      {breadcrumbs}
      <Flex className={cn(`${PAGE_HEADER_ROOT_CLASS}__row`, PAGE_HEADER_ROW_CLASSES)}>
        <Flex direction="column" gap={1} className={`${PAGE_HEADER_ROOT_CLASS}__copy`}>
          <Typography
            component="h1"
            className={cn(`${PAGE_HEADER_ROOT_CLASS}__title`, PAGE_HEADER_TITLE_CLASSES)}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              component="p"
              className={cn(
                `${PAGE_HEADER_ROOT_CLASS}__description`,
                PAGE_HEADER_DESCRIPTION_CLASSES
              )}
            >
              {description}
            </Typography>
          )}
        </Flex>
        {actions && (
          <div className={cn(`${PAGE_HEADER_ROOT_CLASS}__actions`, PAGE_HEADER_ACTIONS_CLASSES)}>
            {actions}
          </div>
        )}
      </Flex>
    </header>
  );
};
