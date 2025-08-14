export interface Inputs {
  project_name: string;
  target_framework: string;
  output_target: string;
  style_choices?: Record<string, unknown>;
  inspirations?: unknown[];
  audience: string;
  end_goals: string;
  constraints?: Record<string, unknown>;
  variables?: any[];
  reusable_blocks?: string[];
  assembly_order?: string[];
}

export interface Block {
  id: string;
  role?: string;
  content: string;
}

export interface PromptPackage {
  HEADER: Record<string, unknown>;
  INTERFACES: Record<string, unknown>;
  BLOCKS: Block[];
  ASSEMBLY: string[];
  VARIABLES: any[];
  STYLE_GUIDE: Record<string, unknown>;
  TESTS: string[];
  CHANGELOG: string[];
}
