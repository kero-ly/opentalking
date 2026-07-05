# OpenTalking Studio Homepage Theme Design

## Goal

Align OpenTalking Studio with the public homepage's soft pink-purple visual language while preserving the current workspace-first product layout.

## Visual Direction

- Use a light lavender-to-blush page atmosphere instead of teal/mint.
- Use deep indigo for primary text, active navigation, and structural emphasis.
- Use coral pink for primary CTA buttons, matching the homepage's "Demo" button energy without making the workspace feel like a landing page.
- Use violet/blue-violet for icons, badges, progress accents, and illustrative gradients.
- Keep cards white or translucent white with soft lavender borders and pink-purple shadows.

## Scope

- Update Studio theme tokens in Tailwind and the exported design-system theme.
- Update shared `Button`, `Badge`, `Card`, and metric styling where needed.
- Update layout surfaces: app background, sidebar, header, logo tile, quota card, user chip, active navigation.
- Update existing page gradients and asset/solution thumbnail tones to remove teal-specific visual cues.
- Do not change routes, auth behavior, content structure, or data models.

## Acceptance Criteria

- Default workspace feels visually related to `https://www.opentalking.net/`.
- Primary buttons use coral pink, not teal, orange, or cyan-purple gradients.
- Page background uses a soft pink-purple blend.
- No broad teal/cyan utility classes remain in Studio presentation code except where a generic blue state is intentionally used.
- Existing tests, typecheck, and production build pass.
