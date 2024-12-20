export const limit = 20;

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

export const spectral = [
  "#5e4fa2",
  "#3288bd",
  "#66c2a5",
  "#abdda4",
  "#e6f598",
  "#fee08b",
  "#fdae61",
  "#f46d43",
  "#d53e4f",
  "#9e0142",
  "#a41870",
  "#7a0e6c",
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
