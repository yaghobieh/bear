import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CodeBlock } from '@/components/CodeBlock';

const FaqDocsPage: FC = () => (
  <article className="fade-in">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">FAQ</h1>
    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
      Short answers for the questions that show up most often while installing or theming Bear. If the page you need is missing, use the Feedback link or the <Link className="text-pink-600 dark:text-pink-400" to="/support">support page</Link>.
    </p>

    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">How do I change a button color?</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Use variant for the built-in colors, or register a custom variant on BearProvider. There is no color prop.
      </p>
      <CodeBlock
        code={`<Button variant="primary">Save</Button>
<Button variant="danger">Delete</Button>`}
        language="tsx"
        showLineNumbers={false}
      />
    </section>

    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Do I have to use Tailwind?</h2>
      <p className="text-gray-600 dark:text-gray-400">
        No. Import @forgedevstack/bear/styles.css once. className still works if your app uses Tailwind, but the kit styles do not depend on it. Charts, map, and kanban are optional packages.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">How do I turn motion off?</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Pass reducedMotion to BearProvider. Overlays also follow the user preference for reduced motion.
      </p>
      <CodeBlock code={`<BearProvider reducedMotion>{children}</BearProvider>`} language="tsx" showLineNumbers={false} />
    </section>

    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Why does the page shift when a modal opens?</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Modal locks scroll on the page behind it. If a fixed header jumps, give that header position sticky or compensate for the missing scrollbar in your own layout. The dialog itself should stay the focused element until it closes.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">How do I read an older version?</h2>
      <p className="text-gray-600 dark:text-gray-400">
        The version menu in the sidebar switches the release notes pinned to every page. Component examples describe the latest API. Pick v1.3.5 for the current kit, or a version line such as v1.2 to read what that line shipped.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Why did Edit in chat stop answering?</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Each address can complete five Bear questions. Greetings and questions about other Forge libraries are refused and do not use a try. The counter lives in the server process, so a new deployment starts it again.
      </p>
    </section>
  </article>
);

export default FaqDocsPage;
