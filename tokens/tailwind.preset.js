/**
 * AISloop Tailwind preset
 *
 * Maps the tokens in tokens.css to Tailwind theme keys. Every value here is a
 * var(--...) reference; the numbers live only in tokens.css. Include
 * tokens.css in your CSS first, then add this preset:
 *
 *   Tailwind v3   tailwind.config.js:  presets: [require('./tokens/tailwind.preset.js')]
 *   Tailwind v4   in your CSS:         @config "./tailwind.config.js";  (a config that lists this preset)
 *
 * Notes
 * - Theme and density switch inside tokens.css (media queries, data-theme,
 *   data-density), so utilities adapt on their own; the dark: variant is
 *   rarely needed.
 * - Text styles carry size, leading, weight and tracking:
 *     class="text-body"  class="text-title-2"  class="text-display-1"
 * - Colour opacity modifiers (bg-accent/50) need Tailwind v4, which mixes
 *   any colour; in v3 they do not work with var() colours. Prefer the
 *   ready-made tokens (accent-tint, fill-hover, fill-selected).
 * - Breakpoints are not tokens: CSS custom properties cannot be used in
 *   media queries. Keep Tailwind's screens or set your own.
 * - Glass: use the material-bar / material-menu utilities, on chrome only.
 */

const v = (name) => `var(--${name})`;

// A text style: [size, { lineHeight, fontWeight, letterSpacing }]
const textStyle = (name) => [
  v(`text-${name}-size`),
  {
    lineHeight: v(`text-${name}-leading`),
    fontWeight: v(`text-${name}-weight`),
    letterSpacing: v(`text-${name}-tracking`),
  },
];

const palette = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'];

