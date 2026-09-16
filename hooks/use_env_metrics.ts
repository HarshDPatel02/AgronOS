/**
 * @file use_env_metrics.ts
 * @path /hooks/use_env_metrics.ts
 * @project AgronOS - Precision Agriculture Platform
 * @description Hook managing regional climate and soil telemetry data fetching.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { EnvironmentalMetrics } from "@/types/farm";
import { fetchEnvironmentalMetrics } from "@/lib/api";
import { DEFAULT_METRICS } from "@/constants/farm_data";

export function useEnvMetrics(city: string, province: string) {
  const [metrics, setMetrics] = useState<EnvironmentalMetrics>(DEFAULT_METRICS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!city || !province) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEnvironmentalMetrics(city, province);
      setMetrics(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to retrieve telemetry data";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [city, province]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { metrics, loading, error, refetch };
}