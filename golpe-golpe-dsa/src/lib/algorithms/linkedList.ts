export interface ClueNode {
  id: string;
  nameEn: string;
  nameBn: string;
}

export interface LinkedListStep {
  stepNumber: number;
  action:
    | 'walk'
    | 'appear'
    | 'link-new-to-next'
    | 'link-prev-to-new'
    | 'remove-link'
    | 'move-head'
    | 'link-tail'
    | 'error'
    | 'done';
  activeNodeId?: string;
  sourceNodeId?: string;
  targetNodeId?: string;
  hopsSoFar: number;
  pointerChangesSoFar: number;
  chainState: ClueNode[];
  newPendingNode?: ClueNode;
  pendingNextId?: string;
  messageEn: string;
  messageBn: string;
}

export const INITIAL_CLUES: ClueNode[] = [
  { id: 'front-door', nameEn: 'Front door', nameBn: 'সামনের দরজা' },
  { id: 'shoe-rack', nameEn: 'Shoe rack', nameBn: 'জুতার তাক' },
  { id: 'mango-tree', nameEn: 'Mango tree', nameBn: 'আমগাছ' },
  { id: 'water-tank', nameEn: 'Water tank', nameBn: 'পানির ট্যাংক' },
  { id: 'rooftop', nameEn: 'Rooftop', nameBn: 'ছাদ' },
  { id: 'treasure', nameEn: 'Treasure', nameBn: 'গুপ্তধন' },
];

export const KITCHEN_CLUE: ClueNode = {
  id: 'kitchen',
  nameEn: 'Kitchen',
  nameBn: 'রান্নাঘর',
};

/**
 * Pure generator: Walk through the chain node by node until reaching targetIndex
 */
export function traverseSteps(
  chain: ClueNode[],
  targetIndex: number
): LinkedListStep[] {
  if (chain.length === 0) {
    return [
      {
        stepNumber: 1,
        action: 'error',
        hopsSoFar: 0,
        pointerChangesSoFar: 0,
        chainState: [],
        messageEn: 'The chain is empty. No clues to walk to.',
        messageBn: 'শিকলটি সম্পূর্ণ খালি। হেঁটে যাওয়ার মতো কোনো চিরকুট নেই।',
      },
    ];
  }

  const steps: LinkedListStep[] = [];
  let stepNum = 0;

  // If searching beyond bounds (not found)
  const isOutOfRange = targetIndex < 0 || targetIndex >= chain.length;
  const walkLimit = isOutOfRange ? chain.length : targetIndex + 1;

  for (let i = 0; i < walkLimit; i++) {
    stepNum++;
    const node = chain[i];
    const isTarget = i === targetIndex;

    steps.push({
      stepNumber: stepNum,
      action: 'walk',
      activeNodeId: node.id,
      hopsSoFar: i,
      pointerChangesSoFar: 0,
      chainState: [...chain],
      messageEn:
        i === 0
          ? `Started at head clue (#1: ${node.nameEn}). 0 hops so far.`
          : isTarget
          ? `Arrived at clue #${i + 1} (${node.nameEn}) after ${i} ${i === 1 ? 'hop' : 'hops'}! Direct jumping was impossible; we had to follow every link.`
          : `Hop ${i}: followed link from clue #${i} to clue #${i + 1} (${node.nameEn}).`,
      messageBn:
        i === 0
          ? `হেড চিরকুটে (১ম: ${node.nameBn}) শুরু হলো। এখনও ০ হপ।`
          : isTarget
          ? `${i.toLocaleString('bn-BD')}টি হপ পার হয়ে ${(i + 1).toLocaleString('bn-BD')} নম্বর চিরকুটে (${node.nameBn}) পৌঁছালাম! সরাসরি লাফ দেওয়ার কোনো উপায় ছিল না।`
          : `হপ ${i.toLocaleString('bn-BD')}: ${(i).toLocaleString('bn-BD')} নম্বর থেকে লিংক ধরে ${(i + 1).toLocaleString('bn-BD')} নম্বর চিরকুটে (${node.nameBn}) গেলাম।`,
    });
  }

  if (isOutOfRange) {
    stepNum++;
    steps.push({
      stepNumber: stepNum,
      action: 'done',
      hopsSoFar: chain.length - 1,
      pointerChangesSoFar: 0,
      chainState: [...chain],
      messageEn: `Walked all ${chain.length} clues to the end. The requested clue was not found in the chain!`,
      messageBn: `সবগুলো ${chain.length.toLocaleString('bn-BD')}টি চিরকুট ঘুরে শেষ মাথায় পৌঁছালাম। কাঙ্ক্ষিত চিরকুটটি পাওয়া যায়নি!`,
    });
  }

  return steps;
}

