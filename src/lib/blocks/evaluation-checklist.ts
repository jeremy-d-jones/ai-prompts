import { Block } from '../schema.js';
export type TemplateParams = Record<string, unknown>;
/** Render evaluation checklist block */
export function render(_params: TemplateParams): Block {
  return { id: 'evaluation-checklist', role: 'developer', content: 'Review mission, variables, assembly, tests, and style.' };
}
