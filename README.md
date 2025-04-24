# 🖨️ easy-print-js

A lightweight, **pure JavaScript** utility to print HTML elements by ID.

- ✅ Framework-agnostic — works with Vue, React, Angular, etc.
- ✅ No dependencies
- ✅ Simple and elegant API

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

> You can also use a bundler like Vite, Webpack, or import it in any framework.

---

### ✅ Vue 3 Example

```vue
<script setup lang="ts">
import { print } from 'easy-print-js'

function printSection() {
  print({ elementId: 'invoice' })
}
</script>

<template>
  <div>
    <div style="display: none">
      <div id="invoice">
        <h2>Invoice #123</h2>
        <p>Total: $42</p>
      </div>
    </div>

    <button @click="printSection">Print Invoice</button>
  </div>
</template>
```

---

## 🔧 API

### `print(options: { elementId: string }): Promise<void>`

| Option       | Type     | Required | Description                          |
|--------------|----------|----------|--------------------------------------|
| `elementId`  | `string` | ✅       | The ID of the HTML element to print |

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
