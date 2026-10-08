import {
  Feedstock,
  Molecule,
  SynthesisRoute,
  OpportunityItem,
  SustainabilityMetrics,
  EconomicBreakdown,
  SupplyChainMaterial,
  ValidationTask,
  DecisionReport
} from '../types/chemistry';

export const FEEDSTOCKS: Feedstock[] = [
  {
    id: 'benzene',
    name: 'Benzene',
    formula: 'C6H6',
    casNumber: '71-43-2',
    purity: '99.8%',
    boilingPoint: '80.1 °C',
    density: '0.876 g/cm³',
    availability: 'High',
    domesticAvailability: 'Abundant',
    opportunityScore: 91,
    refineryStream: 'Catalytic Reforming (CCR) / Steam Cracking Pyrolysis Gasoline (PyGas)',
    description: 'Fundamental primary aromatic hydrocarbon stream with exceptional ring stability, serving as the master building block for phenolic, alkylated, and nitro-aromatic value chains.',
    safetyNotes: [
      'Carcinogen (IARC Group 1); requires closed-loop vapor recovery systems',
      'Flammable liquid (Flash point: -11 °C); strict static grounding protocol'
    ],
    transformationFamilies: [
      'Electrophilic Aromatic Substitution (Nitration, Chlorination, Sulfonation)',
      'Friedel-Crafts Alkylation / Acylation',
      'Catalytic Hydroxylation (Direct/Indirect to Phenols)',
      'Oxidative Cleavage / Anhydrides'
    ],
    productCategories: [
      'Pharmaceutical Intermediate',
      'Agrochemical Intermediate',
      'Specialty Chemical',
      'Polymer Additive'
    ],
    existingApplications: ['Styrene monomer', 'Cumene', 'Cyclohexane', 'Nitrobenzene'],
    downstreamOpportunitiesCount: 9,
    downstreamTree: [
      {
        family: 'Phenol & Hydroxylated Derivatives',
        intermediates: ['Cumene', 'Phenol', 'Hydroquinone', 'Resorcinol'],
        endProducts: ['Vanillin precursor', 'Antioxidant stabilizers', 'Resorcinol resins']
      },
      {
        family: 'Alkylated & Acylated Aromatics',
        intermediates: ['Ethylbenzene', 'tert-Butylbenzene', 'Acetophenone'],
        endProducts: [' hindered phenolic antioxidants', 'Specialty fragrance intermediates']
      },
      {
        family: 'Functionalized Nitro & Amino Aromatics',
        intermediates: ['Nitrobenzene', 'Aniline', '4-Aminophenol'],
        endProducts: ['Paracetamol active ingredient', 'Rubber vulcanization accelerators']
      },
      {
        family: 'Specialty Halogenated Intermediates',
        intermediates: ['Chlorobenzene', '1,4-Dichlorobenzene', 'Fluorobenzene'],
        endProducts: ['High-performance polyphenylene sulfide (PPS)', 'Fluorinated agrochemicals']
      }
    ]
  },
  {
    id: 'phenol',
    name: 'Phenol',
    formula: 'C6H6O',
    casNumber: '108-95-2',
    purity: '99.5%',
    boilingPoint: '181.7 °C',
    density: '1.07 g/cm³',
    availability: 'High',
    domesticAvailability: 'Abundant',
    opportunityScore: 87,
    refineryStream: 'Cumene hydroperoxide downstream stream or direct catalytic oxidation',
    description: 'Activated aromatic ring bearing nucleophilic hydroxyl group, highly receptive to ortho/para regioselective transformations and condensation chemistry.',
    safetyNotes: [
      'Corrosive to skin and mucous membranes; toxic upon dermal absorption',
      'Melting point 40.5 °C requires heated transfer manifolds'
    ],
    transformationFamilies: [
      'Formylation (Reimer-Tiemann / Duff)',
      'Ortho-Alkylation (Sterically hindered antioxidants)',
      'Kolbe-Schmitt Carboxylation (Salicylic acid)',
      'Catalytic Hydrogenation (Cyclohexanol/one)'
    ],
    productCategories: ['Pharmaceutical Intermediate', 'Polymer Additive', 'Specialty Chemical'],
    existingApplications: ['Bisphenol A', 'Phenolic resins', 'Caprolactam'],
    downstreamOpportunitiesCount: 6,
    downstreamTree: [
      {
        family: 'Phenolic Antioxidants',
        intermediates: ['2,6-di-tert-butylphenol', '4-tert-butylphenol'],
        endProducts: ['BHT food/fuel stabilizer', 'Hindered phenolic phosphites']
      },
      {
        family: 'Salicylates & API Intermediates',
        intermediates: ['Salicylic acid', 'Methyl salicylate'],
        endProducts: ['Aspirin precursor', 'Sunscreen UV absorbers']
      }
    ]
  },
  {
    id: 'toluene',
    name: 'Toluene',
    formula: 'C7H8',
    casNumber: '108-88-3',
    purity: '99.7%',
    boilingPoint: '110.6 °C',
    density: '0.867 g/cm³',
    availability: 'High',
    domesticAvailability: 'Abundant',
    opportunityScore: 84,
    refineryStream: 'Reformate fractionation cut / Pyrolysis gasoline heart-cut',
    description: 'Methyl-activated aromatic intermediate featuring dual synthetic handles: benzylic C-H functionalization and regioselective ring electrophilic substitution.',
    safetyNotes: [
      'Flammable liquid and vapor; neurotoxicity warnings for enclosed vapors',
      'Strict regulatory controls on diversion tracking'
    ],
    transformationFamilies: [
      'Benzylic Oxidation (Benzaldehyde, Benzoic acid)',
      'Side-Chain Halogenation (Benzyl chloride)',
      'Regioselective Nitration (Dinitrotoluenes, Nitro-toluenes)',
      'Hydrodealkylation'
    ],
    productCategories: ['Specialty Solvent', 'Agrochemical Intermediate', 'Specialty Chemical'],
    existingApplications: ['Toluene diisocyanate (TDI)', 'Benzoic acid', 'Industrial solvents'],
    downstreamOpportunitiesCount: 5,
    downstreamTree: [
      {
        family: 'Benzylic Oxygenates',
        intermediates: ['Benzyl alcohol', 'Benzaldehyde'],
        endProducts: ['Benzyl benzoate aroma', 'Agrochemical cyanopyridines']
      },
      {
        family: 'Sulfonated & Halogenated Toluenes',
        intermediates: ['p-Toluenesulfonyl chloride', 'o-Chlorotoluene'],
        endProducts: ['Tosylate leaving group reagents', 'Pyrethroid agrochemical intermediates']
      }
    ]
  },
  {
    id: 'xylene',
    name: 'Mixed Xylenes (p/o/m)',
    formula: 'C8H10',
    casNumber: '1330-20-7',
    purity: '99.2%',
    boilingPoint: '138.5 °C',
    density: '0.864 g/cm³',
    availability: 'Medium',
    domesticAvailability: 'Moderate',
    opportunityScore: 79,
    refineryStream: 'Aromatics extraction unit (BTX loop) and parex separation',
    description: 'Dimethylbenzene isomeric stream dominated by paraxylene for polyester intermediates, with ortho/meta cuts available for high-value specialty di-acids and fine chemicals.',
    safetyNotes: [
      'Flammable; nervous system depressant',
      'Isomeric separation requires energy-intensive crystallization or adsorption'
    ],
    transformationFamilies: [
      'Oxidation to Di-carboxylic acids',
      'Chloromethylation',
      'Ring Nitration & Reduction to Xylidines'
    ],
    productCategories: ['Resin / Monomer', 'Advanced Material', 'Polymer Additive'],
    existingApplications: ['Purified Terephthalic Acid (PTA)', 'Phthalic anhydride', 'Isophthalic acid'],
    downstreamOpportunitiesCount: 4,
    downstreamTree: [
      {
        family: 'Di-functional Monomers',
        intermediates: ['Terephthaloyl chloride', 'Dimethyl isophthalate'],
        endProducts: ['Aramid polymer fibers (Kevlar)', 'High-barrier barrier resins']
      }
    ]
  },
  {
    id: 'hexane',
    name: 'n-Hexane',
    formula: 'C6H14',
    casNumber: '110-54-3',
    purity: '98.5%',
    boilingPoint: '68.7 °C',
    density: '0.655 g/cm³',
    availability: 'High',
    domesticAvailability: 'Abundant',
    opportunityScore: 72,
    refineryStream: 'Light naphtha hydrotreated isomerate distillation overhead',
    description: 'Aliphatic non-polar solvent stream and potential feedstock for catalytic C-H borylation, bio-compatible extraction solvents, and specialty alpha-olefin building blocks.',
    safetyNotes: [
      'Highly flammable; peripheral neuropathy hazards upon chronic exposure',
      'Low flash point requires explosion-proof electrical classification'
    ],
    transformationFamilies: [
      'Catalytic Dehydrocyclization to Benzene',
      'Regioselective C-H Functionalization (Emerging)',
      'Liquid-Liquid Extraction Solvents'
    ],
    productCategories: ['Specialty Solvent', 'Specialty Chemical'],
    existingApplications: ['Edible oil extraction', 'Polymerization solvent', 'Adhesive formulations'],
    downstreamOpportunitiesCount: 3,
    downstreamTree: [
      {
        family: 'Aliphatic Solvents & Intermediates',
        intermediates: ['Hexyl alcohol', 'Hexanoic acid'],
        endProducts: ['High-purity electronic cleaning blends', 'Specialty lubricant esters']
      }
    ]
  }
];

