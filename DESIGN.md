# Sift — Design Brief

## Brand Identity

**Product**: Sift — Turn unstructured text into structured data
**URL**: siftform.com
**Tagline**: "Your forms are broken. Text is natural."

## Aesthetic: Precision Optics / Data Refinery

Think: a high-end scientific instrument UI. The product takes messy input and produces clean structured output — the design should mirror that transformation. Clean geometric precision with moments of organic texture where raw data enters.

## Typography

- **Headings**: Anybody (weight 300-700) — geometric, wide-set, distinctive
  - Wait, Anybody is used by RedBoxIQ. Let me choose differently.
- **Headings**: Satoshi (700/900) — geometric, modern, sharp
- **Body**: Switzer (300/400/500) — clean, technical, highly legible
- **Data/Code**: Fragment Mono (400/500) — distinctive monospace for extracted data display

## Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background | Polar ice | #F0F4F8 |
| Surface | White ice | #FAFCFE |
| Primary | Signal blue | #2563EB |
| Accent | Extract amber | #E6A817 |
| Text | Graphite | #1A2332 |
| Muted | Cool slate | #64748B |
| Success | Verified green | #16A34A |
| Warning | Amber | #D97706 |
| Error | Alert red | #DC2626 |
| Dark surface | Deep graphite | #111827 |

## Layout Principles

- **Transformation visual**: Left side = messy/organic, right side = clean/structured
- **Field extraction animation**: Data points emerge from text and slot into structured positions
- **Confidence indicators**: Color-coded dots (green/amber/red) next to extracted fields
- **Generous whitespace**: Let the data breathe. This is a precision tool.
- **No border-radius > 8px**: Sharp, precise corners. This is an instrument, not a toy.

## Unique Hook

The "extraction moment" — when the AI processes text, fields appear one by one with a subtle slide-in animation, each with a confidence indicator. It should feel like watching an X-ray develop. The transformation from chaos to structure IS the product demo.

## Dashboard Design

- Light mode default, dark mode available
- Left sidebar navigation (collapsible)
- Top bar with org name, usage meter, user menu
- Cards with subtle borders (#E2E8F0), 4px radius
- Data tables with alternating row tinting
- Fragment Mono for all data values

## Widget Design

- Minimal chrome — just the textarea, submit button, and extracted fields
- Signal blue accent for interactive elements
- Extract amber for confidence indicators
- Smooth state transitions between composing → extracting → review
- "Powered by Sift" subtle footer link

## Anti-Overlap Check

- NOT using: Inter, Roboto, system defaults (banned)
- NOT using: Purple gradients (Dashboard), navy+emerald (multiple sites)
- NOT using: Dark zinc+amber (Build With Claude), kraft+rust (BoringRiches)
- Satoshi + Switzer + Fragment Mono = unique combination in portfolio
- Polar ice + signal blue + extract amber = unique palette
- Precision Optics aesthetic = not used by any existing site
