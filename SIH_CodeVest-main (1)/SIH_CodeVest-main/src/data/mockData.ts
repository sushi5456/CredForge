import {
  FinancingOpportunity,
  BusinessTrustHealthScore,
  DependencyAssessment,
  RiskItem,
  MonitoringEvent,
  BusinessDocument,
  ActivePortfolioPosition,
  PlatformAlert,
  User
} from '../types';

export const DEMO_USERS: Record<string, User> = {
  lender: {
    id: 'usr-len-001',
    username: 'rajesh_capital',
    email: 'rajesh.sharma@apexangels.in',
    name: 'Rajesh Sharma',
    role: 'lender',
    createdAt: '2025-08-12',
    lenderProfile: {
      mobile: '+91 98201 54321',
      profileStatus: 'COMPLETE',
      eligibilityStatus: 'ELIGIBLE',
      profileCompletion: 100,
      pan: 'AAAPS1234F',
      aadhaarLast4: '8821',
      kycStatus: 'Verified',
      investorType: 'Professional Investor',
      annualIncomeRange: '₹50L - ₹1 Cr',
      experienceYears: 8,
      availableCapital: 4500000,
      activeFinancing: 3500000,
      totalExposure: 3500000,
      preferredDownsideTolerance: 200000, // Explicitly non-guaranteed preference
      preferredCategories: ['Precision Engineering', 'Agri-Tech', 'Renewable Energy', 'Textiles'],
      preferredTenureMonths: 12,
      preferredReturnRange: '14% - 18% p.a.',
      riskPreference: 'Balanced'
    }
  },
  borrower: {
    id: 'usr-bor-001',
    username: 'anand_abc',
    email: 'anand.k@abc-manufacturing.in',
    name: 'Anand Krishnamurthy',
    role: 'borrower',
    createdAt: '2025-06-18',
    borrowerProfile: {
      authorizedPersonName: 'Anand Krishnamurthy',
      businessName: 'ABC Manufacturing Pvt Ltd',
      designation: 'Managing Director & Founder',
      mobile: '+91 94441 87654',
      profileStatus: 'COMPLETE',
      visibilityStatus: 'DISCOVERABLE',
      eligibilityStatus: 'ELIGIBLE',
      profileCompletion: 100,
      entityType: 'Private Limited',
      cin: 'U28112TZ2016PTC027891',
      gstin: '33AABCA4589K1Z5',
      pan: 'AABCA4589K',
      industry: 'Automotive & Precision Engineering',
      category: 'Tier-2 Auto Component Fabrication',
      yearEstablished: 2016,
      registeredAddress: 'Plot 44-B, SIDCO Industrial Estate, Kurichi',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      employeesCount: 68,
      annualRevenue: 28400000,
      monthlyRevenue: 2366000,
      monthlyExpenses: 1890000,
      existingDebt: 3200000,
      monthlyDebtObligation: 145000,
      healthScore: 86,
      verificationStatus: 'VERIFIED'
    }
  },
  admin: {
    id: 'usr-adm-001',
    username: 'codevest_admin',
    email: 'superadmin@codevest.fin',
    name: 'Vikramaditya Rao',
    role: 'admin',
    createdAt: '2025-01-01',
    adminProfile: {
      department: 'Platform Oversight & Risk Intelligence',
      permissions: ['ALL_PERMISSIONS', 'RISK_OVERRIDE', 'KYC_APPROVE', 'AUDIT_VIEW'],
      lastLogin: 'Today, 09:14 AM'
    }
  }
};

