/** @type {import('tailwindcss').Config} */
import dsConfig from './src/design-system/tailwind.config.js';

export default {
  content: ['./public/admin/**/*.{html,js}'],
  theme: {
    extend: {
      // Spread in all Ken DS tokens (colours, shadows, radii, fonts)
      ...dsConfig.theme.extend,
      // Admin-specific additions on top
      transitionDuration: {
        instant: '75ms',
        fast: '120ms',
        base: '200ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
        exit: 'cubic-bezier(0.7, 0, 1, 1)',
        move: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
