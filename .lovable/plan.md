

## Add Breathing Orbs to Upload Landing Page

Add the same breathing orbs animation from the ProcessingView to the top of the UploadView, serving as a decorative brand element above the heading.

### Changes

**1. Extract a reusable `BreathingOrbs` component** (`src/components/BreathingOrbs.tsx`)
- Contains the 4 blurred, pulsing circles with the same colors, sizes, blur values, and animation classes as in `ProcessingView.tsx` (lines 47-70).
- Accepts an optional `className` prop for sizing control, so it can be rendered smaller on the landing page and larger on the processing page.

**2. Update `UploadView.tsx`**
- Import and place `<BreathingOrbs />` above the H1 heading, inside the centered container.
- Use a smaller size (e.g., `w-40 h-40`) so it acts as a subtle brand accent rather than dominating the page. The orb sizes inside will scale proportionally.

**3. Update `ProcessingView.tsx`**
- Replace the inline orbs markup with the shared `<BreathingOrbs />` component (full size `w-64 h-64`) to avoid code duplication.

### Technical Details

| File | Action |
|------|--------|
| `src/components/BreathingOrbs.tsx` | Create -- shared component with 4 animated orbs, accepts `className` prop |
| `src/components/UploadView.tsx` | Edit -- add `<BreathingOrbs className="w-40 h-40 mb-8" />` before the H1 |
| `src/components/ProcessingView.tsx` | Edit -- replace inline orbs with `<BreathingOrbs className="w-64 h-64 mb-12" />` |

No new dependencies required. All existing Tailwind animations (`animate-breathe`, `animate-breathe-slow`, `animate-breathe-alt`) are already configured.

