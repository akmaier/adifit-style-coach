# Adifit Style Coach - Design Guidelines

## Design Approach
**Reference-Based: Adidas Brand Identity**
Drawing inspiration from Adidas's iconic athletic aesthetic - bold, performance-driven, and premium. The design embodies athletic excellence with a sophisticated, modern edge.

## Core Design Principles
1. **Athletic Premium**: Blend sports performance with luxury retail
2. **Bold Simplicity**: Clean layouts with impactful focal points
3. **Energy & Motion**: Subtle animations suggesting movement and dynamism

## Color Palette

### Primary Colors
- **Deep Black**: 0 0% 8% (primary background, text)
- **Pure White**: 0 0% 100% (cards, contrast elements)
- **Adidas Blue**: 210 100% 50% (primary accent, CTAs)

### Supporting Colors
- **Charcoal Gray**: 0 0% 20% (secondary backgrounds)
- **Light Gray**: 0 0% 95% (subtle backgrounds, borders)
- **Electric Blue**: 210 100% 60% (hover states, highlights)
- **Success Green**: 142 76% 36% (completed workouts)
- **Alert Red**: 0 84% 60% (important indicators)

### Gradients
- **Hero Gradient**: Linear from 0 0% 8% to 210 100% 15%
- **Card Accent**: Subtle radial from 210 100% 50% at 0.1 opacity
- **Hover Glow**: 210 100% 50% with 20% opacity blur

## Typography

### Font Families
- **Primary**: 'Poppins' (headings, UI elements) - weights 400, 600, 700, 800
- **Secondary**: 'Inter' (body text, descriptions) - weights 400, 500, 600

### Type Scale
- **Hero Title**: 3.5rem / 600 / -0.02em tracking
- **Section Headers**: 2.25rem / 700 / -0.01em tracking
- **Card Titles**: 1.25rem / 600 / tight leading
- **Body Text**: 1rem / 400 / relaxed leading
- **Captions**: 0.875rem / 500 / normal leading
- **Buttons**: 0.95rem / 600 / 0.025em tracking (uppercase)

## Layout System

### Spacing Primitives
Core spacing units: **2, 4, 6, 8, 12, 16, 20, 24**
- Tight spacing: p-2, gap-4
- Standard spacing: p-6, gap-8, my-12
- Section spacing: py-16, py-20, py-24

### Container Widths
- **Max Content**: max-w-7xl (1280px)
- **Forms**: max-w-2xl (672px)
- **Cards Grid**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

### Grid Patterns
- **Outfit Cards**: 3-column grid on desktop (gap-6)
- **Suggested Looks**: 3-column equal-width (gap-8)
- **Try-On Results**: 3-column side-by-side comparison

## Component Library

### Navigation
- **Height**: 72px fixed
- **Background**: Black with subtle shadow
- **Logo**: 48px height, white/blue colorway
- **Links**: White text, blue underline on hover
- **Greeting**: Right-aligned, subtle blue accent

### Buttons
**Primary (CTAs)**
- Background: Adidas Blue
- Padding: px-8 py-3
- Border-radius: rounded-lg
- Font: 600 weight, uppercase, 0.025em tracking
- Hover: Scale 1.02, brightness 110%, shadow-lg
- Transition: all 200ms ease

**Secondary (Outline)**
- Border: 2px Adidas Blue
- Background: Transparent (blurred when over images)
- Hover: Fill with blue, white text

**Icon Buttons**
- Size: 44x44px minimum
- Rounded-full
- Hover: bg-white/10

### Cards
**Product Cards**
- Background: White
- Border-radius: rounded-xl
- Shadow: shadow-md, hover shadow-xl
- Padding: p-6
- Image: aspect-square, object-cover, rounded-t-xl
- Hover: Transform translateY(-4px), transition 300ms

**Look Cards**
- Larger padding: p-8
- Border: 2px transparent, hover 2px blue
- Background gradient overlay on image
- Price badge: absolute top-4 right-4

### Forms
**Input Fields**
- Background: White
- Border: 2px light gray, focus 2px blue
- Border-radius: rounded-lg
- Padding: px-4 py-3
- Font: 1rem Inter
- Focus ring: ring-4 ring-blue/20

**Photo Upload**
- Dashed border area: border-2 dashed gray
- Hover: border-blue, bg-blue/5
- Icon: Upload icon 48px, blue
- Drag-active state: bg-blue/10

### Calendar View
**FullCalendar Customization**
- Event background: Adidas Blue
- Today highlight: Blue border-l-4
- Header: Black background, white text
- Grid lines: Light gray
- Event hover: Brightness 110%
- "Mark Done" button: Green checkmark icon

### Training Plan Views
**Quick View**
- Compact cards: h-24, flex items
- Color-coded by workout type
- Time badge: Floating right, rounded-full, blue bg

**Detailed View**
- Full-width table
- Zebra striping: odd rows white, even rows gray/5
- Header: Black background, white text, sticky top

### Virtual Try-On Display
- 3-column grid (gap-8)
- Equal height containers
- Before/after slider (optional enhancement)
- Image: rounded-2xl, shadow-2xl
- Loading state: Skeleton with pulse animation

## Image Strategy

### Hero Section
**Large Hero Image**: Yes - Dynamic lifestyle shot
- Full-width container
- Height: min-h-screen on desktop, min-h-[60vh] mobile
- Image: Athletic model in Adidas gear, urban/gym setting
- Overlay: Gradient from black/80 to transparent
- Content: Centered, white text, max-w-3xl
- CTA: Large primary button with outline secondary

### Product Images
- Outfit recommendations: White/light gray backgrounds
- Aspect ratio: 1:1 for consistency
- High resolution: 800x800px minimum
- Clean product shots, no models

### Try-On Display
- User uploaded photo: Natural lighting preferred
- AI-generated composites: Full-body shots
- Comparison layout: Side-by-side equal sizing

### Supporting Images
- Background patterns: Subtle Adidas three-stripe motifs at 5% opacity
- Icons: Use Heroicons (outline style for light contexts, solid for emphasis)
- Badges/Logos: Adidas logo in footer, subtle placement

## Animations

### Micro-interactions
- Button hover: Scale 1.02, 200ms ease
- Card hover: translateY(-4px), shadow increase, 300ms ease
- Image zoom: Scale 1.05 on hover, 400ms ease
- Loading states: Pulse animation on skeletons

### Page Transitions
- Minimal usage: Fade-in on mount (300ms)
- Scroll reveals: None (maintain performance)

### Calendar Interactions
- Drag-and-drop: Smooth position transitions
- Event click: Subtle scale 1.05

## Accessibility
- Focus states: 4px blue ring with 20% opacity
- Contrast ratios: WCAG AAA for all text
- Touch targets: Minimum 44x44px
- Keyboard navigation: Full support with visible focus
- Alt text: Descriptive for all images

## Responsive Breakpoints
- Mobile: < 768px (single column, stacked)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (full 3-column layouts)

## Dark Mode (Primary Theme)
Entire app uses dark theme by default:
- Backgrounds: Black to charcoal gradients
- Text: White to light gray
- Form inputs: Dark backgrounds with light borders
- Cards: White cards for contrast pop