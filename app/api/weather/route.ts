/**
 * @file route.ts
 * @path /app/api/weather/route.ts
 * @project AgronOS - Precision Agriculture Platform
 * @description Telemetry API route delivering high-accuracy soil, water, and microclimate data
 *              with robust input sanitization for Canadian provinces and postal codes.
 */

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Clean up inputs (remove trailing periods, trim whitespace)
  const city = searchParams.get("city")?.trim().replace(/\.$/, "") || "";
  let province = searchParams.get("province")?.trim().replace(/\.$/, "") || "";
  const postalCode = searchParams.get("postalCode")?.trim() || "";

  // Normalize French province names to English/Standard for Open-Meteo compatibility
  const provinceMap: Record<string, string> = {
    "colombie-britannique": "British Columbia",
    "colombie britannique": "British Columbia",
    "bc": "British Columbia",
    "quebec": "Quebec",
    "québec": "Quebec",
    "ontario": "Ontario",
    "alberta": "Alberta",
    "saskatchewan": "Saskatchewan",
    "manitoba": "Manitoba",
  };

  const lowerProvince = province.toLowerCase();
  if (provinceMap[lowerProvince]) {
    province = provinceMap[lowerProvince];
  }

  // Fallback query generation strategy
  const queriesToTry = [
    [postalCode, city, province].filter(Boolean).join(", "),
    [city, province].filter(Boolean).join(" "),
    postalCode,
    city,
  ].filter((q) => q.length > 0);

  let geoResults = null;

  for (const query of queriesToTry) {
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();

      if (geoData.results && geoData.results.length > 0) {
        geoResults = geoData.results[0];
        break;
      }
    } catch (e) {
      continue;
    }
  }

  if (!geoResults) {
    return NextResponse.json(
      { error: `Could not find coordinates for location: ${city}, ${province} (${postalCode})` },
      { status: 404 }
    );
  }

  const { latitude, longitude, name, admin1, country } = geoResults;

  try {
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_gusts_10m,uv_index,soil_temperature_0cm,soil_moisture_0_to_1cm,soil_moisture_3_to_9cm,soil_moisture_9_to_27cm&daily=temperature_2m_max,temperature_2m_min,uv_index_max,et0_fao_evapotranspiration&wind_speed_unit=kmh&timezone=auto`
    );

    if (!weatherRes.ok) {
      throw new Error("Failed to fetch environmental telemetry data.");
    }

    const weatherData = await weatherRes.json();

    const currentTemp = Math.round(weatherData.current.temperature_2m);
    const humidity = Math.round(weatherData.current.relative_humidity_2m);

    // Dew Point Calculation
    const dewPoint = Math.round(currentTemp - (100 - humidity) / 5);

    // Vapor Pressure Deficit (VPD) Calculation in kPa
    const saturatedVaporPressure =
      0.61078 * Math.exp((17.27 * currentTemp) / (currentTemp + 237.3));
    const actualVaporPressure = saturatedVaporPressure * (humidity / 100);
    const vpd = parseFloat(
      (saturatedVaporPressure - actualVaporPressure).toFixed(2)
    );

    const soilMoistureSurface = Math.round(
      (weatherData.current.soil_moisture_0_to_1cm ?? 0.25) * 100
    );
    const rootZoneMoisture = Math.round(
      (weatherData.current.soil_moisture_9_to_27cm ?? 0.3) * 100
    );
    const soilTemp = Math.round(
      weatherData.current.soil_temperature_0cm ?? currentTemp
    );
    const dailyEt0 = weatherData.daily.et0_fao_evapotranspiration?.[0] || 3.5;

    return NextResponse.json({
      location: { name, admin1, country, latitude, longitude },
      currentTemp,
      highTemp: Math.round(weatherData.daily.temperature_2m_max[0]),
      lowTemp: Math.round(weatherData.daily.temperature_2m_min[0]),
      windSpeed: Math.round(weatherData.current.wind_speed_10m),
      windGust: Math.round(weatherData.current.wind_gusts_10m),
      currentUv: Math.round(weatherData.current.uv_index),
      maxUv: Math.round(weatherData.daily.uv_index_max[0]),
      humidity,
      dewPoint,
      vpd,
      soilMoistureSurface,
      rootZoneMoisture,
      soilTemp,
      dailyEt0,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}