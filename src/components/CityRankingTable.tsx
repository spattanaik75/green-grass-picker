import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export interface City {
  name: string;
  metrics: { [key: string]: number };
  total: number;
}

interface CityRankingTableProps {
  cities: City[];
  criteria: string[];
}

function getColor(value: number, min: number, max: number) {
  // Green for high, red for low
  const percent = (value - min) / (max - min);
  const r = Math.round(255 * (1 - percent));
  const g = Math.round(200 * percent + 55 * (1 - percent));
  return `rgb(${r},${g},120)`;
}

export const CityRankingTable: React.FC<CityRankingTableProps> = ({ cities, criteria }) => {
  // Find min/max for each metric for coloring
  const minMax: { [key: string]: { min: number; max: number } } = {};
  criteria.forEach((c) => {
    const values = cities.map((city) => city.metrics[c]);
    minMax[c] = { min: Math.min(...values), max: Math.max(...values) };
  });

  return (
    <TableContainer component={Paper} sx={{ mt: 3, border: '1.5px solid #e0eafc', background: '#f6f8fa', borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ background: '#e0eafc' }}>
            <TableCell sx={{ fontWeight: 700, color: '#6a7ba2', fontSize: '1.05rem' }}>City / Country</TableCell>
            {criteria.map((c) => (
              <TableCell key={c} sx={{ fontWeight: 700, color: '#6a7ba2', fontSize: '1.05rem' }}>{c}</TableCell>
            ))}
            <TableCell sx={{ fontWeight: 700, color: '#6a7ba2', fontSize: '1.05rem' }}><b>Total</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cities.map((city, idx) => (
            <TableRow key={city.name} sx={{ background: idx % 2 === 0 ? '#f9f9fb' : '#f6f8fa' }}>
              <TableCell sx={{ fontWeight: 600, color: '#4a4a4a' }}>{city.name}</TableCell>
              {criteria.map((c) => (
                <TableCell
                  key={c}
                  style={{ background: getColor(city.metrics[c], minMax[c].min, minMax[c].max), color: '#222', borderRadius: 6 }}
                >
                  {city.metrics[c]}
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: 700, color: '#3a5a40', fontSize: '1.08rem' }}><b>{city.total}</b></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
