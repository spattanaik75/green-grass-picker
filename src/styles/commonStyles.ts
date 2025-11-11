import type { SxProps, Theme } from "@mui/material";

// Common text field styles
export const textFieldStyles: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    background: "#fafafa",
    "&:hover fieldset": {
      borderColor: (theme) => theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: (theme) => theme.palette.primary.main,
    },
  },
};

// Card styles
export const cardStyles: SxProps<Theme> = {
  background: (theme) => theme.palette.background.paper,
  borderRadius: 3,
  boxShadow: "0 1px 8px rgba(163, 201, 199, 0.08)",
  border: "1px solid",
  borderColor: (theme) => theme.palette.primary.light,
};

// Container with gradient background
export const gradientPaperStyles: SxProps<Theme> = {
  background: (theme) =>
    `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
  borderRadius: 4,
  boxShadow: "0 4px 20px rgba(163, 201, 199, 0.15)",
};

// Expandable section styles
export const collapsibleBoxStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  flex: 1,
  px: 2,
  py: 1,
  borderRadius: 2,
  background: "#fafafa",
  border: "1px solid",
  borderColor: (theme) => theme.palette.divider,
};

// Sticky table cell styles
export const stickyLeftCellStyles = (isEven: boolean): SxProps<Theme> => ({
  minWidth: 180,
  whiteSpace: "nowrap",
  position: "sticky",
  left: 0,
  background: (theme) => (isEven ? theme.palette.background.paper : "#f9f9f9"),
  zIndex: 1,
  boxShadow: "2px 0 4px rgba(0,0,0,0.05)",
});

export const stickyRightCellStyles = (backgroundColor: string): SxProps<Theme> => ({
  minWidth: 100,
  whiteSpace: "nowrap",
  position: "sticky",
  right: 0,
  background: backgroundColor,
  zIndex: 1,
  boxShadow: "-2px 0 4px rgba(0,0,0,0.05)",
});

// Table header sticky styles
export const stickyHeaderLeftStyles: SxProps<Theme> = {
  minWidth: 180,
  whiteSpace: "nowrap",
  position: "sticky",
  left: 0,
  background: (theme) =>
    `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
  zIndex: 2,
  boxShadow: "2px 0 4px rgba(0,0,0,0.05)",
};

export const stickyHeaderRightStyles: SxProps<Theme> = {
  minWidth: 100,
  whiteSpace: "nowrap",
  position: "sticky",
  right: 0,
  background: (theme) =>
    `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
  zIndex: 2,
  boxShadow: "-2px 0 4px rgba(0,0,0,0.05)",
};

// Table sort label styles
export const tableSortLabelStyles: SxProps<Theme> = {
  fontWeight: 700,
  color: "#4a4a4a !important",
  fontSize: "0.85rem",
  whiteSpace: "nowrap",
  "& .MuiTableSortLabel-icon": {
    color: "#4a4a4a !important",
  },
};

// Icon color utilities
export const iconColors = {
  primary: (theme: Theme) => theme.palette.primary.main,
  secondary: (theme: Theme) => theme.palette.secondary.main,
  success: (theme: Theme) => theme.palette.success.main,
  info: (theme: Theme) => theme.palette.info.main,
};

// Responsive spacing
export const responsivePadding = {
  xs: 2,
  sm: 3,
};

export const responsiveGap = {
  xs: 2,
  sm: 2.5,
};
