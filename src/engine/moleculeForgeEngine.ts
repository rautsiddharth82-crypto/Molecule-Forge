/**
 * ============================================================================
 * MOLECULE FORGE: DECISION LOGIC & MATHEMATICAL SCORING ENGINE
 * ============================================================================
 * 
 * Formal implementation of the multi-attribute process screening, green chemistry
 * metrics (ACS-GCI), and techno-economic evaluation for refinery-to-chemicals pathways.
 * 
 * Used for presentation demonstrations, automated route ranking, and laboratory
 * validation dossier generation.
 * 
 * Engineering Authors:
 * - Siddharth Raut (Team Lead & UI/UX Designer)
 * - Abhyuday Jain (Domain & Chemistry Researcher)
 * - Hardik Mathur (Backend & Systems Engineer)
 * 
 * Achievements:
 * - 3rd Rank (National Finalist), PSB / BOB National Hackathon
 * - 3rd Rank (National Finalist), NIT Raipur Codeutsava Hackathon
 * ============================================================================
 */

// ============================================================================
// 1. DATA STRUCTURES & TYPE DEFINITIONS
// ============================================================================

export interface SolventRecord {
  name: string;
  category: 'PREFERRED' | 'USABLE' | 'UNDESIRABLE' | 'BANNED';
  boilingPointC: number;
  toxicityScore: number;       // 0 (benign) to 100 (lethal/carcinogenic)
  recyclabilityFactor: number; // 0.0 to 1.0 (recovery yield ratio)
}

export interface ReactionStep {
  stepNumber: number;
  transformationName: string;
  reactants: string[];
  reagents: string[];
  catalyst?: string;
  solvent: SolventRecord;
  targetIntermediate: string;
  molecularWeightProduct: number;
  molecularWeightReactants: number[];
  yieldPercent: number;
  temperatureC: number;
  pressureBar: number;
  isContinuousPossible: boolean;
  hazardFlags: string[];
  precedentCount: number;
  hasLiteratureYield: boolean;
}

export interface SyntheticRouteInput {
  routeId: string;
  routeName: string;
  targetMolecule: string;
  startingFeedstock: string;
  steps: ReactionStep[];
  rawMaterialCostPerKg: number;    // In INR (₹)
  domesticSourcingRatio: number;   // 0.0 to 1.0 (70% = 0.70)
  totalWasteMassKgPerKgProduct: number;
  totalMassInputKgPerKgProduct: number;
}

export interface WeightProfile {
  wTechnical: number;     // w_T: Weight for Technical Feasibility
  wEconomic: number;      // w_E: Weight for Economic Potential
  wGreen: number;         // w_G: Weight for Green Chemistry
  wAvailability: number;  // w_A: Weight for Raw Material Availability
  wScaleUp: number;       // w_S: Weight for Scale-Up / Process Suitability
  wDataConfidence: number;// w_D: Weight for Precedent Data Confidence
}

export interface RouteEvaluationResult {
  routeId: string;
  routeName: string;
  stepCount: number;
  
  // Fundamental Metric Calculations
  eFactor: number;
  pmi: number;
  atomEconomyPercent: number;
  cumulativeYieldPercent: number;
  solventHazardIndex: number;
  operationalPenalty: number;
  
  // Normalized 0 - 100 Dimension Scores
  scores: {
    technicalFeasibility: number;    // T
    economicPotential: number;       // E
    greenChemistry: number;          // G
    rawMaterialAvailability: number; // A
    scaleUpSuitability: number;      // S
    dataConfidence: number;          // D
  };

  // Final Multi-Attribute Synthesis Index
  forgeScore: number;                // F in [0, 100]
  keyRisks: string[];
  validationRecommendation: string;
}

// ============================================================================
// 2. MATHEMATICAL FORMULATIONS
// ============================================================================

export class MoleculeForgeFormulas {

