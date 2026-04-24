/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all files that contain Nativewind classes.
	content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				main: "#0b0c15",
				"surface-low": "#111827",
				"surface-mid": "#0f172a",
				"element-rim": "#1e293b",
				"input-shadow": "#1e293b",
				"primary-purple": "#a855f7",
				"skill-cyan": "#38bdf8",
				"success-emerald": "#10b981",
				"alert-amber": "#fbbf24",
				"magic-indigo": "#6366f1",
				"text-primary": "#ffffff",
				"text-body": "#f8fafc",
				"text-secondary": "#94a3b8",
				"text-muted": "#64748b",
			}
		},
	},
	plugins: [],
};
