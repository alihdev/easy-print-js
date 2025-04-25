import {
  waitForDomReady,
  getOrCreatePrintContainer,
  injectContentToPrint,
  waitForRender,
  cleanupAfterPrint,
  printPage,
  injectPrintStyles,
  buildPrintStructure,
} from "./helper";

import { EasyPrintOptions } from "./types";

export async function easyPrint(opt: EasyPrintOptions): Promise<void> {
  await waitForDomReady();

  const html = buildPrintStructure(opt);
  const printContainer = getOrCreatePrintContainer();
  injectContentToPrint(printContainer, html);

  injectPrintStyles();
  await waitForRender();

  printPage();

  cleanupAfterPrint(printContainer);
}
