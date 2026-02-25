# easy-print-js

A lightweight, **zero-dependency** JavaScript utility for printing HTML elements — with structured layout support for headers, content, and footers.

[![npm version](https://img.shields.io/npm/v/easy-print-js.svg)](https://www.npmjs.com/package/easy-print-js)
[![npm downloads](https://img.shields.io/npm/dm/easy-print-js.svg)](https://www.npmjs.com/package/easy-print-js)
[![license](https://img.shields.io/npm/l/easy-print-js.svg)](https://github.com/alihdev/easy-print-js/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/easy-print-js)](https://bundlephobia.com/package/easy-print-js)

---

## Features

- **Framework-agnostic** — works with vanilla JS, Vue, React, Angular, Svelte, or any framework
- **Zero dependencies** — pure TypeScript/JavaScript, nothing extra to install
- **DOM-based rendering** — no `innerHTML` hacks; elements are moved cleanly into the print structure
- **Structured print layout** — supports header, content, and footer sections that repeat correctly across pages
- **Preserves colors** — backgrounds, text colors, and images print exactly as displayed
- **Async API** — returns a `Promise<void>` for clean integration with modern code
- **TypeScript-first** — full type definitions included out of the box
- **Tiny footprint** — under 2 KB minified

---

## Installation

```bash
npm install easy-print-js
```

```bash
yarn add easy-print-js
```

```bash
pnpm add easy-print-js
```

---

## Quick Start

```js
import { easyPrint } from 'easy-print-js'

easyPrint({
  contentElementId: 'my-content'
})
```

That's it. The element with `id="my-content"` will be printed via the browser's print dialog.

---

## Usage Examples

### Vanilla HTML/JavaScript

```html
<div id="report-header" style="display: none">
  <h1>Acme Corp — Monthly Report</h1>
  <p>Generated on: January 2026</p>
</div>

<div id="report-content" style="display: none">
  <table>
    <tr><td>Revenue</td><td>$120,000</td></tr>
    <tr><td>Expenses</td><td>$85,000</td></tr>
    <tr><td><strong>Profit</strong></td><td><strong>$35,000</strong></td></tr>
  </table>
</div>

<div id="report-footer" style="display: none">
  <small>Confidential — Do not distribute</small>
</div>

<button onclick="printReport()">Print Report</button>

<script type="module">
  import { easyPrint } from 'easy-print-js'

  window.printReport = function () {
    easyPrint({
      contentElementId: 'report-content',
      headerElementId: 'report-header',
      footerElementId: 'report-footer'
    })
  }
</script>
```

### Vue 3

```vue
<script setup lang="ts">
import { easyPrint } from 'easy-print-js'

function printInvoice() {
  easyPrint({
    contentElementId: 'invoice',
    headerElementId: 'print-header',
    footerElementId: 'print-footer'
  })
}
</script>

<template>
  <div>
    <!-- Hidden printable sections -->
    <div style="display: none">
      <div id="print-header">
        <h1>Company Name</h1>
        <p>123 Business St, City</p>
      </div>

      <div id="invoice">
        <h2>Invoice #1001</h2>
        <table>
          <tr><td>Web Development</td><td>$5,000</td></tr>
          <tr><td>Design Services</td><td>$2,500</td></tr>
          <tr><td><strong>Total</strong></td><td><strong>$7,500</strong></td></tr>
        </table>
      </div>

      <div id="print-footer">
        <small>Thank you for your business!</small>
      </div>
    </div>

    <button @click="printInvoice">Print Invoice</button>
  </div>
</template>
```

### React

```tsx
import { easyPrint } from 'easy-print-js'

export default function InvoicePage() {
  const handlePrint = () => {
    easyPrint({
      contentElementId: 'invoice-content',
      headerElementId: 'invoice-header',
      footerElementId: 'invoice-footer'
    })
  }

  return (
    <div>
      {/* Hidden printable sections */}
      <div style={{ display: 'none' }}>
        <div id="invoice-header">
          <h1>Company Name</h1>
        </div>
        <div id="invoice-content">
          <h2>Invoice #1001</h2>
          <p>Amount Due: $7,500</p>
        </div>
        <div id="invoice-footer">
          <p>Thank you for your business!</p>
        </div>
      </div>

      <button onClick={handlePrint}>Print Invoice</button>
    </div>
  )
}
```

### Angular

```typescript
import { Component } from '@angular/core'
import { easyPrint } from 'easy-print-js'

@Component({
  selector: 'app-invoice',
  template: `
    <!-- Hidden printable sections -->
    <div style="display: none">
      <div id="invoice-header"><h1>Company Name</h1></div>
      <div id="invoice-content"><p>Invoice details here...</p></div>
      <div id="invoice-footer"><small>Footer text</small></div>
    </div>

    <button (click)="print()">Print Invoice</button>
  `
})
export class InvoiceComponent {
  print() {
    easyPrint({
      contentElementId: 'invoice-content',
      headerElementId: 'invoice-header',
      footerElementId: 'invoice-footer'
    })
  }
}
```

### Content Only (No Header/Footer)

```js
import { easyPrint } from 'easy-print-js'

// Print just the content — header and footer are optional
easyPrint({
  contentElementId: 'my-section'
})
```

---

## API

### `easyPrint(options): Promise<void>`

Opens the browser's print dialog with the specified HTML elements arranged in a structured layout.

#### `EasyPrintOptions`

| Property           | Type     | Required | Description                                            |
|--------------------|----------|----------|--------------------------------------------------------|
| `contentElementId` | `string` | Yes      | The DOM element ID for the main body content to print  |
| `headerElementId`  | `string` | No       | The DOM element ID to display at the top of the print  |
| `footerElementId`  | `string` | No       | The DOM element ID to display at the bottom of the print |

```typescript
interface EasyPrintOptions {
  contentElementId: string
  headerElementId?: string
  footerElementId?: string
}
```

#### Return Value

Returns a `Promise<void>` that resolves after the print dialog is triggered. The function is `async`, so you can `await` it if needed:

```js
await easyPrint({ contentElementId: 'report' })
console.log('Print dialog was opened')
```

---

## How It Works

1. **Waits for the DOM** to be fully loaded
2. **Retrieves** the header, content, and footer elements by their IDs
3. **Builds a print layout** using an HTML `<table>` structure:
   - `<thead>` — header (repeats on every printed page)
   - `<tbody>` — main content
   - `<tfoot>` — footer (repeats on every printed page)
4. **Injects print-only CSS** that hides all page content except the print layout and preserves colors
5. **Opens the browser print dialog** via `window.print()`
6. **Cleans up** the injected elements after printing

> **Why a `<table>` layout?** Browsers natively repeat `<thead>` and `<tfoot>` on every page when printing a table. This is the most reliable cross-browser way to get repeating headers and footers without CSS hacks or JavaScript page-break calculations.

---

## Styling Your Print Content

The library automatically injects print styles that:

- Remove default page margins (`@page { margin: 0 }`)
- Preserve all colors and backgrounds (`print-color-adjust: exact`)
- Hide everything on the page except the print content

To add your own print styles, use CSS `@media print` rules:

```css
@media print {
  #invoice-header {
    border-bottom: 2px solid #333;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }

  #invoice-content table {
    width: 100%;
    border-collapse: collapse;
  }

  #invoice-content td {
    padding: 8px;
    border: 1px solid #ddd;
  }

  #invoice-footer {
    border-top: 1px solid #ccc;
    padding-top: 10px;
    margin-top: 20px;
    text-align: center;
    color: #666;
  }
}
```

---

## Browser Support

Works in all modern browsers that support `window.print()`:

- Chrome / Edge
- Firefox
- Safari
- Opera

---

## Migration from v1.x

Version 2.0 introduced breaking changes:

| v1.x              | v2.0                | Notes                                        |
|--------------------|---------------------|----------------------------------------------|
| `elementId`        | `contentElementId`  | Renamed for clarity                          |
| innerHTML-based    | DOM-based rendering | Elements are now moved, not serialized as HTML |
| Content only       | Header + Content + Footer | Added `headerElementId` and `footerElementId` |

**Before (v1.x):**
```js
easyPrint({ elementId: 'my-content' })
```

**After (v2.0):**
```js
easyPrint({ contentElementId: 'my-content' })
```

---

## License

MIT © [Ali Hassan](https://github.com/alihdev)

---

## Links

- [GitHub Repository](https://github.com/alihdev/easy-print-js)
- [npm Package](https://www.npmjs.com/package/easy-print-js)
- [Report Issues](https://github.com/alihdev/easy-print-js/issues)

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Commit (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/my-feature`)
6. Open a pull request

All contributions are reviewed and appreciated.
