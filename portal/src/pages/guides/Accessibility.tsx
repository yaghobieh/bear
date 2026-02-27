import { FC } from 'react';
import {
  Typography,
  Card,
  CardBody,
  CodeBlock,
} from '@forgedevstack/bear';

const Accessibility: FC = () => (
  <div className="fade-in">
    <Typography variant="h3" className="mb-4 font-bold text-gray-900 dark:text-white">
      Accessibility
    </Typography>
    <Typography variant="body1" className="mb-8 text-gray-600 dark:text-gray-400 max-w-2xl">
      Bear components include ARIA attributes, keyboard support, and focus management out of the box.
    </Typography>

    <Card variant="outlined" className="mb-8">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">ARIA Attributes</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">
          Bear adds aria-invalid, aria-describedby, aria-expanded, and role where appropriate. FormField uses aria-invalid for errors.
        </Typography>
      </CardBody>
    </Card>

    <Card variant="outlined" className="mb-8">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">Keyboard Navigation</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">
          Modals, Dropdowns, and Menus support Escape to close, Tab for focus trap, and arrow keys where relevant.
        </Typography>
        <CodeBlock
          code={`<Modal isOpen={open} onClose={() => setOpen(false)}>
  {/* Focus is trapped; Escape closes */}
</Modal>`}
          language="tsx"
          showLineNumbers={false}
        />
      </CardBody>
    </Card>

    <Card variant="outlined" className="mb-8">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">Focus Management</Typography>
        <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
          Overlays restore focus on close. Use autofocus props where supported. Ensure visible focus rings for keyboard users.
        </Typography>
      </CardBody>
    </Card>

    <Card variant="outlined" className="mb-8">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">Color Contrast</Typography>
        <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
          Bear's default palette meets WCAG AA. Use Bear's semantic colors (error, success) for states.
        </Typography>
      </CardBody>
    </Card>

    <Card variant="outlined">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">Screen Reader Support</Typography>
        <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
          Labels are associated with inputs. Use label, aria-label, or aria-labelledby. Avoid placeholder-only labels.
        </Typography>
      </CardBody>
    </Card>
  </div>
);

export default Accessibility;