export const TOP_OPPORTUNITIES: OpportunityItem[] = [
  {
    id: 'opp-1',
    moleculeName: 'Demo Aromatic Intermediate A (4-H-3-MBN)',
    formula: 'C8H7NO2',
    feedstockId: 'benzene',
    category: 'Pharmaceutical Intermediate',
    application: 'Key building block for kinase inhibitors and cardiovascular therapeutics',
    marketAttractiveness: 'Very High',
    routeConfidence: 78,
    sustainabilityScore: 88,
    forgeScore: 81,
    stepsCount: 4,
    targetPriceINR: '₹750 - ₹920 / kg',
    primaryAdvantage: 'High margin export substitution with low domestic manufacturing footprint',
    status: 'Shortlisted'
  },
  {
    id: 'opp-2',
    moleculeName: '2,6-Di-tert-butyl-4-methylphenol (BHT High-Grade)',
    formula: 'C15H24O',
    feedstockId: 'toluene',
    category: 'Polymer Additive',
    application: 'Primary antioxidant for ultra-high molecular weight polyolefins and jet fuel',
    marketAttractiveness: 'High',
    routeConfidence: 89,
    sustainabilityScore: 84,
    forgeScore: 86,
    stepsCount: 3,
    targetPriceINR: '₹340 - ₹410 / kg',
    primaryAdvantage: 'Direct coupling with refinery isobutylene stream with atom economy >85%',
    status: 'Validation'
  },
  {
    id: 'opp-3',
    moleculeName: '4-Aminophenol (Specialty Pharma Grade)',
    formula: 'C6H7NO',
    feedstockId: 'benzene',
    category: 'Pharmaceutical Intermediate',
    application: 'Analgesic synthesis (Paracetamol/Acetaminophen) and photographic dye developers',
    marketAttractiveness: 'Very High',
    routeConfidence: 91,
    sustainabilityScore: 79,
    forgeScore: 84,
    stepsCount: 3,
    targetPriceINR: '₹280 - ₹340 / kg',
    primaryAdvantage: 'Catalytic hydrogenation alternative replacing hazardous iron-acid reduction',
    status: 'Approved for Pilot'
  },
  {
    id: 'opp-4',
    moleculeName: 'Resorcinol (High Purity Tire Cord Grade)',
    formula: 'C6H6O2',
    feedstockId: 'benzene',
    category: 'Specialty Chemical',
    application: 'Adhesion promoters in radial tires, wood adhesives, UV stabilizers',
    marketAttractiveness: 'High',
    routeConfidence: 74,
    sustainabilityScore: 72,
    forgeScore: 79,
    stepsCount: 4,
    targetPriceINR: '₹460 - ₹580 / kg',
    primaryAdvantage: 'Substitution of heavy disulfonation via catalytic hydroperoxidation route',
    status: 'Screened'
  },
  {
    id: 'opp-5',
    moleculeName: 'Vanillin Precursor (4-Hydroxy-3-methoxybenzaldehyde)',
    formula: 'C8H8O3',
    feedstockId: 'phenol',
    category: 'Specialty Chemical',
    application: 'Food flavorings, fragrance formulations, and pharmaceutical synthesis',
    marketAttractiveness: 'High',
    routeConfidence: 77,
    sustainabilityScore: 85,
    forgeScore: 82,
    stepsCount: 4,
    targetPriceINR: '₹1,200 - ₹1,450 / kg',
    primaryAdvantage: 'High value multiplier (>12x feedstock value) using mild glyoxylic acid route',
    status: 'Validation'
  },
  {
    id: 'opp-6',
    moleculeName: 'Terephthaloyl Chloride (Polymer Grade)',
    formula: 'C8H4Cl2O2',
    feedstockId: 'xylene',
    category: 'Advanced Material',
    application: 'Key monomer for Kevlar / Nomex aramid fibers and aerospace composites',
    marketAttractiveness: 'Very High',
    routeConfidence: 82,
    sustainabilityScore: 76,
    forgeScore: 80,
    stepsCount: 3,
    targetPriceINR: '₹520 - ₹660 / kg',
    primaryAdvantage: 'Direct chlorination of terephthalic acid stream from refinery parex unit',
    status: 'Shortlisted'
  },
  {
    id: 'opp-7',
    moleculeName: 'p-Cresol (Specialty Agrochemical Grade)',
    formula: 'C7H8O',
    feedstockId: 'toluene',
    category: 'Agrochemical Intermediate',
    application: 'Pyrethroid insecticides and antioxidant intermediates',
    marketAttractiveness: 'Moderate',
    routeConfidence: 86,
    sustainabilityScore: 80,
    forgeScore: 78,
    stepsCount: 2,
    targetPriceINR: '₹220 - ₹280 / kg',
    primaryAdvantage: 'Direct selective sulfonation and caustic fusion with high local demand',
    status: 'Discovered'
  }
];

