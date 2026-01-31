import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { Form, Input, Button } from '@forgedevstack/bear';

const FormPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Form</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Form management with validation, Form.Item wrapper, and useFormContext hook.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Form, Input, Button } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic Form"
        description="Form with validation and submission."
        code={`<Form
  onSubmit={(data) => console.log(data)}
  initialValues={{ email: '', name: '' }}
>
  <Form.Item name="name" label="Name" rules={{ required: true }}>
    <Input />
  </Form.Item>
  <Form.Item name="email" label="Email" rules={{ required: true, email: true }}>
    <Input type="email" />
  </Form.Item>
  <Button type="submit">Submit</Button>
</Form>`}
        allowOverflow
      >
        <div className="max-w-md w-full">
          <Form
            onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
            initialValues={{ email: '', name: '' }}
          >
            <Form.Item name="name" label="Name" rules={{ required: true }}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={{ required: true, email: true }}>
              <Input type="email" />
            </Form.Item>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Validation Rules"
        description="Required, minLength, maxLength, pattern."
        code={`<Form.Item
  name="username"
  label="Username"
  rules={{
    required: true,
    minLength: { value: 3, message: 'Min 3 chars' },
    maxLength: { value: 20, message: 'Max 20 chars' },
  }}
>
  <Input />
</Form.Item>`}
        allowOverflow
      >
        <div className="max-w-md w-full">
          <Form onSubmit={() => {}} initialValues={{ username: '' }}>
            <Form.Item
              name="username"
              label="Username"
              rules={{
                required: true,
                minLength: { value: 3, message: 'Min 3 characters' },
                maxLength: { value: 20, message: 'Max 20 characters' },
              }}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Horizontal Layout"
        description="Form with horizontal layout."
        code={`<Form layout="horizontal" onSubmit={handleSubmit}>
  <Form.Item name="field" label="Field">
    <Input />
  </Form.Item>
</Form>`}
        allowOverflow
      >
        <div className="max-w-md w-full">
          <Form layout="horizontal" onSubmit={() => {}} initialValues={{ field: '' }}>
            <Form.Item name="field" label="Field">
              <Input />
            </Form.Item>
          </Form>
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">onSubmit</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(data) =&gt; void</code></td><td>Form submit handler</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">initialValues</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>Record&lt;string, unknown&gt;</code></td><td>Initial field values</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">layout</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>&apos;vertical&apos; | &apos;horizontal&apos; | &apos;inline&apos;</code></td><td>Form layout</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">validateOnChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td>Validate on input change</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">validateOnBlur</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td>Validate on blur</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default FormPage;