export const MOCK_OPPORTUNITIES: FinancingOpportunity[] = [
  {
    id: 'opp-001',
    businessName: 'ABC Manufacturing Pvt Ltd',
    legalEntity: 'Private Limited',
    industry: 'Manufacturing',
    category: 'Auto Components & Precision Engineering',
    location: 'Coimbatore, Tamil Nadu',
    requestedAmount: 1500000,
    tenureMonths: 12,
    purpose: 'Procurement of CNC turning centers for Tier-1 EV supplier contract',
    expectedReturnRate: 15.4,
    healthScore: 86,
    trustScore: 88,
    riskLevel: 'Moderate',
    revenueAnnual: 28400000,
    monthlyGrowthRate: 8.2,
    debtServiceCoverageRatio: 2.34,
    dependencyRisk: 'Low',
    monitoringStatus: 'Active',
    suggestedAction: 'Prime Match',
    repaymentSource: 'Receivables from executed monthly purchase orders with TVS & Bosch vendor arms',
    growthPlanSummary: 'Expanding precision machining capacity by 35% with confirmed 24-month order book from regional EV platform makers.',
    metrics: {
      monthlyRevenue: 2366000,
      monthlyExpenses: 1890000,
      netMargin: 19.8,
      receivableDays: 44,
      payableDays: 38,
      cashRunwayMonths: 4.8
    },
    monthlyPerformance: [
      { month: 'Oct 25', revenue: 2150000, expenses: 1740000, cashFlow: 410000 },
      { month: 'Nov 25', revenue: 2240000, expenses: 1800000, cashFlow: 440000 },
      { month: 'Dec 25', revenue: 2290000, expenses: 1840000, cashFlow: 450000 },
      { month: 'Jan 26', revenue: 2380000, expenses: 1880000, cashFlow: 500000 },
      { month: 'Feb 26', revenue: 2310000, expenses: 1860000, cashFlow: 450000 },
      { month: 'Mar 26', revenue: 2420000, expenses: 1910000, cashFlow: 510000 }
    ]
  },
  {
    id: 'opp-002',
    businessName: 'GreenGrid Foods Ltd',
    legalEntity: 'Public Limited',
    industry: 'Food Processing & Agribusiness',
    category: 'Organic Beverages & Cold-Chain Processing',
    location: 'Nashik, Maharashtra',
    requestedAmount: 2500000,
    tenureMonths: 18,
    purpose: 'Cold storage warehouse expansion & IQF fast freezing line installation',
    expectedReturnRate: 14.8,
    healthScore: 89,
    trustScore: 92,
    riskLevel: 'Low',
    revenueAnnual: 46200000,
    monthlyGrowthRate: 11.5,
    debtServiceCoverageRatio: 2.85,
    dependencyRisk: 'Low',
    monitoringStatus: 'Active',
    suggestedAction: 'Prime Match',
    repaymentSource: 'Consistent retail supermarket billing cycles (Reliance Retail & Nature Basket accounts)',
    growthPlanSummary: 'Capturing institutional export contracts across UAE & EU with APEDA certification renewal.',
    metrics: {
      monthlyRevenue: 3850000,
      monthlyExpenses: 3020000,
      netMargin: 21.5,
      receivableDays: 36,
      payableDays: 45,
      cashRunwayMonths: 6.2
    },
    monthlyPerformance: [
      { month: 'Oct 25', revenue: 3400000, expenses: 2750000, cashFlow: 650000 },
      { month: 'Nov 25', revenue: 3550000, expenses: 2850000, cashFlow: 700000 },
      { month: 'Dec 25', revenue: 3700000, expenses: 2950000, cashFlow: 750000 },
      { month: 'Jan 26', revenue: 3800000, expenses: 3000000, cashFlow: 800000 },
      { month: 'Feb 26', revenue: 3780000, expenses: 2980000, cashFlow: 800000 },
      { month: 'Mar 26', revenue: 3950000, expenses: 3080000, cashFlow: 870000 }
    ]
  },
  {
    id: 'opp-003',
    businessName: 'Nova Components LLP',
    legalEntity: 'LLP',
    industry: 'Electronics Hardware',
    category: 'IoT Gateways & Smart Meter Assemblies',
    location: 'Bengaluru, Karnataka',
    requestedAmount: 3500000,
    tenureMonths: 9,
    purpose: 'Component procurement for government Discom smart metering rollout order',
    expectedReturnRate: 16.9,
    healthScore: 74,
    trustScore: 78,
    riskLevel: 'High',
    revenueAnnual: 31500000,
    monthlyGrowthRate: 5.4,
    debtServiceCoverageRatio: 1.62,
    dependencyRisk: 'High',
    monitoringStatus: 'Flagged',
    suggestedAction: 'Additional Diligence',
    repaymentSource: 'Milestone disbursements from state power distribution corporation EPC contractor',
    growthPlanSummary: 'Executing large-scale Discom tenders with strategic partnerships in micro-inverter assemblies.',
    metrics: {
      monthlyRevenue: 2625000,
      monthlyExpenses: 2280000,
      netMargin: 13.1,
      receivableDays: 78,
      payableDays: 32,
      cashRunwayMonths: 2.9
    },
    monthlyPerformance: [
      { month: 'Oct 25', revenue: 2400000, expenses: 2150000, cashFlow: 250000 },
      { month: 'Nov 25', revenue: 2500000, expenses: 2200000, cashFlow: 300000 },
      { month: 'Dec 25', revenue: 2480000, expenses: 2220000, cashFlow: 260000 },
      { month: 'Jan 26', revenue: 2650000, expenses: 2290000, cashFlow: 360000 },
      { month: 'Feb 26', revenue: 2580000, expenses: 2260000, cashFlow: 320000 },
      { month: 'Mar 26', revenue: 2700000, expenses: 2340000, cashFlow: 360000 }
    ]
  },
  {
    id: 'opp-004',
    businessName: 'Sri Lakshmi Textiles',
    legalEntity: 'Partnership',
    industry: 'Textiles & Apparel',
    category: 'High-Tenacity Technical Synthetic Fabrics',
    location: 'Surat, Gujarat',
    requestedAmount: 1200000,
    tenureMonths: 12,
    purpose: 'Import of water-jet looms and yarn inventory for festive seasonal export',
    expectedReturnRate: 15.1,
    healthScore: 81,
    trustScore: 83,
    riskLevel: 'Moderate',
    revenueAnnual: 22800000,
    monthlyGrowthRate: 6.8,
    debtServiceCoverageRatio: 2.15,
    dependencyRisk: 'Moderate',
    monitoringStatus: 'Active',
    suggestedAction: 'Selective Financing',
    repaymentSource: 'Domestic wholesale distributors and confirmed LC export backed shipments',
    growthPlanSummary: 'Diversification from traditional apparel to industrial filtration geotextiles.',
    metrics: {
      monthlyRevenue: 1900000,
      monthlyExpenses: 1560000,
      netMargin: 17.8,
      receivableDays: 52,
      payableDays: 41,
      cashRunwayMonths: 3.8
    },
    monthlyPerformance: [
      { month: 'Oct 25', revenue: 1750000, expenses: 1450000, cashFlow: 300000 },
      { month: 'Nov 25', revenue: 1820000, expenses: 1500000, cashFlow: 320000 },
      { month: 'Dec 25', revenue: 1880000, expenses: 1540000, cashFlow: 340000 },
      { month: 'Jan 26', revenue: 1920000, expenses: 1580000, cashFlow: 340000 },
      { month: 'Feb 26', revenue: 1890000, expenses: 1550000, cashFlow: 340000 },
      { month: 'Mar 26', revenue: 1960000, expenses: 1600000, cashFlow: 360000 }
    ]
  },
  {
    id: 'opp-005',
    businessName: 'UrbanBuild Solutions Pvt Ltd',
    legalEntity: 'Private Limited',
    industry: 'Infrastructure & Construction',
    category: 'Precast Concrete & Modular Systems',
    location: 'Hyderabad, Telangana',
    requestedAmount: 5000000,
    tenureMonths: 24,
    purpose: 'Automated batching plant upgrade & transit mixer fleet leasing',
    expectedReturnRate: 14.5,
    healthScore: 88,
    trustScore: 90,
    riskLevel: 'Low',
    revenueAnnual: 68000000,
    monthlyGrowthRate: 9.4,
    debtServiceCoverageRatio: 2.68,
    dependencyRisk: 'Low',
    monitoringStatus: 'Active',
    suggestedAction: 'Prime Match',
    repaymentSource: 'Escrow backed monthly running bills with Larsen & Toubro infrastructure divisions',
    growthPlanSummary: 'Supplying metro extension viaduct segments with fixed monthly bill certification.',
    metrics: {
      monthlyRevenue: 5666000,
      monthlyExpenses: 4480000,
      netMargin: 20.9,
      receivableDays: 48,
      payableDays: 42,
      cashRunwayMonths: 5.4
    },
    monthlyPerformance: [
      { month: 'Oct 25', revenue: 5100000, expenses: 4100000, cashFlow: 1000000 },
      { month: 'Nov 25', revenue: 5300000, expenses: 4250000, cashFlow: 1050000 },
      { month: 'Dec 25', revenue: 5500000, expenses: 4380000, cashFlow: 1120000 },
      { month: 'Jan 26', revenue: 5650000, expenses: 4450000, cashFlow: 1200000 },
      { month: 'Feb 26', revenue: 5600000, expenses: 4420000, cashFlow: 1180000 },
      { month: 'Mar 26', revenue: 5800000, expenses: 4550000, cashFlow: 1250000 }
    ]
  },
  {
    id: 'opp-006',
    businessName: 'Veda Agro Industries',
    legalEntity: 'Private Limited',
    industry: 'Agri-Tech & Biotech',
    category: 'Hybrid Seed Processing & Soil Micro-nutrients',
    location: 'Indore, Madhya Pradesh',
    requestedAmount: 1800000,
    tenureMonths: 12,
    purpose: 'Seed germination climate chamber facility & packaging unit',
    expectedReturnRate: 15.8,
    healthScore: 79,
    trustScore: 81,
    riskLevel: 'Moderate',
    revenueAnnual: 24200000,
    monthlyGrowthRate: 7.1,
    debtServiceCoverageRatio: 2.05,
    dependencyRisk: 'Moderate',
    monitoringStatus: 'Active',
    suggestedAction: 'Selective Financing',
    repaymentSource: 'Farmer producer organization (FPO) direct procurement consignments',
    growthPlanSummary: 'Expanding network across 42 district FPO clusters with certified hybrid pulses seeds.',
    metrics: {
      monthlyRevenue: 2016000,
      monthlyExpenses: 1680000,
      netMargin: 16.6,
      receivableDays: 58,
      payableDays: 39,
      cashRunwayMonths: 3.4
    },
    monthlyPerformance: [
      { month: 'Oct 25', revenue: 1850000, expenses: 1580000, cashFlow: 270000 },
      { month: 'Nov 25', revenue: 1920000, expenses: 1620000, cashFlow: 300000 },
      { month: 'Dec 25', revenue: 1980000, expenses: 1660000, cashFlow: 320000 },
      { month: 'Jan 26', revenue: 2040000, expenses: 1700000, cashFlow: 340000 },
      { month: 'Feb 26', revenue: 2010000, expenses: 1680000, cashFlow: 330000 },
      { month: 'Mar 26', revenue: 2080000, expenses: 1730000, cashFlow: 350000 }
    ]
  }
];

