# IGNITE_360 - Critical Fixes Action Plan

## 🔴 CRITICAL FIX #1: Image Optimization

### Problem
All components using `<img>` instead of Next.js `<Image>` component.

### Impact
- **LCP +300-500ms** (biggest bottleneck)
- Missing WebP/AVIF formats (30-40% file size)
- CLS (Cumulative Layout Shift) issues
- No lazy loading optimization

### Files to Change
1. `components/ui/SmartImage.jsx` - Core component (affects all images)
2. All components using SmartImage
3. Direct img tags in: ProgramCard, GalleryGrid, PostCard, Lightbox, etc.

### Solution: Upgrade SmartImage.jsx

**Current Code:**
```jsx
'use client';

import { normalizeImage } from '@/lib/media';

export default function SmartImage({
  image,
  alt = '',
  className = '',
  wrapperClassName = '',
  aspectRatio,
  priority = false,
}) {
  const media = normalizeImage(image);
  const finalAlt = media.alt || alt;
  const finalAspectRatio = aspectRatio || media.aspectRatio;

  if (!media.src) {
    return (
      <div
        className={`flex items-center justify-center rounded-[inherit] bg-[var(--sand)] text-sm text-[var(--text-muted)] ${wrapperClassName}`}
        style={finalAspectRatio ? { aspectRatio: finalAspectRatio } : undefined}
      >
        Image unavailable
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-[inherit] ${wrapperClassName}`}
      style={finalAspectRatio ? { aspectRatio: finalAspectRatio } : undefined}
    >
      <img
        src={media.src}
        alt={finalAlt}
        loading={priority ? 'eager' : 'lazy'}
        className={className}
        style={{
          objectFit: media.fit,
          objectPosition: `${media.focalX}% ${media.focalY}%`,
          transform: `scale(${media.zoom || 1})`,
          transformOrigin: `${media.focalX}% ${media.focalY}%`,
        }}
      />
    </div>
  );
}
```

**Fixed Code:**
```jsx
'use client';

import Image from 'next/image';
import { normalizeImage } from '@/lib/media';

export default function SmartImage({
  image,
  alt = '',
  className = '',
  wrapperClassName = '',
  aspectRatio,
  priority = false,
  width = 800,
  height = 600,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw',
}) {
  const media = normalizeImage(image);
  const finalAlt = media.alt || alt;
  const finalAspectRatio = aspectRatio || media.aspectRatio;
  const finalWidth = width || media.width || 800;
  const finalHeight = height || media.height || 600;

  if (!media.src) {
    return (
      <div
        className={`flex items-center justify-center rounded-[inherit] bg-[var(--sand)] text-sm text-[var(--text-muted)] ${wrapperClassName}`}
        style={finalAspectRatio ? { aspectRatio: finalAspectRatio } : undefined}
      >
        Image unavailable
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-[inherit] ${wrapperClassName}`}
      style={finalAspectRatio ? { aspectRatio: finalAspectRatio } : undefined}
    >
      <Image
        src={media.src}
        alt={finalAlt}
        width={finalWidth}
        height={finalHeight}
        priority={priority}
        className={className}
        sizes={sizes}
        style={{
          objectFit: media.fit,
          objectPosition: `${media.focalX}% ${media.focalY}%`,
          transform: `scale(${media.zoom || 1})`,
          transformOrigin: `${media.focalX}% ${media.focalY}%`,
        }}
      />
    </div>
  );
}
```

**Key Changes:**
- ✅ Use Next.js `Image` component
- ✅ Add width/height props (prevents CLS)
- ✅ Add responsive sizes attribute
- ✅ Remove scale transform (use CSS instead)
- ✅ Leverage automatic optimization (AVIF, WebP)

---

## 🔴 CRITICAL FIX #2: Remove Navbar Backdrop Blur

### Problem
`backdrop-blur-xl` on fixed navbar causes constant GPU redraws.

### Impact
- **-25% performance on lower-end devices**
- Increased battery drain on mobile
- Worse LCP on slow connections

### File
`components/ui/Navbar.jsx` - Line 26

### Current Code
```jsx
<header className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(201,168,76,0.18)] bg-[rgba(13,31,60,0.94)] backdrop-blur-xl">
```

### Fixed Code (Option 1: Remove Blur)
```jsx
<header className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(201,168,76,0.18)] bg-[rgba(13,31,60,0.94)]">
```

### Fixed Code (Option 2: Lighter Blur)
```jsx
<header className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(201,168,76,0.18)] bg-[rgba(13,31,60,0.94)] backdrop-blur-sm">
```

**Recommendation:** Use Option 1 (remove entirely) - Background is already opaque, blur is unnecessary.

---

## 🔴 CRITICAL FIX #3: Optimize Reveal Component

### Problem
Reveal component animates 700ms on every intersection (scroll).

### Impact
- **+200-300ms LCP per section**
- Multiple sections = cumulative effect
- Jank on lower-end devices

### File
`components/site/Reveal.jsx`

### Current Code
```jsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition duration-700 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {children}
    </div>
  );
}
```

### Fixed Code (Option 1: Remove Animation)
```jsx
'use client';

export default function Reveal({ children, className = '' }) {
  // Simply render children without animation
  return <div className={className}>{children}</div>;
}
```

### Fixed Code (Option 2: Optimize Animation)
```jsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} will-change-[transform,opacity] ${
        visible 
          ? 'animate-reveal' 
          : 'translate-y-8 opacity-0'
      }`}
    >
      {children}
    </div>
  );
}
```

**Update tailwind.config.js:**
```javascript
module.exports = {
  theme: {
    extend: {
      animation: {
        reveal: 'reveal 0.3s ease-out forwards',
      },
      keyframes: {
        reveal: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(8px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
      },
    },
  },
};
```

**Recommendation:** Use Option 1 (remove animation) for best performance. It's a distraction and impacts core metrics.

---

## 🔴 CRITICAL FIX #4: Fix Undefined Animation Class

### Problem
`animate-fade-in-up` is used but not defined in Tailwind config.

### Impact
- CSS is parsed but animation doesn't exist
- Wasted resource processing
- Bad practice

### File
`components/apply/MultiStepForm.jsx` - Lines 142, 173, 207

### Current Code
```jsx
<div className="space-y-6 animate-fade-in-up">
```

### Solution

**Option 1: Define the animation in tailwind.config.js**
```javascript
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(16px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
      },
    },
  },
};
```

**Option 2: Remove the animation class**
```jsx
<div className="space-y-6">
```

**Recommendation:** Use Option 2 (remove) to improve performance. Multi-step forms shouldn't have animations between steps anyway.

---

## 🟠 HIGH PRIORITY FIX #5: Remove Card Hover Animations

### Problem
`transition-shadow duration-300` applied to every card causes jank.

### File
`components/ui/Card.jsx` - Line 5

### Current Code
```jsx
export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-[1.75rem] shadow-sm border border-[var(--border)] p-5 md:p-6 lg:p-7 transition-shadow duration-300 hover:shadow-md ${className}`}>
      {children}
    </div>
  );
}
```

