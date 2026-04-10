let selectedImageIndexes = [];

export function setSelectedImageIndexes(indexes) {
  if (!Array.isArray(indexes)) {
    selectedImageIndexes = [];
    return;
  }

  selectedImageIndexes = indexes
    .filter((item) => Number.isInteger(item))
    .filter((item) => item >= 0 && item <= 8)
    .slice(0, 9);
}

export function getSelectedImageIndexes() {
  return [...selectedImageIndexes];
}
