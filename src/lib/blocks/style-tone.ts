import { Block } from '../schema.js';
export type TemplateParams = { tone?: string };
/** Render style tone block */
export function render(params: TemplateParams): Block {
  return { id: 'style-tone', role: 'developer', content: params.tone ?? 'direct, technical, concise' };
}
