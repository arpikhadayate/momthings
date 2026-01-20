```markdown
# Family Match Drag & Drop Widget

This is a small, configurable HTML/JS widget for a drag-and-drop game where the aim is to reorder cells in each column so every row contains items from the same family.

Key features:
- Configurable columns and families.
- Column types: `image`, `number`, `text` (supports non-editable text boxes).
- Independent shuffling of columns; players reorder cells within columns.
- "Check" validates rows and highlights correct/incorrect matches.
- Pointer Events (touch + mobile-friendly) drag support with a draggable ghost and insertion placeholder.
- Graceful fallback to HTML5 Drag & Drop when Pointer Events are not available.

How to use:
1. Open `index.html` in a browser.
2. Modify `script.js` configuration to add/adjust columns and families.
3. Replace placeholder images (data URIs) with real image URLs if desired.

Notes, caveats and next steps:
- Pointer-based dragging uses elementFromPoint for hit-testing. This is responsive and works well on modern mobile browsers (iOS Safari, Chrome on Android).
- Accessibility: pointer interactions are usable with touch and mouse, but you should add keyboard reordering controls for full accessibility (e.g., move up/down buttons and ARIA announcements).
- Performance: for large item sets consider virtualization or throttling pointermove.
- You may want to add inertia / snap animations or a small haptic/visual feedback for a better mobile feel.
- If embedding in scrollable containers, ensure touch-action and overflow interplay doesn't block pointer events.

```