export const MOCK_BUSINESS_TRUST_SCORE: BusinessTrustHealthScore = {
  overallScore: 86,
  status: 'Healthy',
  trend: 'Improving',
  trendPoints: 4,
  lastUpdated: 'Today, 10:32 AM IST',
  pillars: {
    businessVerification: {
      name: 'Business Verification',
      score: 20,
      maxScore: 20,
      status: 'Excellent',
      insights: [
        'CIN & MCA records fully reconciled with zero active legal charges',
        'GSTIN active since 2016 with 100% on-time GSTR-3B filings (36 consecutive months)',
        'Physical operating address verified via Geo-fenced premises audit',
        'Promoter CIBIL Commercial rank Tier-1 (Score 784)'
      ]
    },
    financialStability: {
      name: 'Financial Stability',
      score: 17,
      maxScore: 20,
      status: 'Good',
      insights: [
        'EBITDA margin maintained at 22.4% over trailing 8 quarters',
        'Working capital ratio healthy at 1.48x',
        'Audited net worth stands at ₹1.42 Cr with zero accumulated losses',
        'Minor variance: Operating margins compressed by 1.2% due to steel raw material indices'
      ]
    },
    cashFlowHealth: {
      name: 'Cash Flow Health',
      score: 18,
      maxScore: 20,
      status: 'Good',
      insights: [
        'Operating Cash Flow (OCF) covers debt obligations 3.1x',
        'Consistent monthly bank credit velocity above ₹22 Lakhs verified via Account Aggregator',
        'Zero cheque/NACH returns over trailing 24 months',
        'Average daily closing bank balance healthy at ₹3.8 Lakhs'
      ]
    },
    repaymentCapacity: {
      name: 'Repayment Capacity',
      score: 16,
      maxScore: 20,
      status: 'Good',
      insights: [
        'Debt Service Coverage Ratio (DSCR) calculated at 2.34x (benchmark > 1.5x)',
        'Proposed monthly financing obligation represents only 5.8% of operating cash flow',
        'Total existing debt is 0.44x annual revenue, well below industry threshold of 0.8x',
        'Conservative buffer maintained for seasonal cyclicity'
      ]
    },
    operationalStability: {
      name: 'Operational Stability',
      score: 8,
      maxScore: 10,
      status: 'Good',
      insights: [
        '8+ years in uninterrupted industrial production at Coimbatore SIDCO estate',
        'Low employee turnover (< 6% p.a.) with key engineering staff retained 5+ years',
        'ISO 9001:2015 and IATF 16949 quality certifications in good standing',
        'Capacity utilization steady at 82%'
      ]
    },
    transparency: {
      name: 'Transparency & Governance',
      score: 7,
      maxScore: 10,
      status: 'Good',
      insights: [
        'Consistently connected to RBI-regulated Account Aggregator (Setu / Anumati)',
        'Statutory auditor firm is peer-reviewed ICAI registered entity',
        'Immediate notification on board/director disclosures',
        'Opportunity for improvement: Quarterly management commentary submitted with minor delay'
      ]
    }
  },
  historicalTrend: [
    { month: 'Oct 25', score: 81 },
    { month: 'Nov 25', score: 82 },
    { month: 'Dec 25', score: 83 },
    { month: 'Jan 26', score: 85 },
    { month: 'Feb 26', score: 84 },
    { month: 'Mar 26', score: 86 }
  ]
};

