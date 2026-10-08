import express, { Request, Response } from 'express';
import {
  MoleculeForgeEngine,
  MoleculeForgeFormulas,
  HMEL_CASE_STUDY_DATA,
  SyntheticRouteInput,
  WeightProfile
} from './moleculeForgeEngine.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Enable CORS for frontend integration
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// ----------------------------------------------------------------------------
// Health Check Endpoint
// ----------------------------------------------------------------------------
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'HEALTHY',
    service: 'Molecule Forge Backend Microservice',
    engineVersion: '2.4.0',
    timestamp: new Date().toISOString()
  });
});

// ----------------------------------------------------------------------------
// Feedstock Intelligence Endpoint
// ----------------------------------------------------------------------------
app.get('/api/feedstocks', (_req: Request, res: Response) => {
  const feedstocks = [
    {
      id: 'benzene',
      name: 'Benzene',
      purity: '99.8%',
      source: 'Refinery Aromatic Stream / CCR Unit',
      functionalHandles: ['Electrophilic aromatic substitution', 'Alkylation', 'Nitration'],
      targetProductFamilies: ['Agrochemical Intermediates', 'Pharma KSMs', 'Phenolic Resins']
    },
    {
      id: 'phenol',
      name: 'Phenol',
      purity: '99.5%',
      source: 'Cumene Oxidation / Downstream Aromatics',
      functionalHandles: ['Formylation', 'Oximation', 'Carboxylation'],
      targetProductFamilies: ['Antioxidant Intermediates', 'Performance Additives', 'Fine Chemicals']
    },
    {
      id: 'toluene',
      name: 'Toluene',
      purity: '99.0%',
      source: 'Reformate Stream',
      functionalHandles: ['Side-chain oxidation', 'Halogenation', 'Dealkylation'],
      targetProductFamilies: ['Specialty Solvents', 'Benzoic Acid Derivatives', 'Monomers']
    },
    {
      id: 'xylene',
      name: 'Mixed Xylenes (p/o/m)',
      purity: '98.5%',
      source: 'Aromatic Extraction Unit',
      functionalHandles: ['Catalytic oxidation', 'Isomerization'],
      targetProductFamilies: ['Phthalic/Terephthalic Derivatives', 'Specialty Plasticizers']
    }
  ];
  res.json({ count: feedstocks.length, feedstocks });
});

// ----------------------------------------------------------------------------
// Evaluate a Single Synthetic Route
// ----------------------------------------------------------------------------
app.post('/api/routes/evaluate', (req: Request, res: Response) => {
  try {
    const routeInput: SyntheticRouteInput = req.body.route;
    const weights: WeightProfile = req.body.weights || MoleculeForgeEngine.DEFAULT_WEIGHTS;

    if (!routeInput || !routeInput.steps) {
      return res.status(400).json({ error: 'Missing route specification or reaction steps.' });
    }

    const evaluation = MoleculeForgeEngine.evaluateRoute(routeInput, weights);
    return res.json({ success: true, data: evaluation });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// ----------------------------------------------------------------------------
// Multi-Route Comparative Screening Matrix
// ----------------------------------------------------------------------------
app.post('/api/routes/compare', (req: Request, res: Response) => {
  try {
    const routes: SyntheticRouteInput[] = req.body.routes;
    const weights: WeightProfile = req.body.weights || MoleculeForgeEngine.DEFAULT_WEIGHTS;

    if (!routes || !Array.isArray(routes) || routes.length === 0) {
      return res.status(400).json({ error: 'Array of candidate routes is required.' });
    }

    const comparison = MoleculeForgeEngine.compareRoutes(routes, weights);
    return res.json({ success: true, data: comparison });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// ----------------------------------------------------------------------------
// HMEL Industrial Case Study Dataset & Evaluation
// ----------------------------------------------------------------------------
app.get('/api/case-study/hmel', (_req: Request, res: Response) => {
  const comparison = MoleculeForgeEngine.compareRoutes(HMEL_CASE_STUDY_DATA);
  res.json({
    industrialFacility: 'HMEL Bathinda Complex, Punjab',
    feedstock: 'Benzene (Refinery Stream, 99.8% Purity)',
    targetMolecule: '4-Hydroxy-3-methylbenzonitrile (4-H-3-MBN)',
    routes: HMEL_CASE_STUDY_DATA,
    evaluationResult: comparison
  });
});

app.listen(PORT, () => {
  console.log(`[Molecule Forge Backend] Listening on port ${PORT}`);
});
