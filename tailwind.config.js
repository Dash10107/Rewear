/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
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
        // Custom ReWear palette
        sage: {
          50: "#f6f7f6",
          100: "#e3e7e3",
          200: "#c7d0c7",
          300: "#a1b1a1",
          400: "#7a8f7a",
          500: "#5f7a5f",
          600: "#4a5f4a",
          700: "#3d4f3d",
          800: "#334133",
          900: "#2b362b",
        },
        terracotta: {
          50: "#fdf6f3",
          100: "#fbeae3",
          200: "#f6d2c2",
          300: "#efb297",
          400: "#e68a6a",
          500: "#dc6b47",
          600: "#cd5439",
          700: "#ab4530",
          800: "#893a2d",
          900: "#6f3329",
        },
        cream: {
          50: "#fefdfb",
          100: "#fdf9f3",
          200: "#faf1e4",
          300: "#f5e6d0",
          400: "#eed5b3",
          500: "#e4c190",
          600: "#d4a574",
          700: "#c08a5a",
          800: "#9e714a",
          900: "#805d3e",
        },
        dusty: {
          50: "#f9f7f7",
          100: "#f1eded",
          200: "#e4dddd",
          300: "#d1c7c7",
          400: "#b8a8a8",
          500: "#9e8c8c",
          600: "#8a7575",
          700: "#726161",
          800: "#5f5252",
          900: "#504646",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
