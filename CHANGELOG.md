# Changelog

All notable changes to Bear UI will be documented in this file.

## [1.0.9] - 2026-02-15

### Added

#### New Components (Batch 2)
- **Masonry**: Pinterest-style masonry grid layout
  - Responsive column breakpoints (base, sm, md, lg, xl)
  - Configurable gap, auto-balancing across columns
  - Lightweight, zero-dependency

- **Watermark**: Overlay watermark text/image on content
  - Multi-line text support
  - Rotation, opacity, font customization
  - Tamper prevention via MutationObserver
  - Image watermark support

- **Marquee**: Infinite scrolling content
  - Horizontal and vertical directions
  - Pause on hover/click
  - Gradient edge fade
  - Configurable speed and gap

- **CountdownTimer**: Visual countdown with days/hours/min/sec
  - 4 variants: default, card, flip, minimal
  - 4 sizes: sm, md, lg, xl
  - Duration or target date mode
  - onComplete/onTick callbacks
  - Custom render function

- **Spotlight**: macOS-style search overlay (Cmd+K)
  - Grouped actions with icons and descriptions
  - Search highlighting
  - Arrow key navigation
  - Custom filter function
  - Theme-aware via CSS variables

- **Typewriter**: Animated typing text effect
  - Multi-text looping
  - Customizable type/delete speed
  - Cursor with blink animation
  - onComplete/onWordComplete callbacks
  - Polymorphic HTML tag

- **Dock**: macOS-style dock bar with magnification
  - Hover magnification with configurable distance
  - 4 positions: top, bottom, left, right
  - Badges, active states, tooltips
  - Glassmorphism backdrop

- **GradientText**: Text with gradient colors
  - 10 built-in presets (primary, sunset, ocean, forest, fire, purple, neon, candy, aurora, midnight)
  - Custom color arrays
  - 8 gradient directions
  - Animated gradient shift
  - Theme-aware primary preset

#### New Components (Batch 1)
- **Map**: Interactive map component with markers, zoom, and tile providers
  - OpenStreetMap, CartoDB Light/Dark, Stamen Terrain providers
  - Custom markers with labels, popups, icons, and colors
  - Drag, scroll zoom, double-click zoom
  - Controlled and uncontrolled viewport
  - Full theme support (light/dark)

- **CodeEditor**: Syntax-highlighted code editor with line numbers
  - 14 languages (TypeScript, JavaScript, Python, HTML, CSS, JSON, SQL, Shell...)
  - Dark and light themes (Catppuccin-inspired)
  - Auto-indent, auto-close brackets, tab handling
  - Read-only mode, word wrap, custom fonts
  - Zero dependencies

- **Cropper**: Image cropping component
  - Aspect ratio presets (free, 1:1, 4:3, 16:9, etc.)
  - Rectangle and circle crop shapes
  - Zoom and rotation sliders
  - Rule-of-thirds grid overlay
  - Drag handles for precise cropping
  - Outputs cropped image as data URL

- **Transition**: Declarative enter/leave transition wrapper
  - 11 built-in presets (fade, slide-up/down/left/right, scale, rotate, flip, collapse)
  - Custom enter/leave styles
  - Unmount on hide option
  - Enter/leave lifecycle callbacks

- **Motion**: Framer Motion-inspired animation component
  - initial, animate, exit states
  - whileHover, whileTap interactions
  - Custom transition duration, delay, easing
  - In-view trigger support

#### Enhanced Components
- **Carousel**: Major enhancements
  - New transitions: `fade`, `zoom`, `flip` (in addition to `slide`)
  - New indicator styles: `thumbnails`, `numbers`, `bars`, `dots`
  - Progress bar for auto-play
  - Slide counter display
  - Keyboard navigation (arrow keys)
  - Mouse drag to navigate
  - Custom active color
  - Transition duration control

