import {nextui} from '@nextui-org/theme';
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    "./src/app/(app)/**/*.{js,ts,jsx,tsx,mdx}",
    "// Include all files in the app folder\n    './src/components/**/*.{js,ts,jsx,tsx,mdx}'",
    "// Include all files in components folder\n    './src/**/**/*.{js,ts,jsx,tsx,mdx}'",
    "// Include all files in the src folder",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|divider).js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        blink: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0.2' },
        },
      },
      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
        carousel: 'marquee 60s linear infinite',
        blink: 'blink 1.4s both infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries'),require('@tailwindcss/typography'),plugin(({ matchUtilities,theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value,}
          },},{
          values: theme('transitionDelay'),},)
    }),nextui()],
}

export default config
