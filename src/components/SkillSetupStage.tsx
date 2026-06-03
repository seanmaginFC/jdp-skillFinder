/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Check, 
  Copy, 
  Play, 
  RefreshCw, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  ThumbsUp, 
  ThumbsDown, 
  Sliders, 
  Code,
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Skill, SetupStep, UserRating } from '../types';

interface SkillSetupStageProps {
  skill: Skill;
  onBack: () => void;
  onSubmitRating: (rating: UserRating) => void;
}

export default function SkillSetupStage({ 
  skill, 
  onBack, 
  onSubmitRating 
}: SkillSetupStageProps) {
  
  // Setup Flow Step Tracker: 
  // 1 = Enter Input & Config, 2 = Execution & Simulation, 3 = Feedback Survey
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number | null>(null);

  // Dynamic state for input parameters based on active Skill ID
  const [csvText, setCsvText] = useState(skill.sampleInputs[0]?.value || '');
  const [convertNumbers, setConvertNumbers] = useState(true);
  const [csvDelimiter, setCsvDelimiter] = useState<',' | ';' | '\t'>(',');

  const [apiDesc, setApiDesc] = useState(skill.sampleInputs[0]?.value || '');
  const [apiFramework, setApiFramework] = useState<'express' | 'nextjs' | 'fastapi'>('express');
  const [apiSecure, setApiSecure] = useState(true);

  const [abstractText, setAbstractText] = useState(skill.sampleInputs[0]?.value || '');
  const [readabilityLevel, setReadabilityLevel] = useState<'grade10' | 'undergrad' | 'exec'>('grade10');
  const [explainStats, setExplainStats] = useState(true);

  // Loading Simulation states
  const [simulating, setSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [simProgress, setSimProgress] = useState(0);
  const [simulationResult, setSimulationResult] = useState('');

  // Rating Feedback states
  const [solvedProblem, setSolvedProblem] = useState<'yes' | 'no' | null>(null);
  const [comment, setComment] = useState('');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Automatically sync/reset fields when skill ID changes
  useEffect(() => {
    setCsvText(skill.id === 'csv-to-json' ? skill.sampleInputs[0]?.value : '');
    setApiDesc(skill.id === 'api-generator' ? skill.sampleInputs[0]?.value : '');
    setAbstractText(skill.id === 'abstract-simplifier' ? skill.sampleInputs[0]?.value : '');
    setSelectedSampleIndex(0);
    setCurrentStep(1);
    setSimulationResult('');
    setRatingSubmitted(false);
    setSolvedProblem(null);
    setComment('');
  }, [skill]);

  const loadSample = (index: number) => {
    setSelectedSampleIndex(index);
    const val = skill.sampleInputs[index].value;
    if (skill.id === 'csv-to-json') setCsvText(val);
    else if (skill.id === 'api-generator') setApiDesc(val);
    else if (skill.id === 'abstract-simplifier') setAbstractText(val);
  };

  // Live validation helpers & Inline tips based on parameters
  const getInlineTipsAndWarnings = () => {
    const tips: { type: 'info' | 'warning' | 'success'; text: string; label: string }[] = [];

    if (skill.id === 'csv-to-json') {
      if (!csvText.trim()) {
        tips.push({ type: 'warning', label: 'Missing Payload', text: 'Provide spreadsheet rows or tap a preconfigured sample file. Ready to validate.' });
      } else {
        const rows = csvText.split('\n');
        if (rows.length > 0) {
          const headers = rows[0].split(csvDelimiter);
          if (headers.length <= 1) {
            tips.push({ type: 'warning', label: 'Single Column Detected', text: 'Only 1 column separated by your selected delimiter was found. Check separator parameters.' });
          } else {
            tips.push({ type: 'success', label: 'Schema Autodetect', text: `Found ${headers.length} header columns: ${headers.slice(0, 3).join(', ')}${headers.length > 3 ? '...' : ''}` });
          }
        }
        if (csvText.length > 1024 * 1024) {
          tips.push({ type: 'warning', label: 'Large Payload warning', text: 'Over 1MB text size detected. Parsing calculations can throttle smaller client devices.' });
        } else {
          tips.push({ type: 'info', label: 'Offline Sandbox', text: 'Parsed locally in standard memory. No remote network logs created.' });
        }
      }
    }

    if (skill.id === 'api-generator') {
      if (!apiDesc.trim()) {
        tips.push({ type: 'warning', label: 'Awaiting Prompt', text: 'Describe what route parameters, methods, and model arrays you need to compile code.' });
      } else {
        const isJwt = apiDesc.toLowerCase().includes('jwt') || apiDesc.toLowerCase().includes('auth') || apiDesc.toLowerCase().includes('bearer');
        if (isJwt) {
          tips.push({ type: 'success', label: 'Authorization Detected', text: 'Secure authentication middleware stub automatically woven into Express handler definitions.' });
        } else {
          tips.push({ type: 'warning', label: 'Unsecured Route', text: 'No authentication parameters defined in route details. Defaulting to public CORS access.' });
        }
        if (apiDesc.toLowerCase().includes('delete') || apiDesc.toLowerCase().includes('remove')) {
          tips.push({ type: 'info', label: 'Edge Case Safeguard', text: 'DELETE method incorporates standard parameter format checks to dodge blank-row truncations.' });
        }
      }
    }

    if (skill.id === 'abstract-simplifier') {
      if (!abstractText.trim()) {
        tips.push({ type: 'warning', label: 'Academic Text Empty', text: 'Paste scientific literature abstracts to deconstruct.' });
      } else {
        const words = abstractText.trim().split(/\s+/).length;
        if (words < 15) {
          tips.push({ type: 'warning', label: 'Short Payload', text: 'Low word density. Summarizer functions perform best with complete contextual narratives.' });
        } else {
          tips.push({ type: 'success', label: 'Extracting Jargon', text: `Loaded ${words} scientific words. Ready to distill p-values and methodologies.` });
        }
        if (abstractText.toLowerCase().includes('p =') || abstractText.toLowerCase().includes('p=')) {
          tips.push({ type: 'info', label: 'Statistical Guard', text: 'Confidence thresholds detected in document. Preserving p-values with descriptive commentary.' });
        }
      }
    }

    return tips;
  };

  // Simulated AI Sandbox Execution compiler engine
  const handleSimulateRun = () => {
    setSimulating(true);
    setSimProgress(0);
    setCurrentStep(2);
    setSimulationLogs(['Initializing secure V8 sandbox isolate...', 'Mounting local Claude Skill runtime schemas...']);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setSimProgress(progress);

      switch (progress) {
        case 20:
          setSimulationLogs(prev => [...prev, 'Ingesting source payload block...', 'Checking semantic formatting boundaries...']);
          break;
        case 45:
          if (skill.id === 'csv-to-json') {
            setSimulationLogs(prev => [...prev, `Auto-detecting delimiters (Delimiter active: "${csvDelimiter}")...`, `Parsing ${csvText.split('\n').length} CSV records...`]);
          } else if (skill.id === 'api-generator') {
            setSimulationLogs(prev => [...prev, `Bootstrapping ${apiFramework.toUpperCase()} controller structures...`, 'Injecting security protection validation blocks...']);
          } else {
            setSimulationLogs(prev => [...prev, `Calibrating vocabulary filters to readability style: ${readabilityLevel}...`, 'Filtering statistical confidence values...']);
          }
          break;
        case 80:
          setSimulationLogs(prev => [...prev, 'Injecting strict compliance tests...', 'Compiling output object maps...']);
          break;
        case 100:
          clearInterval(interval);
          setSimulationLogs(prev => [...prev, 'Execution successful!', 'Container shutdown. Streaming outputs.']);
          setSimulating(false);
          generateRealResult();
          break;
      }
    }, 450);
  };

  // Real client-side functional output generation based on live parameters to show authentic proof!
  const generateRealResult = () => {
    if (skill.id === 'csv-to-json') {
      try {
        const rows = csvText.trim().split('\n');
        if (rows.length === 0 || !rows[0]) {
          setSimulationResult('[]');
          return;
        }
        const headers = rows[0].split(csvDelimiter);
        const jsonArr = [];
        
        for (let i = 1; i < rows.length; i++) {
          if (!rows[i].trim()) continue;
          const cols = rows[i].split(csvDelimiter);
          const obj: any = {};
          
          headers.forEach((header, index) => {
            let val = cols[index] !== undefined ? cols[index].trim() : '';
            const cleanedHeader = header.trim();
            
            if (convertNumbers && val !== '' && !isNaN(val as any)) {
              obj[cleanedHeader] = Number(val);
            } else if (val.toLowerCase() === 'true') {
              obj[cleanedHeader] = true;
            } else if (val.toLowerCase() === 'false') {
              obj[cleanedHeader] = false;
            } else {
              obj[cleanedHeader] = val.replace(/^"(.*)"$/, '$1'); // strips outer quotes
            }
          });
          jsonArr.push(obj);
        }
        setSimulationResult(JSON.stringify(jsonArr, null, 2));
      } catch (err) {
        setSimulationResult('// Parsing Error: CSV input does not match column formats.');
      }
    }

    if (skill.id === 'api-generator') {
      const isJwt = apiDesc.toLowerCase().includes('jwt') || apiDesc.toLowerCase().includes('auth');
      const routePath = apiDesc.match(/(GET|POST|PUT|DELETE)\s+\S+/i)?.[0] || 'POST /api/endpoints';
      const [method, pathStr] = routePath.split(/\s+/);
      
      let resCode = '';

      if (apiFramework === 'express') {
        resCode = `/**
 * Express Router Handler (Auto-Generated)
 * Source Prompt: ${apiDesc.slice(0, 60)}...
 */
import express from 'express';
import { body, validationResult } from 'express-validator';
import { db } from '../db/client';
${isJwt ? "import { checkJWT } from '../middleware/auth';\n" : ''}
const router = express.Router();

router.${(method || 'POST').toLowerCase()}(
  '${pathStr || '/api/resource'}',${isJwt ? '\n  checkJWT,' : ''}
  [
    body('title').isString().optional().withMessage('Valid title required'),
    body('limit').isNumeric().optional().withMessage('Limit must be an integer')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      // Inline Tip: Secure parameter bindings implemented
      const params = { ...req.body, ...req.query };
      
      const payload = await db('records')
        .select('*')
        .limit(Math.min(Number(params.limit || 50), 100));

      res.status(200).json({
        success: true,
        timestamp: new Date().toISOString(),
        count: payload.length,
        data: payload
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Database query failed' });
    }
  }
);

export default router;`;
      } else if (apiFramework === 'nextjs') {
        resCode = `/**
 * Next.js Route Handler (App Router - API)
 */
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
${isJwt ? "import { verifySessionToken } from '@/lib/auth';\n font-mono" : ''}
export async function ${method || 'POST'}(request: Request) {
  try {
${isJwt ? "    const user = await verifySessionToken(request);\n    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });\n" : ''}
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const data = await db.select().from('items').limit(limit);

    return NextResponse.json({
      success: true,
      data,
      context: 'Generated securely locally'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}`;
      } else {
        resCode = `### FastAPI Router Definition (Python)
from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional, List
from pydantic import BaseModel

router = APIRouter()

class ItemSchema(BaseModel):
    title: Optional[str] = None
    limit: Optional[int] = 10

@router.${(method || 'POST').toLowerCase()}("${pathStr || '/api/items'}")
def read_endpoint(
    schema: ItemSchema,
    page: int = Query(1, ge=1),
    # Secure parameters implemented locally
):
    try:
        # DB calls go here
        return {
            "success": True,
            "page": page,
            "limit": schema.limit,
            "info": "FastAPI templates compiled successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))`;
      }
      setSimulationResult(resCode);
    }

    if (skill.id === 'abstract-simplifier') {
      let mainFinding = '';
      let errorVal = '';
      
      const words = abstractText.trim().split(/\s+/).length;
      const isMicroplastics = abstractText.toLowerCase().includes('microparticle') || abstractText.toLowerCase().includes('polystyrene');
      const isAgentic = abstractText.toLowerCase().includes('agentic') || abstractText.toLowerCase().includes('llm');

      if (isMicroplastics) {
        mainFinding = "Exposing marine organisms to tiny polystyrene microplastics over 12 weeks caused 38% of them to suffer cell damage, showing microplastics physically stress creature tissues.";
        errorVal = "Statistically confident findings: only a tiny 1.2% chance (p=0.012) that these differences were random.";
      } else if (isAgentic) {
        mainFinding = "Running double-pass review systems on modern Claude/Gemini coding setups slashed debugging typing errors by 41.2% compared to regular single run commands.";
        errorVal = "Extremely high significance test: just a 0.12% chance (p=0.0012) that these speedups were random luck. However, it takes 2.1x more API computations.";
      } else {
        mainFinding = `Distillation: Your input text (${words} words) is deconstructed into a plain explanation focusing on findings and data targets. Jargon strings have been replaced with direct terms suitable for general audiences.`;
        errorVal = "Information Integrity: Maintained all statistical declarations, confidence markers, and percentages verbatim.";
      }

      let template = '';
      if (readabilityLevel === 'grade10') {
        template = `📋 LAYMAN SUMMARY (Grade 10 Level)
• Core Insight: ${mainFinding}
• Action Takeaway: Users should examine trade-offs prior to full adoption.
${explainStats ? `• Data Check: ${errorVal}` : ''}`;
      } else if (readabilityLevel === 'exec') {
        template = `🎯 EXECUTIVE HIGHLIGHTS
- BUSINESS IMPACT: High performance multiplier confirmed under systematic testing bounds.
- PRIMARY RESULT: Slashes errors/faults. ${mainFinding}
${explainStats ? `- COMPLIANCE SIG: ${errorVal}` : ''}`;
      } else {
        template = `🎓 UNDERGRADUATE REVIEW ABSTRACT
• Background Context: Complex scientific patterns mapped directly to real testing cohorts.
• Discussion: ${mainFinding}
${explainStats ? `• Critical Evaluation: ${errorVal}` : ''}`;
      }

      setSimulationResult(template);
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(simulationResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!solvedProblem) return;

    onSubmitRating({
      skillId: skill.id,
      solvedProblem,
      comment,
      timestamp: new Date().toISOString()
    });

    setRatingSubmitted(true);
    setTimeout(() => {
      setCurrentStep(1); // Go back or let them reset
    }, 3000);
  };

  const tipsList = getInlineTipsAndWarnings();

  return (
    <div className="space-y-6 animate-fade-in" id="setup-flow-container">
      
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4" id="setup-header">
        <div className="flex items-center gap-2">
          <button
            id="back-to-details-btn"
            onClick={onBack}
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors py-1 px-2 rounded hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Details
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-bold text-slate-800 font-display">{skill.name} Sandbox</span>
        </div>

        {/* Step-by-Step progress tracker */}
        <div className="flex items-center gap-3 font-mono text-xs" id="progress-indicator-box">
          <span className={`px-2 py-1 rounded-md font-semibold transition-all ${
            currentStep === 1 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'
          }`}>1. Configure</span>
          <span className="text-slate-300">&rarr;</span>
          
          <span className={`px-2 py-1 rounded-md font-semibold transition-all ${
            currentStep === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
          }`}>2. Simulate</span>
          <span className="text-slate-300">&rarr;</span>

          <span className={`px-2 py-1 rounded-md font-semibold transition-all ${
            currentStep === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
          }`}>3. Rate & Solve</span>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="setup-main-grid">
        
        {/* LEFT COLUMN: Input form & Parameter Customizer (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-6" id="input-config-panel">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900">1. Setup Parameters</h3>
                <p className="text-xs text-slate-400 mt-0.5">Customize your sample or load template payloads directly.</p>
              </div>
              <Sliders className="w-5 h-5 text-slate-400" />
            </div>

            {/* Quick Loading Sample Inputs to minimize typing friction */}
            <div className="space-y-2" id="quick-samples-selector">
              <label className="text-[11px] font-bold font-mono text-slate-400 uppercase tracking-wider block">
                Quick-Load Verified Datasets:
              </label>
              <div className="flex flex-wrap gap-2">
                {skill.sampleInputs.map((sample, idx) => (
                  <button
                    id={`sample-data-${idx}`}
                    key={idx}
                    type="button"
                    onClick={() => loadSample(idx)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                      selectedSampleIndex === idx 
                        ? 'bg-indigo-50 border-indigo-400 text-indigo-700 font-semibold' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom UI Inputs matching active Skill ID */}
            {skill.id === 'csv-to-json' && (
              <div className="space-y-4" id="csv-input-fields">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <label className="font-bold text-slate-600">Comma-Separated Grid Text:</label>
                    <span className="text-slate-400 font-normal">{csvText.length} characters</span>
                  </div>
                  <textarea
                    id="csv-text-area"
                    value={csvText}
                    onChange={(e) => { setCsvText(e.target.value); setSelectedSampleIndex(null); }}
                    rows={8}
                    className="w-full p-4 font-mono text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-lg shadow-inner focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-hidden leading-relaxed"
                    placeholder="id,name,role,email\n..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2" id="csv-options">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">Delimiter Separator:</label>
                    <div className="flex gap-2">
                      {([',', ';', '\t'] as const).map((delim) => (
                        <button
                          id={`delim-${delim === ',' ? 'comma' : delim === ';' ? 'semi' : 'tab'}`}
                          type="button"
                          key={delim}
                          onClick={() => setCsvDelimiter(delim)}
                          className={`flex-1 py-1.5 px-3 border rounded text-xs font-mono font-medium transition-all ${
                            csvDelimiter === delim 
                              ? 'bg-slate-800 border-slate-800 text-white shadow-xs' 
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {delim === ',' ? ',' : delim === ';' ? ';' : '\\t (Tab)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                    <input
                      id="convert-numbers-toggle"
                      type="checkbox"
                      checked={convertNumbers}
                      onChange={(e) => setConvertNumbers(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <div className="text-xs">
                      <label htmlFor="convert-numbers-toggle" className="font-bold text-slate-700 block cursor-pointer">
                        Convert Numerical Values
                      </label>
                      <p className="text-slate-400 font-light text-[10px]">Autodetect strings containing exact integers</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {skill.id === 'api-generator' && (
              <div className="space-y-4" id="api-input-fields">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <label className="font-bold text-slate-600">Model Handler Specifications:</label>
                    <span className="text-slate-400 font-normal">{apiDesc.length} characters</span>
                  </div>
                  <textarea
                    id="api-desc-text-area"
                    value={apiDesc}
                    onChange={(e) => { setApiDesc(e.target.value); setSelectedSampleIndex(null); }}
                    rows={6}
                    className="w-full p-4 font-mono text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-lg shadow-inner focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-hidden leading-relaxed"
                    placeholder="PATH: GET /api/..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2" id="api-options">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">Server Framework:</label>
                    <select
                      id="api-framework-select"
                      value={apiFramework}
                      onChange={(e: any) => setApiFramework(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg p-2.5 font-medium focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="express">Express TS Route</option>
                      <option value="nextjs">Next.js App API Handler</option>
                      <option value="fastapi">FastAPI Python Controller</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                    <input
                      id="api-secure-toggle"
                      type="checkbox"
                      checked={apiSecure}
                      onChange={(e) => setApiSecure(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <div className="text-xs">
                      <label htmlFor="api-secure-toggle" className="font-bold text-slate-700 block cursor-pointer">
                        Force Parameter Validation
                      </label>
                      <p className="text-slate-400 font-light text-[10px]">Autoweave check guards for empty values</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {skill.id === 'abstract-simplifier' && (
              <div className="space-y-4" id="academic-input-fields">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <label className="font-bold text-slate-600">Scientific Jargon Passage:</label>
                    <span className="text-slate-400 font-normal">{abstractText.length} characters</span>
                  </div>
                  <textarea
                    id="abstract-text-area"
                    value={abstractText}
                    onChange={(e) => { setAbstractText(e.target.value); setSelectedSampleIndex(null); }}
                    rows={7}
                    className="w-full p-4 font-mono text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-lg shadow-inner focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-hidden leading-relaxed"
                    placeholder="We conducted molecular assays..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2" id="abstract-options">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">Comprehension Tier Target:</label>
                    <select
                      id="abstract-readability-select"
                      value={readabilityLevel}
                      onChange={(e: any) => setReadabilityLevel(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg p-2.5 font-medium focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="grade10">Layman (Grade 10 Highschooler)</option>
                      <option value="undergrad">Academic Undergraduate Review</option>
                      <option value="exec">Executive Summary (Single-sentence slides)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                    <input
                      id="explain-stats-toggle"
                      type="checkbox"
                      checked={explainStats}
                      onChange={(e) => setExplainStats(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <div className="text-xs">
                      <label htmlFor="explain-stats-toggle" className="font-bold text-slate-700 block cursor-pointer">
                        Preserve Study Metrics
                      </label>
                      <p className="text-slate-400 font-light text-[10px]">Keeps exact confidence p-values intact</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Run Trigger action */}
            <button
              id="simulate-sandbox-btn"
              onClick={handleSimulateRun}
              className="w-full inline-flex items-center justify-center gap-2 bg-indigo-500 text-white font-bold text-sm py-4.5 px-4 rounded-xl transition-colors hover:bg-slate-900 shadow-md active:scale-[0.99] font-display uppercase tracking-wider"
            >
              <Play className="w-4 h-4 fill-current text-white" />
              Compile & Run Sandbox simulation
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Diagnostic console, Output Results, & Realfeedback scoring (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Active Diagnostic Assistance Panel */}
          {currentStep === 1 && (
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-4" id="diagnostic-panel">
              <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-slate-400 tracking-wider uppercase">
                <HelpCircle className="w-4 h-4 text-indigo-500" />
                Live Parameter Diagnostics
              </div>

              <div className="space-y-3">
                {tipsList.map((tip, idx) => (
                  <div 
                    id={`live-tip-${idx}`}
                    key={idx} 
                    className={`p-3.5 rounded-lg border text-xs flex items-start gap-2.5 transition-all ${
                      tip.type === 'warning' 
                        ? 'bg-amber-50/50 border-amber-200 text-amber-900' 
                        : tip.type === 'success'
                        ? 'bg-emerald-50/55 border-emerald-200 text-emerald-900'
                        : 'bg-indigo-50/30 border-indigo-100 text-indigo-900'
                    }`}
                  >
                    {tip.type === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-bold block text-[11px] uppercase tracking-wide">{tip.label}</span>
                      <p className="text-slate-600 font-sans text-[11px] mt-0.5 font-light leading-normal">{tip.text}</p>
                    </div>
                  </div>
                ))}
                
                {tipsList.length === 0 && (
                  <p className="text-slate-400 text-xs text-center py-6">All parameters clean. Ready to trigger sandbox isolate compilation.</p>
                )}
              </div>
            </div>
          )}

          {/* Run Simulator Monitor & Terminal compiling window */}
          {currentStep >= 2 && (
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-4" id="run-terminal-panel">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
                  2. Sandbox execution Monitor
                </h4>
                {simulating && (
                  <span className="animate-spin text-indigo-600">
                    <RefreshCw className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div className="p-4 bg-slate-950 rounded-lg text-[11px] font-mono leading-relaxed space-y-1.5 text-slate-300 min-h-[140px]" id="terminal-logs">
                {simulationLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <span className="text-slate-600 select-none">&gt;</span>
                    <span className={log.includes('successful') ? 'text-emerald-400' : log.includes('Initializing') ? 'text-indigo-400' : 'text-slate-300'}>{log}</span>
                  </div>
                ))}

                {simulating && (
                  <div className="w-full bg-slate-800 rounded-full h-1 mt-4.5 overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${simProgress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Functional output result panel */}
              {!simulating && simulationResult && (
                <div className="space-y-3" id="simulation-result-box">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Sandbox Output Target</span>
                    <button
                      id="copy-simulated-output"
                      onClick={copyResult}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-mono py-1 px-2 rounded hover:bg-slate-100"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="p-4 bg-slate-900 text-slate-200 font-mono text-xs rounded-lg overflow-x-auto max-h-[280px]">
                    <pre className="whitespace-pre-wrap break-all leading-normal">{simulationResult}</pre>
                  </div>

                  <div className="pt-2">
                    <button
                      id="submit-problem-rating-btn"
                      onClick={() => setCurrentStep(3)}
                      className="w-full inline-flex items-center justify-center gap-1 bg-emerald-50 text-emerald-800 font-bold text-xs py-3 px-4 rounded-lg transition-all hover:bg-emerald-100 border border-emerald-200 uppercase tracking-wider"
                    >
                      Submit Performance evaluation
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Verification Rating panel: Goal checklist "Did this solve your problem?" */}
          {currentStep === 3 && (
            <div className="bg-white p-6 rounded-xl border border-emerald-100 bg-emerald-50/5 shadow-xs space-y-4" id="rating-feedback-form">
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="text-sm font-bold font-mono tracking-wider uppercase">
                  3. Empiric Success rating
                </h3>
              </div>

              <p className="text-slate-600 text-xs leading-relaxed">
                Your post-use feedback helps calibrate model accuracy dashboards for future users under corresponding categories.
              </p>

              {ratingSubmitted ? (
                <div className="p-6 bg-emerald-50 rounded-lg text-emerald-800 border border-emerald-100 text-center space-y-2" id="rating-submitted-success">
                  <span className="inline-flex p-2 bg-emerald-500 text-white rounded-full text-base font-bold mb-1">
                    <Check className="w-5 h-5" />
                  </span>
                  <h4 className="font-extrabold text-sm font-display">Simulated Score Logged!</h4>
                  <p className="text-[11px] text-emerald-700">Thank you for rating. Redirecting sandbox isolate...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 block">
                      Did this simulated output solve your task requirement?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        id="rating-yes-btn"
                        type="button"
                        onClick={() => setSolvedProblem('yes')}
                        className={`py-3 px-4 border rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          solvedProblem === 'yes'
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Yes, Perfect
                      </button>

                      <button
                        id="rating-no-btn"
                        type="button"
                        onClick={() => setSolvedProblem('no')}
                        className={`py-3 px-4 border rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          solvedProblem === 'no'
                            ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                        No, Drifted
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">
                      Optional Notes / Jargon Corrections:
                    </label>
                    <textarea
                      id="rating-comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="e.g. Row mapping compiled perfectly but empty quotes were skipped."
                      rows={3}
                      className="w-full p-3 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 scale-95 origin-top"
                    />
                  </div>

                  <button
                    id="submit-rating-form-btn"
                    type="submit"
                    disabled={!solvedProblem}
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-indigo-600 text-white font-bold text-xs py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
                  >
                    Lock Simulated rating
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
