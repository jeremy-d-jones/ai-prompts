import { Block } from '../schema.js';
export type TemplateParams = { goals?: string };
/** Render output contract block */
export function render(params: TemplateParams): Block {
  return { id: 'output-contract', role: 'developer', content: params.goals ?? 'Define output format.' };
}
