import { Inputs, PromptPackage, Block } from '../lib/schema.js';

/**
 * Build a PromptPackage object from user inputs.
 * Deterministic and side-effect free.
 */
export function synthesizePackage(inputs: Inputs): PromptPackage {
  const timestamp = new Date().toISOString();
  const header = {
    name: inputs.project_name,
    version: '0.1.0',
    status: 'draft',
    created: timestamp,
    updated: timestamp
  };

  const blocks: Block[] = [];
  blocks.push({
    id: 'system-mission',
    role: 'system',
    content: `You are Codex. ${inputs.end_goals}`
  });

  const styleBlock: Block = {
    id: 'style-tone',
    role: 'developer',
    content: JSON.stringify(inputs.style_choices ?? {})
  };
  blocks.push(styleBlock);

  const assembly = inputs.assembly_order ?? blocks.map((b) => b.id);

  return {
    HEADER: header,
    INTERFACES: {},
    BLOCKS: blocks,
    ASSEMBLY: assembly,
    VARIABLES: inputs.variables ?? [],
    STYLE_GUIDE: inputs.style_choices ?? {},
    TESTS: ['Happy path'],
    CHANGELOG: ['0.1.0 Initial']
  };
}

/**
 * Render a single prompt string from a PromptPackage.
 */
export function renderSinglePrompt(pkg: PromptPackage): string {
  return pkg.ASSEMBLY.map((id) => {
    const block = pkg.BLOCKS.find((b) => b.id === id);
    return block ? block.content : '';
  }).join('\n\n');
}