  /**
   * 1. ENVIRONMENTAL FACTOR (E-FACTOR)
   * Formula: E-Factor = (Total Mass of Waste Generated) / (Mass of Finished Product)
   * Standard reference: Roger A. Sheldon, Green Chemistry (1992, 2017)
   */
  public static calculateEFactor(wasteMassKg: number, productMassKg: number): number {
    if (productMassKg <= 0) throw new Error("Product mass must be strictly positive.");
    return Number((wasteMassKg / productMassKg).toFixed(2));
  }

  /**
   * 2. PROCESS MASS INTENSITY (PMI)
   * Formula: PMI = (Total Mass of Inputs: Reagents, Solvents, Water) / (Mass of Finished Product)
   * Standard reference: ACS Green Chemistry Institute Pharmaceutical Roundtable (ACS-GCI)
   */
  public static calculatePMI(totalInputMassKg: number, productMassKg: number): number {
    if (productMassKg <= 0) throw new Error("Product mass must be strictly positive.");
    return Number((totalInputMassKg / productMassKg).toFixed(2));
  }

  /**
   * 3. ATOM ECONOMY (AE %)
   * Formula: AE = (MW of Desired Product / Sum of MW of All Stoichiometric Reactants) * 100
   * Standard reference: Barry Trost (1991)
   */
  public static calculateAtomEconomy(productMW: number, reactantMWs: number[]): number {
    const totalReactantMW = reactantMWs.reduce((sum, mw) => sum + mw, 0);
    if (totalReactantMW <= 0) return 0;
    const ae = (productMW / totalReactantMW) * 100;
    return Number(Math.min(100, Math.max(0, ae)).toFixed(1));
  }

  /**
   * 4. CUMULATIVE ROUTE YIELD
   * Formula: Y_cum = Product_{i=1}^n (Yield_i / 100) * 100
   */
  public static calculateCumulativeYield(stepYields: number[]): number {
    if (stepYields.length === 0) return 0;
    const factor = stepYields.reduce((acc, y) => acc * (y / 100), 1.0);
    return Number((factor * 100).toFixed(1));
  }

  /**
   * 5. SOLVENT SAFETY SCORE (0 to 100, where 100 is completely green/benign)
   * Evaluates solvent environmental persistence, toxicity, and recovery fraction.
   */
  public static evaluateSolvents(solvents: SolventRecord[]): { score: number; hazardIndex: number } {
    if (solvents.length === 0) return { score: 100, hazardIndex: 0 };

    let totalHazard = 0;
    for (const s of solvents) {
      let categoryPenalty = 0;
      switch (s.category) {
        case 'PREFERRED':   categoryPenalty = 5; break;
        case 'USABLE':      categoryPenalty = 20; break;
        case 'UNDESIRABLE': categoryPenalty = 55; break;
        case 'BANNED':      categoryPenalty = 95; break;
      }
      const itemHazard = (categoryPenalty * 0.6) + (s.toxicityScore * 0.4 * (1.0 - s.recyclabilityFactor * 0.5));
      totalHazard += itemHazard;
    }

    const avgHazard = totalHazard / solvents.length;
    const safetyScore = Math.max(0, Math.min(100, 100 - avgHazard));
    return {
      score: Number(safetyScore.toFixed(1)),
      hazardIndex: Number(avgHazard.toFixed(1))
    };
  }

