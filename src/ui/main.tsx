import React from 'react';
import { createRoot } from 'react-dom/client';
import { PromptBuilder } from './PromptBuilder.js';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<PromptBuilder />);
}

