/**
 * @file farmData.ts
 * @path /constants/farmData.ts
 * @project AgronOS - Precision Agriculture Platform
 * @description Immutable baseline configurations, fallback telemetry, and mock datasets.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

import { FarmLocation, EnvironmentalMetrics, CropRecommendation } from "@/types/farm";

export const DEFAULT_LOCATION: FarmLocation = {
  country: "Canada",
  province: "Saskatchewan",
  city: "Regina",
  postalCode: "S4P 3Y2",
  farmAddress: "123 Agricultural Way",
};

export const DEFAULT_METRICS: EnvironmentalMetrics = {
  tempCurrent: "22°C",
  tempMinWinter: "-31°C",
  soilPh: "6.4 pH (Loam)",
  organicMatter: "4.2%",
  waterAvailability: "Moderate (Seasonal Irrigation)",
  moisture: "48%",
  nitrogen: "Medium (42 mg/kg)",
  phosphorus: "High (68 mg/kg)",
  potassium: "High (210 mg/kg)",
  sunshineHours: "7.8 hrs/day avg",
};

export const MOCK_RECOMMENDATIONS: CropRecommendation[] = [
  {
    id: "rec-1",
    name: "Hard Red Spring Wheat",
    matchScore: 96,
    estimatedYield: "52 Bu/Acre",
    waterRequirement: "Moderate",
    profitMargin: "High",
    description: "High drought tolerance with superior gluten content for baking market demand.",
  },
  {
    id: "rec-2",
    name: "Canola (InVigor L340PC)",
    matchScore: 92,
    estimatedYield: "44 Bu/Acre",
    waterRequirement: "High",
    profitMargin: "Very High",
    description: "Excellent pod shatter resistance suited for high-yield harvest in cold climates.",
  },
  {
    id: "rec-3",
    name: "Yellow Peas",
    matchScore: 88,
    estimatedYield: "38 Bu/Acre",
    waterRequirement: "Low",
    profitMargin: "High",
    description: "Fixes atmospheric nitrogen into soil, reducing synthetic fertilizer inputs.",
  },
];