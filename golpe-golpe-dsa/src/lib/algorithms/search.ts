export interface SearchStep {
  stepNumber: number;
  type: 'linear' | 'binary';
  currentIndex: number;
  currentValue: number;
  target: number;
  found: boolean;
  low?: number;
  high?: number;
  mid?: number;
  discardedIndices: number[];
  status: 'checking' | 'found' | 'not-found';
  messageEn: string;
  messageBn: string;
}

/**
 * Pure generator: step-by-step trace of linear search (Rafi's messy heap).
 * Returns deterministic steps: index being checked, discarded range, found flag, and short explanation string.
 */
export function linearSearchSteps(items: number[], target: number): SearchStep[] {
  const steps: SearchStep[] = [];
  const discarded: number[] = [];

  for (let i = 0; i < items.length; i++) {
    const val = items[i];
    const isMatch = val === target;
    const stepNum = i + 1;

    if (isMatch) {
      steps.push({
        stepNumber: stepNum,
        type: 'linear',
        currentIndex: i,
        currentValue: val,
        target,
        found: true,
        discardedIndices: [...discarded],
        status: 'found',
        messageEn: `Step ${stepNum}: Looked at book #${val} at position ${i + 1}. Success! Found the target book!`,
        messageBn: `ধাপ ${stepNum.toLocaleString('bn-BD')}: ${(i + 1).toLocaleString('bn-BD')}তম অবস্থানে বই #${val.toLocaleString('bn-BD')} দেখা হলো। মিলে গেছে! কাঙ্ক্ষিত বইটি পাওয়া গেছে!`,
      });
      return steps;
    } else {
      discarded.push(i);
      steps.push({
        stepNumber: stepNum,
        type: 'linear',
        currentIndex: i,
        currentValue: val,
        target,
        found: false,
        discardedIndices: [...discarded],
        status: 'checking',
        messageEn: `Step ${stepNum}: Looked at book #${val} at position ${i + 1}. Not a match, moving to next book.`,
        messageBn: `ধাপ ${stepNum.toLocaleString('bn-BD')}: ${(i + 1).toLocaleString('bn-BD')}তম অবস্থানে বই #${val.toLocaleString('bn-BD')} দেখা হলো। মেলেনি, পরের বইটিতে যাচ্ছি।`,
      });
    }
  }

  // Not found after checking all
  steps.push({
    stepNumber: steps.length + 1,
    type: 'linear',
    currentIndex: -1,
    currentValue: -1,
    target,
    found: false,
    discardedIndices: [...discarded],
    status: 'not-found',
    messageEn: `Finished checking all ${items.length} books. Book #${target} was not in the heap.`,
    messageBn: `সবগুলো ${items.length.toLocaleString('bn-BD')}টি বই দেখা শেষ। বই #${target.toLocaleString('bn-BD')} স্তূপে পাওয়া যায়নি।`,
  });

  return steps;
}

/**
 * Pure generator: step-by-step trace of binary search (Nila's ordered shelf).
 * Returns deterministic steps: index being checked (mid), discarded range, found flag, and short explanation string.
 */
export function binarySearchSteps(items: number[], target: number): SearchStep[] {
  const steps: SearchStep[] = [];
  let low = 0;
  let high = items.length - 1;
  const discarded: number[] = [];
  let stepCount = 0;

  while (low <= high) {
    stepCount++;
    const mid = Math.floor((low + high) / 2);
    const midVal = items[mid];

    if (midVal === target) {
      steps.push({
        stepNumber: stepCount,
        type: 'binary',
        currentIndex: mid,
        currentValue: midVal,
        target,
        found: true,
        low,
        high,
        mid,
        discardedIndices: [...discarded],
        status: 'found',
        messageEn: `Step ${stepCount}: Opened middle book #${midVal} at position ${mid + 1}. Found it!`,
        messageBn: `ধাপ ${stepCount.toLocaleString('bn-BD')}: মাঝের বই #${midVal.toLocaleString('bn-BD')} খোলা হলো (${(mid + 1).toLocaleString('bn-BD')}তম অবস্থানে)। পেয়ে গেছি!`,
      });
      return steps;
    } else if (midVal < target) {
      // Target is in the right half. Discard [low ... mid]
      for (let i = low; i <= mid; i++) {
        if (!discarded.includes(i)) discarded.push(i);
      }
      steps.push({
        stepNumber: stepCount,
        type: 'binary',
        currentIndex: mid,
        currentValue: midVal,
        target,
        found: false,
        low,
        high,
        mid,
        discardedIndices: [...discarded],
        status: 'checking',
        messageEn: `Step ${stepCount}: Middle book #${midVal} < target #${target}. Discarding left half (positions ${low + 1} to ${mid + 1}) and searching right.`,
        messageBn: `ধাপ ${stepCount.toLocaleString('bn-BD')}: মাঝের বই #${midVal.toLocaleString('bn-BD')} কাঙ্ক্ষিত বই #${target.toLocaleString('bn-BD')} থেকে ছোট। বাম পাশের অংশ বাদ দিয়ে ডানে খুঁজছি।`,
      });
      low = mid + 1;
    } else {
      // Target is in the right half. Discard [mid ... high]
      for (let i = mid; i <= high; i++) {
        if (!discarded.includes(i)) discarded.push(i);
      }
      steps.push({
        stepNumber: stepCount,
        type: 'binary',
        currentIndex: mid,
        currentValue: midVal,
        target,
        found: false,
        low,
        high,
        mid,
        discardedIndices: [...discarded],
        status: 'checking',
        messageEn: `Step ${stepCount}: Middle book #${midVal} > target #${target}. Discarding right half (positions ${mid + 1} to ${high + 1}) and searching left.`,
        messageBn: `ধাপ ${stepCount.toLocaleString('bn-BD')}: মাঝের বই #${midVal.toLocaleString('bn-BD')} কাঙ্ক্ষিত বই #${target.toLocaleString('bn-BD')} থেকে বড়। ডান পাশের অংশ বাদ দিয়ে বামে খুঁজছি।`,
      });
      high = mid - 1;
    }
  }

  // Not found
  steps.push({
    stepNumber: stepCount + 1,
    type: 'binary',
    currentIndex: -1,
    currentValue: -1,
    target,
    found: false,
    low,
    high,
    discardedIndices: [...discarded],
    status: 'not-found',
    messageEn: `Search range exhausted. Book #${target} is not on the shelf.`,
    messageBn: `খোঁজার পরিসীমা শেষ। বই #${target.toLocaleString('bn-BD')} তাকে পাওয়া যায়নি।`,
  });

  return steps;
}
