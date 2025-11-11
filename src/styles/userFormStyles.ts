import type { SxProps, Theme } from "@mui/material";

// Card wrapper styles
export const userFormCardStyles: SxProps<Theme> = {
  width: "100%",
  background: (theme) => theme.palette.background.paper,
  borderRadius: 3,
  boxShadow: "0 1px 8px rgba(163, 201, 199, 0.08)",
  border: "1px solid",
  borderColor: (theme) => theme.palette.primary.light,
  mb: 3,
};

// Header section styles
export const headerBoxStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const titleStyles: SxProps<Theme> = {
  fontWeight: 600,
  color: "#4a4a4a",
  letterSpacing: 0.5,
  display: "flex",
  alignItems: "center",
  gap: 1,
};

export const chipStyles: SxProps<Theme> = {
  background: (theme) => theme.palette.primary.light,
  color: "#4a4a4a",
  fontWeight: 500,
  fontSize: "0.7rem",
};

export const expandIconStyles: SxProps<Theme> = {
  color: (theme) => theme.palette.primary.main,
  transition: "transform 0.3s",
};

// Input container styles
export const inputContainerStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 2.5,
};

export const inputRowStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  gap: 2.5,
};

// Text field styles
export const textFieldRootStyles: SxProps<Theme> = {
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

// Switch container styles
export const switchContainerStyles: SxProps<Theme> = {
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

export const switchStyles: SxProps<Theme> = {
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: (theme) => theme.palette.primary.main,
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: (theme) => theme.palette.primary.main,
  },
};

export const switchLabelBoxStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1,
};