#### New Hooks
- **useAnimate**: Programmatic Web Animations API hook
  - 25+ built-in presets (fadeIn, bounceIn, shake, rubberBand, tada, wobble, jello...)
  - Play, pause, cancel, reverse controls
  - Custom keyframe support
  - isPlaying / isFinished state

- **useResponsive**: Resolves responsive prop values based on viewport
  - `useResponsive({ base: 1, md: 2, lg: 4 })` returns correct value
  - `useResponsiveProps` for resolving multiple props at once

#### New Utilities
- **createSlots**: Composable slot-based component pattern
  - Named sub-components (like Radix UI)
  - Required/multiple slot configuration
  - Context-based slot distribution

### Changed
- Carousel now supports `transition`, `indicator`, `thumbnails`, `keyboard`, `draggable`, `showProgress`, `showCounter`, `activeColor` props
- Updated portal documentation with new component pages

---

## [1.0.8] - 2026-02-09

### Added

#### New Components
- **JsonViewer**: Pretty-print and explore JSON data
  - Expandable/collapsible nodes with depth control
  - Data type indicators and syntax highlighting
  - Copy button and value click callbacks
  - Theme-aware light/dark mode support

- **DiffViewer**: Compare and visualize text/code differences
  - Split and unified view modes
  - Line numbers and diff statistics
  - Addition/deletion highlighting
  - Theme-aware colors

- **Chat**: Full-featured chat interface
  - Message bubbles with avatars and timestamps
  - Typing indicator animation
  - Message status (sending, sent, delivered, read)
  - User/bot/system message types
  - Loading states and disabled input

- **FloatingChat**: Chat widget bubble
  - Floating action button with badge count
  - Animated open/close transitions
  - Customizable position (bottom-left/right)
  - Welcome message and powered-by footer
  - Controlled and uncontrolled modes

- **Terminal**: Console/terminal emulator
  - Multi-theme support (dark, light, matrix)
  - Command history with up/down navigation
  - Customizable prompt (user@host:path$)
  - Line types: input, output, error, success, warning, info, system
  - Loading indicator and read-only mode

#### New Hooks
- **useOnline**: Detect online/offline network status
- **useIdle**: Detect user inactivity with configurable timeout
- **useLongPress**: Long press gesture detection
- **useWebSocket**: WebSocket connection with auto-reconnect
- **usePageVisibility**: Detect tab visibility changes

### Documentation

- Added documentation pages for all new v1.0.9 components (JsonViewer, DiffViewer, Chat, FloatingChat, Terminal)
- Added documentation pages for all new v1.0.9 hooks (useOnline, useIdle, useLongPress, useWebSocket, usePageVisibility)
- Updated sidebar navigation with new "Developer" and "Chat" component groups

## [1.0.8] - 2026-02-09

### Added

- **Portal Documentation Improvements**: Better light/dark mode table styling for all component pages
  - Props tables now have proper light mode text colors
  - Added theme-aware background colors for table headers and body
  - Prop names highlighted in pink for better visibility

- **BackTop Component**: Scroll to top button with customizable visibility threshold
  - Built on Bear's `Button` component for consistent styling and theming
  - All Button variants supported (primary, secondary, ghost, etc.)
  - Includes spotlight hover effect from Button
  - Configurable size, position, and animation
  - Custom content support

- **Confetti Component**: Celebration confetti effect 🎉
  - `useConfetti` hook for programmatic control
  - Customizable colors, count, origin, spread, and velocity
  - Auto-hide with duration and onComplete callback

- **Tour Component**: Feature tour/onboarding walkthrough
  - Step-by-step guided tours with spotlight effect
  - Flexible placement options (12 positions)
  - `useTour` hook for programmatic control
  - Customizable buttons, indicators, and callbacks

- **QRCode Component**: QR code generator
  - Multiple error correction levels (L, M, Q, H)
  - Custom colors and transparent backgrounds
  - Center logo/image support
  - SVG-based for crisp rendering at any size

