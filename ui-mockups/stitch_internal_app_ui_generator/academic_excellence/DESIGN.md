---
name: Academic Excellence
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#43474e'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#476083'
  primary: '#000613'
  on-primary: '#ffffff'
  primary-container: '#001f3f'
  on-primary-container: '#6f88ad'
  inverse-primary: '#afc8f0'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#060604'
  on-tertiary: '#ffffff'
  tertiary-container: '#1f1f1b'
  on-tertiary-container: '#888681'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#afc8f0'
  on-primary-fixed: '#001c3a'
  on-primary-fixed-variant: '#2f486a'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e5e2db'
  tertiary-fixed-dim: '#c9c6c0'
  on-tertiary-fixed: '#1c1c18'
  on-tertiary-fixed-variant: '#474742'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
  headline-lg:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  caption:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 40px
---

## Brand & Style

The design system is anchored in the concepts of intellectual rigour, preservation, and accessibility. It balances the weight of a traditional library with the efficiency of modern information science. The visual language evokes a sense of quiet authority and organized calm, ensuring that users—from students to archivists—feel a sense of trust and clarity.

The style is a refined **Minimalism** with **Corporate** structural integrity. It avoids trendy flourishes in favor of high-legibility, deliberate white space, and a grid-driven hierarchy. The aesthetic mimics the high-quality printing of an academic journal: crisp, purposeful, and permanent.

## Colors

The palette is built upon a foundation of **Navy (#001F3F)**, representing stability and institutional knowledge, and **Gold (#D4AF37)**, used sparingly for prestige and highlighting key actions. 

- **Primary (Navy):** Used for global navigation, primary headings, and critical interactive states.
- **Secondary (Gold):** Used for high-intent actions, search focus states, and signifying "Featured" or "New" academic acquisitions.
- **Tertiary (Parchment):** A soft, off-white background color (#F4F1EA) used for main content areas to reduce eye strain and provide a subtle literary texture.
- **Neutrals:** A range of slate grays is used for functional borders and secondary text, ensuring a sophisticated contrast that never feels harsh.

## Typography

This design system utilizes a sophisticated typographic pairing to differentiate between content and function. 

**Newsreader** is the primary serif choice for headings. Its editorial character provides the "Between the Lines" literary feel, making long titles and section headers feel authoritative. 

**Public Sans** is used for all functional and body text. Chosen for its institutional clarity and neutral stance, it ensures that tabular data and metadata are highly readable. 

Body text should maintain a generous line height (1.5 - 1.6) to facilitate long-form reading, while labels use a slightly tighter tracking and heavier weight for immediate recognition in dense interfaces.

## Layout & Spacing

The layout follows a **Fixed Grid** model to maintain a disciplined, document-like structure. A 12-column grid is used for the primary content area, centered on the screen with wide margins to create a sense of focus.

- **Vertical Rhythm:** Spacing is strictly based on an 8px scale.
- **Sectioning:** Large gaps (xl) are used to separate major functional areas (e.g., search from results).
- **Density:** While the overall layout is airy, functional areas like tables and book lists use medium spacing (md) to maximize information density without causing visual clutter.

## Elevation & Depth

To maintain an academic and professional tone, this design system avoids heavy shadows and floating elements. Instead, it uses **Low-contrast outlines** and **Tonal layers**.

- **Surface Tiers:** The main background is the Parchment color. Cards and search containers use a pure white surface to "lift" themselves off the page.
- **Borders:** Elements are defined by thin (1px), subtle borders in a light gray-navy mix. This reinforces the "organized" and "structured" brand pillars.
- **Subtle Shadows:** For the "Search Bar" only, a very soft, diffused Navy-tinted shadow (4% opacity) is used to draw immediate focus to the primary entry point of the library system.

## Shapes

The shape language of this design system is conservative and precise. A **Soft (0.25rem)** roundedness is applied to buttons, input fields, and cards. 

This minimal rounding provides just enough softness to feel modern and accessible, while the predominantly straight lines and right angles maintain the "organized" and "trustworthy" institutional feel. Circular elements are reserved strictly for avatar icons or status indicators (e.g., "Available" dot).

## Components

### Structured Tables
Data-heavy lists (e.g., loan history, patron logs) must use a clean, header-driven table.
- Headers: Navy background with white Public Sans labels.
- Rows: Alternating subtle Parchment and White fills (zebra striping).
- Borders: Horizontal lines only to emphasize the flow of information.

### Search Bar
The central component of the interface.
- Appearance: Large, white background with a Navy 1px border.
- Interaction: Upon focus, the border transitions to Gold with a 2px thickness.
- Iconography: A simple, thin-stroke magnifying glass in Navy.

### Book Cards
Used for book listings and catalog browsing.
- Layout: A vertical orientation with a fixed aspect ratio for the book cover.
- Content: The title uses Newsreader (bold), while the author and ISBN use Public Sans (regular).
- Call to Action: "View Details" or "Reserve" buttons are secondary-style (Navy outline) until hovered.

### Buttons
- **Primary:** Solid Navy with White text.
- **Secondary:** Navy outline with Navy text.
- **Accent:** Solid Gold with Navy text (used for "Check Out" or "Action Required").

### Chips & Tags
Used for genre categories (e.g., "History", "Science").
- Style: Light Navy tint background with Navy text, no border, and small 4px rounded corners.