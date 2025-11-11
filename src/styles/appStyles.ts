import type { SxProps, Theme } from '@mui/material/styles';

export const containerStyles: SxProps<Theme> = {
  py: { xs: 2, sm: 4 },
};

export const mainBoxStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};

export const headerPaperStyles: SxProps<Theme> = {
  background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
  borderRadius: 4,
  p: { xs: 3, sm: 4 },
  boxShadow: '0 4px 20px rgba(163, 201, 199, 0.15)',
  textAlign: 'center',
};

export const headerTitleStyles: SxProps<Theme> = {
  fontWeight: 700,
  color: '#2d3a3a',
  mb: 1,
  letterSpacing: 1.5,
  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
};

export const headerSubtitleStyles: SxProps<Theme> = {
  color: '#4a4a4a',
  fontWeight: 400,
  fontSize: { xs: '0.9rem', sm: '1rem' },
};

export const preferenceSelectorCardStyles: SxProps<Theme> = {
  background: (theme) => theme.palette.background.paper,
  borderRadius: 3,
  boxShadow: '0 2px 12px rgba(163, 201, 199, 0.10)',
  border: '1px solid',
  borderColor: (theme) => theme.palette.primary.light,
};

export const preferenceSelectorCardContentStyles: SxProps<Theme> = {
  p: { xs: 2, sm: 3 },
};

export const sectionTitleStyles: SxProps<Theme> = {
  fontWeight: 600,
  color: '#4a4a4a',
  mb: 2,
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

export const footerBoxStyles: SxProps<Theme> = {
  textAlign: 'center',
  py: 3,
  mt: 2,
};

export const footerPrimaryTextStyles: SxProps<Theme> = {
  color: '#6a7ba2',
  mb: 1,
};

export const footerSecondaryTextStyles: SxProps<Theme> = {
  color: '#a0a0a0',
};
