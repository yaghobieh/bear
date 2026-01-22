import { defineStories } from '@forgedevstack/kiln';
import { FileUpload } from './FileUpload';

export default defineStories({
  title: 'FileUpload',
  component: FileUpload,
  description: 'File upload with drag and drop.',
  stories: [
    {
      name: 'Default',
      component: () => <FileUpload onFilesChange={(files) => console.log(files)} />,
      code: `<FileUpload onFilesChange={(files) => setFiles(files)} />`,
      description: 'Basic file upload',
    },
    {
      name: 'Images Only',
      component: () => <FileUpload accept="image/*" />,
      code: `<FileUpload accept="image/*" />`,
      description: 'Accept only images',
    },
    {
      name: 'Single File',
      component: () => <FileUpload multiple={false} />,
      code: `<FileUpload multiple={false} />`,
      description: 'Single file selection',
    },
    {
      name: 'With Label',
      component: () => <FileUpload label="Upload your documents" />,
      code: `<FileUpload label="Upload your documents" />`,
      description: 'Custom label',
    },
  ],
});

