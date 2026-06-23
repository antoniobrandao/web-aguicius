/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(315, 100%, 97%)',
            '100': 'hsl(315, 100%, 94%)',
            '200': 'hsl(315, 100%, 86%)',
            '300': 'hsl(315, 100%, 76%)',
            '400': 'hsl(315, 100%, 64%)',
            '500': 'hsl(315, 100%, 50%)',
            '600': 'hsl(315, 100%, 40%)',
            '700': 'hsl(315, 100%, 32%)',
            '800': 'hsl(315, 100%, 24%)',
            '900': 'hsl(315, 100%, 16%)',
            '950': 'hsl(315, 100%, 10%)',
            DEFAULT: '#850064'
        },
        'neutral-50': '#6c6d74',
        'neutral-100': '#ffffff',
        'neutral-200': '#2d2e33',
        'neutral-300': '#b4b5ba',
        'neutral-400': '#e5e5e7',
        'neutral-500': '#242427',
        'neutral-600': '#808080',
        'neutral-700': '#414141',
        background: '#ffffff',
        foreground: '#6c6d74'
    },
    fontFamily: {
        sans: [
            'Montserrat',
            'sans-serif'
        ]
    },
    fontSize: {
        '11': [
            '11px',
            {
                lineHeight: '17.875px',
                letterSpacing: '2px'
            }
        ],
        '16': [
            '16px',
            {
                lineHeight: '26px'
            }
        ],
        '20': [
            '20px',
            {
                lineHeight: '28px',
                letterSpacing: '2px'
            }
        ],
        '28': [
            '28px',
            {
                lineHeight: '45.5px'
            }
        ],
        '32': [
            '32px',
            {
                lineHeight: '53px',
                letterSpacing: '2px'
            }
        ],
        '36': [
            '36px',
            {
                lineHeight: '46.8px'
            }
        ],
        '48': [
            '48px',
            {
                lineHeight: '57.6px'
            }
        ],
        '128': [
            '128px',
            {
                lineHeight: '128px'
            }
        ]
    },
    spacing: {
        '1': '5px',
        '8': '40px',
        '14': '70px',
        '28': '140px',
        '36': '180px',
        '40': '200px'
    },
    borderRadius: {
        full: '50px'
    },
    screens: {
        sm: '640px',
        md: '782px',
        lg: '960px',
        '1200px': '1200px',
        '2xl': '1500px'
    },
    transitionDuration: {
        '100': '0.1s',
        '200': '0.2s'
    },
    transitionTimingFunction: {
        default: 'ease'
    },
    container: {
        center: true,
        padding: '40px'
    },
    maxWidth: {
        container: '1600px'
    }
},
  },
};