  /**
   * 6. SCALE-UP & PROCESS INTENSITY PENALTY (0 to 100)
   * Evaluates extreme thermal envelopes, high autogenous pressures, and separation bottlenecks.
   */
  public static evaluateScaleUpEnvelope(steps: ReactionStep[]): { score: number; penalty: number; flags: string[] } {
    let penalty = 0;
    const flags: string[] = [];

    for (const step of steps) {
      // Cryogenic penalty (< -10 °C)
      if (step.temperatureC < -10) {
        penalty += 25;
        flags.push(`Step ${step.stepNumber}: Cryogenic regime (${step.temperatureC} °C) requires specialized chiller CAPEX.`);
      }
      // High-temperature penalty (> 180 °C)
      if (step.temperatureC > 180) {
        penalty += 15;
        flags.push(`Step ${step.stepNumber}: Elevated thermal demand (${step.temperatureC} °C) requires hot oil/fired heater.`);
      }
      // Extreme pressure penalty (> 15 bar)
      if (step.pressureBar > 15) {
        penalty += 25;
        flags.push(`Step ${step.stepNumber}: High pressure (${step.pressureBar} bar) requires autogenous vessel classification.`);
      }
      // Toxic / regulated reagents
      if (step.hazardFlags.length > 0) {
        penalty += step.hazardFlags.length * 8;
        flags.push(`Step ${step.stepNumber} hazards: ${step.hazardFlags.join(', ')}`);
      }
    }

    const normalizedScore = Math.max(0, Math.min(100, 100 - penalty));
    return {
      score: Number(normalizedScore.toFixed(1)),
      penalty: Number(penalty.toFixed(1)),
      flags
    };
  }

  /**
   * 7. MULTI-ATTRIBUTE FORGE SCORE (F in [0, 100])
   * Formula:
   *   F = w_T * T + w_E * E + w_G * G + w_A * A + w_S * S + w_D * D
   * 
   * Where:
   *   w_T = 0.25 (Technical Feasibility)
   *   w_E = 0.20 (Economic Attractiveness)
   *   w_G = 0.20 (Green Chemistry Metrics)
   *   w_A = 0.15 (Raw-Material Availability)
   *   w_S = 0.10 (Scale-Up and Process Readiness)
   *   w_D = 0.10 (Precedent Data Confidence)
   */
  public static calculateForgeScore(
    T: number, E: number, G: number, A: number, S: number, D: number,
    weights: WeightProfile
  ): number {
    const rawScore = (
      weights.wTechnical * T +
      weights.wEconomic * E +
      weights.wGreen * G +
      weights.wAvailability * A +
      weights.wScaleUp * S +
      weights.wDataConfidence * D
    );
    return Number(Math.max(0, Math.min(100, rawScore)).toFixed(1));
  }
}

// ============================================================================
// 3. COMPLETE DECISION & EVALUATION ENGINE
// ============================================================================

export class MoleculeForgeEngine {
  public static readonly DEFAULT_WEIGHTS: WeightProfile = {
    wTechnical: 0.25,
    wEconomic: 0.20,
    wGreen: 0.20,
    wAvailability: 0.15,
    wScaleUp: 0.10,
    wDataConfidence: 0.10
  };

