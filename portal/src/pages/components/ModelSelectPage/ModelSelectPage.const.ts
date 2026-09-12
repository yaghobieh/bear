import type { PropRow } from '@/components/PropsTable';
import type { ModelSelectOption } from '@forgedevstack/bear';

export const MODEL_SELECT_OPTIONS: ModelSelectOption[] = [
  { id: 'forge-small', label: 'Forge Small' },
  { id: 'forge-large', label: 'Forge Large' },
];

export const MODEL_SELECT_PROPS: PropRow[] = [
  { name: 'models', type: 'ModelSelectOption[]', description: 'Available models' },
  { name: 'value', type: 'string', description: 'Selected model id' },
  { name: 'onChange', type: '(id: string) => void', description: 'Selection change' },
];

export const MODEL_SELECT_CODE = `import { useState } from 'react';
import { ModelSelect } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

const models = [
  { id: 'forge-small', label: 'Forge Small' },
  { id: 'forge-large', label: 'Forge Large' },
];

export default function App() {
  const [model, setModel] = useState(models[0].id);
  return <ModelSelect models={models} value={model} onChange={setModel} />;
}
`;