export const MOLECULES_LIST: Molecule[] = [
  {
    id: 'mol-demo-a',
    name: 'Demo Aromatic Intermediate A',
    formula: 'C8H7NO2',
    molecularWeight: 149.15,
    smiles: 'COC1=C(O)C=CC(=C1)C#N',
    category: 'Pharmaceutical Intermediate',
    startingFeedstock: 'benzene',
    marketPriceRange: '₹750 – ₹920 / kg',
    estimatedMarketSize: '$480M Global',
    cagr: '8.4%',
    applications: ['Kinase inhibitor syntheses', 'Targeted oncology active agents', 'Cardiovascular APIs'],
    hazardClass: 'Class 6.1 (Harmful by ingestion)',
    candidateRoutesCount: 3,
    forgeScore: 81,
    keyFunctionalGroups: ['Phenolic OH', 'Aromatic Methoxy (-OCH3)', 'Nitrile (-CN)'],
    description: 'High-value polyfunctionalized aromatic core intermediate synthesized through multi-step functionalization of refinery-derived benzene.'
  },
  {
    id: 'mol-bht',
    name: '2,6-Di-tert-butyl-4-methylphenol (BHT)',
    formula: 'C15H24O',
    molecularWeight: 220.35,
    smiles: 'CC1=CC(=C(C(=C1)C(C)(C)C)O)C(C)(C)C',
    category: 'Polymer Additive',
    startingFeedstock: 'toluene',
    marketPriceRange: '₹340 – ₹410 / kg',
    estimatedMarketSize: '$620M Global',
    cagr: '5.2%',
    applications: ['Polyolefin thermal stabilizer', 'Lubricant antioxidant', 'Aviation fuel additive'],
    hazardClass: 'Class 9 (Aquatic toxicity hazard)',
    candidateRoutesCount: 2,
    forgeScore: 86,
    keyFunctionalGroups: ['Sterically Hindered Phenol', 'tert-Butyl groups', 'Benzylic methyl'],
    description: 'Premier hindered phenolic antioxidant produced via the catalytic alkylation of p-cresol (from refinery toluene) with isobutylene.'
  },
  {
    id: 'mol-aminophenol',
    name: '4-Aminophenol (PAP)',
    formula: 'C6H7NO',
    molecularWeight: 109.13,
    smiles: 'NC1=CC=C(O)C=C1',
    category: 'Pharmaceutical Intermediate',
    startingFeedstock: 'benzene',
    marketPriceRange: '₹280 – ₹340 / kg',
    estimatedMarketSize: '$1.1B Global',
    cagr: '4.8%',
    applications: ['Paracetamol / Acetaminophen synthesis', 'Black/white photographic developers', 'Hair dye colorants'],
    hazardClass: 'Class 6.1 (Skin sensitizer)',
    candidateRoutesCount: 4,
    forgeScore: 84,
    keyFunctionalGroups: ['Primary Aromatic Amine', 'Para-Phenolic OH'],
    description: 'Vital medicinal intermediate generated from benzene nitration followed by catalytic hydrogenation with Bamberger rearrangement suppression.'
  },
  {
    id: 'mol-resorcinol',
    name: 'Resorcinol (1,3-Benzenediol)',
    formula: 'C6H6O2',
    molecularWeight: 110.11,
    smiles: 'OC1=CC=CC(O)=C1',
    category: 'Specialty Chemical',
    startingFeedstock: 'benzene',
    marketPriceRange: '₹460 – ₹580 / kg',
    estimatedMarketSize: '$390M Global',
    cagr: '6.1%',
    applications: ['Tire cord dipped cord adhesives (RFL)', 'Flame retardants (RDP)', 'UV absorbers'],
    hazardClass: 'Class 6.1 (Aquatic acute 1)',
    candidateRoutesCount: 3,
    forgeScore: 79,
    keyFunctionalGroups: ['Meta-Dihydroxy Benzene'],
    description: 'Di-phenolic building block produced traditionally via benzene disulfonic acid caustic fusion, now targeted via green hydroperoxidation.'
  },
  {
    id: 'mol-vanillin-prec',
    name: 'Vanillin Precursor (4-Hydroxy-3-methoxybenzaldehyde)',
    formula: 'C8H8O3',
    molecularWeight: 152.15,
    smiles: 'COC1=C(O)C=CC(=C1)C=O',
    category: 'Specialty Chemical',
    startingFeedstock: 'phenol',
    marketPriceRange: '₹1,200 – ₹1,450 / kg',
    estimatedMarketSize: '$750M Global',
    cagr: '7.3%',
    applications: ['Flavor & fragrance compounding', 'L-DOPA intermediate', 'Antimicrobial coatings'],
    hazardClass: 'Non-hazardous / Food grade capable',
    candidateRoutesCount: 3,
    forgeScore: 82,
    keyFunctionalGroups: ['Aromatic Aldehyde', 'Phenolic OH', 'Methoxy'],
    description: 'Aromatic aldehyde produced through the glyoxylic acid condensation with guaiacol (derived from phenol) followed by oxidative decarboxylation.'
  },
  {
    id: 'mol-terephthaloyl',
    name: 'Terephthaloyl Chloride (TPC)',
    formula: 'C8H4Cl2O2',
    molecularWeight: 203.02,
    smiles: 'O=C(Cl)C1=CC=C(C=C1)C(=O)Cl',
    category: 'Advanced Material',
    startingFeedstock: 'xylene',
    marketPriceRange: '₹520 – ₹660 / kg',
    estimatedMarketSize: '$310M Global',
    cagr: '9.0%',
    applications: ['Para-aramid fiber synthesis (Kevlar)', 'Liquid crystal polymers', 'High heat polyesters'],
    hazardClass: 'Class 8 (Corrosive, water reactive)',
    candidateRoutesCount: 2,
    forgeScore: 80,
    keyFunctionalGroups: ['Dual Acyl Chlorides', 'Para-substituted Aromatic'],
    description: 'Di-acyl chloride monomer synthesized by chlorinating terephthalic acid (derived from p-xylene) with thionyl chloride or phosgene substitutes.'
  }
];