/**
 * Pure generator: Insert new clue after targetIndex
 */
export function insertAfterSteps(
  chain: ClueNode[],
  targetIndex: number,
  newNode: ClueNode
): LinkedListStep[] {
  // Edge case: Empty list
  if (chain.length === 0) {
    return [
      {
        stepNumber: 1,
        action: 'move-head',
        activeNodeId: newNode.id,
        hopsSoFar: 0,
        pointerChangesSoFar: 1,
        chainState: [newNode],
        messageEn: `The list was empty. Created ${newNode.nameEn} as the new head (1 pointer change).`,
        messageBn: `শিকল খালি ছিল। ${newNode.nameBn}-কে নতুন হেড হিসেবে যুক্ত করা হলো (১টি পয়েন্টার পরিবর্তন)।`,
      },
    ];
  }

  // First walk to the chosen clue
  const walkSteps = traverseSteps(chain, targetIndex);
  const steps: LinkedListStep[] = [...walkSteps];
  let stepNum = steps.length;
  const currentHops = targetIndex;

  const targetNode = chain[targetIndex];
  const nextNode = chain[targetIndex + 1];

  // Case A: Inserting after the last clue (tail)
  if (!nextNode) {
    stepNum++;
    steps.push({
      stepNumber: stepNum,
      action: 'appear',
      activeNodeId: newNode.id,
      hopsSoFar: currentHops,
      pointerChangesSoFar: 0,
      chainState: [...chain],
      newPendingNode: newNode,
      messageEn: `Wrote new slip for ${newNode.nameEn}. Ready to link it after the tail (${targetNode.nameEn}).`,
      messageBn: `${newNode.nameBn}-এর নতুন চিরকুট তৈরি করা হলো। এবার শেষের (${targetNode.nameBn}) সাথে যুক্ত করার পালা।`,
    });

    stepNum++;
    const finalChain = [...chain, newNode];
    steps.push({
      stepNumber: stepNum,
      action: 'link-tail',
      sourceNodeId: targetNode.id,
      targetNodeId: newNode.id,
      hopsSoFar: currentHops,
      pointerChangesSoFar: 1,
      chainState: finalChain,
      messageEn: `Connected tail (${targetNode.nameEn}) → ${newNode.nameEn}. 1 pointer change! Cards moved: 0.`,
      messageBn: `শেষ চিরকুট (${targetNode.nameBn}) → ${newNode.nameBn} যুক্ত হলো। ১টি পয়েন্টার পরিবর্তন! কাউকে সরাতে হয়নি (০টি কার্ড সরানো)।`,
    });

    return steps;
  }

  // Case B: Inserting in the middle
  // (1) New card appears below the chain
  stepNum++;
  steps.push({
    stepNumber: stepNum,
    action: 'appear',
    activeNodeId: newNode.id,
    hopsSoFar: currentHops,
    pointerChangesSoFar: 0,
    chainState: [...chain],
    newPendingNode: newNode,
    messageEn: `Step 1: Wrote new slip for ${newNode.nameEn}. It appears below the chain. Pointer changes: 0.`,
    messageBn: `ধাপ ১: ${newNode.nameBn}-এর চিরকুট প্রস্তুত। এটি শিকলের নিচে রাখা হলো। পয়েন্টার পরিবর্তন: ০।`,
  });

  // (2) New card links to chosen clue's old next card
  stepNum++;
  steps.push({
    stepNumber: stepNum,
    action: 'link-new-to-next',
    sourceNodeId: newNode.id,
    targetNodeId: nextNode.id,
    hopsSoFar: currentHops,
    pointerChangesSoFar: 1,
    chainState: [...chain],
    newPendingNode: newNode,
    pendingNextId: nextNode.id,
    messageEn: `Step 2 (Order matters!): Pointed ${newNode.nameEn} → ${nextNode.nameEn} first (Pointer change 1). If we redirected ${targetNode.nameEn} first, the rest of the chain would be lost forever!`,
    messageBn: `ধাপ ২ (ক্রম খুবই গুরুত্বপূর্ণ!): প্রথমে ${newNode.nameBn} → ${nextNode.nameBn}-কে যুক্ত করা হলো (পয়েন্টার পরিবর্তন ১)। আগে ${targetNode.nameBn}-কে বদলে দিলে বাকি সব চিরকুট চিরতরে হারিয়ে যেত!`,
  });

  // (3) Chosen clue links to the new card
  stepNum++;
  const finalChain = [
    ...chain.slice(0, targetIndex + 1),
    newNode,
    ...chain.slice(targetIndex + 1),
  ];
  steps.push({
    stepNumber: stepNum,
    action: 'link-prev-to-new',
    sourceNodeId: targetNode.id,
    targetNodeId: newNode.id,
    hopsSoFar: currentHops,
    pointerChangesSoFar: 2,
    chainState: finalChain,
    messageEn: `Step 3: Redirected ${targetNode.nameEn} → ${newNode.nameEn} (Pointer change 2). Insertion complete! Cards moved: 0.`,
    messageBn: `ধাপ ৩: এবার ${targetNode.nameBn} → ${newNode.nameBn}-কে জুড়ে দেওয়া হলো (পয়েন্টার পরিবর্তন ২)। যুক্ত করা সম্পন্ন! কাউকে সরাতে হয়নি (০টি কার্ড সরানো)।`,
  });

  return steps;
}

