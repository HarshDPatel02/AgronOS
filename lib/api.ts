/**
 * @file api.ts
 * @path /lib/api.ts
 * @project AgronOS - Precision Agriculture Platform
 * @description Centralized HTTP client wrapper and API service definitions for AgronOS backend communication.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

import { EnvironmentalMetrics, CropRecommendation } from "@/types/farm";
import { DEFAULT_METRICS, MOCK_RECOMMENDATIONS } from "@/constants/farm_data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.agronos.com/v1";

/**
 * Generic fetch client wrapper with standardized error handling.
 */
export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`[API Error] ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetches environmental & soil telemetry for a specific geographic region.
 */
export async function fetchEnvironmentalMetrics(city: string, province: string): Promise<EnvironmentalMetrics> {
  // Simulate network API request latency
  await new Promise((res) => setTimeout(res, 400));
  return DEFAULT_METRICS;
}

/**
 * Retrieves AI-calculated crop recommendations based on soil parameters.
 */
export async function fetchCropRecommendations(city: string): Promise<CropRecommendation[]> {
  await new Promise((res) => setTimeout(res, 500));
  return MOCK_RECOMMENDATIONS;
}