module.exports = {
  theme: {
    extend: {
      colors: {
        label: {
          DEFAULT: v('color-label'),
          secondary: v('color-label-secondary'),
          tertiary: v('color-label-tertiary'),
          quaternary: v('color-label-quaternary'),
        },
        accent: {
          DEFAULT: v('color-accent'),
          hover: v('color-accent-hover'),
          pressed: v('color-accent-pressed'),
          tint: v('color-accent-tint'),
          text: v('color-accent-text'),
        },
        'on-accent': v('color-on-accent'),
        focus: v('color-focus-ring'),
        separator: {
          DEFAULT: v('color-separator'),
          opaque: v('color-separator-opaque'),
        },
        'border-control': v('color-border-control'),
        fill: {
          DEFAULT: v('color-fill'),
          secondary: v('color-fill-secondary'),
          tertiary: v('color-fill-tertiary'),
          quaternary: v('color-fill-quaternary'),
          hover: v('color-fill-hover'),
          selected: v('color-fill-selected'),
        },
        'control-track': v('color-control-track'),
        'control-thumb': v('color-control-thumb'),
        scrim: v('color-scrim'),
        'media-dim': v('color-media-dim'),
        // text and scrims on photos and video (same in both themes)
        'on-media': v('color-on-media'),
        'on-media-secondary': v('color-on-media-secondary'),
        'media-scrim': v('color-media-scrim'),
        'media-scrim-strong': v('color-media-scrim-strong'),
        // red, red-text, ... : fill for small meaningful elements, -text for text
        ...Object.fromEntries(
          palette.map((c) => [c, { DEFAULT: v(`color-${c}`), text: v(`color-${c}-text`) }]),
        ),
      },

      // Background layers: bg-page, bg-grouped, bg-grouped-item, bg-elevated ...
      backgroundColor: {
        page: v('color-bg'),
        secondary: v('color-bg-secondary'),
        tertiary: v('color-bg-tertiary'),
        grouped: v('color-bg-grouped'),
        'grouped-item': v('color-bg-grouped-item'),
        elevated: v('color-bg-elevated'),
        sidebar: v('color-bg-sidebar'),
      },

      fontFamily: {
        sans: v('font-sans'),
        mono: v('font-mono'),
        serif: v('font-serif'),
      },

      fontWeight: {
        regular: v('weight-regular'),
        medium: v('weight-medium'),
        semibold: v('weight-semibold'),
        bold: v('weight-bold'),
      },

      fontSize: {
        'large-title': textStyle('large-title'),
        'title-1': textStyle('title-1'),
        'title-2': textStyle('title-2'),
        'title-3': textStyle('title-3'),
        headline: textStyle('headline'),
        body: textStyle('body'),
        callout: textStyle('callout'),
        subheadline: textStyle('subheadline'),
        footnote: textStyle('footnote'),
        'caption-1': textStyle('caption-1'),
        'caption-2': textStyle('caption-2'),
        prose: [v('text-prose-size'), { lineHeight: v('text-prose-leading') }],
        field: v('text-field-size'),
        'display-1': textStyle('display-1'),
        'display-2': textStyle('display-2'),
        'display-3': textStyle('display-3'),
        lead: textStyle('lead'),
        eyebrow: textStyle('eyebrow'),
      },

      // Tailwind's numeric keys keep their usual meaning (1 = 4px) but read
      // the AISloop scale. Named keys carry layout and density-aware spacing:
      //   px-gutter  gap-controls  gap-borderless  gap-groups  px-row-x  py-row-y  p-group  p-panel
      spacing: {
        0.5: v('space-2'),
        1: v('space-4'),
        2: v('space-8'),
        3: v('space-12'),
        4: v('space-16'),
        5: v('space-20'),
        6: v('space-24'),
        8: v('space-32'),
        10: v('space-40'),
        12: v('space-48'),
        16: v('space-64'),
        20: v('space-80'),
        gutter: v('gutter'),
        controls: v('gap-control'),
        borderless: v('gap-borderless'),
        groups: v('gap-group'),
        'row-x': v('pad-row-x'),
        'row-y': v('pad-row-y'),
        group: v('pad-group'),
        panel: v('pad-panel'),
      },

      height: {
        bar: v('bar-height'),
        'bar-item': v('bar-item-height'),
        control: v('control-height'),
        'control-sm': v('control-height-sm'),
        'control-lg': v('control-height-lg'),
        row: v('row-height'),
        'row-dense': v('row-height-dense'),
        'row-2line': v('row-height-2line'),
        'row-sidebar': v('row-height-sidebar'),
        'row-menu': v('row-height-menu'),
        icon: v('icon-size'),
        'icon-sm': v('icon-size-sm'),
        'icon-lg': v('icon-size-lg'),
        switch: v('switch-height'),
      },
      minHeight: {
        hit: v('hit-min'),
        control: v('control-height'),
        row: v('row-height'),
      },
      minWidth: {
        hit: v('hit-min'),
      },
      width: {
        sidebar: v('sidebar-width'),
        inspector: v('inspector-width'),
        switch: v('switch-width'),
        icon: v('icon-size'),
        'icon-sm': v('icon-size-sm'),
        'icon-lg': v('icon-size-lg'),
      },
      maxWidth: {
        prose: v('width-prose'),
        'content-narrow': v('width-content-narrow'),
        content: v('width-content'),
        'content-wide': v('width-content-wide'),
      },

      borderRadius: {
        DEFAULT: v('radius-sm'),
        xs: v('radius-xs'),
        sm: v('radius-sm'),
        md: v('radius-md'),
        lg: v('radius-lg'),
        xl: v('radius-xl'),
        '2xl': v('radius-2xl'),
        '3xl': v('radius-3xl'),
        '4xl': v('radius-4xl'),
        full: v('radius-full'),
        min: v('radius-min'),
        control: v('radius-control'),
        selection: v('radius-selection'),
        group: v('radius-group'),
        menu: v('radius-menu'),
        popover: v('radius-popover'),
        sheet: v('radius-sheet'),
      },

      boxShadow: {
        raised: v('shadow-raised'),
        floating: v('shadow-floating'),
        overlay: v('shadow-overlay'),
        thumb: v('shadow-control-thumb'),          // shadow-thumb (not shadow-control-thumb: that name collides with the colour)
      },

      // Focus: use the focus-ring utility (plugin below). outline-focus and
      // ring-focus (colour) and outline-offset-focus also exist.
      outlineOffset: { focus: v('focus-ring-offset') },

      transitionDuration: {
        DEFAULT: v('duration-short'),
        micro: v('duration-micro'),
        short: v('duration-short'),
        medium: v('duration-medium'),
        long: v('duration-long'),
        xlong: v('duration-xlong'),
        expressive: v('duration-expressive'),
      },
      transitionTimingFunction: {
        DEFAULT: v('ease-out'),
        out: v('ease-out'),
        in: v('ease-in'),
        'in-out': v('ease-in-out'),
        emphasized: v('ease-emphasized'),
      },
    },
  },

  plugins: [
    // Utilities that need more than one property.
    function aisloopUtilities({ addUtilities }) {
      addUtilities({
        // Glass for chrome only: bars, toolbars, floating sidebars, menus, popovers.
        '.material-bar': {
          'background-color': v('material-bar'),
          '-webkit-backdrop-filter': v('material-bar-backdrop'),
          'backdrop-filter': v('material-bar-backdrop'),
        },
        '.material-menu': {
          'background-color': v('material-menu'),
          '-webkit-backdrop-filter': v('material-menu-backdrop'),
          'backdrop-filter': v('material-menu-backdrop'),
        },
        // Keyboard focus ring that passes 3:1 on every surface.
        '.focus-ring:focus-visible': {
          outline: `${v('focus-ring-width')} solid ${v('color-focus-ring')}`,
          'outline-offset': v('focus-ring-offset'),
        },
      });
    },
  ],
};
