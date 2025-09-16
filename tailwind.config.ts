import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwindcss-themer')({
      themes: [
        {
          name: 'light',
          extend: {
            colors: {
              background: '#f8fafc',
              foreground: '#1a202c',
              primary: {
                DEFAULT: '#4f46e5',
                foreground: '#ffffff',
              },
              secondary: {
                DEFAULT: '#64748b',
                foreground: '#ffffff',
              },
              accent: {
                DEFAULT: '#06b6d4',
                foreground: '#ffffff',
              },
              muted: {
                DEFAULT: '#e2e8f0',
                foreground: '#64748b',
              },
              card: {
                DEFAULT: '#ffffff',
                foreground: '#1a202c',
              },
              border: '#e5e7eb',
              input: '#f1f5f9',
              ring: '#6366f1',
            },
          },
        },
        {
          name: 'dark',
          extend: {
            colors: {
              background: '#1a202c',
              foreground: '#f8fafc',
              primary: {
                DEFAULT: '#6366f1',
                foreground: '#ffffff',
              },
              secondary: {
                DEFAULT: '#64748b',
                foreground: '#ffffff',
              },
              accent: {
                DEFAULT: '#0891b2',
                foreground: '#ffffff',
              },
              muted: {
                DEFAULT: '#2d3748',
                foreground: '#a0aec0',
              },
              card: {
                DEFAULT: '#2d3748',
                foreground: '#f8fafc',
              },
              border: '#4a5568',
              input: '#2d3748',
              ring: '#6366f1',
            },
          },
        },
      ],
    }),
  ],
};

export default config;