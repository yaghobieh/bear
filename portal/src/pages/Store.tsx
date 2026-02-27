import { FC, useState, useCallback } from 'react';
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  CopyButton,
  Kbd,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  BearIcons,
} from '@forgedevstack/bear';
import { STORE_CATEGORIES, getCliCommand, type TemplateItem } from '@/constants/templates.const';
import { CLI_NPM_URL } from '@/constants/navigation.const';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';

const Store: FC = () => {
  const [selected, setSelected] = useState<TemplateItem | null>(null);
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];

  const openModal = useCallback((template: TemplateItem) => setSelected(template), []);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <div className="fade-in">
      {/* Hero */}
      <div className="text-center py-16 mb-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800">
        <Typography variant="h2" className="mb-4 font-bold text-gray-900 dark:text-white">
          {t.storeTitle}
        </Typography>
        <Typography variant="body1" className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t.storeSubtitle}
        </Typography>
        <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 dark:bg-black px-4 py-2 text-green-400 font-mono text-sm">
          <code>npx create-forge my-app --template react</code>
          <CopyButton
            value="npx create-forge my-app --template react"
            variant="ghost"
            size="sm"
            showText={false}
          />
        </div>
        <Button variant="outline" className="mt-6">
          {t.browseItems}
        </Button>
      </div>

      {/* Categories via Tabs */}
      <Tabs defaultTab="starter-kits" className="mb-8">
        <TabList className="mb-6">
          {STORE_CATEGORIES.map((cat) => (
            <Tab key={cat.id} id={cat.id} disabled={cat.items.length === 0}>
              {cat.label}
            </Tab>
          ))}
        </TabList>

        {STORE_CATEGORIES.map((cat) => (
          <TabPanel key={cat.id} tabId={cat.id}>
            {cat.items.length === 0 ? (
              <Typography variant="body2" className="text-gray-500 dark:text-gray-400 py-8">
                No items in this category yet.
              </Typography>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl">
                {cat.items.map((template) => (
                  <Card
                    key={template.id}
                    variant="outlined"
                    padding="none"
                    className="overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-0.5 focus:ring-2 focus:ring-pink-500"
                    onClick={() => openModal(template)}
                  >
                    <div
                      className="h-40 w-full flex items-center justify-center relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${template.gradient[0]}, ${template.gradient[1]})`,
                      }}
                    >
                      {(template.screenshot || template.image) && (
                        <img
                          src={template.screenshot ?? template.image}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover opacity-90"
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
                      <p className="mt-3 text-sm font-medium text-bear-600 dark:text-bear-400">
                        {t.free}
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        {template.storeUrl && (
                          <a
                            href={template.storeUrl}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-bear-600 hover:bg-bear-700 text-white text-xs font-medium transition-colors"
                          >
                            {t.openStore}
                          </a>
                        )}
                        {template.previewUrl && (
                          <a
                            href={template.previewUrl}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium transition-colors"
                          >
                            {t.livePreview}
                          </a>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          </TabPanel>
        ))}
      </Tabs>

      {/* CLI Modal */}
      <Modal
        isOpen={!!selected}
        onClose={closeModal}
        title={selected ? `${selected.name} template` : ''}
        size="md"
        footer={
          selected ? (
            <>
              <Button variant="ghost" onClick={closeModal}>
                {t.close}
              </Button>
              <CopyButton
                value={getCliCommand(selected.templateId)}
                variant="outline"
                showText
                copyText={t.copy}
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
                {t.cliCommand}
              </Typography>
              <div className="flex items-center gap-2 flex-wrap rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-2 font-mono text-sm">
                <code className="break-all">{getCliCommand(selected.templateId)}</code>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {t.runInTerminal} <Kbd>Copy</Kbd>.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Store;