export const DEMO_ROUTES: SynthesisRoute[] = [
  {
    id: 'route-a',
    name: 'Route A — Shortest Route',
    tagline: 'High yield and minimal transformation count with harsh reagent burden',
    isRecommended: false,
    stepsCount: 3,
    forgeScore: 77,
    technicalFeasibility: 84,
    economicPotential: 88,
    greenChemistry: 67,
    rawMaterialAvailability: 62,
    scaleUpSuitability: 78,
    dataConfidence: 86,
    estimatedYieldOverall: 71.2,
    eFactor: 16.4,
    pmi: 22.8,
    solventScore: 61,
    energyIntensityScore: 75,
    estimatedCostPerKg: 395,
    pros: [
      'Only 3 linear transformation steps minimizes plant footprint',
      'High conversion rates documented in academic literature',
      'High overall cumulative yield (71.2%)'
    ],
    risksAndUncertainties: [
      'Relies on hazardous cyanating reagent (NaCN / CuCN)',
      'High salt discharge during neutralization stage',
      'Solvent recycling is difficult due to polar DMF azeotropes'
    ],
    validationFocus: 'Cyanide effluent detoxification and solvent thermal recovery limits',
    steps: [
      {
        stepNumber: 1,
        title: 'Electrophilic Chlorination of Benzene',
        reactant: 'Benzene',
        reactantFormula: 'C6H6',
        product: 'Chlorobenzene',
        productFormula: 'C6H5Cl',
        reactionClass: 'Electrophilic Aromatic Substitution',
        reagentCategory: 'Halogenating Agent',
        reagents: 'Cl2 gas, dry',
        catalyst: 'FeCl3 (anhydrous, 1.5 mol%)',
        solvent: 'Neat (solventless)',
        temperature: '45 – 55 °C',
        pressure: '1.2 bar',
        estimatedYield: 88,
        confidence: 94,
        atomEconomy: 75,
        provenance: 'VERIFIED DATA',
        riskFlags: ['Toxic Cl2 handling', 'Corrosive HCl off-gas scrubber required'],
        validationRequirement: 'Off-gas scrubber capacity and polychlorinated byproduct recycle limits',
        notes: 'Classic industrial process with high conversion; monochloro selectivity controlled via stoichiometry.'
      },
      {
        stepNumber: 2,
        title: 'Methoxylation & Direct Formylation',
        reactant: 'Chlorobenzene',
        reactantFormula: 'C6H5Cl',
        product: '4-Chloro-2-methoxyphenol Intermediate',
        productFormula: 'C7H7ClO2',
        reactionClass: 'Nucleophilic Aromatic Substitution & Directed Oxidation',
        reagentCategory: 'Alkoxide & Formylating Agent',
        reagents: 'NaOMe in MeOH, followed by paraformaldehyde',
        catalyst: 'CuI / Phenanthroline (3 mol%)',
        solvent: 'Methanol / DMF blend',
        temperature: '110 – 125 °C',
        pressure: '4.5 bar (autogenous)',
        estimatedYield: 82,
        confidence: 81,
        atomEconomy: 68,
        provenance: 'LITERATURE-DERIVED',
        riskFlags: ['Pressure vessel required', 'Copper catalyst recovery required'],
        validationRequirement: 'Autoclave pressure kinetics and copper precipitation in crude cake',
        notes: 'Requires controlled methoxide stoichiometry to prevent symmetric bis-ether formation.'
      },
      {
        stepNumber: 3,
        title: 'Direct Rosenmund-von Braun Cyanation',
        reactant: '4-Chloro-2-methoxyphenol Intermediate',
        reactantFormula: 'C7H7ClO2',
        product: 'Demo Aromatic Intermediate A',
        productFormula: 'C8H7NO2',
        reactionClass: 'Transition Metal Catalyzed Cyanation',
        reagentCategory: 'Cyanide Source',
        reagents: 'CuCN / NaCN',
        catalyst: 'Cu(I) catalyst (stoichiometric/semi-catalytic)',
        solvent: 'N,N-Dimethylformamide (DMF)',
        temperature: '145 – 160 °C',
        pressure: 'Atmospheric',
        estimatedYield: 79,
        confidence: 76,
        atomEconomy: 59,
        provenance: 'MODEL PREDICTION',
        riskFlags: ['HCN generation hazard', 'Heavy metal copper wastewater burden'],
        validationRequirement: 'Cyanide destruction protocols and copper recycling economics',
        notes: 'Fast reaction but poor green metrics due to stoichiometric copper and hazardous cyanide salts.'
      }
    ]
  },
  {
    id: 'route-b',
    name: 'Route B — Balanced Route',
    tagline: 'Optimal compromise of green metrics, accessible domestic reagents, and scalable unit operations',
    isRecommended: true,
    stepsCount: 4,
    forgeScore: 81,
    technicalFeasibility: 76,
    economicPotential: 79,
    greenChemistry: 91,
    rawMaterialAvailability: 75,
    scaleUpSuitability: 82,
    dataConfidence: 74,
    estimatedYieldOverall: 64.8,
    eFactor: 8.4,
    pmi: 14.7,
    solventScore: 85,
    energyIntensityScore: 54,
    estimatedCostPerKg: 428,
    pros: [
      'Exemplary green metrics (E-factor: 8.4 vs 16.4 in Route A)',
      'Substitutes toxic cyanides with catalytic oximation-dehydration',
      'Uses low-toxicity, easily recoverable green solvent (Ethyl Acetate / Water)',
      'Exceptional scale-up safety profile with mild operating pressures'
    ],
    risksAndUncertainties: [
      'Step 3 catalytic oxidation yield predicted at 78% has limited high-tonnage literature precedent',
      'Solid-liquid separation required at Step 2 demands optimized crystallization filters',
      'Purification method requires laboratory confirmation of mother liquor recycling'
    ],
    validationFocus: 'Confirm Step 3 catalytic oxidation selectivity and evaluate Mother Liquor telescoping',
    steps: [
      {
        stepNumber: 1,
        title: 'Catalytic Hydroxylation of Benzene to Phenol Intermediate',
        reactant: 'Benzene',
        reactantFormula: 'C6H6',
        product: 'Phenol / Methoxybenzene (Anisole)',
        productFormula: 'C7H8O',
        reactionClass: 'Direct Catalytic Oxidation / O-Alkylation',
        reagentCategory: 'Green Oxidant & Methylating Reagent',
        reagents: 'H2O2 (30% aq) / Dimethyl Carbonate (DMC)',
        catalyst: 'Titano-silicate zeolite (TS-1) / K2CO3',
        solvent: 'Neat / Water-DMC co-solvent',
        temperature: '70 – 85 °C',
        pressure: 'Atmospheric',
        estimatedYield: 85,
        confidence: 88,
        atomEconomy: 84,
        provenance: 'VERIFIED DATA',
        riskFlags: ['Mild exotherm during H2O2 metered dosing'],
        validationRequirement: 'H2O2 dosing heat-release curve and TS-1 catalyst lifetime across 10 recycles',
        notes: 'Green substitution eliminating classic cumene oxidation heavy by-product streams.'
      },
      {
        stepNumber: 2,
        title: 'Regioselective Formylation via Duff Variant',
        reactant: 'Methoxybenzene (Anisole) derivative',
        reactantFormula: 'C7H8O',
        product: '4-Hydroxy-3-methoxybenzaldehyde Precursor',
        productFormula: 'C8H8O3',
        reactionClass: 'Electrophilic Formylation',
        reagentCategory: 'Mild Formylating Reagent',
        reagents: 'Hexamethylenetetramine (HMTA) / Methanesulfonic acid',
        catalyst: 'MSA (Bronsted acid, 10 mol%)',
        solvent: 'Aqueous Ethanol (95%)',
        temperature: '80 – 90 °C',
        pressure: 'Atmospheric',
        estimatedYield: 81,
        confidence: 79,
        atomEconomy: 74,
        provenance: 'LITERATURE-DERIVED',
        riskFlags: ['Formaldehyde traces in aqueous waste requiring biotreatment'],
        validationRequirement: 'Para vs Ortho regioselectivity ratio determination by 1H-NMR',
        notes: 'Avoids toxic Lewis acids (AlCl3) by leveraging recoverable methanesulfonic acid.'
      },
      {
        stepNumber: 3,
        title: 'Green Condensation to Aromatic Oxime Intermediate',
        reactant: '4-Hydroxy-3-methoxybenzaldehyde Precursor',
        reactantFormula: 'C8H8O3',
        product: 'Aromatic Aldoxime Intermediate',
        productFormula: 'C8H9NO3',
        reactionClass: 'Nucleophilic Carbonyl Condensation',
        reagentCategory: 'Hydroxylamine Salt',
        reagents: 'Hydroxylamine sulfate (aqueous) + NaOAc buffer',
        catalyst: 'None (autocatalytic buffered)',
        solvent: 'Water / Isopropanol (1:1)',
        temperature: '50 – 60 °C',
        pressure: 'Atmospheric',
        estimatedYield: 92,
        confidence: 82,
        atomEconomy: 88,
        provenance: 'MODEL PREDICTION',
        riskFlags: ['Hydroxylamine thermal hazard if concentrated dry'],
        validationRequirement: 'Confirm Step 3 predicted yield in continuous stirred tank reactor',
        notes: 'Quantitative conversion in water-alcohol mixtures; precipitate filters cleanly.'
      },
      {
        stepNumber: 4,
        title: 'Catalytic Dehydration to Target Nitrile',
        reactant: 'Aromatic Aldoxime Intermediate',
        reactantFormula: 'C8H9NO3',
        product: 'Demo Aromatic Intermediate A',
        productFormula: 'C8H7NO2',
        reactionClass: 'Dehydration Elimination',
        reagentCategory: 'Green Dehydrating Catalyst',
        reagents: 'Formic acid / Acetic anhydride (catalytic trace)',
        catalyst: 'Cu(OAc)2 (1.0 mol%)',
        solvent: 'Ethyl Acetate (recoverable)',
        temperature: '75 – 82 °C',
        pressure: 'Atmospheric',
        estimatedYield: 86,
        confidence: 72,
        atomEconomy: 82,
        provenance: 'MODEL PREDICTION',
        riskFlags: ['Solvent recovery distillation required'],
        validationRequirement: 'Laboratory validation of copper catalyst recycling and solvent purity',
        notes: 'Yields water as sole stoichiometric coproduct; completely circumvents cyanide usage.'
      }
    ]
  },
  {
    id: 'route-c',
    name: 'Route C — Availability Optimized',
    tagline: 'Engineered entirely around 100% domestic bulk commodity reagents with moderate waste footprint',
    isRecommended: false,
    stepsCount: 4,
    forgeScore: 78,
    technicalFeasibility: 71,
    economicPotential: 73,
    greenChemistry: 78,
    rawMaterialAvailability: 92,
    scaleUpSuitability: 80,
    dataConfidence: 69,
    estimatedYieldOverall: 59.4,
    eFactor: 12.8,
    pmi: 18.2,
    solventScore: 72,
    energyIntensityScore: 68,
    estimatedCostPerKg: 462,
    pros: [
      'Unsurpassed domestic supply assurance (92% availability index)',
      'All 4 steps employ standard commercial reagents already stockpiled at HMEL/refinery complexes',
      'No imported specialty noble metal catalysts or patented ligands required'
    ],
    risksAndUncertainties: [
      'Lower total cumulative yield (59.4%) requires larger reactor volumetric throughput',
      'Slightly higher utility energy demand due to two separate vacuum distillation separations',
      'Step 2 isomer mixture requires careful melt crystallization'
    ],
    validationFocus: 'Isomer separation efficiency and recycle of off-spec fractions',
    steps: [
      {
        stepNumber: 1,
        title: 'Mixed Acid Nitration of Benzene',
        reactant: 'Benzene',
        reactantFormula: 'C6H6',
        product: 'Nitrobenzene',
        productFormula: 'C6H5NO2',
        reactionClass: 'Electrophilic Aromatic Substitution',
        reagentCategory: 'Mineral Acids',
        reagents: 'HNO3 (68%) / H2SO4 (98%)',
        catalyst: 'H2SO4 (spent acid reconcentrated)',
        solvent: 'Biphasic neat',
        temperature: '50 – 65 °C',
        pressure: 'Atmospheric',
        estimatedYield: 94,
        confidence: 96,
        atomEconomy: 82,
        provenance: 'VERIFIED DATA',
        riskFlags: ['Thermal runaway potential', 'Spent acid neutralization burden'],
        validationRequirement: 'Acid reconcentration economics verification',
        notes: 'Bulk industrial process worldwide; extreme reagent availability.'
      },
      {
        stepNumber: 2,
        title: 'Controlled Chlorination of Nitrobenzene',
        reactant: 'Nitrobenzene',
        reactantFormula: 'C6H5NO2',
        product: 'm-Chloronitrobenzene',
        productFormula: 'C6H4ClNO2',
        reactionClass: 'Electrophilic Aromatic Substitution',
        reagentCategory: 'Halogenating Agent',
        reagents: 'Cl2 gas',
        catalyst: 'FeCl3 / I2 (0.8 mol%)',
        solvent: 'Neat',
        temperature: '55 – 65 °C',
        pressure: 'Atmospheric',
        estimatedYield: 78,
        confidence: 84,
        atomEconomy: 69,
        provenance: 'LITERATURE-DERIVED',
        riskFlags: ['Ortho/Para byproduct fraction requires crystallization separation'],
        validationRequirement: 'Isomeric purity validation post vacuum fractionation',
        notes: 'Meta-directing nitro group allows targeted orientation, but leaves 14% o/p isomers.'
      },
      {
        stepNumber: 3,
        title: 'Catalytic Hydrogenation & Selective Methoxylation',
        reactant: 'm-Chloronitrobenzene',
        reactantFormula: 'C6H4ClNO2',
        product: '3-Chloro-4-methoxyaniline Intermediate',
        productFormula: 'C7H8ClNO',
        reactionClass: 'Catalytic Reduction & Coupling',
        reagentCategory: 'Hydrogen & Methanol',
        reagents: 'H2 (8 bar) + NaOMe',
        catalyst: 'Raney Nickel (slurry)',
        solvent: 'Methanol',
        temperature: '80 – 95 °C',
        pressure: '8.0 bar',
        estimatedYield: 82,
        confidence: 70,
        atomEconomy: 71,
        provenance: 'MODEL PREDICTION',
        riskFlags: ['Pyrophoric Raney Nickel catalyst', 'Hydrogen pressure vessel'],
        validationRequirement: 'Raney nickel catalyst de-chlorination side-reaction suppression',
        notes: 'Utilizes inexpensive domestic Raney nickel instead of precious palladium.'
      },
      {
        stepNumber: 4,
        title: 'Sandmeyer Nitrile Formation',
        reactant: '3-Chloro-4-methoxyaniline Intermediate',
        reactantFormula: 'C7H8ClNO',
        product: 'Demo Aromatic Intermediate A',
        productFormula: 'C8H7NO2',
        reactionClass: 'Diazotization & Sandmeyer Cyanation',
        reagentCategory: 'Nitrite & Cuprous Salt',
        reagents: 'NaNO2 / HCl followed by CuCN (domestic grade)',
        catalyst: 'Cu(I) stoichiometric',
        solvent: 'Water / Toluene',
        temperature: '0 – 5 °C (diazotization) then 60 °C',
        pressure: 'Atmospheric',
        estimatedYield: 76,
        confidence: 68,
        atomEconomy: 61,
        provenance: 'INDUSTRIAL ESTIMATE',
        riskFlags: ['Unstable diazonium intermediate at >10 °C', 'Nitrogen evolution gas lock'],
        validationRequirement: 'Continuous diazonium flow generation to avoid bulk storage',
        notes: 'Reagents are 100% available domestically; requires microchannel or low-temperature batch control.'
      }
    ]
  }
];

