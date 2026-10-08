# Molecule Forge
### Refinery-to-Chemicals Opportunity Discovery and Sustainable Route-Screening Platform

[![Deployment Status](https://img.shields.io/badge/Deployment-Vercel_Production_Ready-000000?style=flat-square&logo=vercel)](https://vercel.com)
[![Architecture](https://img.shields.io/badge/Architecture-Decoupled_Microservices-blue?style=flat-square)](#7-microservices-system-architecture)
[![Frontend](https://img.shields.io/badge/Frontend-React_19_%7C_Vite_8_%7C_Tailwind_v4-61DAFB?style=flat-square&logo=react)](./frontend)
[![Backend Engine](https://img.shields.io/badge/Backend-Node.js_%7C_Express_%7C_TypeScript-3178C6?style=flat-square&logo=typescript)](./backend)
[![ML Service](https://img.shields.io/badge/ML_Service-Python_%7C_FastAPI_%7C_RDKit-008080?style=flat-square&logo=fastapi)](./ml-service)
[![Standards](https://img.shields.io/badge/Metrics-ACS_GCI_Green_Chemistry-10B981?style=flat-square)](#5-quantitative-scoring-model-and-mathematical-framework)
[![Governance](https://img.shields.io/badge/Governance-Human--in--the--Loop-F59E0B?style=flat-square)](#10-risk-mitigation-governance-and-responsible-ai-positioning)

---

## Table of Contents

- [1. Executive Summary](#1-executive-summary)
- [2. The Industrial Problem Statement](#2-the-industrial-problem-statement)
- [3. The Proposed Solution: Five Analytical Pillars](#3-the-proposed-solution-five-analytical-pillars)
- [4. Ultra-Detailed Operational Workflow](#4-ultra-detailed-operational-workflow)
  - [4.1 Comprehensive Microservices Workflow Diagram](#41-comprehensive-microservices-workflow-diagram)
  - [4.2 The 14-Step End-to-End Decision Pipeline](#42-the-14-step-end-to-end-decision-pipeline)
  - [4.3 Relational Database Schema Design](#43-relational-database-schema-design)
- [5. Quantitative Scoring Model and Mathematical Framework](#5-quantitative-scoring-model-and-mathematical-framework)
  - [5.1 Multi-Attribute Forge Score Formulation](#51-multi-attribute-forge-score-formulation)
  - [5.2 Green Chemistry and Environmental Metrics](#52-green-chemistry-and-environmental-metrics)
- [6. Industrial Case Study: HMEL Bathinda Complex](#6-industrial-case-study-hmel-bathinda-complex)
  - [6.1 Feedstock Context](#61-feedstock-context)
  - [6.2 Downstream Valorization Scenario: Benzene to 4-H-3-MBN](#62-downstream-valorization-scenario-benzene-to-4-h-3-mbn)
  - [6.3 Multi-Route Trade-Off Evaluation Matrix](#63-multi-route-trade-off-evaluation-matrix)
- [7. Microservices System Architecture](#7-microservices-system-architecture)
  - [7.1 Microservice Repository Structure](#71-microservice-repository-structure)
  - [7.2 Service Responsibilities and Inter-Service Communication](#72-service-responsibilities-and-inter-service-communication)
- [8. Technology Stack Specification](#8-technology-stack-specification)
- [9. Installation and Deployment Guide](#9-installation-and-deployment-guide)
  - [9.1 Local Development Environment](#91-local-development-environment)
  - [9.2 Executing the Mathematical Scoring Engine CLI](#92-executing-the-mathematical-scoring-engine-cli)
  - [9.3 Production Deployment on Vercel](#93-production-deployment-on-vercel)
- [10. Risk Mitigation, Governance, and Responsible AI Positioning](#10-risk-mitigation-governance-and-responsible-ai-positioning)
- [11. Strategic Roadmap](#11-strategic-roadmap)
- [12. Engineering Team and National Hackathon Track Record](#12-engineering-team-and-national-hackathon-track-record)

---

## 1. Executive Summary

**Molecule Forge** is an enterprise-grade, computer-aided process screening and chemical route-discovery platform. It enables integrated petroleum refineries and petrochemical complexes to transition from bulk commodity fuel producers into high-margin specialty chemical, Key Starting Material (KSM), and pharmaceutical intermediate manufacturers.

By starting with available refinery aromatic cuts—including benzene, toluene, xylenes, and downstream phenol—the platform systematically generates, screens, and multi-objectively ranks retrosynthetic reaction pathways before capital-intensive laboratory validation is initiated.

```
       [ Refinery Aromatic Feedstock ]
         (Benzene / Toluene / Xylenes)
                       │
                       ▼
      ┌─────────────────────────────────┐
      │         MOLECULE FORGE          │  ◄── Rule-Based Retrosynthesis
      │      Core Screening Engine      │      + Techno-Economic Analysis (TEA)
      └────────────────┬────────────────┘      + Green Chemistry Matrix
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
   [ Route A ]    [ Route B ]   [ Route C ]
    Shortest     ★ Greenest      Domestic
    (3 Steps)     (Score: 81)   (92% Local)
         │             │             │
         └─────────────┼─────────────┘
                       ▼
      [ Actionable Experimental Validation Protocol ]
      (Risk Gates, Selectivity Targets, and Process Window)
```

> **Guiding Principle:** Molecule Forge serves as a deterministic decision-support instrument—analogous to a navigational engine for chemical engineering—allowing multidisciplinary teams to evaluate technical viability, capital costs, raw-material security, and environmental liabilities simultaneously.

---

## 2. The Industrial Problem Statement

Refinery operations generate abundant aromatic molecules alongside traditional transportation fuels. However, transforming these basic petrochemical intermediates into high-value specialty chemicals or pharmaceutical building blocks is hindered by severe cross-functional friction:

```
┌──────────────────┐       ┌──────────────────────┐       ┌──────────────────────┐
│  R&D / Chemistry │       │  Process Engineering │       │ Procurement / Supply │
│ Synthesizes route│ ───►  │ Identifies scale-up  │ ───►  │ Evaluates import     │
│ in the laboratory│       │ hazards & separations│       │ dependence & costs   │
└──────────────────┘       └──────────────────────┘       └──────────────────────┘
                                                                     │
                                                                     ▼
                                                          ┌──────────────────────┐
                                                          │ Business Development │
                                                          │ Screens margin       │
                                                          │ & market viability   │
                                                          └──────────────────────┘
```

### The Cost of Sequential Evaluation
In standard industrial workflows, prospective synthesis routes are evaluated in disconnected silos:
1. **Synthetic chemists** design a chemically viable route, optimizing solely for reaction yield in milligram-scale glassware.
2. **Process engineers** subsequently identify that Step 2 requires cryogenic cooling (-20 °C) or hazardous high-pressure autogenous conditions (>40 bar), introducing prohibitive plant CAPEX.
3. **Procurement teams** discover that critical coupling reagents or specialized organometallic catalysts suffer from 90%+ overseas import dependencies.
4. **Environmental teams** calculate unacceptable waste factors (E-factor > 30), highlighting heavy-metal or cyanide effluent compliance barriers.

Consequently, research initiatives waste months of laboratory throughput investigating pathways that ultimately fail commercial, regulatory, or operational viability gates.

---

## 3. The Proposed Solution: Five Analytical Pillars

Molecule Forge breaks departmental silos by unifying chemistry, chemical engineering, procurement, and sustainability into five integrated software pillars:

| Pillar | Functional Scope | Industrial Value |
|---|---|---|
| **I. Feedstock Intelligence Layer** | Digital mapping of refinery aromatics (benzene, toluene, xylenes), secondary streams (hexane, sulfur), and functional handles. | Connects captive refinery streams directly to addressable commercial product portfolios. |
| **II. Target-Product & Retrosynthesis** | Dual-mode pathway exploration: Feedstock-First (diversification) and Target-First (import substitution). | Identifies non-obvious disconnections while eliminating ungrounded generative chemistry hallucinations. |
| **III. Green Chemistry Screening** | Algorithmic calculation of E-Factor, Process Mass Intensity (PMI), Atom Economy, and solvent environmental hazards. | Eliminates regulatory and effluent liabilities prior to experimental synthesis. |
| **IV. SCM & Commercial Feasibility** | Multi-attribute assessment of domestic supplier availability, catalog pricing, and raw-material vulnerability. | Protects planned operational units from geopolitical dependencies and supply-chain shocks. |
| **V. Explainable Decision Governance** | Multi-criteria optimization resulting in a unified **Forge Score**, accompanied by transparent uncertainty profiles. | Provides chemists, engineering leads, and executive sponsors with audited technical rationale. |

---

## 4. Ultra-Detailed Operational Workflow

### 4.1 Comprehensive Microservices Workflow Diagram

```
════════════════════════════════════════════════════════════════════════════════════════════════════════════
                             MOLECULE FORGE DECOUPLED MICROSERVICE WORKFLOW
════════════════════════════════════════════════════════════════════════════════════════════════════════════

   [ CLIENT TIER : frontend/ ]
   React 19 Interactive Cockpit ────────┐
   • Feedstock Selector (Aromatics)      │ User Action: Select Feedstock / Target Molecule
   • Constraints Form (Steps, Solvents)  │ + Operational Boundaries (max 4 steps, green solvents)
   • Route Comparison Dashboard          │
   • Real-Time Radar Visualization       │
                                         ▼
   [ API GATEWAY & ORCHESTRATION : backend/server.ts ]
   Express / TypeScript Controller ──────┐
   • Request Payload Sanitization        │ Dispatches Asynchronous Requests
   • CORS & Token Validation             │ to Domain Microservices
   • Session Scenario Management         │
                                         ├─────────────────────────────────────────┐
                                         │                                         │
                                         ▼                                         ▼
   [ CHEMINFORMATICS & ML TIER : ml-service/ ]               [ DATA & KNOWLEDGE TIER : postgresql/ ]
   FastAPI Microservice (Python / RDKit)                      Relational Tables & Vector Index
   • Structure Normalization (SMILES Canonicalization)        • FEEDSTOCK_TABLE (Purity, Impurities)
   • Reaction Template Matcher (RDKit SMARTS)                 • COMPOUND_TABLE (MW, SMILES, Market)
   • Retrosynthetic Disconnection Search                      • REACTION_TABLE (Catalysts, Solvents)
   • Literature Precedent Retrieval (SciFinder/USPTO)         • ROUTE_TABLE (Historical Benchmarks)
   • ML Precedent Confidence Scoring                          • CHROMA/FAISS (Reaction Embedding Space)
                                         │                                         │
                                         └────────────────────┬────────────────────┘
                                                              │ Aggregated Route Candidates
                                                              ▼
   [ MATHEMATICAL EVALUATION ENGINE : backend/moleculeForgeEngine.ts ]
   Techno-Economic & Green Chemistry Modeling
   ┌────────────────────────────────────────────────────────────────────────────────────────┐
   │ 1. Stoichiometric Mass Balance:  E-Factor = m_waste / m_product                        │
   │ 2. Process Mass Intensity (PMI): PMI = m_total_input / m_product                       │
   │ 3. Atom Economy Calculation:     AE% = (MW_product / sum(MW_reactants)) * 100          │
   │ 4. Solvent Environmental Score:  ACS-GCI Solvent Hazard & Recyclability Index          │
   │ 5. Operational Envelope Check:   Thermal Demand (Cryo/-15C, Hot Oil) + Autoclave (P)   │
   │ 6. Multi-Attribute Forge Score:  F = 0.25*T + 0.20*E + 0.20*G + 0.15*A + 0.10*S + 0.10*D│
   └────────────────────────────────────────────────────────────────────────────────────────┘
                                                              │
                                                              ▼
   [ DECISION EXPLAINABILITY & GOVERNANCE TIER ]
   Automated Synthesis of Executive Dossier
   • Rationale Engine: Explains why Route B beats Route A despite +1 transformation step
   • Pareto Frontier: Identifies shortest vs. greenest vs. highest domestic sourcing routes
   • Human-in-the-Loop Gate: Lead Chemist approval / parameter refinement
                                                              │
                                                              ▼
   [ OUTPUT ARTIFACT : Client Presentation & Laboratory Action ]
   • Interactive Visual Route Tree (SVG Molecular Graph)
   • Multi-Attribute Trade-off Radar Chart
   • Downloadable Laboratory Validation Dossier (Analytical Protocols & Risk Milestones)
   • Closed-Loop Logging: Empirical benchtop conversion data fed back into system
════════════════════════════════════════════════════════════════════════════════════════════════════════════
```

---

### 4.2 The 14-Step End-to-End Decision Pipeline

Molecule Forge executes an audited, 14-step computational pipeline that transforms an initial operational hypothesis into an actionable laboratory dossier:

1. **Feedstock or Target Ingestion:** User selects a refinery stream (e.g., Benzene, Purity 99.8%) or inputs a prospective target compound.
2. **Molecular Structure Validation:** Parses structure, generates canonical SMILES, validates valence states, and detects reactive functional handles.
3. **Constraint Parameterization:** User specifies operational boundaries: maximum transformation count ($\le 4$), prohibited reagent classes, preferred solvent categories, and maximum allowable operating pressure.
4. **Feedstock Intelligence Mapping:** Identifies downstream derivative families (phenolics, nitration chains, alkylated aromatics) mapped to captive industrial feeds.
5. **Retrosynthetic Pathway Generation:** Deconstructs the target molecule step-by-step using curated reaction transformation templates in `ml-service/`.
6. **Precedent Retrieval & Confidence Scoring:** Cross-references each proposed transformation against published chemical precedents; assigns data reliability scores.
7. **Process Engineering Screening:** Evaluates thermal envelopes, autogenous pressures, crystallization bottlenecks, and phase separations.
8. **Green Chemistry Assessment:** Calculates quantitative mass-balance metrics: E-Factor, Process Mass Intensity (PMI), Atom Economy, and solvent environmental safety index.
9. **Techno-Economic Analysis (TEA):** Models raw-material stoichiometry, catalyst consumption, solvent recovery, and sensitivity to feedstock tariff fluctuations.
10. **Multi-Attribute Forge Score Ranking:** Normalizes all parameters into the composite Forge Score ($F \in [0, 100]$), highlighting Pareto-optimal alternatives.
11. **Explainable Decision Synthesis:** Translates computational rankings into natural-language engineering rationales (e.g., explaining why Route B is selected over shorter Route A).
12. **Human-in-the-Loop Review Gate:** Domain chemists inspect intermediate structures, edit catalyst assumptions, and register operational approvals or exclusions.
13. **Laboratory Validation Dossier Generation:** Produces an actionable experimental plan specifying target conversions, expected regioselectivities, analytical HPLC/GC protocols, and primary risk gates.
14. **Continuous Learning Loop:** Once laboratory experiments are completed, empirical yields and conversion rates are fed back into the system to refine future algorithmic predictions.

---

### 4.3 Relational Database Schema Design

The platform's underlying relational data model enforces relational integrity across feedstocks, molecules, reactions, and validation logs:

```
┌─────────────────────────┐          ┌─────────────────────────┐
│     FEEDSTOCK_TABLE     │          │     COMPOUND_TABLE      │
├─────────────────────────┤          ├─────────────────────────┤
│ feedstock_id (PK)       │          │ compound_id (PK)        │
│ name                    │          │ name                    │
│ chemical_formula        │          │ smiles (Canonical)      │
│ structure_smiles        │          │ molecular_weight        │
│ purity_range            │          │ product_category        │
│ impurity_profile        │          │ hazard_class            │
│ availability_status     │          │ market_segment          │
└────────────┬────────────┘          └────────────┬────────────┘
             │                                    │
             └──────────────────┬─────────────────┘
                                │
                                ▼
                   ┌─────────────────────────┐
                   │     REACTION_TABLE      │
                   ├─────────────────────────┤
                   │ reaction_id (PK)        │
                   │ reaction_class          │
                   │ reactants / products    │
                   │ catalyst / solvent      │
                   │ temperature_range       │
                   │ pressure_range          │
                   │ expected_yield_range    │
                   │ literature_precedents   │
                   └────────────┬────────────┘
                                │
                                ▼
                   ┌─────────────────────────┐
                   │       ROUTE_TABLE       │
                   ├─────────────────────────┤
                   │ route_id (PK)           │
                   │ target_compound_id (FK) │
                   │ feedstock_id (FK)       │
                   │ number_of_steps         │
                   │ cumulative_yield        │
                   │ estimated_cost_per_kg   │
                   │ e_factor                │
                   │ pmi                     │
                   │ solvent_safety_score    │
                   │ forge_score             │
                   └────────────┬────────────┘
                                │
                                ▼
                   ┌─────────────────────────┐
                   │    VALIDATION_TABLE     │
                   ├─────────────────────────┤
                   │ validation_id (PK)      │
                   │ route_id (FK)           │
                   │ experiments_required    │
                   │ primary_uncertainty     │
                   │ priority_level          │
                   │ assigned_chemist        │
                   │ empirical_result_logged │
                   └─────────────────────────┘
```

---

## 5. Quantitative Scoring Model and Mathematical Framework

### 5.1 Multi-Attribute Forge Score Formulation
Candidate synthetic routes receive a normalized, multi-attribute index ($F \in [0, 100]$) calibrated according to corporate and operational priorities:

$$F = w_T T + w_E E + w_G G + w_A A + w_S S + w_D D$$

Subject to the normalization condition:

$$\sum_{i \in \{T, E, G, A, S, D\}} w_i = 1.0$$

Where:
* **$T$ (Technical Feasibility - 25%):** Number of synthetic transformations, precedent robustness, predicted intermediate stability, and functional-group compatibility.
* **$E$ (Economic Attractiveness - 20%):** Stoichiometric raw-material costs, catalyst expenses, and yield-adjusted cost per kilogram.
* **$G$ (Green Chemistry Performance - 20%):** Waste metrics, solvent recovery potential, and regulatory hazard classifications.
* **$A$ (Raw-Material Availability - 15%):** Domestic sourcing ratio, supplier count, and geographic import reliance.
* **$S$ (Scale-Up and Process Suitability - 10%):** Absence of extreme process conditions ($T < -15^\circ\text{C}$ or $P > 15\text{ bar}$), crystallization feasibility versus fractional distillation burdens.
* **$D$ (Data Confidence - 10%):** Ratio of peer-reviewed experimental literature precedents versus interpolated predictive data.

---

### 5.2 Green Chemistry and Environmental Metrics

#### Environmental Factor (E-Factor)
Quantifies total waste generated relative to isolated product output:

$$\text{E-Factor} = \frac{\sum m_{\text{waste}}}{m_{\text{product}}} = \frac{m_{\text{reactants}} + m_{\text{solvents}} + m_{\text{reagents}} - m_{\text{product}}}{m_{\text{product}}}$$

*Target threshold for specialty intermediates: $\text{E-Factor} \le 10$ (unoptimized industrial pathways frequently exceed $25 - 50$).*

#### Process Mass Intensity (PMI)
Measures the absolute mass utilization efficiency within defined system boundaries:

$$\text{PMI} = \frac{\sum m_{\text{input}}}{m_{\text{product}}}$$

#### Atom Economy (AE)
Evaluates theoretical incorporation of reactant mass into the desired molecular structure:

$$\text{Atom Economy (\%)} = \left( \frac{\text{Molecular Weight of Target Product}}{\sum \text{Molecular Weight of Stoichiometric Reactants}} \right) \times 100$$

#### Solvent Safety Index and Process Intensity
* **Solvent Classification:** Categorizes reaction media based on the ACS Green Chemistry Institute (ACS-GCI) solvent selection guidelines, prioritizing recyclable solvents (e.g., dimethyl carbonate, 2-MeTHF, water) over hazardous chlorinated hydrocarbons.
* **Thermal & Pressure Envelopes:** Flags thermal regimes requiring high-pressure steam (>180 °C) or cryogenic refrigeration (< -10 °C), directly reducing utility demands.

---

## 6. Industrial Case Study: HMEL Bathinda Complex

### 6.1 Feedstock Context
The **HPCL-Mittal Energy Limited (HMEL)** integrated refinery-petrochemical complex in Bathinda, Punjab, represents a major domestic petrochemical infrastructure asset:
* **11.3 MMTPA** Crude Refining Capacity
* **1.2 MMTPA** Multi-Feed Cracker Unit
* World-scale Polyethylene (PE) and Polypropylene (PP) manufacturing
* Captive aromatic and specialty streams: high-purity **Benzene**, **Hexane**, **Sulfur**, and **Carbon Black Feedstock (CBFS)**

```
┌────────────────────────────────────────────────────────────────────────┐
│                   HMEL REFINERY-PETROCHEMICAL COMPLEX                  │
├────────────────────┬────────────────────┬──────────────────────────────┤
│ Refinery Stream    │ Baseline Utility   │ Molecule Forge Value Ladder  │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ Benzene            │ Bulk Commodity     │ Pharma KSMs & Agrochemicals  │
│ Phenol (Downstream)│ Resins / Bulk      │ High-Performance Additives   │
│ Hexane             │ Industrial Solvent │ High-Purity Extraction Media │
│ Sulfur             │ Bulk Fertilizer    │ Vulcanization Intermediates  │
│ CBFS               │ Carbon Black Feed  │ Specialized Conductive Mats  │
└────────────────────┴────────────────────┴──────────────────────────────┘
```

---

### 6.2 Downstream Valorization Scenario: Benzene to 4-H-3-MBN
* **Objective:** Produce high-purity **4-Hydroxy-3-methylbenzonitrile (4-H-3-MBN)**, an essential intermediate for agrochemical active ingredients.
* **Constraints:** Maximum four chemical transformations, domestic raw-material availability $\ge 70\%$, avoidance of cyanide-bearing effluent streams.

### 6.3 Multi-Route Trade-Off Evaluation Matrix

| Criterion | Route A: Shortest Pathway | Route B: Green / Sustainable (★ Selected) | Route C: Domestic Sourcing |
|---|---|---|---|
| **Synthetic Step Count** | **3 Transformations** | 4 Transformations | 4 Transformations |
| **Feedstock Precursor** | Benzene (99.8%) | Benzene (99.8%) | Benzene (99.8%) |
| **Technical Feasibility ($T$)** | 84 / 100 | 76 / 100 | 71 / 100 |
| **Raw Material Cost Index** | ₹395 / kg | ₹428 / kg | ₹465 / kg |
| **Green Chemistry Score ($G$)** | 67 / 100 | **91 / 100** | 78 / 100 |
| **Environmental E-Factor** | 16.4 kg waste / kg | **8.4 kg waste / kg (-49%)** | 12.1 kg waste / kg |
| **Effluent Hazard Profile** | High (Cyanide intermediate) | **Benign (Aqueous salt / DMC)** | Moderate |
| **Domestic Sourcing ($A$)** | 62% | 75% | **92%** |
| **Scale-Up Operating Envelope**| Cryogenic stage (-15 °C) | **Atmospheric / Low-steam (<90 °C)**| High pressure (25 bar) |
| **Data Confidence ($D$)** | 86 / 100 | 74 / 100 | 69 / 100 |
| **Overall Forge Score** | **77.0 / 100** | **81.0 / 100 (RECOMMENDED)** | **78.0 / 100** |

> **Automated Recommendation Rationale:**
> *Route B is prioritized for experimental validation. While Route A requires one fewer transformation, Route B reduces E-factor waste by 49%, avoids severe cyanide regulatory liabilities, operates within a standard low-pressure utility envelope, and provides stable unit economics (₹428/kg vs ₹395/kg). Primary laboratory risk gate: validate Step 3 catalytic oxidation selectivity.*

---

## 7. Microservices System Architecture

### 7.1 Microservice Repository Structure

The codebase is organized into decoupled microservices to separate client presentation, process evaluation, and machine-learning execution:

```
Molecule-Forge/
├── frontend/                  # React 19 + TypeScript + Vite Client Application
│   ├── src/                   # Presentation components, state, and SVG charts
│   ├── index.html             # HTML5 entrypoint
│   ├── vite.config.ts         # Vite bundler configuration
│   └── package.json           # Frontend dependencies
│
├── backend/                   # Node.js / Express API Gateway & Calculation Engine
│   ├── moleculeForgeEngine.ts # Core mathematical scoring engine & formulas
│   ├── server.ts              # REST API controller & endpoints
│   ├── tsconfig.json          # TypeScript server configuration
│   └── package.json           # Backend service dependencies
│
├── ml-service/                # Python / FastAPI Cheminformatics Microservice
│   ├── main.py                # FastAPI endpoints for RDKit retrosynthesis
│   ├── requirements.txt       # RDKit, NumPy, Pandas, Scikit-learn
│   └── Dockerfile             # Containerized ML deployment
│
├── vercel.json                # Production deployment configuration for Vercel
├── .npmrc                     # Deterministic package resolution
└── package.json               # Root monorepo workspace orchestration
```

### 7.2 Service Responsibilities and Inter-Service Communication

1. **`frontend/`**: Implements the interactive chemical screening dashboard, radar chart visualizers, dynamic molecular pathway graphs, and report generation triggers. Communicates with `backend/` over JSON REST APIs.
2. **`backend/`**: Acts as the central orchestrator. Houses the standalone [`moleculeForgeEngine.ts`](./backend/moleculeForgeEngine.ts) that executes multi-attribute Forge Score calculations, E-Factor evaluations, and constraint filtering.
3. **`ml-service/`**: Encapsulates Python cheminformatics tooling (RDKit) and machine learning models for retrosynthetic graph expansion, precedent similarity search, and automated confidence scoring.

---

## 8. Technology Stack Specification

| Architectural Layer | Technologies & Tools | Purpose & Capabilities |
|---|---|---|
| **Frontend Application** | React 19, TypeScript 7.0, Vite 8.3, TailwindCSS v4 | Real-time interactive decision cockpit, responsive design, dark mode aesthetics |
| **Interactive Visualization** | Lucide React, Motion, SVG Molecular Visualizers | Reaction graph representation, multi-attribute radar charts, sequential reasoning step indicators |
| **Backend & Microservices** | Python 3.11+, FastAPI, Pydantic, Node.js, Express | Asynchronous REST APIs, payload validation, high-throughput calculation endpoints |
| **Cheminformatics Engine** | RDKit, MolVS | SMILES parsing, structure validation, substructure search, functional-group tolerance, molecular fingerprinting |
| **Scientific Data Processing** | Pandas, NumPy | Stoichiometric balance modeling, E-Factor, PMI, and economic sensitivity matrix calculations |
| **ML Ranking & Optimization** | Scikit-learn, XGBoost, PyTorch | Multi-attribute route ranking, precedent confidence estimation, gradient-boosted scoring |
| **Vector Search & Precedents** | FAISS, Chroma DB | High-dimensional chemical reaction similarity search and literature precedent retrieval |
| **Database & Knowledge Store** | PostgreSQL, SQLite | Relational schema storage for feedstocks, compounds, curated reaction templates, and validation logs |
| **Decision Explainability (LLM)**| Google Gemini 2.5 API / DeepMind GenAI SDK | Synthesizes natural-language justification briefs and executive validation reports from verified computational metrics |
| **Deployment & Infrastructure**| Vercel Edge Network, Docker, GitHub Actions | Continuous deployment, automated builds, zero-downtime hosting with full SPA rewrites |

---

## 9. Installation and Deployment Guide

### 9.1 Local Development Environment

Ensure [Node.js](https://nodejs.org/) (version 20.11+ or 22+) and `npm` are installed.

```bash
# Clone the repository
git clone https://github.com/rautsiddharth82-crypto/Molecule-Forge.git
cd Molecule-Forge

# Install dependencies across microservices
npm install

# Launch frontend development server
npm run dev

# Launch backend API service
npm run backend:dev

# Execute static type analysis
npm run lint

# Build optimized frontend bundle
npm run build
```

---

### 9.2 Executing the Mathematical Scoring Engine CLI

A standalone, executable mathematical scoring and decision engine is located at [`backend/moleculeForgeEngine.ts`](./backend/moleculeForgeEngine.ts). It calculates all metrics live in terminal for presentations:

```bash
npm run engine
# or directly:
npx tsx backend/moleculeForgeEngine.ts
```

---

### 9.3 Production Deployment on Vercel

The repository is pre-configured with root-level [`vercel.json`](./vercel.json) that automatically builds the `frontend/` microservice:
1. Import the repository into the **Vercel Dashboard**.
2. Vercel automatically detects the preset, executes `npm run build`, and serves from `frontend/dist`.
3. To deploy directly via the command line:
   ```bash
   npx vercel --prod
   ```

---

## 10. Risk Mitigation, Governance, and Responsible AI Positioning

| Operational Risk | Engineered Mitigation |
|---|---|
| **Synthetic Hallucination** | System enforces template-constrained reaction rules and validated precedents; unconstrained generative language models are prohibited from proposing chemical bonds. |
| **Incomplete Scientific Literature** | Each reaction step presents a confidence score and isolates verified literature records from predictive estimates. |
| **Impractical Cost Expectations** | Techno-economic projections are clearly categorized as preliminary sensitivity scenarios with user-tunable feedstock price inputs. |
| **Process Safety Incidents** | Automated flags highlight exothermic risks, toxic classification intermediates, and extreme pressure/temperature conditions. |
| **Intellectual Property Infringement**| Provenance tracking provides direct literature references to publicly accessible patent and academic citations. |

> **Mandatory Disclaimer:** Molecule Forge is a digital decision-support tool, not an autonomous synthesis engine. Predicted yields and reaction conditions constitute screening hypotheses that require verification by qualified chemists prior to pilot scale-up.

---

## 11. Strategic Roadmap

* **Phase 1: Proof of Concept (Current):** Interactive multi-criteria screening dashboard for benzene, phenol, toluene, and xylene pathways with green chemistry metrics and validation plan outputs.
* **Phase 2: Industrial Pilot:** Direct ingestion of HMEL Bathinda crude assay and stream compositions; dynamic local chemical supplier pricing feeds; integration of local RDKit cheminformatics pipelines.
* **Phase 3: Enterprise Integration:** Bi-directional integration with Laboratory Information Management Systems (LIMS) and Enterprise Resource Planning (ERP) software, enabling continuous calibration as experimental validation runs are logged.

---

## 12. Engineering Team and National Hackathon Track Record

### Core Contributors

| Contributor | Role & Specialization | Focus Areas |
|---|---|---|
| **Siddharth Raut** | **Team Lead & UI/UX Designer** | Platform architecture, Human-Computer Interaction (HCI), microservices design, and product vision. |
| **Abhyuday Jain** | **Domain & Chemistry Researcher** | Reaction template curation, retrosynthetic pathway validation, ACS-GCI green chemistry metrics, and literature precedent verification. |
| **Hardik Mathur** | **Backend & Systems Engineer** | Process feasibility algorithms, mathematical scoring models, data structure design, and computational optimization. |

### National Hackathon Track Record

Our engineering team brings a proven track record of podium finishes in major competitive hackathons:

* 🥉 **3rd Rank (National Finalist)** — **Public Sector Bank (PSB) National Hackathon**
  * *Organized across premier public sector financial institutions (Punjab & Sind Bank / Bank of Baroda). Awarded for high-reliability, data-intensive architecture and analytical rigor.*
* 🥉 **3rd Rank (National Finalist)** — **NIT Raipur Codeutsava National Hackathon**
  * *Central India's flagship 28-hour national hackathon, recognized for software architecture, computational rigor, and system design.*
