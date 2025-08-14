import React, { useState } from 'react';
import { synthesizePackage, renderSinglePrompt } from '../core/synthesize.js';
import type { Inputs } from '../lib/schema.js';

/**
 * PromptBuilder renders a minimal form for generating prompt packages and
 * single-shot prompts in the browser. It is intentionally framework-agnostic
 * so it can be embedded into other sites such as normalscience.com.
 */
export function PromptBuilder() {
  const [projectName, setProjectName] = useState('');
  const [endGoals, setEndGoals] = useState('');
  const [prompt, setPrompt] = useState('');
  const [pkg, setPkg] = useState('');

  function handleGenerate() {
    const inputs: Inputs = {
      project_name: projectName,
      target_framework: 'none',
      output_target: 'both',
      audience: 'engineer',
      end_goals: endGoals
    };

    const result = synthesizePackage(inputs);
    setPrompt(renderSinglePrompt(result));
    setPkg(JSON.stringify(result, null, 2));
  }

  return (
    <div>
      <h2>Prompt Builder</h2>
      <label>
        Project Name
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </label>
      <label>
        End Goals
        <input value={endGoals} onChange={(e) => setEndGoals(e.target.value)} />
      </label>
      <button type="button" onClick={handleGenerate}>
        Generate
      </button>
      {prompt && (
        <section>
          <h3>Single Prompt</h3>
          <pre>{prompt}</pre>
        </section>
      )}
      {pkg && (
        <section>
          <h3>Prompt Package (JSON)</h3>
          <pre>{pkg}</pre>
        </section>
      )}
    </div>
  );
}
