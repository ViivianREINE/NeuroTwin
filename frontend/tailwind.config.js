/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090d16",
        foreground: "#f8fafc",
        card: {
          DEFAULT: "rgba(17, 25, 40, 0.65)",
          border: "rgba(255, 255, 255, 0.08)",
        },
        brand: {
          neon: "#8b5cf6",
          emerald: "#10b981",
          rose: "#f43f5e",
          blue: "#3b82f6",
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
      },
      boxShadow: {
        'neon-glow': '0 0 15px rgba(139, 92, 246, 0.35)',
        'emerald-glow': '0 0 15px rgba(16, 185, 129, 0.35)',
      }
    },
  },
  plugins: [],
}
