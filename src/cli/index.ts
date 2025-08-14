import { Command } from 'commander';
import inquirer from 'inquirer';
import { synthesizePackage, renderSinglePrompt } from '../core/synthesize.js';
import { Inputs } from '../lib/schema.js';
import { writeFileSync } from 'fs';

const program = new Command();

program
  .name('promptgen')
  .option('--project-name <name>')
  .option('--target-framework <framework>', 'none')
  .option('--output-target <target>', 'both')
  .option('--audience <audience>', 'engineer')
  .option('--end-goals <goals>');

program.parse(process.argv);
let opts = program.opts();

async function main() {
  const questions = [];
  if (!opts.projectName && !opts['projectName']) {
    questions.push({ name: 'project_name', message: 'Project name:', type: 'input' });
  }
  if (!opts.endGoals && !opts['endGoals']) {
    questions.push({ name: 'end_goals', message: 'End goals:', type: 'input' });
  }
  const answers = questions.length ? await inquirer.prompt(questions) : {};
  const inputs: Inputs = {
    project_name: opts.projectName ?? answers.project_name,
    target_framework: opts.targetFramework ?? 'none',
    output_target: opts.outputTarget ?? 'both',
    audience: opts.audience ?? 'engineer',
    end_goals: opts.endGoals ?? answers.end_goals,
  } as Inputs;

  const pkg = synthesizePackage(inputs);
  const prompt = renderSinglePrompt(pkg);

  writeFileSync('prompt_package.json', JSON.stringify(pkg, null, 2));
  writeFileSync('prompt_package.md', '```json\n' + JSON.stringify(pkg, null, 2) + '\n```');
  writeFileSync('single_prompt.txt', prompt);
  console.log('Generated prompt_package.json, prompt_package.md, and single_prompt.txt');
}

main();
