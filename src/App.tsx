

import React, { useState } from "react";
import { Container, CssBaseline, Typography, Paper, Box, Card, CardContent } from "@mui/material";
import { PreferenceSelector } from "./components/PreferenceSelector";
import { CityRankingTable } from "./components/CityRankingTable";
import { UserInputForm } from "./components/UserInputForm";
import type { UserInputs } from "./components/UserInputForm";
import type { City } from "./components/CityRankingTable";
import cityData from "./data.json";
import {
  containerStyles,
  mainBoxStyles,
  headerPaperStyles,
  headerTitleStyles,
  headerSubtitleStyles,
  preferenceSelectorCardStyles,
  preferenceSelectorCardContentStyles,
  sectionTitleStyles,
  footerBoxStyles,
  footerPrimaryTextStyles,
  footerSecondaryTextStyles,
} from "./styles/appStyles";

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
      <Container maxWidth="lg" sx={containerStyles}>
        <Box sx={mainBoxStyles}>
          {/* Header Section */}
          <Paper elevation={0} sx={headerPaperStyles}>
            <Typography variant="h3" sx={headerTitleStyles}>
              🌱 Green Grass Picker
            </Typography>
            <Typography variant="subtitle1" sx={headerSubtitleStyles}>
              Find your perfect city to live in, tailored to your preferences
            </Typography>
          </Paper>

          {/* User Input Section */}
          <UserInputForm inputs={userInputs} onChange={setUserInputs} />

          {/* Preference Selector Section */}
          <Card elevation={0} sx={preferenceSelectorCardStyles}>
            <CardContent sx={preferenceSelectorCardContentStyles}>
              <PreferenceSelector preferences={preferences} onChange={setPreferences} />
            </CardContent>
          </Card>

          {/* Results Section */}
          <Box>
            <Typography variant="h5" sx={sectionTitleStyles}>
              🏆 Your Personalized City Rankings
            </Typography>
            <CityRankingTable cities={rankedCities} criteria={CRITERIA} preferenceOrder={preferences} />
          </Box>

          {/* Footer */}
          <Box sx={footerBoxStyles}>
            <Typography variant="body2" sx={footerPrimaryTextStyles}>
              Made with ❤️ | Click column headers to sort | Drag preferences to reorder
            </Typography>
            <Typography variant="caption" sx={footerSecondaryTextStyles}>
              Data is for reference only. Actual experiences may vary.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default App;
