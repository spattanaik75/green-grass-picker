import type { SxProps, Theme } from "@mui/material";

// Table container styles
export const tableContainerStyles: SxProps<Theme> = {
  borderRadius: 3,
  border: "1px solid",
  borderColor: (theme) => theme.palette.primary.light,
  boxShadow: "0 1px 8px rgba(163, 201, 199, 0.08)",
  overflowX: "auto",
  maxWidth: "100%",
};

export const tableStyles: SxProps<Theme> = {
  minWidth: 650,
  tableLayout: "auto",
};

// Header row styles
export const headerRowStyles: SxProps<Theme> = {
  background: (theme) =>
    `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
};

// Table cell styles
export const tableCellBaseStyles: SxProps<Theme> = {
  minWidth: 100,
  whiteSpace: "nowrap",
};

export const stickyLeftHeaderStyles: SxProps<Theme> = {
  ...tableCellBaseStyles,
  minWidth: 180,
  position: "sticky",
  left: 0,
  background: (theme) =>
    `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
  zIndex: 2,
  boxShadow: "2px 0 4px rgba(0,0,0,0.05)",
};

export const stickyRightHeaderStyles: SxProps<Theme> = {
  ...tableCellBaseStyles,
  position: "sticky",
  right: 0,
  background: (theme) =>
    `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
  zIndex: 2,
  boxShadow: "-2px 0 4px rgba(0,0,0,0.05)",
};

export const tableSortLabelStyles: SxProps<Theme> = {
  fontWeight: 700,
  color: "#4a4a4a !important",
  fontSize: "0.85rem",
  whiteSpace: "nowrap",
  "& .MuiTableSortLabel-icon": {
    color: "#4a4a4a !important",
  },
};

export const tableSortLabelLargeStyles: SxProps<Theme> = {
  ...tableSortLabelStyles,
  fontSize: "0.95rem",
};

// Body row styles
export const getBodyRowStyles = (idx: number): SxProps<Theme> => ({
  background: (theme) => (idx % 2 === 0 ? theme.palette.background.paper : "#f9f9f9"),
  "&:hover": {
    background: (theme) => theme.palette.primary.light + "20",
    transition: "background 0.3s",
  },
});

export const getStickyLeftCellStyles = (idx: number): SxProps<Theme> => ({
  fontWeight: 600,
  color: "#4a4a4a",
  fontSize: "0.9rem",
  minWidth: 180,
  whiteSpace: "nowrap",
  position: "sticky",
  left: 0,
  background: (theme) => (idx % 2 === 0 ? theme.palette.background.paper : "#f9f9f9"),
  zIndex: 1,
  boxShadow: "2px 0 4px rgba(0,0,0,0.05)",
});

export const getDataCellStyles = (backgroundColor: string): SxProps<Theme> => ({
  background: backgroundColor,
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
});

export const getStickyRightCellStyles = (backgroundColor: string): SxProps<Theme> => ({
  fontWeight: 700,
  color: "#3a5a40",
  fontSize: "1rem",
  minWidth: 100,
  whiteSpace: "nowrap",
  background: backgroundColor,
  position: "sticky",
  right: 0,
  zIndex: 1,
  boxShadow: "-2px 0 4px rgba(0,0,0,0.05)",
});

// Mobile card styles
export const mobileCardContainerStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export const mobileCardStyles: SxProps<Theme> = {
  background: (theme) => theme.palette.background.paper,
  borderRadius: 3,
  border: "1px solid",
  borderColor: (theme) => theme.palette.primary.light,
  boxShadow: "0 1px 8px rgba(163, 201, 199, 0.08)",
};

export const mobileCardHeaderStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 2,
};

export const mobileCityNameStyles: SxProps<Theme> = {
  fontWeight: 600,
  color: "#4a4a4a",
};

export const mobileChipStyles = (backgroundColor: string): SxProps<Theme> => ({
  background: backgroundColor,
  fontWeight: 600,
  color: "#2d3a3a",
});

export const mobileMetricsContainerStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

export const getMobileMetricRowStyles = (backgroundColor: string): SxProps<Theme> => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  p: 1,
  borderRadius: 2,
  background: backgroundColor,
});

export const mobileMetricLabelStyles: SxProps<Theme> = {
  fontWeight: 500,
  color: "#4a4a4a",
};

export const mobileMetricValueStyles: SxProps<Theme> = {
  fontWeight: 700,
  color: "#2d3a3a",
};
