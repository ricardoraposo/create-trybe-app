import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const BASE_TEMPLATE_PATH = path.join(__dirname, '..', 'templates', 'base');

export const REACT_ROUTER_TEMPLATE_PATH = path.join(__dirname, '..', 'templates', 'extra', 'react-router');

export const RTL_TEMPLATE_PATH = path.join(__dirname, '..', 'templates', 'extra', 'rtl');

export const RTLROUTER_TEMPLATE_PATH = path.join(__dirname, '..', 'templates', 'extra', 'rtlrouter');

export const STYLEDBASE_TEMPLATE_PATH = path.join(__dirname, '..', 'templates', 'extra', 'styled-base');

export const STYLEDROUTER_TEMPLATE_PATH = path.join(__dirname, '..', 'templates', 'extra', 'styled-router');

export enum checkboxValues {
  router = 'router',
  rtl = 'vitest',
  styled = 'styled',
}
