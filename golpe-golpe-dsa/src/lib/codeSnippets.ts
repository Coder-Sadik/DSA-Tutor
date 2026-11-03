import { Locale } from './i18n/config';

export interface ChapterCodeSnippet {
  js: string;
  py: string;
}

export const CHAPTER_CODE: Record<string, Record<Locale, ChapterCodeSnippet>> = {
  'what-is-a-data-structure': {
    bn: {
      js: `// ১. লিনিয়ার সার্চ (রাফির এলোমেলো স্তূপ)
function linearSearch(heap, target) {
  for (let i = 0; i < heap.length; i++) {
    if (heap[i] === target) {
      return i; // বইটি পাওয়া গেছে!
    }
  }
  return -1; // পাওয়া যায়নি
}

// ২. বাইনারি সার্চ (নীলার সাজানো তাক)
function binarySearch(shelf, target) {
  let low = 0;
  let high = shelf.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (shelf[mid] === target) {
      return mid; // মাঝের বইটিতেই মিলে গেছে!
    } else if (shelf[mid] < target) {
      low = mid + 1;  // বাম পাশের অর্ধেক বাদ, ডানে খুঁজো
    } else {
      high = mid - 1; // ডান পাশের অর্ধেক বাদ, বামে খুঁজো
    }
  }
  return -1;
}`,
      py: `# ১. লিনিয়ার সার্চ (রাফির এলোমেলো স্তূপ)
def linear_search(heap, target):
    for index, book in enumerate(heap):
        if book == target:
            return index  # বইটি পাওয়া গেছে!
    return -1  # পাওয়া যায়নি

# ২. বাইনারি সার্চ (নীলার সাজানো তাক)
def binary_search(shelf, target):
    low = 0
    high = len(shelf) - 1

    while low <= high:
        mid = (low + high) // 2
        if shelf[mid] == target:
            return mid  # মাঝের বইটিতেই মিলে গেছে!
        elif shelf[mid] < target:
            low = mid + 1   # বাম পাশের অর্ধেক বাদ, ডানে খুঁজো
        else:
            high = mid - 1  # ডান পাশের অর্ধেক বাদ, বামে খুঁজো
    return -1`,
    },
    en: {
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
  },
  array: {
    bn: {
      js: `const lockers = ["Rafi", "Nila", "Sumon", "Mitu", "Arif", "Joya", "Tuhin"];

// ১. ইনডেক্স ধরে পড়া: এক ধাপ
console.log(lockers[3]); // "Mitu"

// ২. শেষে যোগ করা: কেউ নড়ে না
lockers.push("Tania");

// ৩. মাঝখানে ঢোকানো: আগে সবাইকে ডানে সরাও
function insertAt(arr, index, value) {
  for (let i = arr.length; i > index; i--) {
    arr[i] = arr[i - 1]; // এক লকার ডানে সরানো হচ্ছে
  }
  arr[index] = value;
}`,
      py: `lockers = ["Rafi", "Nila", "Sumon", "Mitu", "Arif", "Joya", "Tuhin"]

# ১. ইনডেক্স ধরে পড়া: এক ধাপ
print(lockers[3])  # Mitu

# ২. শেষে যোগ করা: কেউ নড়ে না
lockers.append("Tania")

# ৩. মাঝখানে ঢোকানো: আগে সবাইকে ডানে সরাও
def insert_at(arr, index, value):
    arr.append(None)  # নতুন জায়গা তৈরি করা
    for i in range(len(arr) - 1, index, -1):
        arr[i] = arr[i - 1]  # এক লকার ডানে সরানো হচ্ছে
    arr[index] = value`,
    },
    en: {
      js: `const lockers = ["Rafi", "Nila", "Sumon", "Mitu", "Arif", "Joya", "Tuhin"];

// 1. Read by index: one step
console.log(lockers[3]); // "Mitu"

// 2. Add at the end: no one moves
lockers.push("Tania");

// 3. Insert in the middle: shift everyone right first
function insertAt(arr, index, value) {
  for (let i = arr.length; i > index; i--) {
    arr[i] = arr[i - 1]; // move one locker to the right
  }
  arr[index] = value;
}`,
      py: `lockers = ["Rafi", "Nila", "Sumon", "Mitu", "Arif", "Joya", "Tuhin"]

# 1. Read by index: one step
print(lockers[3])  # Mitu

# 2. Add at the end: no one moves
lockers.append("Tania")

# 3. Insert in the middle: shift everyone right first
def insert_at(arr, index, value):
    arr.append(None)  # make room
    for i in range(len(arr) - 1, index, -1):
        arr[i] = arr[i - 1]  # move one locker to the right
    arr[index] = value`,
    },
  },
  'linked-list': {
    bn: {
      js: `class Clue {
  constructor(text) {
    this.text = text;
    this.next = null; // পরের চিরকুটের লিংক
  }
}

// তৈরি করি: সামনের দরজা -> জুতার তাক -> আমগাছ
const head = new Clue("সামনের দরজা");
head.next = new Clue("জুতার তাক");
head.next.next = new Clue("আমগাছ");

// ১. শিকল ধরে হাঁটা: লাফ দেওয়ার উপায় নেই, লিংক ধরে এগোই
function find(head, text) {
  let current = head;
  while (current !== null) {
    if (current.text === text) return current;
    current = current.next; // এক হপ
  }
  return null; // পাওয়া যায়নি
}

// ২. কোনো চিরকুটের পরে ঢোকানো: ক্রম গুরুত্বপূর্ণ!
function insertAfter(clue, text) {
  const fresh = new Clue(text);
  fresh.next = clue.next; // আগে পুরোনো পরেরটা মনে রাখো
  clue.next = fresh;      // তারপর নতুনটার দিকে দেখাও
}`,
      py: `class Clue:
    def __init__(self, text):
        self.text = text
        self.next = None  # পরের চিরকুটের লিংক

# তৈরি করি: সামনের দরজা -> জুতার তাক -> আমগাছ
head = Clue("সামনের দরজা")
head.next = Clue("জুতার তাক")
head.next.next = Clue("আমগাছ")

# ১. শিকল ধরে হাঁটা: লাফ দেওয়ার উপায় নেই, লিংক ধরে এগোই
def find(head, text):
    current = head
    while current is not None:
        if current.text == text:
            return current
        current = current.next  # এক হপ
    return None  # পাওয়া যায়নি

# ২. কোনো চিরকুটের পরে ঢোকানো: ক্রম গুরুত্বপূর্ণ!
def insert_after(clue, text):
    fresh = Clue(text)
    fresh.next = clue.next  # আগে পুরোনো পরেরটা মনে রাখো
    clue.next = fresh       # তারপর নতুনটার দিকে দেখাও`,
    },
    en: {
      js: `class Clue {
  constructor(text) {
    this.text = text;
    this.next = null; // link to the next clue
  }
}

// Build: Front door -> Shoe rack -> Mango tree
const head = new Clue("Front door");
head.next = new Clue("Shoe rack");
head.next.next = new Clue("Mango tree");

// 1. Walk the chain: no way to jump, we follow links
function find(head, text) {
  let current = head;
  while (current !== null) {
    if (current.text === text) return current;
    current = current.next; // one hop
  }
  return null; // not found
}

// 2. Insert after a clue: order matters!
function insertAfter(clue, text) {
  const fresh = new Clue(text);
  fresh.next = clue.next; // first, remember the old next
  clue.next = fresh;      // then, point to the new clue
}`,
      py: `class Clue:
    def __init__(self, text):
        self.text = text
        self.next = None  # link to the next clue

# Build: Front door -> Shoe rack -> Mango tree
head = Clue("Front door")
head.next = Clue("Shoe rack")
head.next.next = Clue("Mango tree")

# 1. Walk the chain: no way to jump, we follow links
def find(head, text):
    current = head
    while current is not None:
        if current.text == text:
            return current
        current = current.next  # one hop
    return None  # not found

# 2. Insert after a clue: order matters!
def insert_after(clue, text):
    fresh = Clue(text)
    fresh.next = clue.next  # first, remember the old next
    clue.next = fresh       # then, point to the new clue`,
    },
  },
};

export function getChapterCode(slug: string, lang: Locale = 'bn'): ChapterCodeSnippet {
  return (
    CHAPTER_CODE[slug]?.[lang] ||
    CHAPTER_CODE[slug]?.en || {
      js: '// Code coming soon',
      py: '# Code coming soon',
    }
  );
}
