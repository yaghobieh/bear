import { Typewriter } from '@forgedevstack/bear';

export default function TypewriterPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Typewriter</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Animated typing text effect. Supports multi-text looping, custom speeds, cursor, and delete animation.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Single Text</h2>
          <div className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
            <Typewriter
              text="Welcome to Bear UI — Build beautiful React apps."
              as="h2"
              cursor
              speed={60}
              className="text-2xl font-bold text-gray-900 dark:text-white"
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Multi-Text Loop</h2>
          <div className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
            <span className="text-xl text-gray-600 dark:text-gray-400">I love </span>
            <Typewriter
              text={['React', 'TypeScript', 'Bear UI', 'ForgeStack']}
              loop
              cursor
              speed={100}
              deleteSpeed={50}
              deleteDelay={2000}
              as="span"
              className="text-xl font-bold text-pink-500"
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Different Sizes</h2>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
            <Typewriter text="Heading 1" as="h1" cursor speed={80} className="text-4xl font-bold text-gray-900 dark:text-white" />
            <Typewriter text="Heading 3" as="h3" cursor speed={60} startDelay={2000} className="text-xl font-semibold text-gray-700 dark:text-gray-300" />
            <Typewriter text="Body text with cursor" as="p" cursor speed={40} startDelay={4000} className="text-base text-gray-600 dark:text-gray-400" />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Custom Cursor</h2>
          <div className="p-8 bg-gray-900 rounded-xl text-center">
            <Typewriter
              text={['npm install @forgedevstack/bear', 'npx @forgedevstack/cli']}
              loop
              cursor
              cursorChar="_"
              speed={60}
              className="text-lg font-mono text-green-400"
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Usage</h2>
          <pre className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">
{`import { Typewriter } from '@forgedevstack/bear';

// Single text
<Typewriter text="Hello World!" cursor speed={80} />

// Multi-text loop
<Typewriter
  text={['React', 'TypeScript', 'Bear UI']}
  loop
  cursor
  speed={100}
  deleteSpeed={50}
/>

// Custom cursor
<Typewriter text="Code here..." cursorChar="_" as="h1" />`}
          </pre>
        </section>
      </div>
    </div>
  );
}