- **Custom Typography Variants**: Create your own typography like "b250", "display1"!
  - Define in BearProvider: `customTypography={{ b250: { fontSize: '25px', fontWeight: 'bold' } }}`
  - Use anywhere: `<Typography variant="b250">Custom text</Typography>`
  - Runtime support: `addTypography('promo', { fontSize: '28px' })`
  - Query functions: `hasTypography('b250')`, `getTypography('b250')`

- **Simple Color Theming**: Pass a color string instead of a full color scale!
  - `theme={{ colors: { primary: '#3b82f6' } }}` - auto-generates full 50-950 scale
  - `theme={{ colors: { primary: 'blue' } }}` - named colors work too!
  - Supported named colors: red, blue, green, yellow, orange, purple, pink, cyan, teal, indigo, violet, rose, amber, lime, emerald, sky, slate, gray, zinc, neutral, stone

- **Custom Variants System**: Create your own button variants!
  - Define custom variants in BearProvider: `customVariants={{ redBrand: { bg: '#dc2626', bgHover: '#b91c1c', text: '#fff' } }}`
  - Use anywhere: `<Button variant="redBrand">Click me</Button>`
  - Add variants at runtime: `addVariant('myBrand', { bg: '#...', text: '#fff' })`
  - Check if variant exists: `hasVariant('myBrand')`
  - Get variant config: `getVariant('myBrand')`

- **useBearVariants Hook**: Work with custom variants programmatically
  - `const { customVariants, hasVariant, getVariant, addVariant } = useBearVariants()`

- **BearContext Export**: Context now exported for advanced use cases

### Changed

- **Button**: Now supports custom variants alongside built-in variants
  - Variant prop accepts any string (with TypeScript autocomplete for built-in)
  - Custom variants get automatic hover states via CSS brightness filter
  - Custom variant CSS variables: `--bear-{variantName}-bg`, `--bear-{variantName}-text`, etc.

- **Type Naming**: Renamed `EmberSize` → `BearSize`, `EmberVariant` → `BearVariant`
  - Old names still exported as deprecated aliases for backward compatibility

