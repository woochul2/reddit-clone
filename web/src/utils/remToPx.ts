export function remToPx(remVal: string): number | null {
  const html = document.querySelector('html');
  if (!html) {
    return null;
  }
  const htmlFontSize = window
    .getComputedStyle(html)
    .getPropertyValue('font-size');

  return parseFloat(remVal) * parseFloat(htmlFontSize);
}
