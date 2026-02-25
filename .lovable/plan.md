

## Centered Orbs + Shared Transition Between Upload and Processing

### Problem
1. The breathing orbs on the upload page are not visually centered with the title -- they sit as a block element above it.
2. The orbs disappear and reappear when transitioning from Upload to Processing, instead of feeling like the same continuous element.

### Solution

Use Framer Motion's `layoutId` to create a seamless shared-element transition. The orbs will appear to grow and reposition from the upload page into the processing page, creating a fluid, connected experience.

### Changes

**1. `src/components/BreathingOrbs.tsx`** -- Add `layoutId` support
- Accept an optional `layoutId` prop.
- Wrap the outer `div` in a `motion.div` with the `layoutId` so Framer Motion can animate it between mount/unmount across views.

**2. `src/components/UploadView.tsx`** -- Center orbs + add `layoutId`
- Add `mx-auto` to center the orbs horizontally within the text-center container.
- Pass `layoutId="breathing-orbs"` to the `BreathingOrbs` component.

**3. `src/components/ProcessingView.tsx`** -- Add matching `layoutId`
- Pass `layoutId="breathing-orbs"` to the `BreathingOrbs` component.
- This tells Framer Motion to treat both instances as the same element and animate the size/position transition automatically.

**4. `src/pages/Index.tsx`** -- Adjust AnimatePresence mode
- Change `AnimatePresence mode="wait"` to just `<AnimatePresence>` (no mode) so both views can be mounted simultaneously during the layout animation. This is required for `layoutId` transitions to work -- both the exiting and entering components must briefly coexist.

### How It Works

```text
Upload View                    Processing View
+-----------+                  +------------------+
|  [Orbs]   |  --- layoutId    |                  |
|  w-40     |  --- animates    |    [Orbs]        |
|  centered |  --- to --->     |    w-64          |
|  Title    |                  |    centered      |
|  Dropzone |                  |    Status text   |
+-----------+                  +------------------+
```

Framer Motion automatically interpolates size (w-40 to w-64), position, and any other style differences between the two instances sharing the same `layoutId`.

### Technical Details

| File | Change |
|------|--------|
| `src/components/BreathingOrbs.tsx` | Add optional `layoutId` prop, wrap in `motion.div` with `layoutId` |
| `src/components/UploadView.tsx` | Add `mx-auto` to center orbs, pass `layoutId="breathing-orbs"` |
| `src/components/ProcessingView.tsx` | Pass `layoutId="breathing-orbs"` |
| `src/pages/Index.tsx` | Remove `mode="wait"` from `AnimatePresence` to allow overlapping mounts for layout animation |