export const MOCK_DEPENDENCY_ASSESSMENT: DependencyAssessment = {
  dependencyRiskScore: 42,
  severity: 'Moderate',
  customerConcentration: {
    topCustomerName: 'TVS Motor Company (Precision Div)',
    topCustomerPercent: 38,
    topThreePercent: 64,
    customers: [
      { name: 'TVS Motor Company (Precision Div)', percentage: 38, tenureMonths: 68, status: 'Prime AAA' },
      { name: 'Bosch Chassis Systems India', percentage: 16, tenureMonths: 42, status: 'Prime AAA' },
      { name: 'Lucas-TVS Auto Electricals', percentage: 10, tenureMonths: 36, status: 'Tier 1' },
      { name: 'Pricol Limited', percentage: 8, tenureMonths: 28, status: 'Tier 1' },
      { name: 'Other 14 Regional Auto Machine Shops', percentage: 28, tenureMonths: 18, status: 'Diversified' }
    ]
  },
  supplierConcentration: {
    topSupplierName: 'JSW Steel Processing Facility',
    topSupplierPercent: 31,
    topThreePercent: 58,
    suppliers: [
      { name: 'JSW Steel Processing Facility', percentage: 31, reliability: 'High / Standard Contract' },
      { name: 'Kalyani Steels Special Alloys', percentage: 16, reliability: 'High' },
      { name: 'Coimbatore Alloy Fasteners', percentage: 11, reliability: 'Moderate' },
      { name: 'Others & Secondary Vendors', percentage: 42, reliability: 'Adequate' }
    ]
  },
  productConcentration: {
    topProductName: 'High-Tolerance CNC Crankshaft Flanges',
    topProductPercent: 44,
    products: [
      { name: 'High-Tolerance CNC Crankshaft Flanges', percentage: 44, margin: '22%' },
      { name: 'EV Motor Rotor Bushings', percentage: 26, margin: '28%' },
      { name: 'Brake Disc Caliper Housing Brackets', percentage: 18, margin: '17%' },
      { name: 'Specialty Tooling & Prototyping', percentage: 12, margin: '34%' }
    ]
  },
  channelConcentration: [
    { channelName: 'Direct Tier-1 OEM Supply Contracts', percentage: 72 },
    { channelName: 'Authorized Industrial Stockists', percentage: 18 },
    { channelName: 'Custom Export Tooling Orders', percentage: 10 }
  ],
  geographicConcentration: [
    { region: 'Tamil Nadu & Karnataka Auto Corridor', percentage: 68 },
    { region: 'Maharashtra Western Auto Hub', percentage: 22 },
    { region: 'North India (NCR & Manesar Hub)', percentage: 10 }
  ],
  aiExplanation:
    'Model analysis indicates moderate customer dependency with Top-1 client accounting for 38% of billings. However, this is significantly balanced by strong client credit ratings (TVS Motor Company, AAA rated) and an established 5+ year supply tenure with zero historical payment defaults. Supplier risk is well mitigated with secondary alloy options available in Coimbatore cluster.',
  mitigationActions: [
    'Expand vendor onboarding for emerging EV scooter component assemblies to bring Top-1 concentration below 30%',
    'Formalize back-up raw material price escalation clauses with secondary billet mills in Salem',
    'Encourage establishment of rolling Letters of Credit for invoices exceeding ₹10 Lakhs'
  ]
};

