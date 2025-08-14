import { Block } from '../schema.js';
export type TemplateParams = Record<string, unknown>;
/** Render reasoning discipline block */
export function render(_params: TemplateParams): Block {
  return { id: 'reasoning-discipline', role: 'developer', content: 'Think step by step with clear reasoning.' };
}
