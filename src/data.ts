/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Skill } from './types';

export const SKILLS_DATA: Skill[] = [
  {
    id: 'csv-to-json',
    name: 'CSV to JSON Converter',
    tagline: 'Transform CSV datasets and tabular columns into web-ready structural JSON shapes.',
    description: 'Quickly map rows and columns into fully customizable nested JSON configurations.',
    longDescription: 'Our smart data parsing skill auto-detects column separators, handles missing rows gracefully, converts numeric strings, and maps values to recursive keys. It ensures that output complies strictly with ECMA-404 JSON parameters.',
    category: 'data',
    iconName: 'Database',
    popularity: '5.2K active uses this week',
    successRate: '98.4%',
    typicalRunTime: '0.8 - 1.5s',
    averageSessionTime: '2.5 mins saved',
    problemSolved: 'Converts unstructured, separator-heavy spreadsheet dumps into developer-friendly objects. Eliminates the endless pain of manually handling nested schemas, broken quotations, trailing commas, or incorrect row formats.',
    examples: {
      label: 'Tabular Record Conversion',
      input: 'id,name,role,joined,active\n101,Sarah Jenkins,Data Lead,2024-01-10,true\n102,Marcus Vance,Developer,2023-11-15,false',
      output: '[\n  {\n    "id": 101,\n    "name": "Sarah Jenkins",\n    "role": "Data Lead",\n    "joined": "2024-01-10",\n    "active": true\n  },\n  {\n    "id": 102,\n    "name": "Marcus Vance",\n    "role": "Developer",\n    "joined": "2023-11-15",\n    "active": false\n  }\n]'
    },
    metrics: [
      {
        id: 'csv_m1',
        label: 'Format Accuracies',
        value: '99.9%',
        description: 'Successfully parses against strict RFC-4180 specifications'
      },
      {
        id: 'csv_m2',
        label: 'Time Boost',
        value: '12x',
        description: 'Faster than installing scripts or importing third-party libraries'
      },
      {
        id: 'csv_m3',
        label: 'Auto-Keys mapped',
        value: '44K+',
        description: 'Key mappings created without user configuration'
      }
    ],
    limitations: [
      {
        id: 'csv_l1',
        title: 'Buffer Ceiling',
        text: 'Optimized for processing datasets up to 8MB. Exceeding this may exhaust local browser thread capacity.',
        type: 'warning'
      },
      {
        id: 'csv_l2',
        title: 'Flat Structures Only',
        text: 'Initial inputs must start with a header column row. Relational nesting requires setting secondary key maps in settings.',
        type: 'info'
      },
      {
        id: 'csv_l3',
        title: 'Excel Carriage Returns',
        text: 'Old Macintosh Excel carriage returns (\\r) must be transformed to standard Unix line breaks (\\n) prior to execution.',
        type: 'warning'
      }
    ],
    testimonials: [
      {
        id: 'csv_t1',
        name: 'Sarah Jenkins',
        role: 'Data Operations Lead',
        company: 'Apex Logistics',
        category: 'Data Engineering',
        text: 'Instead of loading up Python pandas or spinning up a Jupyter Notebook for small database seeding file tasks, I paste my raw logistics rows here and get custom nested JSON outputs in under 2 seconds. The risk disclaimer gave me exactly what I needed regarding file size!'
      },
      {
        id: 'csv_t2',
        name: 'Marcus Vance',
        role: 'Fullstack Dev',
        company: 'Krypton Labs',
        category: 'Developer',
        text: 'Most online parsing portals are crammed with spam ads and sell your clipboard content. Having a clean, offline-safe Claude Skill with strict limitations documented transparently upfront makes an incredible difference for safe dev workflows.'
      }
    ],
    setupSteps: [
      {
        title: 'Upload or Paste CSV Input',
        description: 'Paste your raw comma-separated spreadsheet data or select a preconfigured template to feed the parser.',
        status: 'active',
        requiredFieldId: 'csv_input'
      },
      {
        title: 'Configure Mapping Options',
        description: 'Explicitly specify if numerical properties should preserve string formats or convert to strict JavaScript numbers.',
        status: 'pending',
        requiredFieldId: 'convert_numbers'
      },
      {
        title: 'Review Schema & Live Preview',
        description: 'Verify detected column profiles and run an optimized sandbox simulation on your sample container.',
        status: 'pending'
      }
    ],
    sampleInputs: [
      {
        label: 'Team Members Directory',
        value: 'id,first_name,last_name,department,remote\n1,Alina,Bauer,Product,true\n2,Erick,Ochoa,Engineering,false\n3,Saanvi,Patel,Design,true'
      },
      {
        label: 'SaaS Pricing Table',
        value: 'plan_name,monthly_fee,max_users,tier,included_api\nFree,0,3,tier-1,false\nPro,49,15,tier-2,true\nEnterprise,299,99,tier-3,true'
      },
      {
        label: 'Monthly Marketing KPIs',
        value: 'month,clicks,impressions,cpc,signups\nJan,4100,52000,0.45,120\nFeb,4800,61000,0.42,165\nMar,6200,81000,0.38,245'
      }
    ]
  },
  {
    id: 'api-generator',
    name: 'API Endpoint Route Generator',
    tagline: 'Write production-ready Express, Next.js API router handlers, or FastAPI endpoints instantly.',
    description: 'Transform endpoint names and query structures into secure, validated handler snippets.',
    longDescription: 'Generates robust routing functions, parsing logic, typing structures, express-validator integrations, error limits, and database client hooks. Strictly structures files to match standardized server controllers.',
    category: 'developer',
    iconName: 'Terminal',
    popularity: '3.8K active uses this week',
    successRate: '94.2%',
    typicalRunTime: '1.5 - 2.5s',
    averageSessionTime: '4.8 mins saved',
    problemSolved: 'Ends boilerplate fatigue. Stops developers from copying-pasting old, vulnerable endpoint file layouts with missing req.body parameters, forgot-to-close try/catch errors, and loose query type conversions.',
    examples: {
      label: 'REST Controller Draft',
      input: 'PATH: POST /api/items\nPARAMS: title (string, required), price (float, required), tags (array of strings, optional)\nAUTH: JWT Admin Required',
      output: 'import express from "express";\nimport { body, validationResult } from "express-validator";\nimport { db } from "../db/client";\nimport { checkAdminJWT } from "../middleware/auth";\n\nconst router = express.Router();\n\nrouter.post(\n  "/api/items",\n  checkAdminJWT,\n  [\n    body("title").isString().notEmpty().withMessage("Title is required"),\n    body("price").isFloat({ min: 0 }).withMessage("Price must be a positive float"),\n    body("tags").optional().isArray().withMessage("Tags must be a string array")\n  ],\n  async (req, res) => {\n    const errors = validationResult(req);\n    if (!errors.isEmpty()) {\n      return res.status(400).json({ success: false, errors: errors.array() });\n    }\n    \n    try {\n      const { title, price, tags = [] } = req.body;\n      const [newItem] = await db("items")\n        .insert({ title, price, tags: JSON.stringify(tags) })\n        .returning("*");\n        \n      res.status(201).json({ success: true, item: newItem });\n    } catch (error) {\n      res.status(500).json({ success: false, error: "Internal Database Fault" });\n    }\n  }\n);'
    },
    metrics: [
      {
        id: 'api_m1',
        label: 'TypeScript Accuracy',
        value: '100%',
        description: 'Outputs enforce zero "any" types and use strict interface boundaries'
      },
      {
        id: 'api_m2',
        label: 'SQL Sanitization',
        value: 'Secured',
        description: 'Utilizes knex binds or parameterized drivers to avert standard injection'
      },
      {
        id: 'api_m3',
        label: 'Developer Rating',
        value: '4.9 / 5',
        description: 'User-voted favorite for microservice controller construction'
      }
    ],
    limitations: [
      {
        id: 'api_l1',
        title: 'Authentication Sandbox',
        text: 'Automatically templates middleware stubs (`checkAdminJWT`), but standard database token verification databases are not built-in.',
        type: 'warning'
      },
      {
        id: 'api_l2',
        title: 'Third-Party Frameworks',
        text: 'Supports Express, Next.js (App Router), and FastAPI (Python). Custom backend networks like Go Fiber or Rust Actix are not natively supported.',
        type: 'info'
      }
    ],
    testimonials: [
      {
        id: 'api_t1',
        name: 'Elena Rostova',
        role: 'Tech Lead / Senior Developer',
        company: 'Nordic Stack',
        category: 'Backend Architect',
        text: 'I maintain highly rigorous typescript standards. Standard LLMs hallucinate library structures. Testing this Claude Skill, what amazed me is the deliberate inclusion of express-validator schema lists with proper TS definitions in the card. No fluff, just production-level standards.'
      },
      {
        id: 'api_t2',
        name: 'Kevin Lang',
        role: 'Fullstack Dev',
        company: 'Veloce Digital',
        category: 'Developer',
        text: 'Absolute timesaver. I map out custom fields like GET query limits and it shapes perfect parameterized routes. This replaces all the boring boilerplate stuff so we can code business logic.'
      }
    ],
    setupSteps: [
      {
        title: 'Enter Route Definition',
        description: 'Describe your path, HTTP verb (GET/POST/DELETE), parameters, and security requirements clearly.',
        status: 'active',
        requiredFieldId: 'route_desc'
      },
      {
        title: 'Select Code Stack',
        description: 'Choose your server framework (Express / Node TS vs Next.js vs FastAPI) and SQL or ORM driver.',
        status: 'pending',
        requiredFieldId: 'framework_selection'
      },
      {
        title: 'Generate Controller Code',
        description: 'Trigger the generator to formulate security checks, schema bounds, and db queries.',
        status: 'pending'
      }
    ],
    sampleInputs: [
      {
        label: 'GET Paginated Users List',
        value: 'PATH: GET /api/users\nQUERY PARAMS: page (number, default 1), limit (number, max 100), activeOnly (boolean)\nDESCRIPTION: Return list of users filtered by active status with pagination limits'
      },
      {
        label: 'POST Create New Order with JWT',
        value: 'PATH: POST /api/orders\nHEADERS: Authorization Bearer (JWT Required)\nBODY: items (array containing objects with itemId & quantity), couponCode (string, optional)\nDESCRIPTION: Subtracts catalog inventory and posts a pending commerce order state'
      },
      {
        label: 'DELETE Revoke Admin Access',
        value: 'PATH: DELETE /api/admin/permissions\nPARAMS: userId (UUID in query path), revokedReason (string in body, max 200 chars)\nSECURITY: Superadmin flag check in context session'
      }
    ]
  },
  {
    id: 'abstract-simplifier',
    name: 'Academic Abstract Simplifier',
    tagline: 'Deconstruct dense scientific literature and medical journals into plain layman explanations.',
    description: 'Transform complex doctoral abstracts into clear, comprehensible summaries without losing statistical validity.',
    longDescription: 'Designed for research journalists, scholars, and medical consumers. Translates highly specialized nomenclature, statistical deviations, and algorithmic conclusions into a comprehensive grade-10 readability profile. Strictly maintains standard deviation, error margins, and patient results.',
    category: 'writing',
    iconName: 'BookOpen',
    popularity: '2.5K active uses this week',
    successRate: '92.6%',
    typicalRunTime: '2.2 - 3.8s',
    averageSessionTime: '6.5 mins saved',
    problemSolved: 'Conquers scientific jargon wall. Enables content creators and curious readers to immediately extract the "so what?" of a 30-page research abstract without losing the underlying statistical significance.',
    examples: {
      label: 'Oncology Trial Summary',
      input: 'Evaluating a cohort (n=120, median age 62) diagnosed with secondary stage refractory pulmonic sarcomas, we deployed peptide-compound AX-901 at high densities. Findings indicated tumor volumetric contraction (p = 0.0034) with mean stability index improvements at 40 weeks (+12.4%). Adverse grade-3 toxicities occurred in 4% of target units, resolving natively upon dose configuration.',
      output: '• Core Finding: Tests on 120 lung cancer patients showed that the new peptide-compound (AX-901) shrunk tumors and boosted health stability over 40 weeks, with very high certainty (only a 0.34% chance the results were random).\n• Side Effects: Serious side effects were rare (just 4% of participants) and were solved by simply modifying the medicine dose.'
    },
    metrics: [
      {
        id: 'acad_m1',
        label: 'Reading Grade Metric',
        value: 'Grade 10',
        description: 'Transforms text from post-doctorate to average public digest level'
      },
      {
        id: 'acad_m2',
        label: 'Data Drift Safeguard',
        value: '100% Guarded',
        description: 'Retains sample size (n), confidence levels, and exact percentages'
      },
      {
        id: 'acad_m3',
        label: 'Hallucination Check',
        value: '0% Drift',
        description: 'No foreign facts or external context injected during translation'
      }
    ],
    limitations: [
      {
        id: 'acad_l1',
        title: 'Word Count ceiling',
        text: 'Best suited for texts of 1,200 words or less (full abstracts). Books must be fed section by section to avoid loss of statistical context.',
        type: 'warning'
      },
      {
        id: 'acad_l2',
        title: 'Mixed Visual Charts',
        text: 'Cannot decipher graphics, drawings, or nested mathematical equation grids. Convert important equations to tabular text manually first.',
        type: 'info'
      }
    ],
    testimonials: [
      {
        id: 'acad_t1',
        name: 'Dr. Amara Thorne',
        role: 'Public Health Educator',
        company: 'Global Health Alliance',
        category: 'Scientific Communication',
        text: 'Science communication is incredibly tricky. If you summarize too much, you lose scientific accuracy. This skill maintains the sample size (n) and the p-value certainty but translates the dry jargon into public-facing sheets. Finding the specific word limitations documented upfront was a major signal that this was built professionally.'
      },
      {
        id: 'acad_t2',
        name: 'Thomas G.',
        role: 'Science Journalist',
        company: 'The Daily Digest',
        category: 'Writing & Journalism',
        text: 'What usually takes me an hour of deep annotation now takes 30 seconds. The structured layout highlights the statistical outcomes while explaining them in plain English. I can quickly verify the limitations and run target questions easily!'
      }
    ],
    setupSteps: [
      {
        title: 'Paste Abstract Paragraph',
        description: 'Provide the academic excerpt, study summary, or complex methodological overview in the text feed.',
        status: 'active',
        requiredFieldId: 'abstract_text'
      },
      {
        title: 'Configure Complexity Limits',
        description: 'Choose whether to target a high school, undergraduate, or executive business summary style.',
        status: 'pending',
        requiredFieldId: 'readability'
      },
      {
        title: 'Verify Results & Readability Details',
        description: 'Produce high-contrast simplified bullet points alongside rigorous statistical integrity tags.',
        status: 'pending'
      }
    ],
    sampleInputs: [
      {
        label: 'Agentic Workflow Efficacy',
        value: 'We tested agentic LLM loops (n=1440 tests) on semantic translation and debugging challenges matching human parameters. Using modern dual-pass reflection frameworks, error-rates plummeted by 41.2% (p = 0.0012) compared to single-shot zero-prompt queries. However, token latency elevated by a factor of 2.1x, highlighting significant hardware cost vs accuracy trade-offs in low-latency systems.'
      },
      {
        label: 'Microplastic Bio-accumulation',
        value: 'Investigating microparticle ingestion under controlled marine environments, we exposed target samples (n=50) to synthetic polystyrene spheres (size range 1-5μm) over 12 weeks. Cellular membrane degradation occurred in 38% of subjects (p = 0.012), correlated directly with higher dose rates. Control units in microplastic-free tanks experienced no such degradation (0%). We conclude biological buffers are severely stressed under dense exposure densities.'
      },
      {
        label: 'Smart Grid Battery Storage',
        value: 'This study presents an analysis of dual-ion battery architecture efficacy within isolated regional power networks under fluctuating wind-turbine solar patterns. Transitioning storage pools to high-density iron-flow modules demonstrated a 19.4% reduction in peak load power dropouts (95% CI, 14.2% to 24.6%) during variable atmospheric events. Computational simulations verify continuous longevity margins exceeding 15,000 deep cycles before degradation threshold breach.'
      }
    ]
  }
];
