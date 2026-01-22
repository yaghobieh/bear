import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const FileUploadPage: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">FileUpload</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Allow users to upload files with drag-and-drop support.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { FileUpload } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Basic"
        description="File upload with drag and drop."
        code={`<FileUpload onFilesChange={setFiles} accept="image/*" />`}
      >
        <div className="w-full max-w-md">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? 'border-bear-500 bg-bear-50 dark:bg-bear-900/20' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Drag & drop files here, or</p>
            <label className="inline-block px-4 py-2 bg-bear-500 text-white rounded-lg cursor-pointer hover:bg-bear-600">
              Browse Files
              <input 
                type="file" 
                className="hidden" 
                multiple
                onChange={(e) => setFiles(prev => [...prev, ...Array.from(e.target.files || [])])}
              />
            </label>
          </div>
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded">
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{file.name}</span>
                  <button onClick={() => setFiles(f => f.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500">×</button>
                </div>
              ))}
            </div>
          )}
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
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Default</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">onFilesChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(files: File[]) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Callback when files are selected</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">accept</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">*</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Accepted file types</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">multiple</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Allow multiple files</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">maxSize</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Max file size in bytes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">label</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom label text</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default FileUploadPage;