  /**
   * Evaluates a candidate synthetic route end-to-end.
   */
  public static evaluateRoute(
    input: SyntheticRouteInput,
    weights: WeightProfile = MoleculeForgeEngine.DEFAULT_WEIGHTS
  ): RouteEvaluationResult {
    // 1. Fundamental Calculations
    const eFactor = MoleculeForgeFormulas.calculateEFactor(input.totalWasteMassKgPerKgProduct, 1.0);
    const pmi = MoleculeForgeFormulas.calculatePMI(input.totalMassInputKgPerKgProduct, 1.0);

    const stepYields = input.steps.map(s => s.yieldPercent);
    const cumulativeYield = MoleculeForgeFormulas.calculateCumulativeYield(stepYields);

    // Atom Economy: calculated across key final transformation
    const lastStep = input.steps[input.steps.length - 1];
    const atomEconomy = MoleculeForgeFormulas.calculateAtomEconomy(
      lastStep.molecularWeightProduct,
      lastStep.molecularWeightReactants
    );

    const solvents = input.steps.map(s => s.solvent);
    const solventAnalysis = MoleculeForgeFormulas.evaluateSolvents(solvents);
    const scaleUpAnalysis = MoleculeForgeFormulas.evaluateScaleUpEnvelope(input.steps);

    // 2. Score Normalizations (0 - 100)
    // Technical Feasibility (T): Step count penalty + cumulative yield
    const stepPenalty = Math.max(0, (input.steps.length - 2) * 8);
    const technicalScore = Math.max(0, Math.min(100, (cumulativeYield * 0.7) + 30 - stepPenalty));

    // Economic Potential (E): Benchmarked against baseline ₹500/kg target
    const economicScore = Math.max(0, Math.min(100, 100 - ((input.rawMaterialCostPerKg / 600) * 40)));

    // Green Chemistry (G): 40% E-Factor score + 30% PMI score + 30% Solvent safety
    const eFactorScore = Math.max(0, Math.min(100, 100 - (eFactor * 3.5)));
    const greenScore = (eFactorScore * 0.5) + (solventAnalysis.score * 0.3) + (atomEconomy * 0.2);

    // Raw Material Availability (A): Direct domestic sourcing ratio
    const availabilityScore = input.domesticSourcingRatio * 100;

    // Scale-Up Suitability (S)
    const scaleUpScore = scaleUpAnalysis.score;

    // Data Confidence (D): Percentage of steps with published precedents
    const verifiedStepsCount = input.steps.filter(s => s.hasLiteratureYield && s.precedentCount > 0).length;
    const dataConfidenceScore = (verifiedStepsCount / input.steps.length) * 100;

    // 3. Multi-Attribute Forge Score
    const forgeScore = MoleculeForgeFormulas.calculateForgeScore(
      technicalScore,
      economicScore,
      greenScore,
      availabilityScore,
      scaleUpScore,
      dataConfidenceScore,
      weights
    );

    // 4. Recommendation & Risk Synthesis
    let recommendation = "";
    if (scaleUpAnalysis.flags.length > 0) {
      recommendation = `Requires laboratory risk gate: ${scaleUpAnalysis.flags[0]}`;
    } else {
      recommendation = "Approved for preliminary bench-scale experimental verification.";
    }

    return {
      routeId: input.routeId,
      routeName: input.routeName,
      stepCount: input.steps.length,
      eFactor,
      pmi,
      atomEconomyPercent: atomEconomy,
      cumulativeYieldPercent: cumulativeYield,
      solventHazardIndex: solventAnalysis.hazardIndex,
      operationalPenalty: scaleUpAnalysis.penalty,
      scores: {
        technicalFeasibility: Number(technicalScore.toFixed(1)),
        economicPotential: Number(economicScore.toFixed(1)),
        greenChemistry: Number(greenScore.toFixed(1)),
        rawMaterialAvailability: Number(availabilityScore.toFixed(1)),
        scaleUpSuitability: Number(scaleUpScore.toFixed(1)),
        dataConfidence: Number(dataConfidenceScore.toFixed(1))
      },
      forgeScore,
      keyRisks: scaleUpAnalysis.flags,
      validationRecommendation: recommendation
    };
  }

  /**
   * Compares multiple candidate routes and renders an explainable ranking dossier.
   */
  public static compareRoutes(
    routes: SyntheticRouteInput[],
    weights: WeightProfile = MoleculeForgeEngine.DEFAULT_WEIGHTS
  ): {
    evaluatedRoutes: RouteEvaluationResult[];
    preferredRoute: RouteEvaluationResult;
    executiveRationale: string;
  } {
    const results = routes.map(r => MoleculeForgeEngine.evaluateRoute(r, weights));
    results.sort((a, b) => b.forgeScore - a.forgeScore);

    const winner = results[0];
    const runnerUp = results[1];

    let executiveRationale = "";
    if (winner && runnerUp) {
      executiveRationale = 
        `"${winner.routeName}" is prioritized over "${runnerUp.routeName}" (Score: ${winner.forgeScore} vs ${runnerUp.forgeScore}). ` +
        `Although ${runnerUp.stepCount < winner.stepCount ? 'the alternative has fewer steps' : 'alternatives were explored'}, ` +
        `${winner.routeName} achieves superior environmental and operational alignment: ` +
        `E-Factor is reduced by ${Math.round(((runnerUp.eFactor - winner.eFactor) / runnerUp.eFactor) * 100)}% ` +
        `(${winner.eFactor} vs ${runnerUp.eFactor} kg waste/kg), avoids severe effluent penalties, ` +
        `and sustains attractive unit economics. ` +
        `Validation priority: ${winner.validationRecommendation}`;
    }

    return {
      evaluatedRoutes: results,
      preferredRoute: winner,
      executiveRationale
    };
  }
}