export const MOCK_RISK_ITEMS: RiskItem[] = [
  {
    id: 'r-01',
    category: 'Financial Risk',
    score: 24,
    severity: 'Low',
    trend: 'Decreasing',
    evidenceSignal: 'EBITDA margin stable at 22.4%; quick ratio is 1.28x with steady operating revenues',
    explanation: 'Audited balance sheet demonstrates conservative financial management with debt-to-equity below 0.6x.',
    recommendedAction: 'Maintain current liquidity buffer across primary current account.'
  },
  {
    id: 'r-02',
    category: 'Liquidity Risk',
    score: 28,
    severity: 'Low',
    trend: 'Stable',
    evidenceSignal: 'Cash runway estimated at 4.8 months; zero overdraft breaches in 24 months',
    explanation: 'Net cash flows from operations are consistently positive with daily bank balance averaging ₹3.8L.',
    recommendedAction: 'Continue weekly automated reconciliation via Account Aggregator.'
  },
  {
    id: 'r-03',
    category: 'Repayment Risk',
    score: 22,
    severity: 'Low',
    trend: 'Stable',
    evidenceSignal: 'Debt Service Coverage Ratio (DSCR) is 2.34x against standard threshold of 1.5x',
    explanation: 'Expected monthly financing repayment is less than 6% of normal operating cash surplus.',
    recommendedAction: 'Activate e-NACH auto-debit mandate 5 days prior to invoice due date.'
  },
  {
    id: 'r-04',
    category: 'Operational Risk',
    score: 34,
    severity: 'Moderate',
    trend: 'Stable',
    evidenceSignal: 'Single production unit located at Coimbatore SIDCO estate; plant utilization 82%',
    explanation: 'High equipment utilization means unexpected CNC downtime could briefly delay production schedules.',
    recommendedAction: 'Ensure comprehensive annual maintenance contracts (AMC) for all primary Mazak machines.'
  },
  {
    id: 'r-05',
    category: 'Customer Concentration',
    score: 48,
    severity: 'Moderate',
    trend: 'Decreasing',
    evidenceSignal: 'Top customer generates 38% of total revenue; Top 3 generate 64%',
    explanation: 'While top customer is AAA rated, a contract reduction could impact revenue run-rates.',
    recommendedAction: 'Monitor monthly order inflow from the two secondary Tier-1 clients.'
  },
  {
    id: 'r-06',
    category: 'Supplier Concentration',
    score: 35,
    severity: 'Moderate',
    trend: 'Stable',
    evidenceSignal: 'Top steel supplier accounts for 31% of billets and raw alloy purchases',
    explanation: 'Adequate alternative suppliers exist within a 150 km radius in Salem and Hosur.',
    recommendedAction: 'Keep active credit lines open with at least two backup steel stockists.'
  },
  {
    id: 'r-07',
    category: 'Market & Sector Risk',
    score: 32,
    severity: 'Moderate',
    trend: 'Decreasing',
    evidenceSignal: 'Automotive sector EV transition accelerating; ICE demand remaining flat',
    explanation: 'Company is successfully pivoting 26% of order book to EV motor and chassis sub-components.',
    recommendedAction: 'Track quarterly EV component dispatch share.'
  },
  {
    id: 'r-08',
    category: 'Fraud Risk',
    score: 8,
    severity: 'Low',
    trend: 'Stable',
    evidenceSignal: 'Zero GST circular trading red-flags; 100% matched e-way bills with physical dispatch logs',
    explanation: 'Automated cross-check between GSTR-1, GSTR-3B, and bank statement credits matched at 99.2%.',
    recommendedAction: 'Routine automated quarterly GST parity verification.'
  },
  {
    id: 'r-09',
    category: 'Governance Risk',
    score: 18,
    severity: 'Low',
    trend: 'Stable',
    evidenceSignal: 'Clear promoter equity holding (78% with founder); no director disqualifications on MCA',
    explanation: 'Clean corporate filings, independent chartered accountant certification, zero litigations in e-Courts.',
    recommendedAction: 'Regularize submission of quarterly management reviews.'
  },
  {
    id: 'r-10',
    category: 'Dependency Risk',
    score: 42,
    severity: 'Moderate',
    trend: 'Decreasing',
    evidenceSignal: 'Aggregate dependency score 42/100 driven predominantly by Top-1 customer weightage',
    explanation: 'Mitigated by multi-year contract term and high tooling switching costs incurred by the buyer.',
    recommendedAction: 'Track customer retention and monthly dispatch acceptance ratios.'
  }
];