export const DEMO_SUSTAINABILITY: SustainabilityMetrics = {
  eFactor: 8.4,
  pmi: 14.7,
  atomEconomy: 72,
  solventBurden: 'Low–Moderate',
  energyIntensity: 'Moderate',
  waterUsageM3PerTon: 1.8,
  wasteBreakdown: [
    { category: 'Recoverable Solvents (EtOAc / MeOH)', kgPerKgProduct: 3.2, percentage: 38 },
    { category: 'Neutral Aqueous Salts (NaCl, Na2SO4)', kgPerKgProduct: 2.1, percentage: 25 },
    { category: 'Process Effluent Water', kgPerKgProduct: 1.8, percentage: 21 },
    { category: 'Unreacted Organics & Oligomers', kgPerKgProduct: 0.9, percentage: 11 },
    { category: 'Spent Mineral Catalyst Sludge', kgPerKgProduct: 0.4, percentage: 5 }
  ],
  processIntensity: [
    {
      operation: 'Heating Stages (Max 90 °C)',
      severity: 'Mild',
      score: 32,
      details: 'Operates within low-pressure steam utility envelope (80–90 °C)'
    },
    {
      operation: 'Cooling & Crystallization',
      severity: 'Mild',
      score: 28,
      details: 'Cooling water (30 °C) sufficient; no cryo-chilling (-20 °C) required'
    },
    {
      operation: 'Pressure Operations',
      severity: 'Mild',
      score: 18,
      details: 'Atmospheric processing in all 4 steps; zero high-pressure autoclaves'
    },
    {
      operation: 'Distillation Stages',
      severity: 'Moderate',
      score: 48,
      details: 'Single vacuum solvent strip for ethyl acetate recovery'
    },
    {
      operation: 'Solid-Liquid Separation Difficulty',
      severity: 'Moderate',
      score: 55,
      details: 'Centrifuge filtration of crystalline intermediate Step 3 requires washing'
    }
  ],
  recommendations: [
    'Evaluate solvent recovery distillation loop to increase EtOAc recycle from 82% to 94%',
    'Reduce inorganic salt generation by replacing mineral base buffer with recoverable triethylamine',
    'Investigate continuous telescoped processing between Steps 2 and 3 without isolating intermediate cake',
    'Evaluate alternative organic green base for Step 4 dehydration to trim copper catalyst ash',
    'Validate Step 3 continuous-stirred reactor yield in laboratory autoclave'
  ]
};

