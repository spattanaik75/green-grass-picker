import React, { useState } from "react";
import {
  Box,
  TextField,
  Switch,
  FormControlLabel,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  Chip,
  Collapse,
  IconButton,
  Autocomplete,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  userFormCardStyles,
  headerBoxStyles,
  titleStyles,
  chipStyles,
  expandIconStyles,
  inputContainerStyles,
  inputRowStyles,
  textFieldRootStyles,
  switchContainerStyles,
  switchStyles,
  switchLabelBoxStyles,
} from "../styles/userFormStyles";

export interface UserInputs {
  currentLocation: string;
  homeLocation: string;
  hasChildren: boolean;
  netSavings: number;
}

interface UserInputFormProps {
  inputs: UserInputs;
  onChange: (inputs: UserInputs) => void;
}

// Popular cities for autocomplete
const CITIES = [
  "San Francisco, USA",
  "New York, USA",
  "Los Angeles, USA",
  "Seattle, USA",
  "Boston, USA",
  "Bangalore, India",
  "Mumbai, India",
  "Delhi, India",
  "Hyderabad, India",
  "Pune, India",
  "London, UK",
  "Manchester, UK",
  "Edinburgh, UK",
  "Amsterdam, Netherlands",
  "Rotterdam, Netherlands",
  "Dubai, UAE",
  "Abu Dhabi, UAE",
  "Singapore",
  "Hong Kong",
  "Tokyo, Japan",
  "Sydney, Australia",
  "Melbourne, Australia",
  "Brisbane, Australia",
  "Auckland, New Zealand",
  "Wellington, New Zealand",
  "Toronto, Canada",
  "Vancouver, Canada",
  "Montreal, Canada",
  "Paris, France",
  "Nice, France",
  "Lyon, France",
  "Berlin, Germany",
  "Munich, Germany",
  "Barcelona, Spain",
  "Madrid, Spain",
  "Valencia, Spain",
  "Lisbon, Portugal",
  "Porto, Portugal",
  "Rome, Italy",
  "Milan, Italy",
  "Florence, Italy",
  "Johannesburg, South Africa",
  "Cape Town, South Africa",
];

export const UserInputForm: React.FC<UserInputFormProps> = ({ inputs, onChange }) => {
  const [expanded, setExpanded] = useState(true);

  const handleChange = (field: keyof UserInputs) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === "hasChildren" 
      ? event.target.checked 
      : field === "netSavings" 
        ? event.target.value // Keep as string to allow editing
        : event.target.value;
    
    onChange({ ...inputs, [field]: value });
  };

  const handleLocationChange = (field: "currentLocation" | "homeLocation") => (
    _event: React.SyntheticEvent,
    value: string | null
  ) => {
    onChange({ ...inputs, [field]: value || "" });
  };

  return (
    <Card elevation={0} sx={userFormCardStyles}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ ...headerBoxStyles, mb: expanded ? 2 : 0 }}>
          <Typography variant="h6" sx={titleStyles}>
            Your Details
            <Chip label="Personalize" size="small" sx={chipStyles} />
          </Typography>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            size="small"
            sx={{
              ...expandIconStyles,
              transform: expanded ? "rotate(0deg)" : "rotate(180deg)",
            }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        <Collapse in={expanded}>
          <Box sx={inputContainerStyles}>
            <Box sx={inputRowStyles}>
              <Autocomplete
                fullWidth
                freeSolo
                options={CITIES}
                value={inputs.currentLocation}
                onChange={handleLocationChange("currentLocation")}
                onInputChange={(_event, newValue) => {
                  onChange({ ...inputs, currentLocation: newValue });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Current Location"
                    placeholder="e.g., San Francisco"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <InputAdornment position="start">
                            <LocationOnIcon sx={{ color: (theme) => theme.palette.primary.main }} />
                          </InputAdornment>
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                    sx={textFieldRootStyles}
                  />
                )}
              />
              <Autocomplete
                fullWidth
                freeSolo
                options={CITIES}
                value={inputs.homeLocation}
                onChange={handleLocationChange("homeLocation")}
                onInputChange={(_event, newValue) => {
                  onChange({ ...inputs, homeLocation: newValue });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Home Location"
                    placeholder="e.g., Bangalore"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <InputAdornment position="start">
                            <HomeIcon sx={{ color: (theme) => theme.palette.secondary.main }} />
                          </InputAdornment>
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                    sx={textFieldRootStyles}
                  />
                )}
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2.5 }}>
              <TextField
                fullWidth
                label="Net Savings (Monthly)"
                value={inputs.netSavings}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow empty string, numbers, and handle decimal input
                  if (value === "" || !isNaN(Number(value))) {
                    onChange({ ...inputs, netSavings: value === "" ? 0 : Number(value) });
                  }
                }}
                placeholder="0"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon sx={{ color: (theme) => theme.palette.success.main }} />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldRootStyles}
              />
              <Box sx={switchContainerStyles}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={inputs.hasChildren}
                      onChange={handleChange("hasChildren")}
                      sx={switchStyles}
                    />
                  }
                  label={
                    <Box sx={switchLabelBoxStyles}>
                      <ChildCareIcon sx={{ color: (theme) => theme.palette.info.main }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Have Children
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};
