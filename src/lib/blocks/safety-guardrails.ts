import { Block } from '../schema.js';
export type TemplateParams = Record<string, unknown>;
/** Render safety guardrails block */
export function render(_params: TemplateParams): Block {
  return { id: 'safety-guardrails', role: 'developer', content: 'Follow safety best practices.' };
}
