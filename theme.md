# AI Course Game App - Design Guide

This guide documents the **Cyber-Gamified Dark Theme** used in the AI Course Game App. Use these tokens and patterns to maintain a consistent high-fidelity experience across other applications.

## 🎨 Color Palette

The theme is built on an extremely dark base with vibrant, glowing accent colors.

### Core Backgrounds
| Token | Hex | Usage |
| :--- | :--- | :--- |
| **Main Background** | `#0b0c15` | The primary, pitch-black background for all screens. |
| **Card / Surface Low** | `#111827` | Secondary surfaces like player cards or info boxes. |
| **Card / Surface Mid** | `#0f172a` | Primary card background with slightly more contrast. |
| **Element / Rim** | `#1e293b` | Borders (`borderWidth: 1`) and subtle divider lines. |
| **Input / Shadow** | `#1e293b` | Form fields and inset containers. |

### Accent Colors (Neon)
| Token | Hex | Meaning |
| :--- | :--- | :--- |
| **Primary Purple** | `#a855f7` | Progression, XP, core interactive buttons. |
| **Skill Cyan** | `#38bdf8` | Levels, skill tags, tech-focused elements. |
| **Success Emerald** | `#10b981` | Growth, evolution, AI generation, success states. |
| **Alert Amber** | `#fbbf24` | Limited time, currency (Gems/Coins), warnings. |
| **Magic Indigo** | `#6366f1` | Secondary actions, inactive/secondary spells. |

### Typography Colors
| Token | Hex | Usage |
| :--- | :--- | :--- |
| **Text Primary** | `#ffffff` | Headings and high-emphasis text. |
| **Text Body** | `#f8fafc` | Standard readable content and card titles. |
| **Text Secondary** | `#94a3b8` | Subheadings and descriptive text. |
| **Text Muted** | `#64748b` | Placeholders, disabled states, and metadata. |

---

## ✍️ Typography System

Focus on high contrast and heavy weights to evoke a "Game UI" feel.

| Element | Style (React Native) |
| :--- | :--- |
| **Main Heading** | `fontSize: 32, fontWeight: "900", letterSpacing: 1, color: "#fff"` |
| **Section Title** | `fontSize: 20, fontWeight: "900", letterSpacing: 0.5, color: "#f1f5f9"` |
| **Subheading** | `fontSize: 16, color: "#94a3b8", fontWeight: "400"` |
| **Card Title** | `fontSize: 18, fontWeight: "bold", color: "#f8fafc"` |
| **Label / Badge** | `fontSize: 11, fontWeight: "900", letterSpacing: 2` |

---

## 🧊 Component Patterns

### 1. Atmospherics (Glows)
Every screen should feature 1-2 background "glows" to create depth.
```javascript
// React Native Implementation
{
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#7e22ce2a", // 15-20% opacity of an accent color
}
```

### 2. High-Fidelity Cards
Cards use a combination of deep backgrounds, subtle borders, and glowing shadows.
*   **Border:** `borderWidth: 1, borderColor: "#1e293b"`
*   **Radius:** `borderRadius: 24` or `32`
*   **Shadow:** 
    ```javascript
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2, // Boost to 0.5+ for active elements
    shadowRadius: 20,
    ```

### 3. Glassmorphism Elements
Use for badges and pills to let the background/glows peek through.
*   **Background:** Use accent color at 15-20% opacity (e.g., `#0ea5e933`).
*   **Padding:** `paddingHorizontal: 12, paddingVertical: 6`.
*   **Border:** `borderRadius: 12`.

### 4. Interactive Buttons
Buttons should feel weighty and responsive.
*   **Primary:** Solid accent color with a matching shadow.
*   **Secondary:** Outlined with `#1e293b` or semi-transparent background.
*   **Feedback:** Use `activeOpacity={0.8}` or `0.9` for subtle scale/dimming.

---

## 💎 Iconography
*   **Functional:** Use `lucide-react-native` (Stroke width: 2).
*   **Decorative:** Use **3D Isometric Assets** (low-poly or high-gloss style).
    *   *Examples:* Golden coins, faceted gems, leather-bound books, crystal orbs.

---

## 🎮 Gamification UX Rules
1.  **Never Use Pure Black:** Always use `#0b0c15` or similar deep tints to keep the "premium" feel.
2.  **Every Action needs a Reward:** XP gains, level badges, or visual changes (HQ Evolution) should follow most completions.
3.  **Hierarchy of Importance:** Use the **Primary Purple** for what you want the user to do most, and **Emerald** for AI-related magic actions.

---

## 🏗️ Visual Evolution (Progression States)
The UI should physically change as the user progresses.

*   **HQ Evolution:** Start with a simple "Nomad Tent" (`tent.png`). At Level 10, evolve to "The Outpost" (`outpost.png`), and finally to a "Citadel" or "Sanctum."
*   **XP Scaling:** Use `#a855f7` (Purple) to fill progress bars, shifting to `#fbbf24` (Amber) for special "Overdrive" or "Mastery" states.

## ⚡ Dynamic UI States
*   **Inactive/Locked:** Use `opacity: 0.8` with a **Magic Indigo** (`#6366f1`) border.
*   **Active/Selected:** Add a glowing shadow (`shadowOpacity: 0.3+`) and a vibrant border in either **Primary Purple** or **Success Emerald**.
*   **Loading:** Use `#10b981` (Emerald) for `ActivityIndicator` to signify "AI magic" is happening.

