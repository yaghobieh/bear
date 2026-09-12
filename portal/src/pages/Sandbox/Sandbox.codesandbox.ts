import { compressToBase64 } from 'lz-string';
import { SANDBOX_STARTER_APP } from './Sandbox.const';
import { buildSandboxFiles } from './Sandbox.files';

export const CODESANDBOX_DEFINE = 'https://codesandbox.io/api/v1/sandboxes/define';
export const CODESANDBOX_QUERY = 'file=/src/App.js';

const compressParameters = (value: string): string => {
  return compressToBase64(value)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

export const buildCodeSandboxParameters = (appSource: string = SANDBOX_STARTER_APP): string => {
  return compressParameters(
    JSON.stringify({
      files: buildSandboxFiles(appSource),
    })
  );
};

export const buildCodeSandboxUrl = (appSource: string = SANDBOX_STARTER_APP): string => {
  const query = new URLSearchParams({
    parameters: buildCodeSandboxParameters(appSource),
    query: CODESANDBOX_QUERY,
    environment: 'create-react-app',
  });
  return `${CODESANDBOX_DEFINE}?${query.toString()}`;
};
