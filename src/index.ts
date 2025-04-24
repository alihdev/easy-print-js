import {
  waitForDomReady,
  getOrCreatePrintContainer,
  injectContentToPrint,
  waitForRender,
  cleanupAfterPrint,
  printPage,
  injectPrintStyles,
} from "./helper";

export async function easyPrint(opt: { elementId: string }): Promise<void> {
  await waitForDomReady();

  const source = document.getElementById(opt.elementId);
  if (!source) return console.error("Element not found:", opt.elementId);

  const printContainer = getOrCreatePrintContainer();
  injectContentToPrint(printContainer, source.innerHTML);

  injectPrintStyles()
  await waitForRender();

  printPage();

  cleanupAfterPrint(printContainer);
}
