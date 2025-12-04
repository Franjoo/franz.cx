# Franz.cx Portfolio & Project Landing Pages

## Project Overview

This repository contains Franz Benthin's personal portfolio website and landing pages for various projects. The site is built with React, TypeScript, Vite, and Tailwind CSS, featuring advanced animations with Framer Motion.

**Live Site**: https://franz.cx
**Deployment**: Firebase Hosting
**Status**: Main portfolio under maintenance, project pages live

---

## Architecture

### Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Routing**: React Router DOM (with lazy loading)
- **Icons**: Lucide React
- **Deployment**: Firebase Hosting

### Project Structure

```
franz.cx/
├── src/
│   ├── components/           # Shared components
│   │   └── MaintenancePage.tsx
│   ├── pages/                # Page modules (lazy-loaded)
│   │   └── flonk/           # FLONK project module
│   │       ├── FlonkProject.tsx   # Project router
│   │       ├── FlonkLanding.tsx   # Landing page
│   │       ├── Terms.tsx          # Legal pages
│   │       ├── Eula.tsx
│   │       └── Privacy.tsx
│   ├── App.tsx               # Main app with portfolio content
│   ├── main.tsx              # App entry point
│   └── index.css             # Global styles
├── public/
│   └── screenshots/          # Project screenshots
└── dist/                     # Build output (Firebase public dir)
```

---

## Key Features

### 1. Maintenance Mode with Route Bypass

The site supports a maintenance mode that can be toggled via environment variable, but allows specific routes (like project pages) to remain accessible:

- **Environment Variable**: `VITE_MAINTENANCE_MODE=true`
- **Main Site**: Shows maintenance page when enabled
- **Project Routes**: `/p/*` routes bypass maintenance mode
- **Use Case**: Launch project landing pages while main portfolio is under construction

### 2. Code Splitting & Lazy Loading

Each project is a separate module that's lazy-loaded for optimal performance:

```typescript
// In App.tsx
const FlonkProject = lazy(() => import('./pages/flonk/FlonkProject'));

// Usage with Suspense
<Suspense fallback={<LoadingScreen />}>
  <Routes>
    <Route path="/p/flonk/*" element={<FlonkProject />} />
  </Routes>
</Suspense>
```

**Benefits**:
- Main bundle doesn't include project code unless visited
- Faster initial page load
- Better lighthouse scores
- Easy to add more projects without bloating main bundle

### 3. Modular Project Structure

Each project (e.g., FLONK) is self-contained:

```
pages/flonk/
├── FlonkProject.tsx    # Entry point with routing
├── FlonkLanding.tsx    # Main landing page
├── Terms.tsx           # Legal pages
├── Eula.tsx
└── Privacy.tsx
```

To add a new project:
1. Create folder: `src/pages/[project-name]/`
2. Create `[ProjectName]Project.tsx` with routes
3. Lazy load in `App.tsx`
4. Add route: `/p/[project-name]/*`

### 4. Portfolio Site Components

The main portfolio features:

- **Preloader**: Animated loading screen with progress
- **Hero Section**: Large typography with parallax effects
- **Work Section**: Expandable project cards with abstract art
- **About Section**: Expertise showcase and tech stack
- **Dark Mode**: Interactive hover-based dark mode toggle
- **Magnetic Buttons**: Buttons that respond to mouse proximity
- **Footer**: Contact info with live clock

---

## Current Projects

### FLONK - Mobile Game Landing Page

**Route**: `/p/flonk`
**Type**: Mobile game (iOS)
**Design**: Minimalist geometric (squares, circles, triangles in black & white)

**Pages**:
- Landing page with animated geometric background
- Features section with lucide-react icons
- Screenshot gallery (4 images)
- Legal pages: Terms, EULA, Privacy Policy

**App Store Links**: Update placeholders in `FlonkLanding.tsx` (search for `https://apps.apple.com`)

**Screenshots**: Place in `/public/screenshots/` as:
- `flonk-1.png` through `flonk-4.png`
- Recommended size: 1170x2532 (iPhone 9:16 ratio)

---

## Development

### Environment Setup

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

### Environment Variables

Create `.env` file:

```bash
# Maintenance Mode
VITE_MAINTENANCE_MODE=true   # Show maintenance page for main site
```

### Routing Behavior

1. **Maintenance Mode ON + Root Path**: Shows maintenance page
2. **Maintenance Mode ON + Project Path (`/p/*`)**: Shows project page (bypass)
3. **Maintenance Mode OFF**: Shows full portfolio site

### Adding a New Project

1. **Create project module**:
```bash
mkdir -p src/pages/[project-name]
```

2. **Create `[ProjectName]Project.tsx`**:
```typescript
import { Routes, Route } from 'react-router-dom';
import Landing from './Landing';

export default function ProjectNameProject() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* Add more routes */}
    </Routes>
  );
}
```

