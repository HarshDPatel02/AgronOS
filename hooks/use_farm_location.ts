/**
 * @file use_farm_location.ts
 * @path /hooks/use_farm_location.ts
 * @project AgronOS - Precision Agriculture Platform
 * @description State and persistence management for farm location parameters via LocalStorage.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { FarmLocation } from "@/types/farm";
import { DEFAULT_LOCATION } from "@/constants/farm_data";

const STORAGE_KEY = "agronos_farm_location";

export function useFarmLocation() {
  const [location, setLocation] = useState<FarmLocation>(DEFAULT_LOCATION);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setLocation(JSON.parse(saved));
        setHasFetched(true);
      }
    } catch (error) {
      console.error("[useFarmLocation] Failed to read location storage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveLocation = useCallback((newLocation: FarmLocation) => {
    setIsFetching(true);
    setTimeout(() => {
      try {
        setLocation(newLocation);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newLocation));
        setHasFetched(true);
      } catch (error) {
        console.error("[useFarmLocation] Failed to write location storage:", error);
      } finally {
        setIsFetching(false);
      }
    }, 600);
  }, []);

  const resetLocation = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setLocation(DEFAULT_LOCATION);
      setHasFetched(false);
    } catch (error) {
      console.error("[useFarmLocation] Failed to clear location storage:", error);
    }
  }, []);

  return { location, hasFetched, isFetching, isLoaded, saveLocation, resetLocation };
}