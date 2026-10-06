// Every colour, radius and font below points at a CSS variable defined in
// src/index.css. The light theme lives on :root, the dark theme on .dark,
// so one class on <html> swaps the whole design system.
const c = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: c('bg'),
        band: c('band'),
        card: c('card'),
        inset: c('inset'),
        hover: c('hover'),
        line: c('line'),
        head: c('head'),
        strong: c('strong'),
        body: c('body'),
        dim: c('dim'),
        mute: c('mute'),
        stat: c('stat'),
        accent: c('accent'),
        'accent-ink': c('accent-ink'),
        'accent-hover': c('accent-hover'),
        'on-accent': c('on-accent'),
        hl: c('hl'),
        'hl-ink': c('hl-ink'),
        ok: c('ok'),
        link: c('link'),
        ink: c('ink'),
        term: {
          bg: c('term-bg'),
          fg: c('term-fg'),
          dim: c('term-dim'),
          line: c('term-line'),
          accent: c('term-accent'),
          hl: c('term-hl'),
          ok: c('term-ok'),
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-code)'],
      },
      borderRadius: {
        theme: 'var(--r)',
        'theme-lg': 'var(--r-lg)',
        chip: 'var(--r-chip)',
        pill: 'var(--r-pill)',
        dot: 'var(--r-dot)',
      },
      boxShadow: {
        hard: 'var(--shadow-hard)',
      },
    },
  },
  plugins: [],
};
