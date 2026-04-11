let selectedLocationText = "";

function normalizeLocationText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .split("\n")
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean)
    .join(", ");
}

export function setSelectedLocationText(value) {
  selectedLocationText = normalizeLocationText(value);
}

export function getSelectedLocationText() {
  return normalizeLocationText(selectedLocationText);
}