export const MOCK_MONITORING_EVENTS: MonitoringEvent[] = [
  {
    id: 'evt-01',
    date: 'Today, 08:30 AM',
    metric: 'Monthly Revenue',
    previousValue: '₹22,10,000',
    currentValue: '₹24,20,000',
    changePercent: 9.5,
    severity: 'Low',
    implication: 'Observed signal: New EV rotor bushing order dispatch commenced on schedule.',
    recommendedAction: 'Positive confirmation of revenue growth trajectory.',
    status: 'Active'
  },
  {
    id: 'evt-02',
    date: 'Yesterday, 04:15 PM',
    metric: 'Customer Concentration',
    previousValue: '35.4%',
    currentValue: '38.2%',
    changePercent: 2.8,
    severity: 'Moderate',
    implication: 'TVS billing volume increased relative to secondary clients.',
    recommendedAction: 'Ensure ongoing dispatches to Bosch and Lucas are billed without latency.',
    status: 'Active'
  },
  {
    id: 'evt-03',
    date: '3 days ago',
    metric: 'Average Receivable Days',
    previousValue: '41 days',
    currentValue: '44 days',
    changePercent: 7.3,
    severity: 'Low',
    implication: 'Slight payment processing extension by Tier-1 buyer month-end cycle.',
    recommendedAction: 'Re-confirm electronic invoice acknowledgment in buyer ERP portal.',
    status: 'Acknowledged'
  },
  {
    id: 'evt-04',
    date: '10 days ago',
    metric: 'Operating Cash Flow',
    previousValue: '₹4,50,000',
    currentValue: '₹5,10,000',
    changePercent: 13.3,
    severity: 'Low',
    implication: 'Cash generation strengthened with higher gross margin export shipments.',
    recommendedAction: 'Maintain current liquidity surplus in operating sweep account.',
    status: 'Resolved'
  },
  {
    id: 'evt-05',
    date: '18 days ago',
    metric: 'Steel Raw Material Index',
    previousValue: '₹56/kg',
    currentValue: '₹58.5/kg',
    changePercent: 4.4,
    severity: 'Moderate',
    implication: 'Observed market signal: Wholesale alloy billet prices ticked up in South India.',
    recommendedAction: 'Verify that client price-indexing adjustment formula has been triggered.',
    status: 'Resolved'
  }
];

