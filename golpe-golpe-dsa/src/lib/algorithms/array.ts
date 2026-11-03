export interface ArrayStep {
  stepNumber: number;
  action: 'read' | 'append' | 'shift-right' | 'place' | 'remove' | 'shift-left' | 'error';
  index: number;
  from?: number;
  to?: number;
  student?: string;
  movesSoFar: number;
  arrayState: (string | null)[];
  messageEn: string;
  messageBn: string;
}

export const CAPACITY = 10;

/**
 * Pure generator: Read student at locker index
 */
export function readSteps(
  array: (string | null)[],
  index: number
): ArrayStep[] {
  const student = array[index];
  const stepNumber = 1;

  if (student) {
    return [
      {
        stepNumber,
        action: 'read',
        index,
        student,
        movesSoFar: 0,
        arrayState: [...array],
        messageEn: `Opened locker #${index} directly: found ${student}! Reading by index always takes 1 step.`,
        messageBn: `সরাসরি ${index.toLocaleString('bn-BD')} নম্বর লকার খোলা হলো: পাওয়া গেল ${student}! ইনডেক্স ধরে পড়তে সবসময় ১ ধাপ লাগে।`,
      },
    ];
  } else {
    return [
      {
        stepNumber,
        action: 'read',
        index,
        movesSoFar: 0,
        arrayState: [...array],
        messageEn: `Opened locker #${index} directly: it is currently empty. Always 1 step.`,
        messageBn: `সরাসরি ${index.toLocaleString('bn-BD')} নম্বর লকার খোলা হলো: এটি বর্তমানে খালি। সবসময় ১ ধাপ।`,
      },
    ];
  }
}

/**
 * Pure generator: Append new student at the end of the array
 */
export function appendSteps(
  array: (string | null)[],
  newStudent: string
): ArrayStep[] {
  const currentCount = array.filter((item) => item !== null).length;

  if (currentCount >= CAPACITY) {
    return [
      {
        stepNumber: 1,
        action: 'error',
        index: CAPACITY - 1,
        movesSoFar: 0,
        arrayState: [...array],
        messageEn: 'The row is full. A new, longer row is needed.',
        messageBn: 'সারি ভরে গেছে। নতুন লম্বা সারি লাগবে।',
      },
    ];
  }

  const nextState = [...array];
  nextState[currentCount] = newStudent;

  return [
    {
      stepNumber: 1,
      action: 'append',
      index: currentCount,
      student: newStudent,
      movesSoFar: 0,
      arrayState: nextState,
      messageEn: `Added ${newStudent} at the end (locker #${currentCount}). No other students moved (0 moves)!`,
      messageBn: `সবার শেষে (${currentCount.toLocaleString('bn-BD')} নম্বর লকারে) ${newStudent}-কে রাখা হলো। কাউকে সরাতে হয়নি (০ বার সরানো)!`,
    },
  ];
}

/**
 * Pure generator: Insert new student at a specific locker index
 */
