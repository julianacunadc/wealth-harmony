import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        wealth: {
          violet: "hsl(var(--wealth-violet))",
          indigo: "hsl(var(--wealth-indigo))",
          surplus: "hsl(var(--wealth-surplus))",
          "surplus-fg": "hsl(var(--wealth-surplus-foreground))",
          deficit: "hsl(var(--wealth-deficit))",
          "deficit-fg": "hsl(var(--wealth-deficit-foreground))",
          warning: "hsl(var(--wealth-warning))",
          "warning-fg": "hsl(var(--wealth-warning-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        wealth: "0 8px 32px -8px hsl(var(--wealth-violet) / 0.08), 0 4px 16px -4px hsl(240 10% 10% / 0.04)",
        "wealth-lg": "0 16px 48px -12px hsl(var(--wealth-violet) / 0.12), 0 8px 24px -8px hsl(240 10% 10% / 0.06)",
        "wealth-glow": "0 0 60px -12px hsl(var(--wealth-violet) / 0.25)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.15)", opacity: "0.9" },
        },
        "breathe-slow": {
          "0%, 100%": { transform: "scale(1) translate(0, 0)", opacity: "0.5" },
          "50%": { transform: "scale(1.2) translate(10px, -10px)", opacity: "0.8" },
        },
        "breathe-alt": {
          "0%, 100%": { transform: "scale(1.1) translate(0, 0)", opacity: "0.5" },
          "50%": { transform: "scale(0.95) translate(-10px, 10px)", opacity: "0.75" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "breathe": "breathe 4s ease-in-out infinite",
        "breathe-slow": "breathe-slow 5s ease-in-out infinite",
        "breathe-alt": "breathe-alt 6s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