### Fixed Code
```jsx
export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-[1.75rem] shadow-sm border border-[var(--border)] p-5 md:p-6 lg:p-7 ${className}`}>
      {children}
    </div>
  );
}
```

**Change:** Remove `transition-shadow duration-300 hover:shadow-md`

---

## 🟠 HIGH PRIORITY FIX #6: Optimize ProgramsSection Cards

### File
`components/home/ProgramsSection.jsx` - Lines 105-106

### Current Code
```jsx
// Top border animation
<div className="absolute top-0 left-0 right-0 h-1 bg-[var(--gold)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

// Color change
<h3 className="font-serif text-lg md:text-xl font-bold text-[var(--navy)] mb-3 group-hover:text-[var(--gold)] transition-colors">

// Arrow translation
<div className="text-[var(--gold)] font-semibold group-hover:translate-x-2 transition-transform">
```

### Fixed Code
```jsx
// Remove animation div
{/* <div className="..."></div> */}

// Remove color transition
<h3 className="font-serif text-lg md:text-xl font-bold text-[var(--navy)] mb-3">

// Remove arrow animation
<div className="text-[var(--gold)] font-semibold">
```

---

## 🟠 HIGH PRIORITY FIX #7: Optimize CTASection

### File
`components/home/CTASection.jsx` - Lines 7-10

### Current Code
```jsx
<div className="absolute inset-0 opacity-10">
  <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)] rounded-full filter blur-3xl"></div>
  <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--gold)] rounded-full filter blur-3xl"></div>
</div>
```

### Fixed Code (Option 1: Remove)
```jsx
{/* Background blur decorations removed for performance */}
```

### Fixed Code (Option 2: Reduce Blur)
```jsx
<div className="absolute inset-0 opacity-5">
  <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)] rounded-full filter blur-md"></div>
  <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--gold)] rounded-full filter blur-md"></div>
</div>
```

**Recommendation:** Use Option 1 (remove entirely). These are pure decoration and expensive.

---

## 📋 Implementation Checklist

```
PHASE 1 - CRITICAL (Do First, 30 mins - 1 hour)
☐ Remove backdrop-blur-xl from Navbar
☐ Remove filter blur-3xl from CTASection
☐ Remove animate-fade-in-up from MultiStepForm or define it
☐ Test Lighthouse scores after changes

PHASE 2 - HIGH PRIORITY (1-2 hours)
☐ Upgrade SmartImage.jsx to use Next.js Image
☐ Add image dimensions to all image components
☐ Remove transition-shadow from Card.jsx
☐ Remove hover animations from ProgramsSection
☐ Optimize Reveal component (remove animation)
☐ Remove hover animations from ProgramsExplorer

PHASE 3 - MEDIUM PRIORITY (2-3 hours)
☐ Optimize UpdatesFeed card animations
☐ Optimize TeamGrid card animations
☐ Optimize GalleryExperience card animations
☐ Add mobile menu animation to Navbar
☐ Fix responsive breakpoints

PHASE 4 - CLEANUP (30 mins - 1 hour)
☐ Remove unused CSS
☐ Standardize z-index values
☐ Clean up CSS specificity
☐ Run final performance test
```

---

## ✅ Success Criteria

After implementing these fixes:

- [ ] Lighthouse Score: 80+
- [ ] LCP: < 2.0s
- [ ] FCP: < 1.0s
- [ ] CLS: < 0.1
- [ ] Images loading in WebP/AVIF
- [ ] No jank on interactions
- [ ] Mobile performance improved by 30%+

---

## 🎯 Testing After Changes

Run these tests after each fix:

```bash
# Local testing
npm run dev
# Open DevTools > Performance tab
# Record 10-second session
# Check for dropped frames during scroll

# Lighthouse CI
npm run build
npx lighthouse https://localhost:3000 --view

# Web Vitals
# Install: npm install web-vitals
# Check real user metrics in browser console
```

---

**Priority Order: Image Optimization → Remove Backdrop Blur → Optimize Reveal → Fix Animation Class → Remove Card Animations**
