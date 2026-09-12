import {
  CODESANDBOX_DEFINE,
  CODESANDBOX_QUERY,
  buildCodeSandboxParameters,
} from './Sandbox.codesandbox';
import { SANDBOX_STARTER_APP } from './Sandbox.const';
import { buildSandboxApp } from './Sandbox.utils';
import { isComponentDocsPath } from '@/constants/navigation.const';

const FORM_METHOD = 'POST';
const FORM_TARGET = '_blank';
const ENVIRONMENT_NAME = 'environment';
const ENVIRONMENT_VALUE = 'create-react-app';
const PARAMETERS_NAME = 'parameters';
const QUERY_NAME = 'query';

const slugFromPath = (pathname: string): string => {
  return pathname.split('/').filter(Boolean).pop() ?? 'Bear';
};

export const resolveSandboxAppSource = (pathname?: string): string => {
  if (!pathname || !isComponentDocsPath(pathname)) {
    return SANDBOX_STARTER_APP;
  }
  return buildSandboxApp(pathname, slugFromPath(pathname));
};

export const openCodeSandbox = (pathname?: string) => {
  const parameters = buildCodeSandboxParameters(resolveSandboxAppSource(pathname));
  const form = document.createElement('form');
  form.method = FORM_METHOD;
  form.action = CODESANDBOX_DEFINE;
  form.target = FORM_TARGET;

  const fields = [
    [PARAMETERS_NAME, parameters],
    [QUERY_NAME, CODESANDBOX_QUERY],
    [ENVIRONMENT_NAME, ENVIRONMENT_VALUE],
  ];

  for (const [name, value] of fields) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
  form.remove();
};
