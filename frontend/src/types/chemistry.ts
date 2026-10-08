export type FeedstockId = 'benzene' | 'phenol' | 'toluene' | 'xylene' | 'hexane' | 'sulphur' | 'carbon-black';

export type ProductCategory = 
  | 'Specialty Chemical'
  | 'Pharmaceutical Intermediate'
  | 'Agrochemical Intermediate'
  | 'Polymer Additive'
  | 'Specialty Solvent'
  | 'Advanced Material'
  | 'Resin / Monomer';

export type ProvenanceLevel = 
  | 'VERIFIED DATA'
  | 'LITERATURE-DERIVED'
  | 'MODEL PREDICTION'
  | 'USER ASSUMPTION'
  | 'INDUSTRIAL ESTIMATE'
  | 'UNKNOWN';

export interface Feedstock {
  id: FeedstockId;
  name: string;
  formula: string;
  casNumber: string;
  purity: string;
  boilingPoint: string;
  density: string;
  availability: 'High' | 'Medium' | 'Constrained';
  domesticAvailability: 'Abundant' | 'Moderate' | 'Import Reliant';
  opportunityScore: number;
  refineryStream: string;
  description: string;
  safetyNotes: string[];
  transformationFamilies: string[];
  productCategories: ProductCategory[];
  existingApplications: string[];
  downstreamOpportunitiesCount: number;
  downstreamTree: {
    family: string;
    intermediates: string[];
    endProducts: string[];
  }[];
}

export interface Molecule {
  id: string;
  name: string;
  formula: string;
  molecularWeight: number;
  smiles: string;
  category: ProductCategory;
  startingFeedstock: FeedstockId;
  marketPriceRange: string;
  estimatedMarketSize: string;
  cagr: string;
  applications: string[];
  hazardClass: string;
  candidateRoutesCount: number;
  forgeScore: number;
  keyFunctionalGroups: string[];
  description: string;
}

export interface ReactionStep {
  stepNumber: number;
  title: string;
  reactant: string;
  reactantFormula: string;
  product: string;
  productFormula: string;
  reactionClass: string;
  reagentCategory: string;
  reagents: string;
  catalyst: string;
  solvent: string;
  temperature: string;
  pressure: string;
  estimatedYield: number; // percentage
  confidence: number; // percentage
  atomEconomy: number; // percentage
  provenance: ProvenanceLevel;
  riskFlags: string[];
  validationRequirement: string;
  notes: string;
}

export interface SynthesisRoute {
  id: 'route-a' | 'route-b' | 'route-c';
  name: string;
  tagline: string;
  isRecommended: boolean;
  stepsCount: number;
  forgeScore: number;
  technicalFeasibility: number;
  economicPotential: number;
  greenChemistry: number;
  rawMaterialAvailability: number;
  scaleUpSuitability: number;
  dataConfidence: number;
  estimatedYieldOverall: number;
  eFactor: number;
  pmi: number;
  solventScore: number;
  energyIntensityScore: number;
  estimatedCostPerKg: number; // in INR
  steps: ReactionStep[];
  pros: string[];
  risksAndUncertainties: string[];
  validationFocus: string;
}

export interface OpportunityItem {
  id: string;
  moleculeName: string;
  formula: string;
  feedstockId: FeedstockId;
  category: ProductCategory;
  application: string;
  marketAttractiveness: 'Very High' | 'High' | 'Moderate';
  routeConfidence: number;
  sustainabilityScore: number;
  forgeScore: number;
  stepsCount: number;
  targetPriceINR: string;
  primaryAdvantage: string;
  status: 'Discovered' | 'Screened' | 'Shortlisted' | 'Validation' | 'Approved for Pilot';
}

export interface SustainabilityMetrics {
  eFactor: number;
  pmi: number;
  atomEconomy: number;
  solventBurden: 'Low' | 'Low–Moderate' | 'Moderate' | 'High';
  energyIntensity: 'Low' | 'Moderate' | 'High';
  waterUsageM3PerTon: number;
  wasteBreakdown: {
    category: string;
    kgPerKgProduct: number;
    percentage: number;
  }[];
  processIntensity: {
    operation: string;
    severity: 'Mild' | 'Moderate' | 'Demanding' | 'Extreme';
    score: number; // 0-100 where higher is harsher
    details: string;
  }[];
  recommendations: string[];
}

export interface EconomicBreakdown {
  totalCostPerKg: number; // ₹428
  feedstockCost: number; // ₹96
  reagentCost: number; // ₹118
  catalystCost: number; // ₹41
  solventCost: number; // ₹72
  energyCost: number; // ₹38
  wasteTreatmentCost: number; // ₹63
  currency: string;
  benchmarkMarketPrice: number; // ₹680/kg
  estimatedGrossMarginPercent: number; // ~37%
  sensitivityFactors: {
    parameter: string;
    defaultChange: string;
    impactOnCost: string;
    impactPercentage: number;
  }[];
}

export interface SupplyChainMaterial {
  material: string;
  role: 'Feedstock' | 'Reagent' | 'Catalyst' | 'Solvent';
  globalAvailability: 'High' | 'Medium' | 'Constrained';
  domesticAvailability: 'High' | 'Medium' | 'Low';
  riskLevel: 'Low Risk' | 'Medium Risk' | 'High Risk';
  estimatedCostUnit: string;
  supplierStatus: string;
  leadTimeWeeks: number;
  alternateSourcesCount: number;
}

export interface ValidationTask {
  id: string;
  category: 'Chemistry' | 'Process' | 'Sustainability' | 'Commercial';
  title: string;
  description: string;
  completed: boolean;
  priority: 'Critical' | 'High' | 'Medium';
  assignedRole: string;
  targetMetric: string;
}

export interface DecisionReport {
  id: string;
  title: string;
  category: string;
  date: string;
  project: string;
  targetMolecule: string;
  feedstock: string;
  route: string;
  forgeScore: number;
  status: 'Ready for Review' | 'Finalized' | 'Draft' | 'Requires Lab Data';
  summary: string;
  keyFindings: string[];
}
