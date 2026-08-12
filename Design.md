---
name: Jungle Pulse
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3d4a3d'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6d7b6c'
  outline-variant: '#bccbb9'
  surface-tint: '#006e2f'
  primary: '#006e2f'
  on-primary: '#ffffff'
  primary-container: '#22c55e'
  on-primary-container: '#004b1e'
  inverse-primary: '#4ae176'
  secondary: '#b4136d'
  on-secondary: '#ffffff'
  secondary-container: '#fd56a7'
  on-secondary-container: '#600037'
  tertiary: '#785a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#d7a400'
  on-tertiary-container: '#523d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6bff8f'
  primary-fixed-dim: '#4ae176'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005321'
  secondary-fixed: '#ffd9e4'
  secondary-fixed-dim: '#ffb0cd'
  on-secondary-fixed: '#3e0022'
  on-secondary-fixed-variant: '#8c0053'
  tertiary-fixed: '#ffdf9a'
  tertiary-fixed-dim: '#f7be1d'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#5a4300'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
  jungle-dark: '#064E3B'
  electric-cyan: '#06B6D4'
  paper-white: '#F8FAFC'
  warning-orange: '#F97316'
typography:
  headline-xl:
    fontFamily: Bricolage Grotesque
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  border-width: 3px
---

## Brand & Style

The design system embodies the high-energy, DIY spirit of a tropical "Hacker House." It blends **Neo-Brutalism** with a lush, tropical aesthetic—merging raw technicality with vibrant organic energy. The visual language is intentional, loud, and unapologetically "unrefined," prioritizing immediate impact and a sense of community-driven chaos.

The style leverages heavy borders, high-contrast intersections, and sticker-style graphics to evoke the feeling of a physical space plastered with stickers and tech hardware. It is designed for builders, creators, and digital nomads who value authenticity over corporate polish.

**Key Aesthetic Pillars:**
- **Neo-Brutalism:** Bold black outlines (2px-4px), flat shadows, and aggressive color blocking.
- **Tropical Hacking:** A clash of synthetic neon colors against deep jungle neutrals.
- **Sticker-Culture:** Components often appear as physical objects, using high-stroke weights and "stuck-on" placement logic.

## Colors

The palette is a high-contrast explosion of "Jungle Neon." The **Primary Green** represents growth and the tropical environment, while the **Secondary Pink** and **Tertiary Yellow** provide the "Pulse"—the energy of hacking and nightlife.

- **Primary (#22C55E):** Used for main actions and success states.
- **Secondary (#EC4899):** Reserved for high-energy highlights and "sticker" accents.
- **Tertiary (#EAB308):** Used for warnings or secondary calls-to-action.
- **Neutral (#0F172A):** This deep ink color is used for all borders, shadows, and primary text to maintain a "printed" look.

All interactive elements must utilize a 2px-4px black border (`#0F172A`) to maintain the Neo-Brutalist structure.

## Typography

The typography strategy pairs a quirky, expressive sans-serif for headlines with a technical monospaced font for body and data. 

- **Headlines:** Use **Bricolage Grotesque**. It provides the "funky" and "organic" feel necessary for the Jungle Pulse brand. Set with tight tracking and leading for maximum impact.
- **Body & Technical:** Use **JetBrains Mono**. This reinforces the "Hacker" identity, making all content feel like code or a terminal readout. 
- **Formatting:** Labels and CTA text should always be uppercase to mimic sticker headings and technical documentation.

## Layout & Spacing

This design system follows a **Fixed-Fluid Hybrid** model. Content is contained within a 12-column grid with a maximum width of 1280px, but individual components use an aggressive, non-standard internal rhythm.

- **The "Sticker" Offset:** Layout elements often overlap or are slightly rotated (1-2 degrees) to mimic physical stickers.
- **Grid:** Use a 12-column grid on desktop (24px gutters) and a 4-column grid on mobile (16px gutters).
- **Hard Spacing:** Avoid soft gradients of space. Use clear, defined steps (8, 16, 24, 48, 64) to maintain a rigid, technical structure.

## Elevation & Depth

Depth is conveyed through **Hard-Shadows** and **Overlaps**, rather than blurs or lighting. 

- **Neo-Brutalist Shadows:** Instead of soft Gaussian blurs, use 100% opaque black offsets. For example, a "Raised" card has a 4px-8px offset shadow in the neutral color (`#0F172A`).
- **Surface Tiering:** 
  - **Level 0 (Floor):** Paper-white background.
  - **Level 1 (Card):** White surface with 3px border and 4px offset shadow.
  - **Level 2 (Active/Sticker):** Primary or Secondary colored surface with 6px offset shadow.
- **No Blurs:** Translucency and background blurs are strictly prohibited. Every layer is solid and defined.

## Shapes

The shape language is "Soft-Brutalist." While the overall vibe is raw, slight corner rounding prevents the UI from feeling overly hostile or sharp.

- **Standard Elements:** Buttons and input fields use a `0.25rem` (4px) radius.
- **Container Elements:** Large cards and sections use a `0.5rem` (8px) radius.
- **Special Accents:** Use "jagged" or "starburst" shapes for sticker-style calls-to-action or badges.

## Components

- **Buttons:** High-contrast backgrounds (Primary or Secondary) with a 3px black border. On hover, the button should shift its offset shadow to 0px, creating a "pressed" physical effect.
- **Cards:** White or very light gray backgrounds. Every card must have a 3px black border and a hard, flat shadow. Titles within cards use the label-md font style.
- **Input Fields:** Pure white background, 3px black border. Focused state should change the border color to Primary Green or apply a secondary-colored hard shadow.
- **Chips/Badges:** Use Tertiary Yellow or Secondary Pink. These should look like labels from a label-maker—monospaced font, all-caps, and minimal padding.
- **Lists:** Use monospaced bullet points (e.g., `>`) to lean into the terminal/hacker aesthetic. Separate list items with a 2px horizontal rule.
- **Stickers:** Create a set of "floating" graphic components (SVG shapes or icons) that sit at a 3-5 degree tilt and overlap the edges of containers.