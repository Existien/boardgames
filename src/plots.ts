export const limit = 5;

export const moreland = [
  "#3b4cc0",
  "#688aef",
  "#99baff",
  "#c9d8ef",
  "#edd1c2",
  "#f7a789",
  "#e36a53",
  "#b40426",
];

export const assignColors = (
  keys: Array<string>,
  colors: Array<string>
): { [key: string]: string } => {
  let assignedColors: { [key: string]: string } = {};
  let idx = 0;
  for (const key of keys) {
    assignedColors[key] = colors[idx];
    ++idx;
  }
  return assignedColors;
};
