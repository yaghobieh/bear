import { useState } from 'react';
import { defineStories } from '@forgedevstack/kiln';
import { Modal } from './Modal';
import { Button } from '../Button';

const ModalDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Modal Title"
      >
        <p>This is the modal content. You can put anything here!</p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsOpen(false)}>Confirm</Button>
        </div>
      </Modal>
    </>
  );
};

const ModalSizes = () => {
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full' | null>(null);
  return (
    <>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button size="sm" onClick={() => setSize('sm')}>Small</Button>
        <Button size="sm" onClick={() => setSize('md')}>Medium</Button>
        <Button size="sm" onClick={() => setSize('lg')}>Large</Button>
        <Button size="sm" onClick={() => setSize('xl')}>XL</Button>
        <Button size="sm" onClick={() => setSize('full')}>Full</Button>
      </div>
      {size && (
        <Modal 
          isOpen={true} 
          onClose={() => setSize(null)}
          title={`${size.toUpperCase()} Modal`}
          size={size}
        >
          <p>This is a {size} sized modal.</p>
        </Modal>
      )}
    </>
  );
};

export default defineStories({
  title: 'Modal',
  component: Modal,
  description: 'Overlay dialog component for focused user interactions.',
  stories: [
    {
      name: 'Default',
      component: ModalDemo,
      code: `const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open Modal</Button>
<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  <p>Modal content here</p>
</Modal>`,
      description: 'Basic modal with title and content',
    },
    {
      name: 'Sizes',
      component: ModalSizes,
      code: `<Modal size="sm" ...>Small</Modal>
<Modal size="md" ...>Medium</Modal>
<Modal size="lg" ...>Large</Modal>
<Modal size="xl" ...>XL</Modal>
<Modal size="full" ...>Full</Modal>`,
      description: 'Different modal sizes',
    },
  ],
});