3. **Lazy load in `App.tsx`**:
```typescript
const ProjectName = lazy(() => import('./pages/[project-name]/[ProjectName]Project'));

// In routing section:
<Route path="/p/[project-name]/*" element={<ProjectName />} />
```

---

## Deployment

### Firebase Hosting

The site is deployed via Firebase Hosting with SPA rewrites configured.

**Configuration** (`firebase.json`):
```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**Deploy**:
```bash
npm run build
firebase deploy
```

---

## Performance Optimizations

### 1. Code Splitting
- Main portfolio code separate from projects
- Each project lazy-loaded on demand
- Suspense boundaries with loading states

### 2. Asset Optimization
- SVGs replaced with lucide-react icons (tree-shakeable)
- Images should be optimized before upload
- Tailwind CSS purges unused styles

### 3. Bundle Analysis
```bash
npm run build
# Check dist/assets for bundle sizes
```

### 4. Lighthouse Targets
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

---

## Design System

### Typography
- **Headings**: Bold, tight tracking (`tracking-tighter`)
- **Body**: Relaxed leading for readability
- **Font**: System font stack for performance

### Colors
- **Portfolio**: Dynamic (black/white with dark mode)
- **FLONK**: Black and white minimalist
- **Borders**: 2px solid black for strong contrast

### Animations
- **Framer Motion**: All animations
- **Easing**: `[0.76, 0, 0.24, 1]` (custom cubic-bezier)
- **Duration**: 0.6-0.8s for most transitions

### Spacing
- **Sections**: `py-32` (large vertical spacing)
- **Components**: `gap-8` or `gap-16` for consistency
- **Max Width**: `max-w-7xl` for content containers

---

## Maintenance Page Features

Located in `src/components/MaintenancePage.tsx`

**Interactive Elements**:
- Animated grid background
- Rotating geometric cube
- Hover-based dark mode trigger
- Kinetic typography animation
- Progress bar (simulated)
- Achievement notification ("+1 for curiosity" after 3 dark mode entries)
- Live clock displaying Berlin time

---

## Legal Pages

All project landing pages should include:

1. **Privacy Policy**: Data collection and usage
2. **Terms of Service**: Usage terms and conditions
3. **EULA**: Software license agreement

Templates are provided in the FLONK project and can be adapted for new projects.

---

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari 15+, Chrome Android 90+
- **No IE11 support**: Uses modern ES6+ features

---

## Git Workflow

**Main Branch**: `main` (production-ready)

**Commit Style**:
- feat: New features
- fix: Bug fixes
- refactor: Code refactoring
- docs: Documentation updates
- style: CSS/design changes

**Example**:
```bash
git add .
git commit -m "feat: add FLONK landing page with geometric design"
git push origin main
```

---

## Contact & Support

**Developer**: Franz Benthin
**Email**: hi@franz.cx
**GitHub**: https://github.com/Franjoo
**LinkedIn**: https://www.linkedin.com/in/franz-benthin/

---

## Future Enhancements

### Planned Features
- [ ] Add more project landing pages
- [ ] Analytics integration (privacy-focused)
- [ ] Blog section
- [ ] Case studies for portfolio projects
- [ ] Contact form with email integration
- [ ] Newsletter signup
- [ ] Dark mode persistence (localStorage)

### Optimization Opportunities
- [ ] Image lazy loading with blur-up placeholders
- [ ] Service worker for offline support
- [ ] Prefetch critical project routes
- [ ] Reduce Framer Motion bundle size (tree-shaking)
- [ ] Implement font subsetting

---

## Troubleshooting

### Build Errors

**Issue**: TypeScript errors about unused imports
**Fix**: Remove unused imports or add `// eslint-disable-line` comment

**Issue**: Vite build fails
**Fix**: Clear cache: `rm -rf node_modules/.vite && npm run build`

### Routing Issues

**Issue**: 404 on project pages after deployment
**Fix**: Ensure Firebase rewrites are configured (see firebase.json)

**Issue**: Maintenance page shows on project routes
**Fix**: Check `isProjectPage` logic in App.tsx uses `startsWith('/p/')`

### Performance Issues

**Issue**: Large bundle size
**Fix**: Ensure lazy loading is working, check with `npm run build`

**Issue**: Slow animations on mobile
**Fix**: Reduce animation complexity or add `prefers-reduced-motion` check

---

## Version History

### Current (2024-12-04)
- Initial portfolio structure
- FLONK landing page
- Maintenance mode with route bypass
- Lazy loading architecture
- Lucide React icons integration

---

## License

© 2025 Franz Benthin. All rights reserved.

This repository is private and proprietary. Code may be used as reference but not copied or distributed without permission.