export const DEMO_ECONOMICS: EconomicBreakdown = {
  totalCostPerKg: 428,
  feedstockCost: 96,
  reagentCost: 118,
  catalystCost: 41,
  solventCost: 72,
  energyCost: 38,
  wasteTreatmentCost: 63,
  currency: 'INR (₹)',
  benchmarkMarketPrice: 680,
  estimatedGrossMarginPercent: 37.1,
  sensitivityFactors: [
    {
      parameter: 'Refinery Benzene Feedstock Price',
      defaultChange: '+15%',
      impactOnCost: '+8.2%',
      impactPercentage: 8.2
    },
    {
      parameter: 'Solvent Recovery Efficiency (50% → 80%)',
      defaultChange: '+30% Recovery',
      impactOnCost: '-6.4%',
      impactPercentage: -6.4
    },
    {
      parameter: 'Step 3 Catalytic Yield (65% → 78%)',
      defaultChange: '+13% Absolute Yield',
      impactOnCost: '-11.3%',
      impactPercentage: -11.3
    },
    {
      parameter: 'Electricity & High-Pressure Steam Tariff',
      defaultChange: '+20%',
      impactOnCost: '+3.4%',
      impactPercentage: 3.4
    },
    {
      parameter: 'Zero-Liquid Discharge (ZLD) Effluent Cost',
      defaultChange: '+25%',
      impactOnCost: '+4.1%',
      impactPercentage: 4.1
    }
  ]
};

