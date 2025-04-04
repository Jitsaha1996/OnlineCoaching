import { PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    extraColors: {
      lightest: string;
      lighter: string;
      darker: string;
      darkest: string;
    };
  }

  interface PaletteOptions {
    extraColors?: {
      lightest?: string;
      lighter?: string;
      darker?: string;
      darkest?: string;
    };
  }
}
