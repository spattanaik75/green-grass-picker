import type { SxProps, Theme } from "@mui/material";

export const preferenceTitleStyles: SxProps<Theme> = {
  mb: 2,
  color: "#4a4a4a",
  fontWeight: 600,
  letterSpacing: 0.5,
  display: "flex",
  alignItems: "center",
  gap: 1,
};

export const preferenceLabelStyles: SxProps<Theme> = {
  color: (theme) => theme.palette.primary.main,
  fontWeight: 500,
  background: (theme) => theme.palette.primary.light,
  px: 1.5,
  py: 0.5,
  borderRadius: 2,
};

export const listStyles: SxProps<Theme> = {
  p: 0,
};

export const getListItemStyles = (isDragging: boolean): SxProps<Theme> => ({
  mb: 1.5,
  px: 2.5,
  py: 1.5,
  bgcolor: (theme) => (isDragging ? theme.palette.primary.light : "#fff"),
  borderRadius: 3,
  boxShadow: isDragging
    ? "0 4px 16px rgba(163, 201, 199, 0.25)"
    : "0 1px 4px rgba(163, 201, 199, 0.10)",
  border: "1px solid",
  borderColor: (theme) => (isDragging ? theme.palette.primary.main : theme.palette.primary.light),
  fontWeight: 500,
  color: "#4a4a4a",
  fontSize: "0.95rem",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "grab",
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  "&:hover": {
    bgcolor: (theme) => theme.palette.primary.light + "30",
    boxShadow: "0 2px 8px rgba(163, 201, 199, 0.15)",
    transform: "translateY(-1px)",
  },
  "&:active": {
    cursor: "grabbing",
  },
});

export const dragIconStyles: SxProps<Theme> = {
  color: (theme) => theme.palette.primary.main,
  opacity: 0.6,
  fontSize: "1.2rem",
};

export const itemContentBoxStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
};

export const itemTextStyles: SxProps<Theme> = {
  fontWeight: 500,
  color: "#4a4a4a",
};

export const getPriorityBadgeStyles = (priority: number): SxProps<Theme> => {
  const gradients = [
    "linear-gradient(135deg, #ffd89b 0%, #ffb347 100%)", // High
    "linear-gradient(135deg, #c9e4de 0%, #a3c9c7 100%)", // Medium
    "linear-gradient(135deg, #e0c3fc 0%, #d4a5ff 100%)", // Normal
  ];

  return {
    px: 1.5,
    py: 0.5,
    borderRadius: 2,
    background: gradients[priority],
    fontSize: "0.7rem",
    fontWeight: 600,
    color: "#2d3a3a",
  };
};

export const getPriorityLabel = (index: number): string => {
  const labels = ["High Priority", "Medium", "Normal"];
  return labels[index] || "";
};