export const SUPPLY_CHAIN_MATERIALS: SupplyChainMaterial[] = [
  {
    material: 'Benzene (Refinery Stream)',
    role: 'Feedstock',
    globalAvailability: 'High',
    domesticAvailability: 'High',
    riskLevel: 'Low Risk',
    estimatedCostUnit: '₹84 / kg',
    supplierStatus: 'Captive Refinery Pipeline (HMEL/Domestic)',
    leadTimeWeeks: 1,
    alternateSourcesCount: 5
  },
  {
    material: 'Catalyst A (Titano-silicate TS-1)',
    role: 'Catalyst',
    globalAvailability: 'Medium',
    domesticAvailability: 'Medium',
    riskLevel: 'Medium Risk',
    estimatedCostUnit: '₹2,400 / kg (reusable)',
    supplierStatus: 'Qualified Domestic Specialty Manufacturer',
    leadTimeWeeks: 4,
    alternateSourcesCount: 2
  },
  {
    material: 'Solvent B (Ethyl Acetate Technical)',
    role: 'Solvent',
    globalAvailability: 'High',
    domesticAvailability: 'High',
    riskLevel: 'Low Risk',
    estimatedCostUnit: '₹76 / kg',
    supplierStatus: 'Multiple Domestic Petrochem Producers',
    leadTimeWeeks: 1,
    alternateSourcesCount: 7
  },
  {
    material: 'Reagent C (Hydroxylamine Sulfate)',
    role: 'Reagent',
    globalAvailability: 'Medium',
    domesticAvailability: 'Low',
    riskLevel: 'High Risk',
    estimatedCostUnit: '₹145 / kg',
    supplierStatus: 'Import Reliant (China/Europe) — Dual-sourcing underway',
    leadTimeWeeks: 8,
    alternateSourcesCount: 2
  },
  {
    material: 'Dimethyl Carbonate (DMC Green Grade)',
    role: 'Reagent',
    globalAvailability: 'High',
    domesticAvailability: 'Medium',
    riskLevel: 'Low Risk',
    estimatedCostUnit: '₹92 / kg',
    supplierStatus: 'Domestic Petrochemical Merchant',
    leadTimeWeeks: 2,
    alternateSourcesCount: 3
  },
  {
    material: 'Copper Acetate Monohydrate',
    role: 'Catalyst',
    globalAvailability: 'High',
    domesticAvailability: 'High',
    riskLevel: 'Low Risk',
    estimatedCostUnit: '₹680 / kg',
    supplierStatus: 'Local Fine Chemical Distributors',
    leadTimeWeeks: 1,
    alternateSourcesCount: 6
  }
];

export const VALIDATION_TASKS: ValidationTask[] = [
  // Chemistry Validation (5)
  {
    id: 'val-chem-1',
    category: 'Chemistry',
    title: 'Confirm reaction transformation & conversion rates',
    description: 'Bench-scale 100 mL verification of Step 1 hydroxylation conversion at 75 °C.',
    completed: true,
    priority: 'Critical',
    assignedRole: 'Organic Synthesis Lead',
    targetMetric: '>85% conversion at 90 min'
  },
  {
    id: 'val-chem-2',
    category: 'Chemistry',
    title: 'Test catalyst/reagent selection & loading limits',
    description: 'Screen TS-1 zeolite catalyst loadings between 0.5% and 2.0% wt/wt.',
    completed: true,
    priority: 'High',
    assignedRole: 'Catalysis Specialist',
    targetMetric: '<1.0 mol% optimal load'
  },
  {
    id: 'val-chem-3',
    category: 'Chemistry',
    title: 'Measure conversion and regioselectivity',
    description: 'Quantify ortho vs para isomers by calibrated HPLC with UV detection at 254 nm.',
    completed: false,
    priority: 'Critical',
    assignedRole: 'Analytical Chemist',
    targetMetric: 'Para:Ortho ratio >= 92:8'
  },
  {
    id: 'val-chem-4',
    category: 'Chemistry',
    title: 'Identify and quantify major by-products',
    description: 'GC-MS profiling of mother liquor to isolate tar, oligomers, and quinone trace species.',
    completed: false,
    priority: 'High',
    assignedRole: 'Analytical Chemist',
    targetMetric: '<2.5% unknown impurities'
  },
  {
    id: 'val-chem-5',
    category: 'Chemistry',
    title: 'Confirm product structure via 1H/13C NMR and LC-MS',
    description: 'Obtain full spectroscopic structural assignment of isolated Demo Intermediate A crystals.',
    completed: true,
    priority: 'Critical',
    assignedRole: 'Spectroscopy Lab',
    targetMetric: '99.2% chemical purity'
  },

  // Process Validation (6)
  {
    id: 'val-proc-1',
    category: 'Process',
    title: 'Evaluate reaction temperature sensitivity & runaway risk',
    description: 'RC1e reaction calorimeter analysis to determine maximum adiabatic temperature rise.',
    completed: true,
    priority: 'Critical',
    assignedRole: 'Process Safety Engineer',
    targetMetric: 'Delta T_ad < 35 °C'
  },
  {
    id: 'val-proc-2',
    category: 'Process',
    title: 'Test liquid-liquid mixing and phase separation kinetics',
    description: 'Measure settling time and emulsion stability in the aqueous/organic biphasic wash.',
    completed: false,
    priority: 'High',
    assignedRole: 'Chemical Process Engineer',
    targetMetric: 'Phase split < 4.0 minutes'
  },
  {
    id: 'val-proc-3',
    category: 'Process',
    title: 'Study crystallization & isolation parameters',
    description: 'Optimize cooling crystallization temperature profile to prevent needle habit jamming.',
    completed: false,
    priority: 'High',
    assignedRole: 'Crystallization Specialist',
    targetMetric: 'D50 particle size > 120 µm'
  },
  {
    id: 'val-proc-4',
    category: 'Process',
    title: 'Check solvent recovery efficiency & recycle purity',
    description: 'Fractional distillation test of spent ethyl acetate across 3 continuous cycles.',
    completed: false,
    priority: 'Medium',
    assignedRole: 'Separation Unit Lead',
    targetMetric: '>88% recovery at 99% purity'
  },
  {
    id: 'val-proc-5',
    category: 'Process',
    title: 'Measure reaction kinetics and residence time',
    description: 'Construct concentration vs time profiles to size pilot continuous stirred tank reactor.',
    completed: false,
    priority: 'Medium',
    assignedRole: 'Reaction Engineer',
    targetMetric: 'Residence time < 120 min'
  },
  {
    id: 'val-proc-6',
    category: 'Process',
    title: 'Review process safety & PHA HAZOP readiness',
    description: 'Complete preliminary hazard evaluation for peroxide storage and handling.',
    completed: false,
    priority: 'Critical',
    assignedRole: 'EHS Manager',
    targetMetric: 'SIL-2 safety interlock rating'
  },

  // Sustainability Validation (4)
  {
    id: 'val-sust-1',
    category: 'Sustainability',
    title: 'Measure empirical waste generation (E-Factor verification)',
    description: 'Collect all solid, liquid, and vent stream mass to verify predicted E-factor 8.4.',
    completed: false,
    priority: 'High',
    assignedRole: 'Environmental Engineer',
    targetMetric: 'Empirical E-factor < 9.5'
  },
  {
    id: 'val-sust-2',
    category: 'Sustainability',
    title: 'Compare solvent green alternatives (2-MeTHF vs EtOAc)',
    description: 'Bio-derived solvent replacement evaluation for Step 4 dehydration reaction.',
    completed: false,
    priority: 'Medium',
    assignedRole: 'Green Chemistry Fellow',
    targetMetric: 'Equivalent yield with bio-solvent'
  },
  {
    id: 'val-sust-3',
    category: 'Sustainability',
    title: 'Track specific process water consumption',
    description: 'Measure wash water volume and test biotreatment COD/BOD reduction kinetics.',
    completed: false,
    priority: 'Medium',
    assignedRole: 'Effluent Plant Lead',
    targetMetric: '<2.0 m³ water per ton'
  },
  {
    id: 'val-sust-4',
    category: 'Sustainability',
    title: 'Evaluate catalytic heavy metal recovery from mother liquor',
    description: 'Assess ion-exchange resin scavenger for copper removal to <5 ppm in aqueous waste.',
    completed: false,
    priority: 'High',
    assignedRole: 'Sustainability Specialist',
    targetMetric: 'Copper in effluent < 2 ppm'
  },

  // Commercial Validation (5)
  {
    id: 'val-comm-1',
    category: 'Commercial',
    title: 'Verify domestic market demand & volume requirements',
    description: 'Conduct primary market interviews with top 5 domestic pharmaceutical API manufacturers.',
    completed: false,
    priority: 'High',
    assignedRole: 'Commercial Business Analyst',
    targetMetric: 'Verified demand > 1,500 TPA'
  },
  {
    id: 'val-comm-2',
    category: 'Commercial',
    title: 'Confirm target customer purity specifications',
    description: 'Obtain pharmacopeial impurity threshold criteria for pharmaceutical synthesis grade.',
    completed: false,
    priority: 'Critical',
    assignedRole: 'Quality Assurance Lead',
    targetMetric: 'Specification sign-off'
  },
  {
    id: 'val-comm-3',
    category: 'Commercial',
    title: 'Compare cost competitiveness against imported Chinese landed tariff',
    description: 'Benchmark preliminary ₹428/kg manufacturing cost against CFR Nhava Sheva import quotes.',
    completed: false,
    priority: 'High',
    assignedRole: 'Economics Strategist',
    targetMetric: '>20% cost advantage vs imports'
  },
  {
    id: 'val-comm-4',
    category: 'Commercial',
    title: 'Confirm required packaging and transport shelf-life',
    description: 'Perform accelerated stability study at 40 °C / 75% RH over 3 months.',
    completed: false,
    priority: 'Medium',
    assignedRole: 'Logistics Specialist',
    targetMetric: 'Zero degradation over 90 days'
  },
  {
    id: 'val-comm-5',
    category: 'Commercial',
    title: 'Estimate preliminary CAPEX for pilot scale demonstration',
    description: 'Develop class-4 capital expenditure estimate for 50 kg/batch skid at R&D facility.',
    completed: false,
    priority: 'High',
    assignedRole: 'Capital Project Engineer',
    targetMetric: 'CAPEX < ₹3.8 Crores'
  }
];

