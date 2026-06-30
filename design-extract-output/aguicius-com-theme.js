// React Theme — extracted from https://aguicius.com
// Compatible with: Chakra UI, Stitches, Vanilla Extract, or any CSS-in-JS

/**
 * TypeScript type definition for this theme:
 *
 * interface Theme {
 *   colors: {
    primary: string;
    background: string;
    foreground: string;
    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    neutral500: string;
    neutral600: string;
    neutral700: string;
 *   };
 *   fonts: {
    body: string;
 *   };
 *   fontSizes: {
    '11': string;
    '16': string;
    '20': string;
    '28': string;
    '32': string;
    '36': string;
    '48': string;
    '128': string;
 *   };
 *   space: {
    '5': string;
    '40': string;
    '70': string;
    '140': string;
    '180': string;
    '200': string;
 *   };
 *   radii: {
    full: string;
 *   };
 *   shadows: {

 *   };
 *   states: {
 *     hover: { opacity: number };
 *     focus: { opacity: number };
 *     active: { opacity: number };
 *     disabled: { opacity: number };
 *   };
 * }
 */

export const theme = {
  "colors": {
    "primary": "#850064",
    "background": "#ffffff",
    "foreground": "#6c6d74",
    "neutral50": "#6c6d74",
    "neutral100": "#ffffff",
    "neutral200": "#2d2e33",
    "neutral300": "#b4b5ba",
    "neutral400": "#e5e5e7",
    "neutral500": "#242427",
    "neutral600": "#808080",
    "neutral700": "#414141"
  },
  "fonts": {
    "body": "'Montserrat', sans-serif"
  },
  "fontSizes": {
    "11": "11px",
    "16": "16px",
    "20": "20px",
    "28": "28px",
    "32": "32px",
    "36": "36px",
    "48": "48px",
    "128": "128px"
  },
  "space": {
    "5": "5px",
    "40": "40px",
    "70": "70px",
    "140": "140px",
    "180": "180px",
    "200": "200px"
  },
  "radii": {
    "full": "50px"
  },
  "shadows": {},
  "states": {
    "hover": {
      "opacity": 0.08
    },
    "focus": {
      "opacity": 0.12
    },
    "active": {
      "opacity": 0.16
    },
    "disabled": {
      "opacity": 0.38
    }
  }
};

// MUI v5 theme
export const muiTheme = {
  "palette": {
    "primary": {
      "main": "#850064",
      "light": "hsl(315, 100%, 41%)",
      "dark": "hsl(315, 100%, 11%)"
    },
    "background": {
      "default": "#ffffff",
      "paper": "#303033"
    },
    "text": {
      "primary": "#6c6d74",
      "secondary": "#2d2e33"
    }
  },
  "typography": {
    "h1": {
      "fontSize": "32px",
      "fontWeight": "500",
      "lineHeight": "53px"
    },
    "h2": {
      "fontSize": "28px",
      "fontWeight": "400",
      "lineHeight": "45.5px"
    },
    "h3": {
      "fontSize": "20px",
      "fontWeight": "500",
      "lineHeight": "28px"
    }
  },
  "shape": {
    "borderRadius": 50
  },
  "shadows": []
};

export default theme;
