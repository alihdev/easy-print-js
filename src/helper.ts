import { EasyPrintOptions } from "./types";

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
  content: HTMLElement
): void {
  container.appendChild(content);
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

export function buildPrintStructure(opt: EasyPrintOptions): HTMLElement {
  const headerEl = getElementByIdSafe(opt.headerElementId);
  const contentEl = getElementByIdSafe(opt.contentElementId);
  const footerEl = getElementByIdSafe(opt.footerElementId);

  const table = createBaseTable();
  if (headerEl) createSectionForBaseTable(table, "thead", headerEl);
  if (contentEl) createSectionForBaseTable(table, "tbody", contentEl);
  if (footerEl) createSectionForBaseTable(table, "tfoot", footerEl);

  return table;
}

export function getElementByIdSafe(id?: string): HTMLElement | null {
  if (!id) return null;

  const el = document.getElementById(id);

  if (!el) {
    console.error("Element not found:", id);
    return null;
  }

  return el;
}

function createBaseTable(): HTMLTableElement {
  const table = document.createElement("table");
  table.id = "easy-print-table";
  table.style.borderCollapse = "collapse";
  table.style.inlineSize = "100%";
  table.style.breakInside = "auto";
  return table;
}

function createSectionForBaseTable(
  table: HTMLTableElement,
  tag: "thead" | "tbody" | "tfoot",
  content: HTMLElement
) {
  const section = document.createElement(tag);
  const tr = document.createElement("tr");
  const th = document.createElement("th");

  th.appendChild(content.cloneNode(true));
  tr.appendChild(th);
  section.appendChild(tr);

  table.appendChild(section);
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
