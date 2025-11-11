
import React, { useState } from "react";
import { Container, CssBaseline, Typography } from "@mui/material";
import { PreferenceSelector } from "./components/PreferenceSelector";
import { CityRankingTable } from "./components/CityRankingTable";
import type { City } from "./components/CityRankingTable";

const CRITERIA = [
  "Weather",
  "Work-Life Balance",
  "Safety",
  "Things to Do",
  "Savings / Cost",
  "Remote Work",
  "Living Space"
];

const CITY_DATA: City[] = [
  {
    name: "Johannesburg, SA",
    metrics: { "Weather": 8, "Work-Life Balance": 6, "Safety": 4, "Things to Do": 6, "Savings / Cost": 8, "Remote Work": 7, "Living Space": 10 },
    total: 49
  },
  {
    name: "Lisbon / Cascais, Portugal",
    metrics: { "Weather": 9, "Work-Life Balance": 8, "Safety": 7, "Things to Do": 8, "Savings / Cost": 7, "Remote Work": 8, "Living Space": 7 },
    total: 54
  },
  {
    name: "Valencia / Malaga, Spain",
    metrics: { "Weather": 9, "Work-Life Balance": 8, "Safety": 7, "Things to Do": 8, "Savings / Cost": 7, "Remote Work": 8, "Living Space": 7 },
    total: 54
  },
  {
    name: "Auckland / Wellington, NZ",
    metrics: { "Weather": 8, "Work-Life Balance": 9, "Safety": 9, "Things to Do": 9, "Savings / Cost": 6, "Remote Work": 8, "Living Space": 8 },
    total: 57
  },
  {
    name: "Brisbane / Gold Coast, Australia",
    metrics: { "Weather": 9, "Work-Life Balance": 8, "Safety": 8, "Things to Do": 9, "Savings / Cost": 6, "Remote Work": 8, "Living Space": 8 },
    total: 56
  },
  {
    name: "Southern France (Nice / Montpellier)",
    metrics: { "Weather": 9, "Work-Life Balance": 8, "Safety": 8, "Things to Do": 9, "Savings / Cost": 6, "Remote Work": 7, "Living Space": 7 },
    total: 54
  },
  {
    name: "Tuscany / Liguria, Italy",
    metrics: { "Weather": 9, "Work-Life Balance": 7, "Safety": 7, "Things to Do": 9, "Savings / Cost": 6, "Remote Work": 7, "Living Space": 7 },
    total: 52
  },
  {
    name: "Singapore",
    metrics: { "Weather": 8, "Work-Life Balance": 7, "Safety": 10, "Things to Do": 7, "Savings / Cost": 5, "Remote Work": 9, "Living Space": 4 },
    total: 50
  },
  {
    name: "Bangalore, India",
    metrics: { "Weather": 8, "Work-Life Balance": 6, "Safety": 6, "Things to Do": 7, "Savings / Cost": 8, "Remote Work": 8, "Living Space": 7 },
    total: 50
  }
];

function getWeightedCities(preferenceOrder: string[]) {
  // Top 3 get weights 3,2,1, rest get 1
  const weights: { [key: string]: number } = {};
  preferenceOrder.forEach((c, i) => {
    if (i === 0) weights[c] = 3;
    else if (i === 1) weights[c] = 2;
    else if (i === 2) weights[c] = 1;
    else weights[c] = 1;
  });
  return CITY_DATA.map((city) => {
    let total = 0;
    for (const c of CRITERIA) {
      total += city.metrics[c] * (weights[c] || 1);
    }
    return { ...city, total };
  }).sort((a, b) => b.total - a.total);
}

const App: React.FC = () => {
  const [preferences, setPreferences] = useState(CRITERIA);
  const rankedCities = getWeightedCities(preferences);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: "#4a4a4a" }}>
          Green Grass Picker
        </Typography>
        <PreferenceSelector preferences={preferences} onChange={setPreferences} />
        <CityRankingTable cities={rankedCities} criteria={CRITERIA} />
      </Container>
    </>
  );
};

export default App;
