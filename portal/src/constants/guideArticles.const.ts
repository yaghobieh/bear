export interface GuideSection {
  title: string;
  paragraphs: string[];
  code?: string;
  language?: string;
}

export interface GuideArticle {
  title: string;
  description: string;
  sections: GuideSection[];
}

export const GUIDE_ARTICLES: Record<string, GuideArticle> = {
  '/usage': {
    title: 'Usage',
    description: 'Bear is a provider, a stylesheet, and named component imports. The provider owns theme, direction, density, and motion. The stylesheet is what the components actually paint with.',
    sections: [
      {
        title: 'Provider',
        paragraphs: [
          'Put BearProvider around every tree that renders Bear components. It owns colorScheme, direction, density, and reducedMotion. colorScheme can be light, dark, or system. system follows the operating system and updates when the preference changes.',
          'Without the provider, components still render, but they fall back to the variables shipped in styles.css. With the provider, those variables are rewritten from your theme.',
        ],
        code: `import { BearProvider, Button } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export function App() {
  return (
    <BearProvider colorScheme="system" direction="ltr" density="comfortable">
      <Button variant="primary">Save</Button>
    </BearProvider>
  );
}`,
      },
      {
        title: 'Stylesheet',
        paragraphs: [
          'Import @forgedevstack/bear/styles.css once, at the application entry. That file defines the default --bear-* tokens and the component classes. Importing it again inside a route does not create a second theme.',
          'Optional packages such as bear-x-charts, bear-map, and kanban do not ship a second global theme. They read the same variables. Keep the Bear stylesheet even when the component import comes from an optional package.',
        ],
      },
      {
        title: 'Imports',
        paragraphs: [
          'Import components from @forgedevstack/bear. Charts can also be imported from @forgedevstack/bear-x-charts. Map comes from @forgedevstack/bear-map. Kanban comes from @forgedevstack/kanban. Core still re-exports the same components, so an existing import from @forgedevstack/bear keeps working.',
          'Icons are a separate install. npm install @forgedevstack/bear does not include @forgedevstack/bear-icons. Buttons and selects still render when that package is omitted.',
        ],
      },
    ],
  },
  '/support': {
    title: 'Support',
    description: 'Where to ask when a Bear page or component does not behave the way you expect.',
    sections: [
      {
        title: 'Docs feedback',
        paragraphs: [
          'Every docs page has a Feedback link that opens a GitHub issue titled with that page. Use it for wrong examples, missing props, and broken links.',
          'Edit in chat on the same page sends the question to Bear through DeepSeek. Ask about the component on the page, or ask it to run an example. Each address gets five completed answers.',
        ],
      },
      {
        title: 'Issues and package',
        paragraphs: [
          'Bug reports and feature requests belong on the Bear repository. Installation questions can start from the npm page and the Installation guide.',
        ],
      },
    ],
  },
  '/docs/llms': {
    title: 'llms.txt',
    description: 'A plain-text index of the Bear docs for agents and other tools that read markdown links.',
    sections: [
      {
        title: 'File',
        paragraphs: [
          'The index is published at /llms.txt. It lists getting started, customization, tokens, and component pages as absolute links on bearui.com.',
          'Point an agent at that file before it answers a Bear question, then open only the linked pages it needs.',
        ],
      },
    ],
  },
  '/showcase': {
    title: 'Showcase',
    description: 'Places in this portal that already assemble Bear into a full screen.',
    sections: [
      {
        title: 'In the portal',
        paragraphs: [
          'The home page, Libraries page, and template kits (dashboard, form, and auth) are built with Bear components. The product pages preview Calendar, charts, code, and maps next to Bear.',
          'Storybook documents the same components one story at a time, including the optional packages.',
        ],
      },
    ],
  },
  '/vision': {
    title: 'Vision',
    description: 'Bear is the React UI kit in ForgeStack. The other libraries stay focused, and Bear stays the place for interface components.',
    sections: [
      {
        title: 'What stays in Bear',
        paragraphs: [
          'Buttons, inputs, overlays, layout, charts, and the theme provider live in @forgedevstack/bear or in a Bear package that re-exports them. Grid Table, Rail, Harbor, Calendar, Ink, and Torch keep their own packages and sites.',
          'Docs should show a real import, a real prop, and a link back to the component API. The question box on each page is limited to Bear.',
        ],
      },
    ],
  },
  '/customization/overriding-structure': {
    title: 'Overriding component structure',
    description: 'Change what a Bear component renders without copying its source.',
    sections: [
      {
        title: 'className, style, and children',
        paragraphs: [
          'Most components accept className, style, and children. Use those for one instance. Use BearProvider when the same change should apply everywhere.',
        ],
        code: `import { Button } from '@forgedevstack/bear';

<Button variant="primary" className="w-full" style={{ letterSpacing: '0.04em' }}>
  Continue
</Button>`,
      },
      {
        title: 'Slots',
        paragraphs: [
          'Inputs accept InputProps.startAdornment and InputProps.endAdornment. Alerts, cards, and list items take children so you can replace the inner layout without a new component.',
        ],
      },
    ],
  },
  '/customization/color': {
    title: 'Color',
    description: 'Color in Bear is a scale of CSS variables. A component variant picks a stop on that scale. It does not take a color prop.',
    sections: [
      {
        title: 'What a variant reads',
        paragraphs: [
          'Button, Alert, and Badge take variant: primary, secondary, success, warning, danger, or info. Ghost and outline exist where the component documents them. primary reads --bear-primary-500 for the fill and --bear-primary-600 for hover.',
          'Passing theme.colors.primary as a hex or a named color rebuilds the whole primary scale. Shade 500 is your color. The provider lightens it for 50–400 and darkens it for 600–950, then writes every stop into the bear-theme-vars style tag.',
        ],
        code: `<BearProvider theme={{ colors: { primary: '#7c3aed' } }}>
  <Button variant="primary">Save</Button>
  <Button variant="danger">Delete</Button>
</BearProvider>`,
      },
      {
        title: 'A named variant',
        paragraphs: [
          'customVariants adds a name that is not in the built-in list. The key brand becomes the variables --bear-brand-bg, --bear-brand-bg-hover, and --bear-brand-text. Button variant="brand" reads those variables.',
          'Use a custom variant when the brand color should not replace primary. Primary still drives focus rings, selected rows, and charts. Brand stays on the buttons you opt in.',
        ],
        code: `<BearProvider
  customVariants={{
    brand: { bg: '#ec4899', bgHover: '#db2777', text: '#ffffff' },
  }}
>
  <Button variant="brand">Save</Button>
</BearProvider>`,
      },
      {
        title: 'Behind the paint',
        paragraphs: [
          'The component does not call getComputedStyle and it does not read theme.colors during render. The class bear-bg-primary-500 is background-color: var(--bear-primary-500). When the style tag changes, the browser updates every node that uses the variable.',
          'That is also why dark mode does not pass a different color into each component. The dark rule in the same style tag replaces --bear-bg-primary and --bear-text-primary while the component class names stay the same.',
        ],
      },
    ],
  },
  '/customization/rtl': {
    title: 'Right-to-left',
    description: 'BearProvider sets dir and a bear-rtl class on its root.',
    sections: [
      {
        title: 'Direction',
        paragraphs: [
          'Pass direction="rtl" or call setDirection from useBearDirection. The provider writes dir="rtl" and the class bear-rtl. Layout that uses logical CSS properties follows that direction.',
        ],
        code: `import { BearProvider, useBearDirection } from '@forgedevstack/bear';

<BearProvider direction="rtl">
  <App />
</BearProvider>`,
      },
    ],
  },
  '/customization/shadow-dom': {
    title: 'Shadow DOM',
    description: 'Bear styles are a global stylesheet. A shadow root does not see them unless you add the sheet inside the root.',
    sections: [
      {
        title: 'Adopt the stylesheet',
        paragraphs: [
          'Import @forgedevstack/bear/styles.css in the main document for a normal app. A shadow root does not inherit CSS rules from the document, so the component classes inside it have no layout or color until that file is also inside the root.',
          'The theme variables are a separate problem. They are custom properties on :root, and custom properties do inherit into a shadow tree unless the host sets all: initial. If the host resets everything, copy --bear-primary-500, --bear-bg-primary, and --bear-text-primary onto the host. The bear-theme-vars style tag in the document head does not apply to a closed shadow root by itself.',
        ],
      },
    ],
  },
  '/theme/components': {
    title: 'Themed components',
    description: 'A themed component is still the same React component. The theme changes the variables it already reads.',
    sections: [
      {
        title: 'Default button colors',
        paragraphs: [
          'The primary button background follows --bear-primary-500, and hover follows --bear-primary-600. When you pass variants for Button, Bear also writes --bear-btn-primary-bg, --bear-btn-primary-bg-hover, --bear-btn-primary-text, and --bear-btn-primary-ring.',
          'You do not wrap Button in a styled copy to change that. Change theme.colors.primary, or register a custom variant, and every button on that variant updates.',
        ],
        code: `import { BearProvider, Button } from '@forgedevstack/bear';

<BearProvider
  customVariants={{
    brand: { bg: '#ec4899', bgHover: '#db2777', text: '#ffffff' },
  }}
>
  <Button variant="brand">Brand</Button>
  <Button variant="primary">Primary</Button>
</BearProvider>`,
      },
      {
        title: 'One instance versus every instance',
        paragraphs: [
          'className and style still win for a single node, because they are on the element after the variable classes. Use them for one button. Use the provider when every primary button, focus ring, and chart line should move together.',
          'A custom variant does not recolor charts. Charts read --bear-primary-500. Only components you set to variant="brand" look up --bear-brand-bg and --bear-brand-bg-hover.',
        ],
      },
      {
        title: 'Updating after render',
        paragraphs: [
          'useBear().updateTheme merges a partial theme and rebuilds the style tag whose id is bear-theme-vars. useBear().addVariant adds a named variant the same way. Open components do not remount. The browser sees new variable values and repaints.',
        ],
      },
    ],
  },
  '/customization/shape': {
    title: 'Shape',
    description: 'Corner radius is part of the Bear theme. Components use the shared radius scale.',
    sections: [
      {
        title: 'Radius scale',
        paragraphs: [
          'BearTheme.borderRadius defines none, sm, md, lg, xl, 2xl, and full. Override the theme borderRadius when you pass a theme into BearProvider, or set a radius on a single component with className.',
        ],
        code: `theme={{
  borderRadius: {
    md: '10px',
    lg: '16px',
    full: '9999px',
  },
}}`,
      },
    ],
  },
  '/customization/focus-visible': {
    title: 'Focus visible',
    description: 'Keyboard focus uses :focus-visible so mouse clicks do not leave a ring on every control.',
    sections: [
      {
        title: 'Ring color',
        paragraphs: [
          'Interactive components draw a ring from the primary color, through --bear-primary-500 and the bear-ring-primary utilities. Override that variable to change the focus color across the kit.',
          'Do not remove the outline without a replacement. The accessibility guide lists the keyboard keys each component supports.',
        ],
        code: `:root {
  --bear-primary-500: #7c3aed;
}`,
      },
    ],
  },
  '/customization/transitions': {
    title: 'Transitions',
    description: 'Overlays animate when they open and close. Reduced motion turns that motion off.',
    sections: [
      {
        title: 'reducedMotion',
        paragraphs: [
          'BearProvider accepts reducedMotion. When it is true, or when the user prefers reduced motion, overlays should not run the open and close effects.',
          'Modal, Drawer, Menu, Popover, Tooltip, and HoverCard share the same openEffect and closeEffect names.',
        ],
        code: `<BearProvider reducedMotion>
  <App />
</BearProvider>`,
      },
    ],
  },
  '/customization/css-variables/usage': {
    title: 'Basic CSS variable usage',
    description: 'The variables are the public theme API. Components, your CSS, and the theme viewer all read the same names.',
    sections: [
      {
        title: 'Where they come from',
        paragraphs: [
          'styles.css sets the defaults on :root, including --bear-primary-500 at #ec4899. BearProvider then writes a style tag, id bear-theme-vars, that overrides those defaults for the active light and dark mode.',
          'You can set the same names yourself in your stylesheet. A later rule on :root replaces the token for the whole page. A rule on a wrapper replaces it only for that subtree, because custom properties inherit.',
        ],
        code: `:root {
  --bear-primary-500: #db2777;
  --bear-primary-600: #be185d;
}`,
        language: 'css',
      },
      {
        title: 'Names you can rely on',
        paragraphs: [
          'Color scales are --bear-primary-50 through --bear-primary-950, and the same pattern for secondary, success, warning, danger, info, and neutral. Surfaces are --bear-bg-primary, --bear-bg-secondary, and --bear-bg-tertiary. Text is --bear-text-primary, --bear-text-secondary, and --bear-text-muted. Borders are --bear-border-default.',
          'Prefer these names in your own CSS instead of copying the hex. When the user switches to dark mode, --bear-bg-primary and --bear-text-primary change and your panel follows.',
        ],
      },
    ],
  },
  '/customization/css-variables/native-color': {
    title: 'Native color',
    description: 'The variables store ordinary CSS colors, so they work in color-mix, borders, and the color property.',
    sections: [
      {
        title: 'color-mix',
        paragraphs: [
          'Bear already mixes the primary color for translucent backgrounds, for example color-mix(in srgb, var(--bear-primary-500) 15%, transparent). Use the same pattern in your own CSS.',
        ],
        code: `.panel {
  background: color-mix(in srgb, var(--bear-primary-500) 12%, transparent);
  color: var(--bear-text-primary);
  border: 1px solid var(--bear-border-default);
}`,
      },
    ],
  },
  '/customization/css-variables/advanced': {
    title: 'Advanced CSS variable configuration',
    description: 'Scope a theme to one subtree, and keep dark mode on the same names.',
    sections: [
      {
        title: 'Subtree scope',
        paragraphs: [
          'Custom properties inherit. Set them on a wrapper to theme one region. Dark mode in this portal and in Bear redefines --bear-bg-primary, --bear-text-primary, and --bear-border-default on .dark and .bear-dark.',
        ],
        code: `.settings {
  --bear-primary-500: #0ea5e9;
  --bear-bg-primary: #f8fafc;
}`,
      },
    ],
  },
  '/styles/cascade-layers': {
    title: 'Cascade layers',
    description: 'Bear ships unlayered CSS. Put that file in a layer if your application CSS must win without raising specificity.',
    sections: [
      {
        title: 'Layer the import',
        paragraphs: [
          'Declare your layer order, then import the Bear stylesheet into a layer. Unlayered rules in your app still override the Bear layer. Do this from CSS, not from a second copy of the component styles.',
        ],
        code: `@layer bear, app;

@import '@forgedevstack/bear/styles.css' layer(bear);

@layer app {
  .app-button {
    border-radius: 9999px;
  }
}`,
        language: 'css',
      },
    ],
  },
};