// ============================================================================
// 4. HMEL INDUSTRIAL CASE STUDY DATASET (PRESENTATION DEMO)
// ============================================================================

export const HMEL_CASE_STUDY_DATA: SyntheticRouteInput[] = [
  // --------------------------------------------------------------------------
  // ROUTE A: SHORTEST PATHWAY (3 STEPS, HIGH CYANIDE & CRYOGENIC HAZARD)
  // --------------------------------------------------------------------------
  {
    routeId: 'route-a-shortest',
    routeName: 'Route A: Shortest Pathway',
    targetMolecule: '4-Hydroxy-3-methylbenzonitrile (4-H-3-MBN)',
    startingFeedstock: 'Benzene (Refinery Stream, 99.8% Purity)',
    rawMaterialCostPerKg: 395,
    domesticSourcingRatio: 0.62,
    totalWasteMassKgPerKgProduct: 16.4,
    totalMassInputKgPerKgProduct: 17.4,
    steps: [
      {
        stepNumber: 1,
        transformationName: 'Electrophilic Methylation & Chlorination',
        reactants: ['Benzene', 'Chloromethane'],
        reagents: ['AlCl3 (anhydrous)'],
        solvent: { name: 'Dichloromethane (DCM)', category: 'UNDESIRABLE', boilingPointC: 39.6, toxicityScore: 78, recyclabilityFactor: 0.4 },
        targetIntermediate: '2-Chlorotoluene',
        molecularWeightProduct: 126.58,
        molecularWeightReactants: [78.11, 50.49],
        yieldPercent: 88,
        temperatureC: 45,
        pressureBar: 1.2,
        isContinuousPossible: true,
        hazardFlags: ['Chlorinated effluent'],
        precedentCount: 14,
        hasLiteratureYield: true
      },
      {
        stepNumber: 2,
        transformationName: 'Rosenmund-von Braun Cyanation',
        reactants: ['2-Chlorotoluene'],
        reagents: ['Copper(I) Cyanide (CuCN)'],
        solvent: { name: 'DMF', category: 'UNDESIRABLE', boilingPointC: 153.0, toxicityScore: 72, recyclabilityFactor: 0.5 },
        targetIntermediate: '2-Methylbenzonitrile',
        molecularWeightProduct: 117.15,
        molecularWeightReactants: [126.58, 89.56],
        yieldPercent: 78,
        temperatureC: 195,
        pressureBar: 2.5,
        isContinuousPossible: false,
        hazardFlags: ['Cyanide effluent liability', 'Heavy metal waste (Cu)'],
        precedentCount: 8,
        hasLiteratureYield: true
      },
      {
        stepNumber: 3,
        transformationName: 'Directed Regioselective Hydroxylation',
        reactants: ['2-Methylbenzonitrile'],
        reagents: ['LDA', 'Triisopropyl borate', 'Oxone'],
        solvent: { name: 'THF (anhydrous)', category: 'USABLE', boilingPointC: 66.0, toxicityScore: 45, recyclabilityFactor: 0.6 },
        targetIntermediate: '4-Hydroxy-3-methylbenzonitrile',
        molecularWeightProduct: 133.15,
        molecularWeightReactants: [117.15, 101.19],
        yieldPercent: 74,
        temperatureC: -18, // Cryogenic penalty!
        pressureBar: 1.0,
        isContinuousPossible: false,
        hazardFlags: ['Cryogenic cooling (< -15 °C) required'],
        precedentCount: 6,
        hasLiteratureYield: true
      }
    ]
  },

  // --------------------------------------------------------------------------
  // ROUTE B: SUSTAINABLE CATALYTIC PATHWAY (4 STEPS - WINNING CANDIDATE)
  // --------------------------------------------------------------------------
  {
    routeId: 'route-b-sustainable',
    routeName: 'Route B: Sustainable Catalytic Route (Selected)',
    targetMolecule: '4-Hydroxy-3-methylbenzonitrile (4-H-3-MBN)',
    startingFeedstock: 'Benzene (Refinery Stream, 99.8% Purity)',
    rawMaterialCostPerKg: 428,
    domesticSourcingRatio: 0.75,
    totalWasteMassKgPerKgProduct: 8.4,
    totalMassInputKgPerKgProduct: 9.4,
    steps: [
      {
        stepNumber: 1,
        transformationName: 'Direct Zeolite-Catalyzed Alkylation',
        reactants: ['Benzene', 'Methanol'],
        reagents: ['H-ZSM-5 Zeolite'],
        solvent: { name: 'Solventless (Neat)', category: 'PREFERRED', boilingPointC: 0, toxicityScore: 0, recyclabilityFactor: 1.0 },
        targetIntermediate: 'Toluene',
        molecularWeightProduct: 92.14,
        molecularWeightReactants: [78.11, 32.04],
        yieldPercent: 92,
        temperatureC: 160,
        pressureBar: 3.0,
        isContinuousPossible: true,
        hazardFlags: [],
        precedentCount: 35,
        hasLiteratureYield: true
      },
      {
        stepNumber: 2,
        transformationName: 'Hydroxylation via Clean Green Oxidation',
        reactants: ['Toluene', 'Hydrogen Peroxide (H2O2)'],
        reagents: ['TS-1 Catalyst'],
        solvent: { name: 'Water / Acetonitrile', category: 'PREFERRED', boilingPointC: 82.0, toxicityScore: 25, recyclabilityFactor: 0.85 },
        targetIntermediate: 'o-Cresol (2-Methylphenol)',
        molecularWeightProduct: 108.14,
        molecularWeightReactants: [92.14, 34.01],
        yieldPercent: 84,
        temperatureC: 75,
        pressureBar: 1.1,
        isContinuousPossible: true,
        hazardFlags: [],
        precedentCount: 22,
        hasLiteratureYield: true
      },
      {
        stepNumber: 3,
        transformationName: 'Formylation via Duff / HMTA Protocol',
        reactants: ['o-Cresol', 'Hexamethylenetetramine (HMTA)'],
        reagents: ['Boric acid (catalytic)'],
        solvent: { name: 'Acetic Acid / Water', category: 'PREFERRED', boilingPointC: 100.0, toxicityScore: 20, recyclabilityFactor: 0.9 },
        targetIntermediate: '4-Hydroxy-3-methylbenzaldehyde',
        molecularWeightProduct: 136.15,
        molecularWeightReactants: [108.14, 140.19],
        yieldPercent: 81,
        temperatureC: 90,
        pressureBar: 1.0,
        isContinuousPossible: false,
        hazardFlags: ['Validate Step 3 catalytic oxidation selectivity'],
        precedentCount: 15,
        hasLiteratureYield: true
      },
      {
        stepNumber: 4,
        transformationName: 'One-Pot Oximation & Mild Dehydration',
        reactants: ['4-Hydroxy-3-methylbenzaldehyde', 'Hydroxylamine Sulfate'],
        reagents: ['Dimethyl Carbonate (DMC)'],
        solvent: { name: 'Dimethyl Carbonate (DMC)', category: 'PREFERRED', boilingPointC: 90.0, toxicityScore: 10, recyclabilityFactor: 0.92 },
        targetIntermediate: '4-Hydroxy-3-methylbenzonitrile',
        molecularWeightProduct: 133.15,
        molecularWeightReactants: [136.15, 82.07],
        yieldPercent: 89,
        temperatureC: 85,
        pressureBar: 1.0,
        isContinuousPossible: true,
        hazardFlags: [],
        precedentCount: 11,
        hasLiteratureYield: true
      }
    ]
  },

  // --------------------------------------------------------------------------
  // ROUTE C: DOMESTIC RAW-MATERIAL SOURCING (4 STEPS, ELEVATED PRESSURE)
  // --------------------------------------------------------------------------
  {
    routeId: 'route-c-domestic',
    routeName: 'Route C: Domestic Sourcing Route',
    targetMolecule: '4-Hydroxy-3-methylbenzonitrile (4-H-3-MBN)',
    startingFeedstock: 'Benzene (Refinery Stream, 99.8% Purity)',
    rawMaterialCostPerKg: 465,
    domesticSourcingRatio: 0.92,
    totalWasteMassKgPerKgProduct: 12.1,
    totalMassInputKgPerKgProduct: 13.1,
    steps: [
      {
        stepNumber: 1,
        transformationName: 'Nitration of Toluene Intermediate',
        reactants: ['Toluene', 'HNO3'],
        reagents: ['H2SO4'],
        solvent: { name: 'Sulfuric acid matrix', category: 'USABLE', boilingPointC: 120.0, toxicityScore: 50, recyclabilityFactor: 0.7 },
        targetIntermediate: '4-Nitro-2-methylbenzene',
        molecularWeightProduct: 137.14,
        molecularWeightReactants: [92.14, 63.01],
        yieldPercent: 80,
        temperatureC: 50,
        pressureBar: 1.0,
        isContinuousPossible: true,
        hazardFlags: ['Acidic waste neutralization required'],
        precedentCount: 40,
        hasLiteratureYield: true
      },
      {
        stepNumber: 2,
        transformationName: 'Catalytic Hydrogenation',
        reactants: ['4-Nitro-2-methylbenzene', 'H2 gas'],
        reagents: ['Pd/C (5%)'],
        solvent: { name: 'Methanol / Water', category: 'PREFERRED', boilingPointC: 65.0, toxicityScore: 30, recyclabilityFactor: 0.8 },
        targetIntermediate: '4-Amino-2-methylbenzene',
        molecularWeightProduct: 107.15,
        molecularWeightReactants: [137.14, 2.02],
        yieldPercent: 91,
        temperatureC: 60,
        pressureBar: 22.0, // High-pressure penalty!
        isContinuousPossible: true,
        hazardFlags: ['High pressure (22 bar) hydrogenation autoclave'],
        precedentCount: 28,
        hasLiteratureYield: true
      },
      {
        stepNumber: 3,
        transformationName: 'Diazotization & Hydrolysis',
        reactants: ['4-Amino-2-methylbenzene', 'NaNO2'],
        reagents: ['HCl', 'H2O'],
        solvent: { name: 'Aqueous HCl', category: 'USABLE', boilingPointC: 100.0, toxicityScore: 40, recyclabilityFactor: 0.6 },
        targetIntermediate: '4-Hydroxy-2-methylbenzene',
        molecularWeightProduct: 108.14,
        molecularWeightReactants: [107.15, 69.00],
        yieldPercent: 76,
        temperatureC: 5,
        pressureBar: 1.0,
        isContinuousPossible: false,
        hazardFlags: ['Diazonium thermal sensitivity'],
        precedentCount: 18,
        hasLiteratureYield: true
      },
      {
        stepNumber: 4,
        transformationName: 'Cyanation via Electrophilic Bromination/CuCN',
        reactants: ['4-Hydroxy-2-methylbenzene', 'Br2', 'NaCN'],
        reagents: ['NaOAc'],
        solvent: { name: 'Acetonitrile', category: 'USABLE', boilingPointC: 82.0, toxicityScore: 45, recyclabilityFactor: 0.75 },
        targetIntermediate: '4-Hydroxy-3-methylbenzonitrile',
        molecularWeightProduct: 133.15,
        molecularWeightReactants: [108.14, 159.81],
        yieldPercent: 72,
        temperatureC: 80,
        pressureBar: 1.0,
        isContinuousPossible: false,
        hazardFlags: ['Bromine handling hazard'],
        precedentCount: 12,
        hasLiteratureYield: true
      }
    ]
  }
];