export const MOCK_BUSINESS_DOCUMENTS: BusinessDocument[] = [
  {
    id: 'doc-01',
    name: 'Certificate of Incorporation (MCA)',
    category: 'Business Registration',
    fileSize: '1.8 MB',
    uploadedDate: '12 Jan 2025',
    status: 'Verified',
    verifiedBy: 'CredForge Automated MCA Verifier'
  },
  {
    id: 'doc-02',
    name: 'GST Registration Certificate (REG-06)',
    category: 'GST',
    fileSize: '950 KB',
    uploadedDate: '12 Jan 2025',
    status: 'Verified',
    verifiedBy: 'GSTN API Direct Cross-Match'
  },
  {
    id: 'doc-03',
    name: 'Audited Financial Statements (FY 2024-25)',
    category: 'Financial',
    fileSize: '5.4 MB',
    uploadedDate: '20 Feb 2025',
    status: 'Verified',
    verifiedBy: 'CredForge Financial Auditor Engine'
  },
  {
    id: 'doc-04',
    name: 'Bank Statements - Trailing 12 Months (Account Aggregator)',
    category: 'Banking',
    fileSize: 'Live Data Link',
    uploadedDate: 'Updated Today',
    status: 'Verified',
    verifiedBy: 'RBI AA Regulated Feed (Setu)'
  },
  {
    id: 'doc-05',
    name: 'Promoter PAN & Aadhaar KYC Bundle',
    category: 'Identity',
    fileSize: '2.1 MB',
    uploadedDate: '10 Jan 2025',
    status: 'Verified',
    verifiedBy: 'NSDL & UIDAI Verification'
  },
  {
    id: 'doc-06',
    name: 'IATF 16949 Automotive Quality Certificate',
    category: 'Supporting Documents',
    fileSize: '3.2 MB',
    uploadedDate: '15 Jan 2025',
    status: 'Verified',
    verifiedBy: 'TUV SUD Audit Validation'
  },
  {
    id: 'doc-07',
    name: 'TVS & Bosch Executed Purchase Orders',
    category: 'Supporting Documents',
    fileSize: '4.1 MB',
    uploadedDate: '18 Feb 2025',
    status: 'Verified',
    verifiedBy: 'Operations Due Diligence'
  }
];