export const DECISION_REPORTS: DecisionReport[] = [
  {
    id: 'rep-1',
    title: 'Route Comparison Report — Benzene to Demo Intermediate A',
    category: 'Synthesis & Technical Feasibility',
    date: '2026-10-04',
    project: 'Benzene → High-Value Aromatic Intermediate',
    targetMolecule: 'Demo Aromatic Intermediate A (4-H-3-MBN)',
    feedstock: 'Benzene (Refinery Stream)',
    route: 'Route B (Recommended) vs Route A & C',
    forgeScore: 81,
    status: 'Ready for Review',
    summary: 'Comprehensive multi-criteria synthesis route evaluation screening three candidate pathways. Recommends Route B based on superior green chemistry profile (E-Factor 8.4) and accessible domestic raw materials.',
    keyFindings: [
      'Route B circumvents cyanide hazard present in Route A with acceptable 4-step execution',
      'Predicted cumulative yield of 64.8% gives comfortable unit margin at ₹428/kg cost of production',
      'Domestic availability index of 75% protects against severe supply disruptions'
    ]
  },
  {
    id: 'rep-2',
    title: 'Sustainability & Green Metrics Assessment',
    category: 'Environmental & Process Safety',
    date: '2026-10-02',
    project: 'Benzene → High-Value Aromatic Intermediate',
    targetMolecule: 'Demo Aromatic Intermediate A',
    feedstock: 'Benzene',
    route: 'Route B (Balanced Route)',
    forgeScore: 81,
    status: 'Finalized',
    summary: 'Detailed evaluation of Process Mass Intensity (PMI: 14.7), E-Factor (8.4), atom economy (72%), and effluent burden under zero-liquid discharge constraints.',
    keyFindings: [
      'Solvent recycling is the single greatest lever for E-factor optimization',
      'Water usage estimated at 1.8 m³/t product conforms to green pharmaceutical guidance',
      'Mild operating temperatures (<90 °C) keep thermal utility energy low'
    ]
  },
  {
    id: 'rep-3',
    title: 'Preliminary Techno-Economic Assessment (TEA)',
    category: 'Financial Feasibility',
    date: '2026-09-28',
    project: 'Benzene → High-Value Aromatic Intermediate',
    targetMolecule: 'Demo Aromatic Intermediate A',
    feedstock: 'Benzene',
    route: 'Route B',
    forgeScore: 81,
    status: 'Finalized',
    summary: 'Preliminary cost model breaking down raw material, solvent recovery, energy utilities, and waste treatment costs, establishing a preliminary manufacturing cost of ₹428/kg.',
    keyFindings: [
      'Raw material and reagent costs account for 50.0% of total cash manufacturing cost',
      'Sensitivities show Step 3 yield improvements directly return -11.3% cost reduction',
      'Gross margin estimated at 37.1% against current imported market benchmark of ₹680/kg'
    ]
  },
  {
    id: 'rep-4',
    title: 'Laboratory Validation Plan & Protocol v1.4',
    category: 'Experimental Screening',
    date: '2026-10-06',
    project: 'Benzene → High-Value Aromatic Intermediate',
    targetMolecule: 'Demo Aromatic Intermediate A',
    feedstock: 'Benzene',
    route: 'Route B',
    forgeScore: 81,
    status: 'Requires Lab Data',
    summary: 'Detailed 20-stage experimental campaign protocol defining bench validation gates across organic synthesis, reaction calorimetry, mother liquor recycling, and commercial specs.',
    keyFindings: [
      '4 of 20 preliminary proof-of-concept steps successfully completed at bench scale',
      'Immediate priority: Confirm Step 3 catalytic oxidation selectivity via continuous HPLC',
      'EHS safety review for metered hydrogen peroxide dosing approved for lab tier'
    ]
  },
  {
    id: 'rep-5',
    title: 'Executive R&D Management Summary',
    category: 'Executive Decision Support',
    date: '2026-10-07',
    project: 'Refinery Aromatic Downstream Expansion',
    targetMolecule: 'Portfolio Review (Benzene, Toluene, Phenol Downstreams)',
    feedstock: 'Multi-Feedstock Screening',
    route: 'Top 3 Recommended Projects',
    forgeScore: 82.4,
    status: 'Ready for Review',
    summary: 'High-level decision brief for industrial leadership recommending greenlighting laboratory validation for Demo Intermediate A and BHT specialty grade from captive refinery aromatics.',
    keyFindings: [
      'Captive feedstock integration provides an estimated ₹60–₹80/kg baseline cost advantage',
      'High-value aromatic derivatives offer 4x to 8x revenue multiplier over fuel-grade reformate',
      'Recommended action: Allocate ₹45 Lakhs for 90-day laboratory validation campaign'
    ]
  }
];
