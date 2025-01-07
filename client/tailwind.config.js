/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: { 
      backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "bg-purple-700",
      secondary: "var(--faint_blue)",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      primary: "bg-purple-700",
      secondary: "var(--faint_blue)",
      title: "var(--title)",
      subtitle: "var(--subtitle)",
      grayColor: "#808585",
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      secondary: "var(--line)",
      primary: "var(--primary)",
      corporateBackgroundColor: "var(--corporate-background-color)",
    }),},
  },
  plugins: [],
};
