/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Database, 
  Terminal, 
  BookOpen, 
  Search, 
  TrendingUp, 
  ArrowRight, 
  Filter, 
  CheckCircle2, 
  Sparkles,
  Award
} from 'lucide-react';
import { Skill, SkillCategory } from '../types';

interface SkillListProps {
  skills: Skill[];
  onSelectSkill: (skill: Skill) => void;
  selectedPersona: string;
  setSelectedPersona: (persona: string) => void;
}

export default function SkillList({ 
  skills, 
  onSelectSkill, 
  selectedPersona, 
  setSelectedPersona 
}: SkillListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');

  const categories: { value: SkillCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All Claude Skills', icon: <Sparkles className="w-4 h-4" id="icon-cat-all" /> },
    { value: 'data', label: 'Data & Analytics', icon: <Database className="w-4 h-4" id="icon-cat-data" /> },
    { value: 'developer', label: 'Developer SDKs', icon: <Terminal className="w-4 h-4" id="icon-cat-dev" /> },
    { value: 'writing', label: 'Writing & Research', icon: <BookOpen className="w-4 h-4" id="icon-cat-write" /> },
  ];

  const personas = [
    { value: 'all', label: 'All Fields' },
    { value: 'Data Engineering', label: 'Data & Analyst' },
    { value: 'Developer', label: 'Software Engineer' },
    { value: 'Scientific Communication', label: 'Science Writer / Journalist' },
  ];

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      skill.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getIcon = (name: string) => {
    switch (name) {
      case 'Database': return <Database className="w-5 h-5 text-indigo-600" id="icon-db" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-indigo-600" id="icon-term" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-indigo-600" id="icon-book" />;
      default: return <Database className="w-5 h-5 text-indigo-600" id="icon-def" />;
    }
  };

  const getCategoryTheme = (category: SkillCategory) => {
    switch (category) {
      case 'data': return 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100';
      case 'developer': return 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100';
      case 'writing': return 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100';
    }
  };

  return (
    <div className="space-y-8" id="skill-list-container">
      {/* Visual Identity & Strategic Intro Banner */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white relative overflow-hidden shadow-xl" id="skills-hero-banner">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
        
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-xs font-mono text-indigo-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Empirically Verified Claude Skills
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white">
            Confidence-First <br/> Claude Skills Hub
          </h1>
          
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl font-light">
            Don&apos;t hope a skill works—know it will. We surface metrics, verified developer proof, and live diagnostic simulators so you can build with certitude.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Transparent limits</span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-emerald-400" /> Instant micro-previews</span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-emerald-400" /> Tested Sandbox Simulations</span>
          </div>
        </div>
      </div>

      {/* Grid Filter Bar controls */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4" id="filter-controls-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            <input
              id="skill-search-input"
              type="text"
              placeholder="Search Claude skills by function (e.g. 'csv', 'generator', 'abstract')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 placeholder:text-slate-400 font-sans"
            />
          </div>

          {/* Social Proof Persona Relevance Filter */}
          <div className="flex items-center gap-2" id="persona-filter-box">
            <span className="text-xs font-mono text-slate-500 whitespace-nowrap flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter Proof For:
            </span>
            <select
              id="persona-dropdown"
              value={selectedPersona}
              onChange={(e) => setSelectedPersona(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2 font-medium"
            >
              {personas.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100" id="category-pills">
          {categories.map((cat) => (
            <button
              id={`cat-btn-${cat.value}`}
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all border ${
                selectedCategory === cat.value
                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main List Rendering */}
      <div className="space-y-4" id="skills-grid">
        <h2 className="text-xs font-bold font-mono text-slate-400 tracking-wider uppercase mb-2">
          Available Skills ({filteredSkills.length})
        </h2>

        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <div
              id={`micro-card-${skill.id}`}
              key={skill.id}
              className="group bg-white rounded-xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                {/* Left side: Micro Information Stage 1 */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="flex items-center gap-1.5 font-bold font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border bg-slate-50 text-slate-500 border-slate-200">
                      {getIcon(skill.iconName)}
                      {skill.category}
                    </span>
                    
                    {/* Social Proof Badge in Micro Stage */}
                    <span className="flex items-center gap-1 font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded text-[10px] font-semibold border border-emerald-100">
                      <TrendingUp className="w-3 h-3 text-emerald-500" />
                      {skill.popularity}
                    </span>

                    <span className="font-mono text-slate-400 text-[10px]">
                      {skill.successRate} Success
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold font-display text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {skill.name}
                  </h3>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl font-sans font-light">
                    {skill.tagline}
                  </p>

                  {/* Micro Visual representation preview as required */}
                  <div className="pt-2" id={`micro-flow-visual-${skill.id}`}>
                    <div className="inline-flex items-center gap-2.5 bg-slate-50/50 border border-slate-100 rounded-lg py-1.5 px-3">
                      <span className="text-[11px] font-semibold font-mono text-slate-400 uppercase tracking-widest">Input</span>
                      <span className="text-xs font-mono text-slate-600 bg-slate-100/80 px-2 py-0.5 rounded border border-slate-200/50">
                        {skill.category === 'data' ? 'CSV Rows' : skill.category === 'developer' ? 'Route Prompt' : 'Research Abstract'}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span className="text-[11px] font-semibold font-mono text-indigo-500 uppercase tracking-widest">Output</span>
                      <span className="text-xs font-mono text-indigo-600 bg-indigo-50/50 px-2 py-0.5 rounded border border-indigo-100/50 font-medium">
                        {skill.category === 'data' ? 'Strict ECMA JSON' : skill.category === 'developer' ? 'Router Controller' : 'Plain Bullet Summary'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side: Expand Button */}
                <div className="w-full md:w-auto flex justify-end">
                  <button
                    id={`learn-more-btn-${skill.id}`}
                    onClick={() => onSelectSkill(skill)}
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-medium text-sm py-3 px-6 rounded-lg transition-colors hover:bg-indigo-600 shadow-sm"
                  >
                    Assess Skill Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-12 text-center" id="no-skills-found">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600 font-medium text-lg">No matching Claude Skill found</p>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or search keywords.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-4 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-indigo-600 hover:bg-slate-50 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple fallback internal Icon helper if not loaded
function AlertCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12" y1="16" y2="16.01" />
    </svg>
  );
}
