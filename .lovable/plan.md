

## Fix Auto-Scroll Timing After File Upload

### Problem
The auto-scroll triggers immediately when files are added, but the "Analyze My Finances" button is inside a Framer Motion container animating from `height: 0`. The scroll fires before the button is visible, so it doesn't actually scroll to it.

### Solution

Add a small delay (300ms) before calling `scrollIntoView`, giving the Framer Motion animation time to expand the container and render the button.

### Changes

**`src/components/UploadView.tsx`**

Update the `useEffect` to use a `setTimeout` with a 300ms delay:

```ts
useEffect(() => {
  if (files.length > 0 && ctaRef.current) {
    const timer = setTimeout(() => {
      ctaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
    return () => clearTimeout(timer);
  }
}, [files.length]);
```

Single line change, no new dependencies.

