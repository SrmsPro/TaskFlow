# TaskFlow Design Guidelines

## Design Approach: Modern Productivity System

**Selected Approach:** Design System inspired by Linear, Notion, and Asana - combining Linear's sophisticated typography and spatial hierarchy with Notion's flexibility and Asana's information density handling.

**Key Design Principles:**
- Clarity through hierarchy and intelligent spacing
- Efficiency-first interactions with minimal friction
- Scannable information architecture
- Purposeful whitespace that enhances focus
- Consistent, predictable patterns throughout

---

## Typography System

**Font Selection:**
- Primary: Inter (weights: 400, 500, 600, 700)
- Monospace (for dates/times): JetBrains Mono (weight: 400)

**Type Scale:**
- Hero/Dashboard Title: text-3xl font-bold (Desktop), text-2xl (Mobile)
- Section Headers: text-xl font-semibold
- Task Titles: text-base font-medium
- Subtasks: text-sm font-normal
- Metadata (dates, priority): text-xs font-medium uppercase tracking-wide
- Body Text: text-sm font-normal
- Micro Copy: text-xs font-normal

**Line Heights:**
- Headings: leading-tight
- Task Lists: leading-relaxed
- Body: leading-normal

---

## Layout System

**Spacing Primitives:** Use Tailwind units of **2, 3, 4, 6, 8, 12, 16**
- Micro spacing (icons, badges): 2
- Component internal spacing: 3-4
- Section spacing: 6-8
- Major layout gaps: 12-16

**Grid Structure:**
- Sidebar: Fixed 280px (Desktop), Full-width drawer (Mobile)
- Main Content: flex-1 with max-w-5xl container
- Task Details Panel: 400px slide-out (Desktop), Full-screen modal (Mobile)

**Container Strategy:**
- Dashboard: px-6 py-8 (Desktop), px-4 py-6 (Mobile)
- Task Cards: p-4
- Modals/Panels: p-6

---

## Component Library

### Navigation & Structure

**Top Bar:**
- Height: h-16
- Sticky positioning with subtle bottom border
- Contains: Logo (left), Search bar (center flex-1 max-w-2xl), Profile menu (right)
- Search: rounded-full px-4 py-2 with icon prefix

**Sidebar:**
- Collapsible categories with disclosure triangles
- Category items: py-2 px-3 rounded-lg with icon (w-5 h-5) + label
- Active state: Current selected category highlighted
- Bottom section: Settings, Theme toggle, User profile card

**Dashboard Layout:**
- Two-column approach: Sidebar (280px) + Main content (flex-1)
- Main content divided into sections with headers
- Quick stats bar at top: Grid of 4 stat cards (grid-cols-4 gap-4)

### Task Components

**Task Card (Kanban/List View):**
- Padding: p-4
- Rounded: rounded-xl
- Border: border with hover shadow transition
- Structure:
  - Checkbox (w-5 h-5 rounded-md) aligned top-left
  - Task title (flex-1) with priority badge
  - Due date + time in metadata row (text-xs)
  - Subtask progress indicator (if applicable)
  - Action menu (three-dot) top-right
- Spacing between cards: space-y-3

**Task Detail Panel:**
- Slide-in from right: w-[400px]
- Header: p-6 with task title (text-xl) + close button
- Content sections with dividers:
  - Description textarea (min-h-32)
  - Due date/time picker
  - Priority selector (radio group)
  - Subtasks list
  - Category/folder selector
- Footer: Sticky bottom with Delete + Save buttons

**Subtasks:**
- Nested with ml-8 indentation
- Smaller checkbox (w-4 h-4)
- text-sm with strikethrough when completed
- Maximum 2 levels of nesting

**Priority Indicators:**
- Badge format: px-2 py-1 rounded-full text-xs font-semibold
- Icons: Small flag icons (w-3 h-3) next to labels
- Display inline with task titles

### Interactive Elements

**Buttons:**
- Primary CTA: px-4 py-2 rounded-lg font-medium
- Secondary: px-4 py-2 rounded-lg border font-medium
- Icon buttons: p-2 rounded-lg (for actions)
- Floating Action Button (mobile): fixed bottom-6 right-6 w-14 h-14 rounded-full with shadow-lg

**Input Fields:**
- Text inputs: px-4 py-2.5 rounded-lg border w-full
- Textareas: px-4 py-3 rounded-lg border min-h-24
- Select dropdowns: Same as text inputs with chevron icon
- Date/time pickers: Custom styled with calendar icon prefix

**Checkboxes:**
- Task checkboxes: w-5 h-5 rounded-md border-2
- Subtask checkboxes: w-4 h-4 rounded
- Custom checkmark animation on toggle

**Search Bar:**
- Width: max-w-2xl mx-auto
- Height: h-10
- Rounded: rounded-full
- Icon: Magnifying glass (w-5 h-5) prefix
- Clear button appears when text entered

