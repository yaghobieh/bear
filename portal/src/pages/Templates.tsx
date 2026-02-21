import { FC, useState, useCallback } from 'react';
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Modal,
  Button,
  CopyButton,
  Kbd,
  BearIcons,
} from '@forgedevstack/bear';
import { TEMPLATES, getCliCommand, type TemplateItem } from '@/constants/templates.const';
import { CLI_NPM_URL } from '@/constants/navigation.const';

const TemplatesPage: FC = () => {
  const [selected, setSelected] = useState<TemplateItem | null>(null);

  const openModal = useCallback((template: TemplateItem) => setSelected(template), []);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Templates</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
        Start from a ForgeStack template. Click a card to get the CLI command or open the package.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        {TEMPLATES.map((template) => (
          <Card
            key={template.id}
            variant="outlined"
            padding="none"
            className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] focus:ring-2 focus:ring-pink-500"
            onClick={() => openModal(template)}
          >
            {/* Image / gradient: gradient always as fallback, image overlays when present and loads */}
            <div
              className="h-36 w-full flex items-center justify-center relative"
              style={{
                background: `linear-gradient(135deg, ${template.gradient[0]}, ${template.gradient[1]})`,
              }}
            >
              {template.image && (
                <img
                  src={template.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              )}
              {!template.image && (
                <BearIcons.SparklesIcon size="lg" color="rgba(255,255,255,0.9)" className="relative z-10" />
              )}
            </div>
            <CardHeader className="pb-1">
              <Typography variant="h5" className="font-semibold">
                {template.name}
              </Typography>
            </CardHeader>
            <CardBody className="pt-0">
              <Typography variant="body2" className="text-gray-500 dark:text-gray-400 line-clamp-2">
                {template.description}
              </Typography>
              <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                Click to get CLI command
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Template modal: CLI command + copy + link to npm */}
      <Modal
        isOpen={!!selected}
        onClose={closeModal}
        title={selected ? `${selected.name} template` : ''}
        size="md"
        footer={
          selected ? (
            <>
              <Button variant="ghost" onClick={closeModal}>
                Close
              </Button>
              <CopyButton
                value={getCliCommand(selected.templateId)}
                variant="outline"
                showText
                copyText="Copy command"
                copiedText="Copied!"
              />
              <a
                href={CLI_NPM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-colors"
              >
                Open create-forge on npm
              </a>
            </>
          ) : undefined
        }
      >
        {selected && (
          <div className="space-y-4">
            <Typography variant="body1" className="text-gray-600 dark:text-gray-400">
              {selected.description}
            </Typography>
            <div>
              <Typography variant="subtitle2" className="mb-2 text-gray-700 dark:text-gray-300">
                CLI command
              </Typography>
              <div className="flex items-center gap-2 flex-wrap rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-2 font-mono text-sm">
                <code className="break-all">{getCliCommand(selected.templateId)}</code>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Run in your terminal, or use <Kbd>Copy command</Kbd> below.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TemplatesPage;