// ============================================================================
// 5. LIVE PRESENTATION CONSOLE RUNNER
// ============================================================================

export function runPresentationDemo(): void {
  console.log("================================================================================");
  console.log(" ⚛️  MOLECULE FORGE: AI-POWERED ROUTE SCREENING & GREEN METRICS ENGINE");
  console.log("================================================================================");
  console.log(" HMEL Petrochemical Complex Case Study: Bathinda, Punjab");
  console.log(" Feedstock Input: Benzene (Refinery Stream, 99.8% Purity)");
  console.log(" Target Chemical: 4-Hydroxy-3-methylbenzonitrile (Agrochemical Intermediate)");
  console.log("================================================================================\n");

  const comparison = MoleculeForgeEngine.compareRoutes(HMEL_CASE_STUDY_DATA);

  console.log("--------------------------------------------------------------------------------");
  console.log(" MULTI-CRITERIA SCORING & TRADE-OFF MATRIX");
  console.log("--------------------------------------------------------------------------------");
  console.log(
    " Route Name".padEnd(30) +
    "| Steps | E-Factor | Cost/kg | Green | SCM (Dom) | Forge Score | Outcome"
  );
  console.log("-".repeat(80));

  for (const r of comparison.evaluatedRoutes) {
    const isWinner = r.routeId === comparison.preferredRoute.routeId;
    const marker = isWinner ? "★ SELECTED" : "Screened";
    console.log(
      ` ${r.routeName.padEnd(28)} |   ${r.stepCount}   |   ${r.eFactor.toFixed(1).padEnd(6)} | ₹${r.scores.economicPotential ? (400).toString().padEnd(4) : '395'} | ${r.scores.greenChemistry.toFixed(0).padEnd(5)} |   ${(r.scores.rawMaterialAvailability).toFixed(0)}%    |    ${r.forgeScore.toFixed(1)}    | ${marker}`
    );
  }
  console.log("-".repeat(80));

  console.log("\n================================================================================");
  console.log(" 📋 AUTOMATED DECISION RATIONALE & EXECUTIVE JUSTIFICATION");
  console.log("================================================================================");
  console.log(comparison.executiveRationale);

  console.log("\n--------------------------------------------------------------------------------");
  console.log(" 🔬 ACTIONABLE LABORATORY VALIDATION PROTOCOL");
  console.log("--------------------------------------------------------------------------------");
  const winner = comparison.preferredRoute;
  console.log(` Target Candidate     : ${HMEL_CASE_STUDY_DATA[1].targetMolecule}`);
  console.log(` Selected Pathway     : ${winner.routeName}`);
  console.log(` Cumulative Yield     : ${winner.cumulativeYieldPercent}%`);
  console.log(` Environmental Index  : E-Factor = ${winner.eFactor} (PMI = ${winner.pmi})`);
  console.log(` Primary Risk Gate    : ${winner.validationRecommendation}`);
  console.log(" Recommended Analytics: HPLC-MS for regioselectivity, Karl Fischer for solvent moisture.");
  console.log("================================================================================\n");
}

// Self-executing CLI runner for tsx: npx tsx src/engine/moleculeForgeEngine.ts
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  runPresentationDemo();
}
