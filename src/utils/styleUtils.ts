// TODO: remove if not being used.
export const getColorValue = (colorVariable: string) => {
  const style = getComputedStyle(document.body);
  console.log('color: ', style.getPropertyValue(colorVariable));
  return style.getPropertyValue(colorVariable);
};
