export function changeRemToPx(remVal: string): number {
  const html = document.querySelector('html');
  if (!html) return 0;

  const htmlFontSize = window.getComputedStyle(html).getPropertyValue('font-size');
  return parseFloat(remVal) * parseFloat(htmlFontSize);
}
