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
import {
  tableContainerStyles,
  tableStyles,
  headerRowStyles,
  stickyLeftHeaderStyles,
  stickyRightHeaderStyles,
  tableSortLabelStyles,
  tableSortLabelLargeStyles,
  getBodyRowStyles,
  getStickyLeftCellStyles,
  getDataCellStyles,
  getStickyRightCellStyles,
  mobileCardContainerStyles,
  mobileCardStyles,
  mobileCardHeaderStyles,
  mobileCityNameStyles,
  mobileChipStyles,
  mobileMetricsContainerStyles,
  getMobileMetricRowStyles,
  mobileMetricLabelStyles,
  mobileMetricValueStyles,
} from "../styles/tableStyles";

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
      <Box sx={mobileCardContainerStyles}>
        {sortedCities.map((city) => (
          <Card key={city.name} elevation={0} sx={mobileCardStyles}>
            <CardContent>
              <Box sx={mobileCardHeaderStyles}>
                <Typography variant="h6" sx={mobileCityNameStyles}>
                  {city.name}
                </Typography>
                <Chip
                  icon={<TrendingUpIcon />}
                  label={`${city.total} pts`}
                  sx={mobileChipStyles(
                    getColorForScore(city.total, minMax["total"].min, minMax["total"].max)
                  )}
                />
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={mobileMetricsContainerStyles}>
                {orderedCriteria.map((criterion) => (
                  <Box
                    key={criterion}
                    sx={getMobileMetricRowStyles(
                      getColorForScore(
                        city.metrics[criterion],
                        minMax[criterion].min,
                        minMax[criterion].max
                      )
                    )}
                  >
                    <Typography variant="body2" sx={mobileMetricLabelStyles}>
                      {criterion}
                    </Typography>
                    <Typography variant="body2" sx={mobileMetricValueStyles}>
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
    <TableContainer component={Paper} elevation={0} sx={tableContainerStyles}>
      <Table sx={tableStyles}>
        <TableHead>
          <TableRow sx={headerRowStyles}>
            <TableCell sx={stickyLeftHeaderStyles}>
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={() => handleSort("name")}
                sx={tableSortLabelLargeStyles}
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
                  sx={tableSortLabelStyles}
                >
                  {criterion}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell align="center" sx={stickyRightHeaderStyles}>
              <TableSortLabel
                active={orderBy === "total"}
                direction={orderBy === "total" ? order : "desc"}
                onClick={() => handleSort("total")}
                sx={tableSortLabelLargeStyles}
              >
                Total
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCities.map((city, idx) => (
            <TableRow key={city.name} sx={getBodyRowStyles(idx)}>
              <TableCell sx={getStickyLeftCellStyles(idx)}>
                {city.name}
              </TableCell>
              {orderedCriteria.map((criterion) => (
                <TableCell
                  key={criterion}
                  align="center"
                  sx={getDataCellStyles(
                    getColorForScore(
                      city.metrics[criterion],
                      minMax[criterion].min,
                      minMax[criterion].max
                    )
                  )}
                >
                  {city.metrics[criterion]}
                </TableCell>
              ))}
              <TableCell
                align="center"
                sx={getStickyRightCellStyles(
                  getColorForScore(city.total, minMax["total"].min, minMax["total"].max)
                )}
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
