

import React, { useState } from "react";
import { Container, CssBaseline, Typography, Paper, Box, Card, CardContent } from "@mui/material";
import { PreferenceSelector } from "./components/PreferenceSelector";
import { CityRankingTable } from "./components/CityRankingTable";
import { UserInputForm } from "./components/UserInputForm";
import type { UserInputs } from "./components/UserInputForm";
import type { City } from "./components/CityRankingTable";
import cityData from "./data.json";

const CRITERIA: string[] = cityData.criteria;
const CITY_DATA: City[] = cityData.cities.map((city) => ({ ...city, total: 0 }));

function getWeightedCities(preferenceOrder: string[], userInputs: UserInputs) {
  // Top 3 get weights 3,2,1, rest get 1
  const weights: { [key: string]: number } = {};
  preferenceOrder.forEach((c, i) => {
    if (i === 0) weights[c] = 3;
    else if (i === 1) weights[c] = 2;
    else if (i === 2) weights[c] = 1.5;
    else weights[c] = 1;
  });
  
  return CITY_DATA.map((city) => {
    let total = 0;
    for (const c of CRITERIA) {
      // Skip "Academia for Children" if user doesn't have children
      if (c === "Academia for Children" && !userInputs.hasChildren) {
        continue;
      }
      total += city.metrics[c] * (weights[c] || 1);
    }
    return { ...city, total };
  }).sort((a, b) => b.total - a.total);
}

const App: React.FC = () => {
  const [preferences, setPreferences] = useState(CRITERIA);
  const [userInputs, setUserInputs] = useState<UserInputs>({
    currentLocation: "",
    homeLocation: "",
    hasChildren: false,
    netSavings: 0,
  });
  
  const rankedCities = getWeightedCities(preferences, userInputs);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Header Section */}
          <Paper elevation={0} sx={{
            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
            borderRadius: 4,
            p: { xs: 3, sm: 4 },
            boxShadow: '0 4px 20px rgba(163, 201, 199, 0.15)',
            textAlign: 'center',
          }}>
            <Typography variant="h3" sx={{ 
              fontWeight: 700, 
              color: "#2d3a3a", 
              mb: 1, 
              letterSpacing: 1.5,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}>
              🌱 Green Grass Picker
            </Typography>
            <Typography variant="subtitle1" sx={{ 
              color: "#4a4a4a", 
              fontWeight: 400,
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}>
              Find your perfect city to live in, tailored to your preferences
            </Typography>
          </Paper>

          {/* User Input Section */}
          <UserInputForm inputs={userInputs} onChange={setUserInputs} />

          {/* Preference Selector Section */}
          <Card elevation={0} sx={{ 
            background: (theme) => theme.palette.background.paper, 
            borderRadius: 3, 
            boxShadow: '0 2px 12px rgba(163, 201, 199, 0.10)',
            border: '1px solid',
            borderColor: (theme) => theme.palette.primary.light
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <PreferenceSelector preferences={preferences} onChange={setPreferences} />
            </CardContent>
          </Card>

          {/* Results Section */}
          <Box>
            <Typography variant="h5" sx={{ 
              fontWeight: 600, 
              color: "#4a4a4a", 
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              🏆 Your Personalized City Rankings
            </Typography>
            <CityRankingTable cities={rankedCities} criteria={CRITERIA} preferenceOrder={preferences} />
          </Box>

          {/* Footer */}
          <Box sx={{ 
            textAlign: 'center', 
            py: 3,
            mt: 2
          }}>
            <Typography variant="body2" sx={{ color: "#6a7ba2", mb: 1 }}>
              Made with ❤️ | Click column headers to sort | Drag preferences to reorder
            </Typography>
            <Typography variant="caption" sx={{ color: "#a0a0a0" }}>
              Data is for reference only. Actual experiences may vary.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default App;
