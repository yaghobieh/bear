export const FORGE_FORM_INSTALL = 'npm install @forgedevstack/forge-form';

export const FORGE_FORM_QUICK_START = `import { useForm } from '@forgedevstack/forge-form';
import { Button, FormControl, Input } from '@forgedevstack/bear';

function SignUpForm() {
  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async ({ value }) => {
      await fetch('/api/signup', { method: 'POST', body: JSON.stringify(value) });
    },
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
      <form.Field name="email" validators={{ onChange: ({ value }) => !value ? 'Required' : undefined }}>
        {(field) => (
          <FormControl label="Email" error={field.state.meta.errors[0]}>
            <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} onBlur={field.handleBlur} />
          </FormControl>
        )}
      </form.Field>
      <Button type="submit" variant="primary">Sign up</Button>
    </form>
  );
}`;

export const ACTION_STATE_EXAMPLE = `import { useActionState } from 'react';
import { Button, FormControl, Input, Alert } from '@forgedevstack/bear';

async function subscribeAction(_prev: { error?: string }, formData: FormData) {
  const email = String(formData.get('email') ?? '');
  if (!email.includes('@')) return { error: 'Enter a valid email' };
  await fetch('/api/subscribe', { method: 'POST', body: formData });
  return { error: undefined };
}

function SubscribeForm() {
  const [state, action, pending] = useActionState(subscribeAction, {});

  return (
    <form action={action}>
      <FormControl label="Email" error={state.error}>
        <Input name="email" type="email" placeholder="you@example.com" />
      </FormControl>
      {state.error && <Alert severity="error">{state.error}</Alert>}
      <Button type="submit" variant="primary" disabled={pending}>
        {pending ? 'Subscribing…' : 'Subscribe'}
      </Button>
    </form>
  );
}`;

export const FORMIK_INSTALL = 'npm install formik';

export const FORMIK_EXAMPLE = `import { Formik, Form, Field } from 'formik';
import { Button, FormControl, Input } from '@forgedevstack/bear';

function ProfileForm() {
  return (
    <Formik initialValues={{ name: '', email: '' }} onSubmit={(values) => console.log(values)}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <FormControl label="Name" error={touched.name ? errors.name : undefined}>
            <Input name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
          </FormControl>
          <FormControl label="Email" error={touched.email ? errors.email : undefined}>
            <Input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
          </FormControl>
          <Button type="submit" variant="primary">Save</Button>
        </Form>
      )}
    </Formik>
  );
}`;

export const RHF_INSTALL = 'npm install react-hook-form';

export const RHF_EXAMPLE = `import { useForm } from 'react-hook-form';
import { Button, FormControl, Input } from '@forgedevstack/bear';

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <FormControl label="Email" error={errors.email?.message as string}>
        <Input {...register('email', { required: 'Required' })} />
      </FormControl>
      <Button type="submit" variant="primary">Send</Button>
    </form>
  );
}`;

export const CLI_CREATE_CMD = `npx create-forge my-app

pnpm create forge my-app
yarn create forge my-app
bunx create-forge my-app`;

export const CLI_ADD_CMD = `npx forge-cli add button card drawer
npx forge-cli add --all`;

export const CLI_COMMANDS = `forge create [project-name]
forge add [package]
forge generate page Dashboard
forge generate component UserCard`;

export const PACKAGE_JSON_IMPORTS = `{
  "imports": {
    "#components/*": "./src/components/*.tsx",
    "#lib/*": "./src/lib/*.ts",
    "#hooks/*": "./src/hooks/*.ts"
  }
}`;

export const TSCONFIG_IMPORTS = `{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "resolvePackageJsonImports": true
  }
}`;

export const COMPONENTS_JSON_ALIASES = `{
  "aliases": {
    "components": "#components",
    "ui": "#components/ui",
    "lib": "#lib",
    "hooks": "#hooks",
    "utils": "#lib/utils"
  }
}`;

export const PACKAGE_IMPORTS_USAGE = `import { Button } from "#components/ui/button"
import { cn } from "#lib/utils"`;

export const DARK_MODE_VITE = `import { BearProvider } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

createRoot(document.getElementById('root')!).render(
  <BearProvider defaultMode="system">
    <App />
  </BearProvider>
);`;

export const DARK_MODE_PROVIDER = `import { useBearMode } from '@forgedevstack/bear';

function ThemeToggle() {
  const { mode, toggleMode } = useBearMode();
  return (
    <button onClick={toggleMode}>
      {mode === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}`;

export const DARK_MODE_PERSIST = `const STORAGE_KEY = 'bear-theme';

function getInitialMode(): 'light' | 'dark' | 'system' {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return 'system';
}

<BearProvider
  defaultMode={getInitialMode()}
  onModeChange={(mode) => localStorage.setItem(STORAGE_KEY, mode)}
/>`;

export const DARK_MODE_CSS_VARS = `:root {
  --bear-primary-500: #ec4899;
  --bear-background: #ffffff;
  --bear-foreground: #111827;
}

.dark {
  --bear-background: #0f172a;
  --bear-foreground: #f8fafc;
}`;

export const JAVASCRIPT_JSCONFIG = `{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`;

export const JAVASCRIPT_COMPONENT = `import { Button, Card } from '@forgedevstack/bear';

export function WelcomeCard({ title, children }) {
  return (
    <Card padding="md">
      <h2>{title}</h2>
      {children}
      <Button variant="primary">Get started</Button>
    </Card>
  );
}`;

export const NEXTJS_LAYOUT = `import { BearProvider } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <BearProvider defaultMode="system" persistPreference>
          {children}
        </BearProvider>
      </body>
    </html>
  );
}`;

export const NEXTJS_CLIENT_COMPONENT = `'use client';

import { Button, useBearMode } from '@forgedevstack/bear';

export function ThemeToggle() {
  const { toggleMode } = useBearMode();
  return <Button variant="outline" onClick={toggleMode}>Toggle theme</Button>;
}`;

export const NEXTJS_CONFIG = `/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@forgedevstack/bear'],
};

export default nextConfig;`;
