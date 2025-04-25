# 🖨️ easy-print-js

A lightweight, **pure JavaScript** utility to print HTML elements by ID — with full support for structured layouts including header, content, and footer.

- ✅ Framework-agnostic — works with Vue, React, Angular, etc.
- ✅ No dependencies
- ✅ Fully DOM-based (no innerHTML hacks)
- ✅ Supports header, content, and footer injection

---

## 📦 Installation

```bash
npm install easy-print-js
# or
yarn add easy-print-js
# or
pnpm add easy-print-js
```

---

## ⚡ Quick Usage

> You can use this package in plain HTML/JS or any framework like Vue, React, Angular, etc.

---

### ✅ Vue 3 Example

```vue
<script setup lang="ts">
import { easyPrint } from 'easy-print-js'

function printSection() {
  easyPrint({
    contentElementId: 'invoice',
    headerElementId: 'print-header',
    footerElementId: 'print-footer'
  })
}
</script>

<template>
  <div>
    <!-- Hidden printable content -->
    <div style="display: none">
      <div id="print-header">
        <h1>Company Name</h1>
      </div>

      <div id="invoice">
        <h2>Invoice #123</h2>
        <p>Total: $42</p>
      </div>

      <div id="print-footer">
        <small>Thank you for your business!</small>
      </div>
    </div>

    <!-- Visible trigger -->
    <button @click="printSection">Print Invoice</button>
  </div>
</template>
```

---

## 🔧 API

### `print(options: EasyPrintOptions): Promise<void>`

| Option             | Type     | Required | Description                                    |
|--------------------|----------|----------|------------------------------------------------|
| `contentElementId` | `string` | ✅       | The ID of the main body content element       |
| `headerElementId`  | `string` | ❌       | Optional element to show at the top of print  |
| `footerElementId`  | `string` | ❌       | Optional element to show at the bottom        |

> The elements are cloned and inserted into a print-specific structure using `<thead>`, `<tbody>`, and `<tfoot>`.

---

## 📝 License

MIT © [Ali Hassan](https://github.com/alihdev)

---

## 🔗 Repository

GitHub: [https://github.com/alihdev/easy-print-js](https://github.com/alihdev/easy-print-js)

> ⭐ **If you find this project useful, give it a star on GitHub — it helps others discover it!**

---

## 🤝 Contributing

Contributions are welcome! If you find bugs, have suggestions, or want to add a new feature, feel free to:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a pull request

All contributions are reviewed and appreciated 🌟
