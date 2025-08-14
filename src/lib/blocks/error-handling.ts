import { Block } from '../schema.js';
export type TemplateParams = Record<string, unknown>;
/** Render error handling block */
export function render(_params: TemplateParams): Block {
  return { id: 'error-handling', role: 'developer', content: 'Show clear errors and recovery steps.' };
}
