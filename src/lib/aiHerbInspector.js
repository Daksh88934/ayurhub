// AI Vision & Herb Inspection Simulator for AyurChain

export const HERB_KNOWLEDGE_BASE = {
  "Ashwagandha": {
    botanicalName: "Withania somnifera",
    keyCompounds: "Withanolides, Withaferin A",
    idealMoisture: "5.0% - 7.5%",
    optimalTemp: "20°C - 26°C",
    optimalHumidity: "45% - 55%",
    adulterantsToWatch: "Physalis alkekengi leaves, starch",
    storageAdvice: "Store in a cool, airtight ceramic or amber glass container away from direct sunlight."
  },
  "Tulsi": {
    botanicalName: "Ocimum sanctum",
    keyCompounds: "Eugenol, Ursolic acid, Carvacrol",
    idealMoisture: "6.0% - 8.0%",
    optimalTemp: "18°C - 24°C",
    optimalHumidity: "40% - 50%",
    adulterantsToWatch: "Ocimum gratissimum, synthetic aromatic essences",
    storageAdvice: "Store in dried leaf form in vacuum-sealed food grade containers with desiccant pouches."
  },
  "Turmeric": {
    botanicalName: "Curcuma longa",
    keyCompounds: "Curcuminoids, Demethoxycurcumin",
    idealMoisture: "7.0% - 9.0%",
    optimalTemp: "22°C - 28°C",
    optimalHumidity: "50% - 60%",
    adulterantsToWatch: "Metanil yellow, Lead chromate, cassava starch",
    storageAdvice: "Keep ground rhizomes strictly shielded from UV light to preserve curcumin bio-activity."
  },
  "Giloy": {
    botanicalName: "Tinospora cordifolia",
    keyCompounds: "Tinosporoside, Cordifolioside A",
    idealMoisture: "5.5% - 7.0%",
    optimalTemp: "20°C - 25°C",
    optimalHumidity: "45% - 55%",
    adulterantsToWatch: "Tinospora sinensis",
    storageAdvice: "Store cut stem sections elevated off ground levels in humidity-controlled storage."
  }
};

export function analyzeHerbImage(herbType, filename = "") {
  const normalizedType = Object.keys(HERB_KNOWLEDGE_BASE).find(k => 
    herbType.toLowerCase().includes(k.toLowerCase())
  ) || "Ashwagandha";

  const info = HERB_KNOWLEDGE_BASE[normalizedType];
  const isAuthentic = true; // Simulated high-fidelity classifier
  const authenticityScore = Number((94.5 + Math.random() * 5).toFixed(1));
  const purityGrade = authenticityScore > 97 ? "Grade A+ (Premium Pure)" : "Grade A (Organic Certified)";

  return {
    detectedSpecies: `${normalizedType} (${info.botanicalName})`,
    isAuthentic,
    authenticityScore: `${authenticityScore}%`,
    purityGrade,
    adulterationDetected: "None detected (0.0% Synthetic Additives)",
    estimatedCurcuminOrActiveContent: `${(4.2 + Math.random() * 1.2).toFixed(2)}% Active Compounds`,
    recommendedStorage: info.storageAdvice,
    optimalEnvironment: `Temp: ${info.optimalTemp} | Humidity: ${info.optimalHumidity}`,
    aiVerdict: `Verified Authentic ${normalizedType}. High concentration of ${info.keyCompounds}. Safe for Ayurvedic formulation.`
  };
}

export function generateAutomatedLabReport(herbType, farmerName) {
  const normalizedType = Object.keys(HERB_KNOWLEDGE_BASE).find(k => 
    herbType.toLowerCase().includes(k.toLowerCase())
  ) || "Ashwagandha";

  const info = HERB_KNOWLEDGE_BASE[normalizedType];

  return {
    labName: "AyurChain AI-Assisted Pharmacognosy Center",
    testDate: new Date().toISOString().split('T')[0],
    activeAlkaloidsPercent: Number((4.5 + Math.random() * 0.9).toFixed(2)),
    pesticideResidue: "ND (Not Detected - Zero Organophosphates)",
    heavyMetals: "Pass (Pb < 0.001 ppm, Hg < 0.0001 ppm)",
    moistureContent: info.idealMoisture,
    qualityGrade: "Grade A+ (Export Standard)",
    testedBy: "AI Spectrometry Model v3.4 & Dr. V. K. Shastri",
    remarks: `Batch passes all Ayush Ministry & Pharmacopoeia Pharmacognostical purity standards for ${farmerName}.`
  };
}
