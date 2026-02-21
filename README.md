# @forgedevstack/bear

Strong, reliable React UI components. Tailwind-powered, zero config required. The protective force of ForgeStack.

## Portal

Visit the [Bear UI Portal](https://bearui.com/) to explore all components, view live examples, and browse the documentation.

## Features

- **Tailwind-Powered**: Built with Tailwind CSS, zero config required
- **React 18+**: Works with React 18 and above
- **TypeScript**: Full type safety with comprehensive TypeScript definitions
- **Comprehensive Component Library**: 50+ production-ready components
- **Accessible**: ARIA attributes and keyboard navigation support
- **Customizable**: Flexible theming and styling options
- **Tree-Shakeable**: Import only what you need
- **Zero Config**: Works out of the box with minimal setup

## Installation

```bash
npm install @forgedevstack/bear
# or
pnpm add @forgedevstack/bear
# or
yarn add @forgedevstack/bear
```

### Import CSS (Required)

Import the compiled CSS file once in your app:

```tsx
// In your main entry file (e.g., main.tsx, App.tsx, or index.css)
import '@forgedevstack/bear/styles.css';
```

## Quick Start

```tsx
import { Button, Card, CardHeader, CardBody } from '@forgedevstack/bear';

function App() {
  return (
    <Card>
      <CardHeader>
        <h2>Welcome to Bear</h2>
      </CardHeader>
      <CardBody>
        <Button variant="primary">Get Started</Button>
      </CardBody>
    </Card>
  );
}
```

## Component Categories

### Layout Components

- `Container` - Responsive container with max-width constraints
- `Flex` - Flexible box layout component
- `Grid` / `GridItem` - CSS Grid layout system
- `ResizablePanel` - Two-pane resizable layout with draggable divider (horizontal/vertical)

### UI Components

- `Button` / `ButtonGroup` - Interactive button components
- `Card` - Container for content with header, body, and footer
- `Badge` - Status indicators and labels
- `Paper` - Elevated surface component
- `Divider` - Visual separator
- `Typography` - Text styling with gradient text and typewriter effect
- `Link` - Styled link component

### Form Components

- `Input` - Text input field
- `Select` / `MultiSelect` - Dropdown selection components
- `Checkbox` - Checkbox input
- `Radio` / `RadioGroup` - Radio button inputs
- `Switch` - Toggle switch
- `Autocomplete` - Autocomplete input
- `TransferList` - Transfer items between lists
- `FileUpload` - File upload component
- `NumberInput` - Numeric input with controls
- `OTPInput` - One-time password input
- `ColorPicker` - Color selection component
- `DatePicker` - Date selection component
- `TimePicker` - Time selection component
- `Slider` - Range slider input

### Feedback Components

- `Alert` - Alert messages
- `Spinner` - Loading spinner
- `Rating` - Star rating component
- `Progress` - Progress indicator
- `Skeleton` - Loading skeleton states
- `Toast` / `useToast` - Toast notifications
- `BearLoader` - Custom bear-themed loader

### Overlay Components

- `Modal` - Modal dialog
- `Drawer` - Slide-out drawer
- `Tooltip` - Tooltip component
- `Popover` - Popover component
- `Menu` / `MenuItem` - Context menu
- `Dropdown` - Dropdown menu
- `SpeedDial` - Floating action speed dial

### Data Display

- `DataTable` - Advanced data table with sorting, filtering, and pagination
- `Carousel` - Image/content carousel
- `Accordion` - Collapsible content sections
- `Tabs` - Tabbed interface
- `List` - List component with various item types
- `Avatar` / `AvatarGroup` - User avatar display
- `Chip` - Compact element for input, attribute, or action
- `TreeView` - Hierarchical tree structure
- `FileTree` - File/folder tree with selection and expand/collapse
- `Timeline` - Timeline component
- `Statistic` - Statistical display
- `EmptyState` - Empty state placeholder
- `Image` - Enhanced image component

### Navigation Components

- `Breadcrumbs` - Navigation breadcrumbs
- `Stepper` - Step-by-step navigation
- `BottomNavigation` - Bottom navigation bar
- `AppBar` - Application bar/header
- `Pagination` - Page navigation

### Utility Components

- `ScrollArea` - Custom scrollable area
- `Collapsible` - Collapsible content wrapper
- `Kbd` - Keyboard key display
- `CopyButton` - Copy to clipboard button
- `Icon` / `BearIcons` - Icon component library
- `BearLogo` - Bear logo component

## Examples

### Button

```tsx
import { Button } from '@forgedevstack/bear';

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// With icon (icon size matches text)
<Button variant="primary" leftIcon={<PlayIcon />}>View Demos</Button>

// Button label using Typography variant (h1, h2, body1, etc.)
<Button variant="primary" textVariant="subtitle1">Heading-style label</Button>
```

**Custom variants** (via `BearProvider`): pass `customVariants={{ myBrand: { bg: '#...', text: '#fff' } }}` and use `<Button variant="myBrand">`. Use `customTypography` for custom text styles and set `textVariant` on Button to use them.

### Card

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@forgedevstack/bear';

<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content goes here</CardBody>
  <CardFooter>Footer content</CardFooter>
</Card>
```

### Form

```tsx
import { Input, Select, Checkbox, Button } from '@forgedevstack/bear';

function LoginForm() {
  return (
    <form>
      <Input label="Email" type="email" required />
      <Input label="Password" type="password" required />
      <Select 
        label="Country"
        options={[
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
        ]}
      />
      <Checkbox label="Remember me" />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### DataTable

```tsx
import { DataTable, createColumns } from '@forgedevstack/bear';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns = createColumns<User>([
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
]);

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
];

<DataTable data={data} columns={columns} />
```

### Toast Notifications

```tsx
import { ToastProvider, useToast, Button } from '@forgedevstack/bear';

function App() {
  return (
    <ToastProvider>
      <MyComponent />
    </ToastProvider>
  );
}

function MyComponent() {
  const toast = useToast();
  
  return (
    <Button onClick={() => toast.success('Operation successful!')}>
      Show Toast
    </Button>
  );
}
```

## Theming

Bear components support customization through Tailwind CSS. You can override default styles by configuring your Tailwind theme:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Your custom colors
      },
    },
  },
}
```

## TypeScript Support

All components are fully typed with TypeScript:

```tsx
import { Button, ButtonProps } from '@forgedevstack/bear';

const buttonProps: ButtonProps = {
  variant: 'primary',
  size: 'md',
  children: 'Click me',
};

<Button {...buttonProps} />
```

## License

MIT