export function insertSteps(
  array: (string | null)[],
  targetIndex: number,
  newStudent: string
): ArrayStep[] {
  const currentCount = array.filter((item) => item !== null).length;

  // Check if row is full
  if (currentCount >= CAPACITY) {
    return [
      {
        stepNumber: 1,
        action: 'error',
        index: targetIndex,
        movesSoFar: 0,
        arrayState: [...array],
        messageEn: 'The row is full. A new, longer row is needed.',
        messageBn: 'সারি ভরে গেছে। নতুন লম্বা সারি লাগবে।',
      },
    ];
  }

  // If target index is beyond current items, treat as append
  if (targetIndex >= currentCount) {
    return appendSteps(array, newStudent);
  }

  const steps: ArrayStep[] = [];
  const state: (string | null)[] = [...array];
  let moves = 0;
  let stepNum = 0;

  // Shift students right starting from the last student down to targetIndex
  for (let i = currentCount - 1; i >= targetIndex; i--) {
    stepNum++;
    moves++;
    const studentToMove = state[i];
    state[i + 1] = studentToMove;
    state[i] = null; // vacated temporarily

    steps.push({
      stepNumber: stepNum,
      action: 'shift-right',
      index: i,
      from: i,
      to: i + 1,
      student: studentToMove || undefined,
      movesSoFar: moves,
      arrayState: [...state],
      messageEn: `Shifted ${studentToMove} right: locker #${i} → #${i + 1} (${moves} ${moves === 1 ? 'move' : 'moves'}).`,
      messageBn: `${studentToMove}-কে ডানে সরানো হলো: ${i.toLocaleString('bn-BD')} নম্বর লকার → ${(i + 1).toLocaleString('bn-BD')} নম্বর লকার (${moves.toLocaleString('bn-BD')} বার সরানো)।`,
    });
  }

  // Now place the new student in the vacated targetIndex
  stepNum++;
  state[targetIndex] = newStudent;
  steps.push({
    stepNumber: stepNum,
    action: 'place',
    index: targetIndex,
    student: newStudent,
    movesSoFar: moves,
    arrayState: [...state],
    messageEn: `Placed ${newStudent} into freed locker #${targetIndex}! Total students moved: ${moves}.`,
    messageBn: `ফাঁকা হওয়া ${targetIndex.toLocaleString('bn-BD')} নম্বর লকারে ${newStudent}-কে রাখা হলো! মোট সরানো লেগেছে: ${moves.toLocaleString('bn-BD')} বার।`,
  });

  return steps;
}

/**
 * Pure generator: Remove student at a specific locker index and close gap
 */
export function deleteSteps(
  array: (string | null)[],
  targetIndex: number
): ArrayStep[] {
  const studentToRemove = array[targetIndex];
  const currentCount = array.filter((item) => item !== null).length;

  if (!studentToRemove || targetIndex >= currentCount) {
    return [
      {
        stepNumber: 1,
        action: 'read',
        index: targetIndex,
        movesSoFar: 0,
        arrayState: [...array],
        messageEn: `Locker #${targetIndex} is already empty. Nothing to remove.`,
        messageBn: `${targetIndex.toLocaleString('bn-BD')} নম্বর লকার ইতোমধ্যেই খালি। সরানোর কিছু নেই।`,
      },
    ];
  }

  const steps: ArrayStep[] = [];
  const state: (string | null)[] = [...array];
  let stepNum = 1;

  // Step 1: Remove student
  state[targetIndex] = null;
  steps.push({
    stepNumber: stepNum,
    action: 'remove',
    index: targetIndex,
    student: studentToRemove,
    movesSoFar: 0,
    arrayState: [...state],
    messageEn: `Removed ${studentToRemove} from locker #${targetIndex}. Now closing the gap...`,
    messageBn: `${targetIndex.toLocaleString('bn-BD')} নম্বর লকার থেকে ${studentToRemove}-কে সরানো হলো। এবার ফাঁকা জায়গা পূরণ করা হচ্ছে...`,
  });

  // If this was the last item, no shifting needed
  if (targetIndex === currentCount - 1) {
    return steps;
  }

  // Shift subsequent students left to close the gap
  let moves = 0;
  for (let i = targetIndex + 1; i < currentCount; i++) {
    stepNum++;
    moves++;
    const studentToMove = state[i];
    state[i - 1] = studentToMove;
    state[i] = null;

    steps.push({
      stepNumber: stepNum,
      action: 'shift-left',
      index: i,
      from: i,
      to: i - 1,
      student: studentToMove || undefined,
      movesSoFar: moves,
      arrayState: [...state],
      messageEn: `Shifted ${studentToMove} left: locker #${i} → #${i - 1} (${moves} ${moves === 1 ? 'move' : 'moves'}).`,
      messageBn: `${studentToMove}-কে বামে সরানো হলো: ${i.toLocaleString('bn-BD')} নম্বর লকার → ${(i - 1).toLocaleString('bn-BD')} নম্বর লকার (${moves.toLocaleString('bn-BD')} বার সরানো)।`,
    });
  }

  return steps;
}