/**
 * Pure generator: Remove clue at targetIndex
 */
export function deleteSteps(
  chain: ClueNode[],
  targetIndex: number
): LinkedListStep[] {
  if (chain.length === 0 || targetIndex < 0 || targetIndex >= chain.length) {
    return [
      {
        stepNumber: 1,
        action: 'error',
        hopsSoFar: 0,
        pointerChangesSoFar: 0,
        chainState: [...chain],
        messageEn: 'Invalid clue to remove or chain is empty.',
        messageBn: 'অপসারণ করার মতো চিরকুট খুঁজে পাওয়া যায়নি বা শিকল খালি।',
      },
    ];
  }

  const steps: LinkedListStep[] = [];
  const nodeToRemove = chain[targetIndex];

  // Case A: Deleting the head (index 0)
  if (targetIndex === 0) {
    const nextHead = chain[1];
    const finalChain = chain.slice(1);
    steps.push({
      stepNumber: 1,
      action: 'move-head',
      activeNodeId: nodeToRemove.id,
      hopsSoFar: 0,
      pointerChangesSoFar: 1,
      chainState: finalChain,
      messageEn: nextHead
        ? `Removed head (${nodeToRemove.nameEn}). The Start tag simply moves to ${nextHead.nameEn} (1 pointer change). Cards moved: 0.`
        : `Removed head (${nodeToRemove.nameEn}). The chain is now empty (1 pointer change).`,
      messageBn: nextHead
        ? `হেড (${nodeToRemove.nameBn}) সরানো হলো। শুরুর ট্যাগটি সোজা ${nextHead.nameBn}-এ চলে গেল (১টি পয়েন্টার পরিবর্তন)। কাউকে সরাতে হয়নি (০টি কার্ড সরানো)।`
        : `হেড (${nodeToRemove.nameBn}) সরানো হলো। শিকলটি এখন সম্পূর্ণ খালি।`,
    });
    return steps;
  }

  // Case B: Deleting in the middle or tail
  // First walk to the clue BEFORE the chosen one (index targetIndex - 1)
  const prevIndex = targetIndex - 1;
  const walkSteps = traverseSteps(chain, prevIndex);
  steps.push(...walkSteps);

  let stepNum = steps.length;
  const prevNode = chain[prevIndex];
  const nextNode = chain[targetIndex + 1];

  stepNum++;
  const finalChain = [
    ...chain.slice(0, targetIndex),
    ...chain.slice(targetIndex + 1),
  ];

  steps.push({
    stepNumber: stepNum,
    action: 'remove-link',
    sourceNodeId: prevNode.id,
    targetNodeId: nextNode ? nextNode.id : undefined,
    activeNodeId: nodeToRemove.id,
    hopsSoFar: prevIndex,
    pointerChangesSoFar: 1,
    chainState: finalChain,
    messageEn: nextNode
      ? `Redirected ${prevNode.nameEn} past ${nodeToRemove.nameEn} directly to ${nextNode.nameEn} (1 pointer change). ${nodeToRemove.nameEn} is now unlinked! Cards moved: 0.`
      : `Removed tail clue (${nodeToRemove.nameEn}). ${prevNode.nameEn} is now the end (1 pointer change). Cards moved: 0.`,
    messageBn: nextNode
      ? `${prevNode.nameBn}-কে ${nodeToRemove.nameBn} এড়িয়ে সরাসরি ${nextNode.nameBn}-এর সাথে যুক্ত করা হলো (১টি পয়েন্টার পরিবর্তন)। ${nodeToRemove.nameBn} বিচ্ছিন্ন হয়ে গেল! কাউকে সরাতে হয়নি (০টি কার্ড সরানো)।`
      : `শেষ চিরকুট (${nodeToRemove.nameBn}) মুছে ফেলা হলো। এখন ${prevNode.nameBn}-ই শেষ (১টি পয়েন্টার পরিবর্তন)। কাউকে সরাতে হয়নি (০টি কার্ড সরানো)।`,
  });

  return steps;
}