### Data Display Components

**Stat Cards (Dashboard):**
- Grid: grid-cols-1 md:grid-cols-4 gap-4
- Card: p-6 rounded-xl border
- Icon top-left (w-10 h-10 rounded-lg with padding)
- Number: text-3xl font-bold
- Label: text-sm text-muted

**Category Cards:**
- Horizontal layout: flex items-center gap-3 p-3 rounded-lg
- Custom icon (w-8 h-8) with custom background
- Title + task count
- Drag handle (six-dot icon) on left when reordering

**Progress Bars:**
- Height: h-2 rounded-full
- Container with light background, filled portion shows completion
- Percentage label: text-xs above bar

**Filters Row:**
- Horizontal scroll on mobile (flex space-x-2)
- Chips: px-3 py-1.5 rounded-full border
- Active filter has filled background
- Filter options: Today, Upcoming, Completed, Overdue, All

**Empty States:**
- Centered: flex flex-col items-center justify-center min-h-64
- Icon: w-16 h-16 opacity-50
- Text: text-lg font-medium + text-sm muted description
- CTA button below

### Modals & Overlays

**Modal Structure:**
- Overlay: fixed inset-0 with backdrop blur
- Modal: max-w-lg mx-auto mt-20 rounded-2xl shadow-2xl
- Header: px-6 py-4 border-b with title + close
- Body: px-6 py-4 max-h-96 overflow-y-auto
- Footer: px-6 py-4 border-t with action buttons (flex justify-end gap-3)

**Confirmation Dialogs:**
- Compact: max-w-md
- Warning icon (w-12 h-12) centered
- Title (text-lg font-semibold) + description
- Buttons: Cancel (secondary) + Confirm (destructive styling)

**Settings Panel:**
- Same slide-in pattern as task details
- Sections with headers and dividers
- Toggle switches: w-11 h-6 rounded-full
- Radio groups for theme selection

### Notifications & Alerts

**Toast Notifications:**
- Fixed top-4 right-4
- Width: w-80 p-4 rounded-lg shadow-lg
- Icon (w-5 h-5) + message + dismiss button
- Auto-dismiss after 4 seconds with slide-out animation

**Reminder Badge:**
- Absolute positioned on category items
- w-5 h-5 rounded-full with count (text-xs)
- Pulsing animation for urgent items

---

## Responsive Breakpoints

**Mobile (< 768px):**
- Sidebar becomes full-screen drawer (slides from left)
- Task cards stack vertically
- Stat cards: grid-cols-2
- Task detail opens full-screen
- Floating action button for quick add
- Bottom tab navigation (5 items max)

**Tablet (768px - 1024px):**
- Sidebar remains visible but narrower (240px)
- Two-column task grid in certain views
- Stat cards: grid-cols-4

**Desktop (> 1024px):**
- Full sidebar (280px) always visible
- Three-column task view option
- Keyboard shortcuts enabled
- Hover states for all interactive elements

---

## Animation Guidelines

**Use Sparingly - Functional Animations Only:**
- Checkbox check/uncheck: Quick scale bounce (150ms)
- Task completion: Smooth strikethrough expansion (200ms)
- Panel/modal entrance: Slide + fade (250ms ease-out)
- Drag and drop: Slight elevation shadow during drag
- Loading states: Subtle skeleton shimmer
- **No:** Decorative animations, excessive transitions, auto-playing effects

---

## Iconography

**Icon Library:** Heroicons (via CDN)
**Icon Sizes:**
- Navigation/buttons: w-5 h-5
- Category icons: w-6 h-6
- Stat card icons: w-10 h-10
- Micro actions: w-4 h-4

**Common Icons:**
- Tasks: CheckCircle, Circle
- Priority: Flag, ExclamationCircle
- Calendar: CalendarIcon, Clock
- Actions: Plus, Trash, Pencil, DotsVertical
- Navigation: Home, Folder, Settings, User

---

## Special Features UI

**Drag and Drop:**
- Visual indicator: Dotted outline for drop zones
- Dragging item: Slight rotation + elevated shadow
- Reorder handle: Six-dot grip icon (visible on hover)

**Bulk Selection:**
- Multi-select checkboxes appear on left when first item selected
- Floating action bar at bottom with bulk actions
- Action bar: px-6 py-4 rounded-t-xl shadow-2xl fixed bottom-0 left-0 right-0

**Recurring Task Badge:**
- Circular arrow icon (w-4 h-4) inline with date
- Tooltip on hover explaining recurrence pattern

**Theme Customization Panel:**
- Color swatches: Grid of clickable circles (w-10 h-10)
- Font size slider: Range input with preview text
- Live preview of changes as user adjusts

This design system creates a professional, efficient, and scalable foundation for TaskFlow that prioritizes user productivity while maintaining visual sophistication.