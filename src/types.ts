/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SkillCategory = 'data' | 'developer' | 'writing' | 'productivity';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  category: string; // Used for filtering relevance (e.g. "Data Scientist", "Content Marketer", "Backend Developer")
  text: string;
  avatarUrl?: string;
}

export interface Metric {
  id: string;
  label: string;
  value: string;
  description: string;
}

export interface Limitation {
  id: string;
  title: string;
  text: string;
  type: 'warning' | 'info' | 'critical';
}

export interface ExamplePreview {
  label: string;
  input: string;
  output: string;
}

export interface SetupStep {
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  requiredFieldId?: string;
}

export interface Skill {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: SkillCategory;
  iconName: string; // For map inside components to Lucide elements
  popularity: string; // e.g. "4.8K uses this week"
  successRate: string; // e.g. "94% success rate"
  typicalRunTime: string; // e.g. "2-5 seconds"
  averageSessionTime: string; // e.g. "1.5 mins saved"
  problemSolved: string;
  examples: ExamplePreview;
  metrics: Metric[];
  limitations: Limitation[];
  testimonials: Testimonial[];
  setupSteps: SetupStep[];
  sampleInputs: { label: string; value: string }[];
}

export interface UserRating {
  skillId: string;
  solvedProblem: 'yes' | 'no' | null;
  comment: string;
  timestamp: string;
}
