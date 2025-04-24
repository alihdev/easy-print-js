export function waitForDomReady(): Promise<void> {
  return new Promise((resolve) => {
    if (document.readyState === "complete") return resolve();
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

export function getOrCreatePrintContainer(
  id: string = "print-content"
): HTMLElement {
  let container = document.getElementById(id);
  if (container) return container;

  container = document.createElement("div");
  container.id = id;
  container.style.display = "none";
  document.body.appendChild(container);

  return container;
}

export function injectContentToPrint(
  container: HTMLElement,
  content: string
): void {
  container.innerHTML = content;
}

export function waitForRender(timeout: number = 50): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export function cleanupAfterPrint(container: HTMLElement): void {
  setTimeout(() => (container.innerHTML = ""), 500);
}

export function printPage(): void {
  window.print();
}

export function injectPrintStyles(): void {
  const id = "easy-print-js-style";
  if (document.getElementById(id)) return;

  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    @media print {
      @page { margin: 0; size: auto; }

      html,
      body {
        position: static !important;
        padding: 0 !important;
        margin: 0 !important;
        block-size: 100% !important;
      }

      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      #print-content {
        display: block !important;
      }

      body > *:not(#print-content) {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}