export const MOCK_ACTIVE_PORTFOLIO: ActivePortfolioPosition[] = [
  {
    id: 'pos-001',
    businessId: 'opp-001',
    businessName: 'ABC Manufacturing Pvt Ltd',
    industry: 'Manufacturing & Precision Eng',
    financedAmount: 1500000,
    preferredDownsideTolerance: 200000, // Non-guaranteed lender preference
    expectedReturnRate: 15.4,
    startDate: '15 Nov 2025',
    tenureMonths: 12,
    remainingMonths: 8,
    healthScore: 86,
    riskLevel: 'Moderate',
    status: 'Healthy',
    totalRepaid: 585000,
    nextPaymentDate: '15 Apr 2026',
    nextPaymentAmount: 145000,
    nextReviewDate: '01 May 2026'
  },
  {
    id: 'pos-002',
    businessId: 'opp-002',
    businessName: 'GreenGrid Foods Ltd',
    industry: 'Food Processing',
    financedAmount: 2000000,
    preferredDownsideTolerance: 250000,
    expectedReturnRate: 14.8,
    startDate: '01 Jan 2026',
    tenureMonths: 18,
    remainingMonths: 15,
    healthScore: 89,
    riskLevel: 'Low',
    status: 'Active',
    totalRepaid: 410000,
    nextPaymentDate: '01 Apr 2026',
    nextPaymentAmount: 136000,
    nextReviewDate: '15 Apr 2026'
  }
];

export const MOCK_PLATFORM_ALERTS: PlatformAlert[] = [
  {
    id: 'alt-001',
    title: 'Customer Concentration Signal',
    businessName: 'Nova Components LLP',
    businessId: 'opp-003',
    message: 'Customer concentration increased to 52% following receipt of single Discom tender subcontract. Health score reduced from 78 → 74.',
    category: 'Critical',
    timestamp: '2 hours ago',
    isRead: false,
    actionUrl: '/lender/opportunities/opp-003'
  },
  {
    id: 'alt-002',
    title: 'Receivable Days Extension',
    businessName: 'Sri Lakshmi Textiles',
    businessId: 'opp-004',
    message: 'Receivable collection cycle extended from 46 to 52 days during seasonal inventory build-up. Model risk remains Moderate.',
    category: 'Warning',
    timestamp: '5 hours ago',
    isRead: false,
    actionUrl: '/lender/opportunities/opp-004'
  },
  {
    id: 'alt-003',
    title: 'Health Score Improvement',
    businessName: 'ABC Manufacturing Pvt Ltd',
    businessId: 'opp-001',
    message: 'Business Trust Health Score improved from 82 to 86 after successful delivery of Q4 EV component shipments and on-time debt servicing.',
    category: 'Information',
    timestamp: 'Yesterday',
    isRead: true,
    actionUrl: '/lender/opportunities/opp-001'
  },
  {
    id: 'alt-004',
    title: 'GST Reconciliation Confirmed',
    businessName: 'GreenGrid Foods Ltd',
    businessId: 'opp-002',
    message: 'Quarterly GSTR-1 and GSTR-3B filings reconciled with zero ITC discrepancy. Trust score remains at 92.',
    category: 'Information',
    timestamp: '2 days ago',
    isRead: true,
    actionUrl: '/lender/opportunities/opp-002'
  }
];
