import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Box,
  Chip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export interface City {
  name: string;
  country?: string;
  metrics: { [key: string]: number };
  total: number;
}

interface CityRankingTableProps {
  cities: City[];
  criteria: string[];
  preferenceOrder?: string[];
}

type SortOrder = "asc" | "desc";

function getColorForScore(value: number, min: number, max: number): string {
  // Pastel gradient from red (low) to green (high)
  const percent = max === min ? 1 : (value - min) / (max - min);
  
  // Pastel red to pastel green
  const r = Math.round(255 * (1 - percent) + 183 * percent);
  const g = Math.round(179 * (1 - percent) + 228 * percent);
  const b = Math.round(179 * (1 - percent) + 199 * percent);
  
  return `rgb(${r}, ${g}, ${b})`;
}

export const CityRankingTable: React.FC<CityRankingTableProps> = ({ 
  cities, 
  criteria,
  preferenceOrder 
}) => {
  const [orderBy, setOrderBy] = useState<string>("total");
  const [order, setOrder] = useState<SortOrder>("desc");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Find min/max for each metric for coloring
  const minMax: { [key: string]: { min: number; max: number } } = {};
  criteria.forEach((c) => {
    const values = cities.map((city) => city.metrics[c]);
    minMax[c] = { min: Math.min(...values), max: Math.max(...values) };
  });

  // Add total to minMax
  const totalValues = cities.map((city) => city.total);
  minMax["total"] = { min: Math.min(...totalValues), max: Math.max(...totalValues) };

  const handleSort = (column: string) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const sortedCities = [...cities].sort((a, b) => {
    let aValue: number;
    let bValue: number;

    if (orderBy === "total") {
      aValue = a.total;
      bValue = b.total;
    } else if (orderBy === "name") {
      return order === "asc" 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      aValue = a.metrics[orderBy];
      bValue = b.metrics[orderBy];
    }

    return order === "asc" ? aValue - bValue : bValue - aValue;
  });

  // Reorder criteria based on preference
  const orderedCriteria = preferenceOrder || criteria;

  // Mobile view - Card based
  if (isMobile) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sortedCities.map((city) => (
          <Card
            key={city.name}
            elevation={0}
            sx={{
              background: theme.palette.background.paper,
              borderRadius: 3,
              border: "1px solid",
              borderColor: theme.palette.primary.light,
              boxShadow: "0 1px 8px rgba(163, 201, 199, 0.08)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#4a4a4a" }}>
                  {city.name}
                </Typography>
                <Chip
                  icon={<TrendingUpIcon />}
                  label={`${city.total} pts`}
                  sx={{
                    background: getColorForScore(city.total, minMax["total"].min, minMax["total"].max),
                    fontWeight: 600,
                    color: "#2d3a3a",
                  }}
                />
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {orderedCriteria.map((criterion) => (
                  <Box
                    key={criterion}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1,
                      borderRadius: 2,
                      background: getColorForScore(
                        city.metrics[criterion],
                        minMax[criterion].min,
                        minMax[criterion].max
                      ),
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500, color: "#4a4a4a" }}>
                      {criterion}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#2d3a3a" }}>
                      {city.metrics[criterion]}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  // Desktop view - Table
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: theme.palette.primary.light,
        boxShadow: "0 1px 8px rgba(163, 201, 199, 0.08)",
        overflowX: "auto",
        maxWidth: "100%",
      }}
    >
      <Table sx={{ minWidth: 650, tableLayout: "auto" }}>
        <TableHead>
          <TableRow
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
            }}
          >
            <TableCell sx={{ 
              minWidth: 180, 
              whiteSpace: "nowrap", 
              position: "sticky", 
              left: 0, 
              background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
              zIndex: 2,
              boxShadow: "2px 0 4px rgba(0,0,0,0.05)",
            }}>
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={() => handleSort("name")}
                sx={{
                  fontWeight: 700,
                  color: "#4a4a4a !important",
                  fontSize: "0.95rem",
                  "& .MuiTableSortLabel-icon": {
                    color: "#4a4a4a !important",
                  },
                }}
              >
                City / Country
              </TableSortLabel>
            </TableCell>
            {orderedCriteria.map((criterion) => (
              <TableCell key={criterion} align="center" sx={{ minWidth: 100, whiteSpace: "nowrap" }}>
                <TableSortLabel
                  active={orderBy === criterion}
                  direction={orderBy === criterion ? order : "desc"}
                  onClick={() => handleSort(criterion)}
                  sx={{
                    fontWeight: 700,
                    color: "#4a4a4a !important",
                    fontSize: "0.85rem",
                    whiteSpace: "nowrap",
                    "& .MuiTableSortLabel-icon": {
                      color: "#4a4a4a !important",
                    },
                  }}
                >
                  {criterion}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell align="center" sx={{ 
              minWidth: 100, 
              whiteSpace: "nowrap", 
              position: "sticky", 
              right: 0, 
              background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`, 
              zIndex: 2,
              boxShadow: "-2px 0 4px rgba(0,0,0,0.05)",
            }}>
              <TableSortLabel
                active={orderBy === "total"}
                direction={orderBy === "total" ? order : "desc"}
                onClick={() => handleSort("total")}
                sx={{
                  fontWeight: 700,
                  color: "#4a4a4a !important",
                  fontSize: "0.95rem",
                  "& .MuiTableSortLabel-icon": {
                    color: "#4a4a4a !important",
                  },
                }}
              >
                Total
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCities.map((city, idx) => (
            <TableRow
              key={city.name}
              sx={{
                background: idx % 2 === 0 ? theme.palette.background.paper : "#f9f9f9",
                "&:hover": {
                  background: theme.palette.primary.light + "20",
                  transition: "background 0.3s",
                },
              }}
            >
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "#4a4a4a",
                  fontSize: "0.9rem",
                  minWidth: 180,
                  whiteSpace: "nowrap",
                  position: "sticky",
                  left: 0,
                  background: idx % 2 === 0 ? theme.palette.background.paper : "#f9f9f9",
                  zIndex: 1,
                  boxShadow: "2px 0 4px rgba(0,0,0,0.05)",
                }}
              >
                {city.name}
              </TableCell>
              {orderedCriteria.map((criterion) => (
                <TableCell
                  key={criterion}
                  align="center"
                  sx={{
                    background: getColorForScore(
                      city.metrics[criterion],
                      minMax[criterion].min,
                      minMax[criterion].max
                    ),
                    fontWeight: 600,
                    color: "#2d3a3a",
                    fontSize: "0.9rem",
                    minWidth: 100,
                    whiteSpace: "nowrap",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      pointerEvents: "none",
                    },
                  }}
                >
                  {city.metrics[criterion]}
                </TableCell>
              ))}
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  color: "#3a5a40",
                  fontSize: "1rem",
                  minWidth: 100,
                  whiteSpace: "nowrap",
                  background: getColorForScore(city.total, minMax["total"].min, minMax["total"].max),
                  position: "sticky",
                  right: 0,
                  zIndex: 1,
                  boxShadow: "-2px 0 4px rgba(0,0,0,0.05)",
                }}
              >
                {city.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
