import { Block } from '../schema.js';
export type TemplateParams = { variables?: any[] };
/** Render io-variables block */
export function render(params: TemplateParams): Block {
  return { id: 'io-variables', role: 'developer', content: JSON.stringify(params.variables ?? []) };
}