- **Default Primary Color**: Changed from amber (#f97316) to Bear's signature pink (#ec4899)

### Fixed

- TypeScript build errors in Grid, Flex, useBearComponent, and BearProvider
- Deep merge type safety improvements
- **Alert Component**: Now uses CSS variables for theme-aware colors (`--bear-success-*`, `--bear-danger-*`, etc.)
- **BottomSheet Component**: Now properly supports light/dark themes
- **Drawer Component**: Now properly supports light/dark themes
- **BackTop Component**: Theme-aware colors using CSS variables

### Documentation

- **Enhanced Theming Page**: Complete guide with simple color strings, custom variants, and useBear hook
- **Updated Component Pages**: All pages now use real Bear components instead of mock HTML
  - Accordion, AppBar, Avatar, Card, Checkbox, Modal, Switch updated with correct component APIs
  - Live examples now actually render Bear components

- **useBearComponent / useBC Hook**: New hook for global component customization
  - Register style overrides for any component: `useBearComponent('Button', { root: { borderRadius: '9999px' } })`
  - Shorthand alias: `useBC('Button')`
  - Includes `BearComponentProvider` for app-wide component styling
  - Full TypeScript support with component-specific types

- **useSpotlight Hook**: Mouse-follow spotlight effect for interactive elements
  - Radial gradient that follows cursor position
  - Configurable size, color, and enabled state
  - Smooth opacity transitions

- **Button Spotlight Effect**: New `spotlight` prop for mouse-follow hover effect
  - Enable with `<Button spotlight>`
  - Customize with `spotlightColor` and `spotlightSize` props
  - Creates premium, interactive button experiences

- **Button Variant Configuration**: New `variants` prop on BearProvider
  - Configure colors per variant: `variants={{ Button: { primary: { bg: '#ec4899', bgHover: '#db2777' } } }}`
  - Supports bg, bgHover, bgActive, bgDisabled, text, textDisabled, border, borderHover, ring

### Changed

- **BearProvider**: Enhanced theming with global component overrides
  - New `components` prop for global component style overrides
  - New `variants` prop for variant color configurations
  - Deep merge for theme overrides (properly merges nested color scales)
  - All color scales now set as CSS variables (primary, secondary, success, warning, danger, info, neutral with all shades 50-950)
  - Typography, shadows, spacing, and border radius as CSS variables
  - Added `registerComponent()` and `registerVariant()` methods to context

- **Button**: Now uses CSS variables for full color customization
  - Colors driven by `--bear-primary-500`, `--bear-btn-primary-bg`, etc.
  - Text content now uses Typography component for consistency
  - Component overrides applied from BearProvider context

- **Portal Banner**: Updated to promote ForgeStack CLI launch

### New CSS Variables

```css
/* Color scales (50-950 for each) */
--bear-primary-{50-950}
--bear-secondary-{50-950}
--bear-success-{50-950}
--bear-warning-{50-950}
--bear-danger-{50-950}
--bear-info-{50-950}
--bear-neutral-{50-950}

/* Button variant colors (optional overrides) */
--bear-btn-{variant}-bg
--bear-btn-{variant}-bg-hover
--bear-btn-{variant}-bg-active
--bear-btn-{variant}-text
--bear-btn-{variant}-border
--bear-btn-{variant}-ring
```

---

## [1.0.7] - 2026-02-01

### Added

- **RichEditor**: Mobile toolbar with responsive positioning
- **SignPad**: Fixed touch scroll on mobile devices
- **Kanban**: New drag-and-drop kanban board component
- **EmojiPicker**: New emoji selection component
- **VirtualList**: Virtualized list for large datasets
- **useDragDrop**: New hook for custom drag-and-drop interactions
- **Button**: Icon shorthand prop (`icon` + `iconPosition`)

### Fixed

- **ColorPicker**: Touch interaction improvements
- **SignPad**: Prevented page scroll while signing on mobile

---

## [1.0.6] - 2026-01-29

### Changed

- **DateTimePicker**: Removed. Use DatePicker + TimePicker instead.
- **DatePicker**: Calendar now renders in portal with high z-index (9999) above all elements; click-outside includes calendar area.
- **TimePicker**: New dropdown variants – `dropdownVariant: 'columns' | 'dial' | 'auto'`; `dropdownVariantBreakpoint` for responsive layout (dial on wide screens, columns on narrow). Columns = scrollable hours/minutes/AM-PM; dial = clock face. CANCEL/OK buttons.
- **Drawer**: Open/close slide animation (300ms); backdrop fades in/out.
- **SignPad**: Responsive – max-w-full, overflow-hidden on canvas wrapper.
- **Calendar**: Added `CALENDAR_DROPDOWN_Z_INDEX` constant (9999) for dropdown layering.

### Portal

- **Topbar**: Removed Admin link; added Templates (Coming soon, disabled).
- **Roadmap**: New page with phases, status, and diagram.
- **Templates**: New page (Coming soon, disabled).
- **Navigation**: Removed DateTimePicker from nav; added Roadmap and Templates.

---

## [1.0.5] - 2026-01-29

### Changed

- **BearProvider**: Single source of truth for theme
  - Adds/removes Tailwind `dark` class on `document.documentElement` when `mode` changes
  - All `dark:` variants (inputs, forms, sidebar, etc.) now respond to `useBear().toggleMode()` and `setMode()`
  - No separate theme hooks or sync components needed; wrap app with `BearProvider` and use `useBear()` or `useBearMode()`

- **Button**: Dark/light support and border overrides
  - Outline variant: full dark mode support (`dark:bear-text-bear-400`, `dark:bear-border-bear-400`, disabled states)
  - All variants tested for light and dark; ghost and outline are theme-aware
  - Borders can be overridden from outside via `className` (e.g. `className="border-2 border-blue-500 dark:border-blue-400"`)

### Portal

- Wrapped app with `BearProvider`; Topbar uses `useBear().mode` and `toggleMode` for theme toggle
- Theme toggle now drives all components via BearProvider’s `dark` class

### CMS Admin

- Removed custom ThemeInit/useTheme; theme driven solely by BearProvider
- Admin layout theme toggle uses `useBearMode()`; redirect `/` → `/admin/` in dev so app loads at correct URL

---

## [1.0.4] - 2026-01-28

### Changed

- **RichEditor**: Fixed light mode support
  - Code blocks (`pre`) now have proper light mode styling (gray background, dark text)
  - Added border for better visibility in light mode
  - Dark mode styles properly applied via `.dark` class

- **TimePicker**: Complete light/dark mode refactor
  - All CSS classes moved to constants with BEM naming (`Bear-TimePicker__*`)
  - Dropdown, options, buttons all support light mode
  - Proper text colors for both themes

- **CodeBlock**: Major refactor with light/dark mode
  - Added `theme: 'auto' | 'light' | 'dark'` prop (default: 'auto')
  - Auto theme follows system preference
  - Uses Typography component for title
  - BEM class naming (`Bear-CodeBlock`, `Bear-CodeBlock__header`, etc.)
  - Added `bear-` prefix to all utility classes
  - Added `testId` and `id` props for accessibility

- **SignPad**: Fixed light/dark mode support

- **Editable**: Complete dark mode fix
  - All classes now use `bear-` prefix
  - Preview, Input, Control all support light/dark mode
  - BEM naming (`Bear-Editable__preview`, `Bear-Editable__input`, etc.)

- **Icon Library**: Added new feature icons
  - `PaletteIcon` - Design/color picker concept
  - `WrenchIcon` - Customization/tools
  - `AccessibilityIcon` - A11y features
  - `TypeScriptIcon` - TypeScript logo
  - `SparklesIcon` - New features/magic
  - `RocketIcon` - Launch/fast performance

- **Sidebar**: Collapsible navigation sections
  - Each section can be expanded/collapsed
  - State persisted in localStorage
  - Pink item count badges
  - ChevronRight icon with rotation animation

- **Topbar**: Complete redesign
  - Glassmorphism effect with backdrop blur
  - Integrated search bar with keyboard shortcut display (⌘K)
  - Tooltips on all action buttons
  - Better icon styling and hover states
  - Gradient banner with improved styling

- **RichEditor**: Complete light/dark mode fix + More options button
  - Changed from `bear-` prefixed classes to standard Tailwind classes
  - White background with subtle border in light mode
  - Gray-50 toolbar background in light mode
  - Proper text contrast in both themes
  - Fixed dropdown and color picker styling
  - Added `ToolbarMore` component with "+" button for overflow options
  - New `RICH_EDITOR_COMPACT_TOOLBAR` preset with more button
  - Support for `'more'` toolbar option

- **Editable**: Fixed light mode visibility
  - Added border on hover for better visibility
  - Improved text contrast

- **Icon Library**: Added `GridIcon`

### New Hooks

- **useClipboard**: Copy text to clipboard with status tracking
- **useDebounce** / **useDebouncedCallback**: Debounce values and callbacks
- **useThrottle** / **useThrottledCallback**: Throttle values and callbacks
- **useLocalStorage**: Persist state in localStorage with tab sync
- **useKeyPress**: Detect keyboard shortcuts with modifier support
- **useIntersectionObserver** / **useInView**: Viewport detection

### New Components

- **Skeleton**: Loading placeholder with pulse/wave animations
  - Variants: text, circular, rectangular, rounded
  - Sub-components: SkeletonText, SkeletonAvatar, SkeletonCard

- **Rating**: Star rating component
  - Half-star support
  - Custom icons
  - Hover preview
  - Value labels

- **Stepper**: Multi-step wizard
  - Horizontal/vertical orientation
  - Step status: pending, active, completed, error
  - StepperControls for navigation

- **Timeline**: Event timeline
  - Left/right/alternate positioning
  - Custom icons and colors
  - Pending/loading state

- **SpeedDial**: Floating action button with expandable actions
  - Directional expansion: up, down, left, right
  - Fixed positioning options
  - Hover or click activation

### Portal Updates

- Redesigned topbar with cleaner icons and text-based navigation
- Added documentation pages for all new hooks
- Hooks section added to Introduction page
- Updated Hooks index page with categorized hook listing

- **Switch**: Added icon support
  - New `uncheckedIcon` and `checkedIcon` props (ReactNode)
  - New `showIconsInThumb` prop to show icons inside thumb
  - Light/dark mode support for labels
  - BEM class naming (`Bear-Switch__*`)

### Portal

- **Icons Page**: Complete rewrite
  - Uses actual Bear icons from `@forgedevstack/bear`
  - Dynamic loading of icon categories from BearIcons namespace
  - Click to copy import statement
  - Uses Bear `Input` and `Typography` components

- **Introduction Page**: Major redesign
  - Replaced emoji icons with Bear SVG icons (mobile-friendly)
  - Added comparison table using `@forgedevstack/grid-table`
  - Added "MCP Integration - Soon" tag
  - Responsive feature cards (2 columns on mobile)

- **DataTable Page**: Added grid-table reference
  - Info card linking to `@forgedevstack/grid-table`
  - Links to npm and GitHub
  - Light mode: White background with dark stroke
  - Dark mode: Dark background with light stroke
  - Auto-detects theme changes via MutationObserver

- **CodeBlock (Portal)**: Improved copy button UX
  - Copy button switches to check icon when copied
  - Title/language shown in header with theme support
  - Proper dark mode styling

- **LinesOfCode (Portal)**: Added to all component documentation pages
  - Displays colored cube indicator based on component size
  - Green (<100 lines), Yellow (<200), Orange (<500), Red (>500)
  - Added to: ActiveBar, Box, Calendar, Chart, CodeBlock, Columns, Editable, Em, Gauge, Highlight, HoverCard, Mark, RichEditor, Sidebar, SignPad, Sparkline

### Previously Changed
- **Component Structure**: Restructured components with proper folder organization
  - Sidebar: Split into `Sidebar.tsx`, `Sidebar.const.ts`, `Sidebar.types.ts`, and `components/` subfolder with `SidebarItem` and `SidebarGroup`
  - Accordion: Added `Accordion.const.ts` with style constants
  - Modal: Added `Modal.const.ts` with size and style constants
  - Card: Added `Card.const.ts` with padding, radius, and variant constants
  - RichEditor: Complete restructure with proper folder organization
    - Added `components/` subfolder with `ToolbarButton`, `ToolbarDropdown`
    - Added `helpers/` folder with `formatHelpers.ts` for all format operations
    - Using Bear's icon library (`Icon/icons/editor.tsx`) - added `TextIcon` for heading dropdown
    - Using Bear's `ColorPicker` component for text and highlight colors
    - Added `RichEditor.kiln.tsx` for Kiln documentation
    - Added heading dropdown (H1-H6 + paragraph) with styled previews
    - Added text color and highlight color pickers using Bear's ColorPicker
    - Added text alignment options (left, center, right, justify)
    - Added indent/outdent controls
    - Added clear formatting button
    - Added image upload button and paste support (`allowImagePaste` prop)
    - Fixed H1-H6, lists (bullet/ordered), blockquote, code, and link functionality
    - Added proper content styles with dark mode support
    - BEM class naming throughout (`Bear-RichEditor`, `Bear-RichEditor__toolbar`, etc.)
    - Added `ToolbarColorPicker` component with small circle button, popup palette (above content with z-index), recent colors, and apply last button
    - Fixed light mode styling matching FileUpload component (dashed border, proper colors)
    - Added to Popular Components on Introduction page
- **RichEditor Documentation**: Enhanced with comprehensive examples
  - Text formatting only toolbar example
  - Headings & lists configuration
  - Code & quotes configuration
  - HTML output preview
  - Form integration example
  - Read-only and disabled states
  - No toolbar (keyboard shortcuts only) example
  - Keyboard shortcuts section
  - Example toolbar configurations
- **Dark Mode**: Fixed dark mode support across all components
  - Updated Sidebar variant styles with proper `dark:` prefixes for `zinc-900` backgrounds
  - Fixed Sidebar item hover states for dark mode
  - Updated Modal with proper dark mode colors
  - Updated Card with dark mode border colors
- **All Components**: Added BEM-like class naming convention with `Bear-` prefix for consistent styling hooks
  - `Bear-Alert`, `Bear-Alert__icon`, `Bear-Alert__title`, `Bear-Alert__message`, `Bear-Alert__close`
  - `Bear-Button`, `Bear-Button__content`, `Bear-Button__icon`, `Bear-Button__text`, `Bear-Button__spinner`
  - `Bear-Card`, `Bear-Card__header`, `Bear-Card__title`, `Bear-Card__subtitle`, `Bear-Card__body`, `Bear-Card__footer`
  - `Bear-Input`, `Bear-Input__label`, `Bear-Input__field`, `Bear-Input__addon`, `Bear-Input__helper`
  - `Bear-Badge`, `Bear-Badge__dot`, `Bear-Badge__content`
  - `Bear-Modal`, `Bear-Modal__backdrop`, `Bear-Modal__container`, `Bear-Modal__header`, `Bear-Modal__title`, `Bear-Modal__body`, `Bear-Modal__footer`
  - `Bear-Typography`, `Bear-Typography--h1`, `Bear-Typography--body1`, etc.
  - `Bear-Avatar`, `Bear-Avatar__image`, `Bear-Avatar__initials`, `Bear-Avatar__status`
  - `Bear-AvatarGroup`, `Bear-AvatarGroup__item`, `Bear-AvatarGroup__overflow`
  - `Bear-Tabs`, `Bear-Tabs__list`, `Bear-Tabs__tab`, `Bear-Tabs__panel`
  - `Bear-Spinner`, `Bear-Spinner__track`, `Bear-Spinner__arc`
  - `Bear-Sidebar`, `Bear-Sidebar__header`, `Bear-Sidebar__nav`, `Bear-Sidebar__item`, `Bear-Sidebar__footer`
  - `Bear-Tooltip`, `Bear-Tooltip__trigger`, `Bear-Tooltip__content`
- **KilnLink**: Updated to use dynamic base URL based on current environment (protocol://hostname:6006)
- **KilnLink**: Added sandbox option with `showSandbox` prop for CodeSandbox integration

### Fixed
- **Kiln**: Added story format normalization to handle both object and array story formats
- **Kiln**: Updated CLI to support custom vite aliases from `kiln.config.json`
- **Kiln**: Fixed select warning by adding proper null coalescing for undefined values
- **BearCodeBlock**: Added BEM-like class naming (Bear-CodeBlock, Bear-CodeBlock-title, etc.) for consistent styling hooks
- **Package.json**: Fixed exports order - types now come before import/require to eliminate warnings
- **Hook Docs**: Updated all hook documentation pages (useBounce, useFloat, useParallax, usePulse, useShake, useSlide) to use `BearCodeBlock` component for proper dark mode support
- **BearCodeBlock**: Updated to use Bear components (Button, Typography) for proper theming
- **BearCodeBlock**: Added configurable labels prop for i18n support (copy/copied text)
- **BearCodeBlock**: Fixed dark/light mode text colors
- **Toast.kiln.tsx**: Fixed to use correct ToastProvider + useToast API
- **Icon**: Added missing exports (HomeIcon, InfoIcon, UsersIcon, UserIcon, UserPlusIcon, etc.)

### Added

#### Charts & Graphs (New Category)
- **Chart** - Flexible charting component supporting bar, line, area, pie, and donut charts
- **BarChart** - Standalone bar chart component with vertical/horizontal orientation
- **LineChart** - Line chart with smooth curves, fill area, and dot indicators
- **PieChart** - Pie and donut chart with customizable inner radius
- **Sparkline** - Compact inline chart for displaying data trends
- **Gauge** - Circular gauge component for displaying progress or metrics

#### Effects & Animation (New Category)
- **useSlide** - Hook for slide-in animations with customizable direction and distance
- **useParallax** - Hook for creating parallax scrolling effects
- **useBounce** - Hook for bouncy animations with customizable height
- **useFloat** - Hook for smooth floating animations in different directions
- **usePulse** - Hook for pulsing scale animations
- **useShake** - Hook for shake animations, perfect for error feedback

#### CSS Animations
- Added keyframes for bounce, float (vertical/horizontal/diagonal), pulse-scale, shake
- Added grow-up/grow-right animations for chart bars
- Added draw-line animation for SVG line charts
- Added fade-in and scale-in animations

### Changed
- Updated portal navigation to include new Charts & Graphs category
- Updated portal navigation to include new Effects & Animation category
- Added documentation pages for all new components and hooks
- Refactored Sparkline: moved utility functions to `Sparkline.utils.ts` and constants to `Sparkline.const.ts`
- Refactored Calendar: moved helper functions to `Calendar.helpers.tsx`
- Added Chart utilities: `Chart.const.ts` and `Chart.utils.ts`
- Sidebar now closes on mobile when selecting an item
- Updated props destructuring pattern to use `props` object

### Fixed
- Fixed forgestack portal sidebar to include MCP (coming soon)

### Code Quality
- All components now use `@utils`, `@hooks`, `@context` path aliases instead of relative paths
- Types still use relative imports due to `@types` being a reserved namespace in TypeScript
- Updated Breadcrumbs and Alert components with:
  - New props pattern: `(props) => { const {...} = props; }`
  - Constants moved to `name.const.ts` files
  - Added accessibility props: `testId`, `id`, `aria-*`
  - Added proper semantic HTML (`<ol>`, `<li>`) and ARIA attributes

### Portal Updates
- Renamed portal components with `Bear-` prefix (e.g., `BearCodeBlock`)
- Fixed dark mode support in code blocks
- Updated UseShake documentation to use BearCodeBlock component
- Refactored props pattern: components now use `(props) => { const { ... } = props; }` destructuring
- Created `Avatar.const.ts` with `AVATAR_SIZE`, `AVATAR_VARIANT`, `AVATAR_STATUS` constants
- Renamed Button constants to `BUTTON_SIZE`, `BUTTON_VARIANT` following naming convention

## [1.0.3] - 2026-01-26

### Added
- **RichEditor** - WYSIWYG editor with TipTap integration
- **Editable** - Inline editable component with preview/edit modes
- **HoverCard** - Card that appears on hover
- **ActiveBar** - Navigation bar with active state indicators
- **SignPad** - Digital signature capture component with touch/mouse support, customizable stroke, save/clear buttons
  - Portal documentation page added
  - Constants moved to `SignPad.const.ts`
  - Added to Popular Components on Introduction page
  - Auto-detects dark/light mode for stroke color
- **LinesOfCode** - Portal component showing lines of code with VSCode-style colored cubes
- **Box** - Flexible container component
- **Em** - Emphasis text component
- **Highlight** - Text highlighting component
- **Mark** - Text marking component
- **CodeBlock** - Syntax highlighted code block
- **StatCard** - Statistics card component
- **ActivityItem** - Activity feed item component
- **EmberLogo** - Logo component for Ember CMS

### Fixed
- Dark mode support for Calendar, Columns, DateTimePicker, Sidebar, Slider, Fab, Switch, Toast
- Fixed ref forwarding in Input component

## [1.0.2] - 2026-01-25

### Added
- Initial release of Bear UI component library
- 70+ components across Layout, Inputs, Data Display, Feedback, and Navigation categories
- Full TypeScript support
- Dark mode support
- Tailwind CSS integration
- Kiln storybook integration

