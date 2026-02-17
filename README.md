## Run Locally

**Prerequisites:** Node.js (>=16), npm

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the app in development mode:

   ```bash
   npm run dev
   ```

## Accessibility

- Skip link available: press Tab at page load to use the `Skip to main content` link.
- Keyboard navigation: interactive timeline items and expandable cards support Enter/Space.
- Focus styles: enable `Focus Ring` in Accessibility settings to get a high-visibility focus outline.
- Reduced motion: enable `Stop Motion` or `Epilepsy Safe` persona to remove animations.
- Contrast modes: `High Contrast` and `Monochrome` modes available in Accessibility settings.
- Reading helpers: `Focus Mask` and `Reading Ruler` assist line-by-line reading.
- Text scaling and spacing: use Text Size, Line Height, Word Spacing sliders in Accessibility.

If you want to evaluate accessibility manually, test with keyboard only navigation, screen reader (VoiceOver/NVDA), and the browser contrast tools.

## Deploy

This project includes a `deploy` script that builds and publishes the `dist` folder using `gh-pages`.

1. Build the production bundle:

   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages (the script uses the `gh-pages` package and publishes to branch `main_compiled_page`):

   ```bash
   npm run deploy
   ```

Notes:
- Make sure you have push access to the repository and that the `homepage`/GitHub Pages settings are configured for your repo.
- If you prefer the default `gh-pages` branch, edit the `deploy` script in `package.json` accordingly.
