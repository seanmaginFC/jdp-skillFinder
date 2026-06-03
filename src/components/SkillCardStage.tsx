/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Database, 
  Terminal, 
  BookOpen, 
  ShieldAlert, 
  CheckCircle2, 
  MessageSquare, 
  Timer, 
  TrendingUp, 
  AlertTriangle, 
  Info, 
  Play, 
  Copy, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { Skill, Testimonial } from '../types';

interface SkillCardStageProps {
  skill: Skill;
  selectedPersona: string;
  onBack: () => void;
  onStartSetup: () => void;
}

export default function SkillCardStage({ 
  skill, 
  selectedPersona, 
  onBack, 
  onStartSetup 
}: SkillCardStageProps) {
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('input');
  const [copied, setCopied] = useState(false);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Database': return <Database className="w-6 h-6 text-indigo-400" id="db-icon-details" />;
      case 'Terminal': return <Terminal className="w-6 h-6 text-indigo-400" id="term-icon-details" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-indigo-400" id="book-icon-details" />;
      default: return <Database className="w-6 h-6 text-indigo-400" id="def-icon-details" />;
    }
  };

  const copyExample = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filter testimonials based on relevance (selectedPersona). 
  // If the selected persona corresponds to a testimonial's category or company, pull it to the top!
  const sortedTestimonials = [...skill.testimonials].sort((a, b) => {
    const aMatches = selectedPersona !== 'all' && 
      (a.category.toLowerCase().includes(selectedPersona.toLowerCase()) || 
       a.role.toLowerCase().includes(selectedPersona.toLowerCase()));
    const bMatches = selectedPersona !== 'all' && 
      (b.category.toLowerCase().includes(selectedPersona.toLowerCase()) || 
       b.role.toLowerCase().includes(selectedPersona.toLowerCase()));
       
    if (aMatches && !bMatches) return -1;
    if (!aMatches && bMatches) return 1;
    return 0;
  });

  return (
    <div className="space-y-8" id="card-stage-container">
      {/* Back button and title bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" id="card-stage-header">
        <button
          id="back-to-list-btn"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors py-1 px-2 -ml-2 rounded-lg hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all skills
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Current Funnel Step:</span>
          <span className="text-xs font-semibold font-mono text-amber-600 bg-amber-50 border border-amber-100 rounded-full px-2.5 py-0.5">
            Stage 2 - Verification & Context
          </span>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="card-grid">
        
        {/* LEFT COLUMN: Problem description, detailed proof, and comparative layout (8 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Main detailed explanation block */}
          <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-5" id="skill-description-card">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-900 rounded-xl">
                {getIcon(skill.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold font-mono text-indigo-600 uppercase tracking-wider">{skill.category}</span>
                <h2 className="text-2xl md:text-3xl font-extrabold font-display text-slate-900 leading-tight">
                  {skill.name}
                </h2>
              </div>
            </div>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-sans font-light">
              {skill.longDescription}
            </p>

            <div className="p-4 rounded-lg bg-indigo-50/50 border border-indigo-100/30 space-y-2">
              <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-800">
                Primary Use Case Solved
              </h4>
              <p className="text-slate-700 text-sm leading-relaxed">
                {skill.problemSolved}
              </p>
            </div>
          </div>

          {/* Interactive Input/Output Live Preview - Proof of Concept */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-4" id="skill-sandbox-preview">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900">
                  Concept Demonstration
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Explore how this skill translates payloads. Done safely in browser memory.
                </p>
              </div>
              <span className="text-xs font-mono text-indigo-600 font-semibold bg-indigo-50 border border-indigo-100 px-2 py-1 rounded">
                Example Model Run
              </span>
            </div>

            {/* Container */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-4 py-2">
                <div className="flex gap-2">
                  <button
                    id="sample-preview-input-tab"
                    onClick={() => setActiveTab('input')}
                    className={`px-3 py-1 text-xs font-mono font-medium rounded-md transition-colors ${
                      activeTab === 'input' ? 'bg-white text-slate-800 shadow-xs border border-slate-200' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Sample Input
                  </button>
                  <button
                    id="sample-preview-output-tab"
                    onClick={() => setActiveTab('output')}
                    className={`px-3 py-1 text-xs font-mono font-medium rounded-md transition-colors ${
                      activeTab === 'output' ? 'bg-white text-indigo-600 shadow-xs border border-indigo-200' : 'text-slate-500 hover:text-indigo-600'
                    }`}
                  >
                    Expected Output
                  </button>
                </div>
                
                <button
                  id="copy-sample-data-btn"
                  onClick={() => copyExample(activeTab === 'input' ? skill.examples.input : skill.examples.output)}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-mono py-1 px-2 rounded hover:bg-slate-200/60"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>

              {/* Code Screen Wrapper */}
              <div className="bg-slate-950 p-4 font-mono text-sm leading-relaxed overflow-x-auto min-h-[160px] max-h-[300px]">
                {activeTab === 'input' ? (
                  <pre id="demo-input" className="text-slate-300 select-all whitespace-pre-wrap break-words">{skill.examples.input}</pre>
                ) : (
                  <pre id="demo-output" className="text-emerald-400 select-all whitespace-pre-wrap break-words">{skill.examples.output}</pre>
                )}
              </div>
            </div>
          </div>

          {/* User Testimonials Filtered by Relevance */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-4" id="testimonials-box">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900">
                  Verified Developer Proof
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Hear from team specialists using this specific workflow.
                </p>
              </div>

              {selectedPersona !== 'all' && (
                <span className="self-start sm:self-center inline-flex items-center gap-1 text-[11px] font-mono leading-none py-1 px-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Filtered for {selectedPersona}
                </span>
              )}
            </div>

            <div className="space-y-4">
              {sortedTestimonials.map((t, index) => {
                const isRecomendationMatch = selectedPersona !== 'all' && 
                  (t.category.toLowerCase().includes(selectedPersona.toLowerCase()) || 
                   t.role.toLowerCase().includes(selectedPersona.toLowerCase()));

                return (
                  <div 
                    id={`testimonial-bubble-${t.id}`}
                    key={t.id} 
                    className={`p-5 rounded-lg border transition-all ${
                      isRecomendationMatch 
                        ? 'bg-gradient-to-r from-indigo-50/50 to-white border-indigo-200 ring-2 ring-indigo-500/5' 
                        : 'bg-slate-50/50 border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-mono font-bold text-slate-700 text-sm uppercase">
                        {t.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-slate-800">{t.name}</h4>
                          {isRecomendationMatch && (
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">
                              Highly Relevant Match
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          {t.role} • <span className="font-semibold text-slate-600">{t.company}</span>
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed font-sans italic">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Performance Stats, Transparent Limitations, and CTA Action (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Call to Action Hero Card */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-md text-white space-y-5" id="cta-card">
            <div>
              <span className="text-xs font-mono text-indigo-300 font-semibold uppercase tracking-wider">Launch Option</span>
              <h3 className="text-xl md:text-2xl font-bold font-display mt-1">Ready to Test It?</h3>
              <p className="text-slate-300 text-xs mt-1.5 leading-relaxed font-light">
                Launch our offline guided simulation space. Preloaded tables, dynamic input fields, and custom validations wait for you.
              </p>
            </div>

            <button
              id="launch-guided-setup-btn"
              onClick={onStartSetup}
              className="w-full inline-flex items-center justify-center gap-2 bg-indigo-500 text-white font-semibold text-sm py-3 px-4 rounded-lg transition-colors hover:bg-indigo-600 shadow-md transform active:scale-[0.99]"
            >
              <Play className="w-4 h-4 fill-current" />
              Launch Interactive Walkthrough
            </button>
            
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Tested locally • No external API limits
            </div>
          </div>

          {/* Performance Confidence scorecard */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-4" id="stats-scorecard">
            <h3 className="text-sm font-bold font-mono tracking-wider uppercase text-slate-400">
              Confidence Scorecard
            </h3>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50/30">
                <div className="p-2 rounded bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Verified success rate</p>
                  <p className="text-lg font-extrabold font-display text-slate-900">{skill.successRate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50/30">
                <div className="p-2 rounded bg-indigo-50 text-indigo-600">
                  <Timer className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Typical generation speed</p>
                  <p className="text-lg font-extrabold font-display text-slate-900">{skill.typicalRunTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50/30">
                <div className="p-2 rounded bg-purple-50 text-purple-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Average developer gain</p>
                  <p className="text-lg font-extrabold font-display text-slate-900">{skill.averageSessionTime}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transparent limitations & Risk warnings */}
          <div className="bg-white p-6 rounded-xl border border-red-100 bg-red-50/5 shadow-xs space-y-4" id="risk-assessment-card">
            <div className="flex items-center gap-2 text-red-700">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-sm font-extrabold font-mono tracking-wider uppercase">
                Risk & Limits Transparency
              </h3>
            </div>
            
            <p className="text-slate-600 text-xs leading-relaxed">
              To build genuine trust, we list verified edge cases, execution failures, or dimensional limits upfront.
            </p>

            <div className="space-y-3">
              {skill.limitations.map((lim) => (
                <div 
                  id={`limitation-note-${lim.id}`}
                  key={lim.id} 
                  className={`p-3.5 rounded-lg border text-xs space-y-1 ${
                    lim.type === 'critical' || lim.type === 'warning'
                      ? 'bg-amber-50/50 border-amber-200 text-amber-900' 
                      : 'bg-blue-50/30 border-blue-100 text-blue-900'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    {lim.type === 'critical' || lim.type === 'warning' ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    ) : (
                      <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    )}
                    <span>{lim.title}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed pl-5 font-sans">
                    {lim.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
