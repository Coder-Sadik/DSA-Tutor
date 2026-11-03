export interface ChapterCodeSnippet {
  js: string;
  py: string;
}

export const CHAPTER_CODE: Record<string, ChapterCodeSnippet> = {
  'what-is-a-data-structure': {
    js: `// 1. Linear Search (Rafi's messy heap)
function linearSearch(heap, target) {
  for (let i = 0; i < heap.length; i++) {
    if (heap[i] === target) {
      return i; // Found the book!
    }
  }
  return -1; // Not found
}

// 2. Binary Search (Nila's organized shelf)
function binarySearch(shelf, target) {
  let low = 0;
  let high = shelf.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (shelf[mid] === target) {
      return mid; // Match found at mid position!
    } else if (shelf[mid] < target) {
      low = mid + 1;  // Discard left half, search right
    } else {
      high = mid - 1; // Discard right half, search left
    }
  }
  return -1;
}`,
    py: `# 1. Linear Search (Rafi's messy heap)
def linear_search(heap, target):
    for index, book in enumerate(heap):
        if book == target:
            return index  # Found the book!
    return -1  # Not found

# 2. Binary Search (Nila's organized shelf)
def binary_search(shelf, target):
    low = 0
    high = len(shelf) - 1

    while low <= high:
        mid = (low + high) // 2
        if shelf[mid] == target:
            return mid  # Match found at mid position!
        elif shelf[mid] < target:
            low = mid + 1   # Discard left half, search right
        else:
            high = mid - 1  # Discard right half, search left
    return -1`,
  },
};

export function getChapterCode(slug: string): ChapterCodeSnippet {
  return (
    CHAPTER_CODE[slug] || {
      js: '// Code coming soon',
      py: '# Code coming soon',
    }
  );
}

