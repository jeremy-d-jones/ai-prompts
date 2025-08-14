import { describe, it, expect } from 'vitest';
import { synthesizePackage, renderSinglePrompt } from '../src/core/synthesize.js';
import { Inputs } from '../src/lib/schema.js';

describe('synthesizePackage', () => {
  it('builds package and renders prompt', () => {
    const inputs: Inputs = {
      project_name: 'Demo',
      target_framework: 'none',
      output_target: 'both',
      audience: 'engineer',
      end_goals: 'Do things'
    };
    const pkg = synthesizePackage(inputs);
    expect(pkg.HEADER.name).toBe('Demo');
    const prompt = renderSinglePrompt(pkg);
    expect(prompt).toContain('Do things');
  });
});
