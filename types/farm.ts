/**
 * @file farm.ts
 * @path /types/farm.ts
 * @project AgronOS - Precision Agriculture Platform
 * @description Strongly typed interfaces for farm location parameters, soil chemistry,
 *              climate metrics, and crop recommendation data structures.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

export interface FarmLocation {
  country: string;
  province: string;
  city: string;
  postalCode: string;
  farmAddress: string;
}

export interface EnvironmentalMetrics {
  tempCurrent: string;
  tempMinWinter: string;
  soilPh: string;
  organicMatter: string;
  waterAvailability: string;
  moisture: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  sunshineHours: string;
}

export interface CropRecommendation {
  id: string;
  name: string;
  matchScore: number;
  estimatedYield: string;
  waterRequirement: "Low" | "Moderate" | "High";
  profitMargin: "Low" | "Medium" | "High" | "Very High";
  description: string;
}