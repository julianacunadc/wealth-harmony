

## Auto-Scroll to CTA After File Upload

When a user uploads files, the file list and "Analyze My Finances" button appear below the dropzone. On smaller screens, this CTA may be off-screen. We will add an auto-scroll so the button is always visible.

### Changes

**`src/components/UploadView.tsx`**

1. Add a `useRef` and `useEffect` to scroll into view when files are added:
   - Create a `ref` attached to the CTA button (or the bottom of the file list container).
   - Add a `useEffect` that watches `files.length` -- whenever it increases, call `ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' })`.
2. This gives a smooth, native scroll animation that brings the "Analyze My Finances" button into the viewport automatically after each file is added.

### Technical Detail

- Use `useRef<HTMLButtonElement>` on the "Analyze My Finances" button element.
- `useEffect` dependency: `[files.length]` -- triggers only when files are added/removed.
- `scrollIntoView({ behavior: 'smooth', block: 'nearest' })` ensures minimal scroll disruption while keeping the CTA visible.

Single file change, no new dependencies.
