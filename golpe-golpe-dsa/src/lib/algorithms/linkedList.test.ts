import { describe, it, expect } from 'vitest';
import {
  traverseSteps,
  insertAfterSteps,
  deleteSteps,
  INITIAL_CLUES,
  KITCHEN_CLUE,
} from './linkedList';

describe('Linked List Algorithm Step Generators', () => {
  describe('traverseSteps', () => {
    it('walks to the head with 0 hops', () => {
      const steps = traverseSteps(INITIAL_CLUES, 0);
      expect(steps.length).toBe(1);
      expect(steps[0].action).toBe('walk');
      expect(steps[0].activeNodeId).toBe('front-door');
      expect(steps[0].hopsSoFar).toBe(0);
    });

    it('walks to clue #4 with exactly 3 hops', () => {
      // Clue index 3 is Water tank
      const steps = traverseSteps(INITIAL_CLUES, 3);
      expect(steps.length).toBe(4); // front door (0), shoe rack (1), mango tree (2), water tank (3)
      const lastStep = steps[steps.length - 1];
      expect(lastStep.activeNodeId).toBe('water-tank');
      expect(lastStep.hopsSoFar).toBe(3);
    });

    it('edge case: empty list returns error step', () => {
      const steps = traverseSteps([], 0);
      expect(steps.length).toBe(1);
      expect(steps[0].action).toBe('error');
    });

    it('edge case: search for clue that does not exist walks to the end and reports not found', () => {
      // Target index 99 is out of bounds
      const steps = traverseSteps(INITIAL_CLUES, 99);
      // Walks all 6 nodes + 1 "not found" done step = 7 steps
      expect(steps.length).toBe(7);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.action).toBe('done');
      expect(lastStep.messageEn).toContain('not found');
      expect(lastStep.messageBn).toContain('পাওয়া যায়নি');
    });
  });

  describe('insertAfterSteps', () => {
    it('edge case: insert into empty list creates head with 1 pointer change', () => {
      const steps = insertAfterSteps([], 0, KITCHEN_CLUE);
      expect(steps.length).toBe(1);
      expect(steps[0].action).toBe('move-head');
      expect(steps[0].chainState).toEqual([KITCHEN_CLUE]);
      expect(steps[0].pointerChangesSoFar).toBe(1);
    });

    it('inserts in the middle with exactly 2 pointer changes and correct order', () => {
      // Inserting after Mango tree (index 2)
      // Walk: 3 steps (0, 1, 2)
      // Appear: step 4
      // Link new to next (Kitchen -> Water tank): step 5 (pointerChange 1)
      // Link prev to new (Mango tree -> Kitchen): step 6 (pointerChange 2)
      const steps = insertAfterSteps(INITIAL_CLUES, 2, KITCHEN_CLUE);
      expect(steps.length).toBe(6);

      const appearStep = steps[3];
      expect(appearStep.action).toBe('appear');
      expect(appearStep.newPendingNode?.id).toBe('kitchen');

      const linkNewStep = steps[4];
      expect(linkNewStep.action).toBe('link-new-to-next');
      expect(linkNewStep.sourceNodeId).toBe('kitchen');
      expect(linkNewStep.targetNodeId).toBe('water-tank');
      expect(linkNewStep.pointerChangesSoFar).toBe(1);

      const linkPrevStep = steps[5];
      expect(linkPrevStep.action).toBe('link-prev-to-new');
      expect(linkPrevStep.sourceNodeId).toBe('mango-tree');
      expect(linkPrevStep.targetNodeId).toBe('kitchen');
      expect(linkPrevStep.pointerChangesSoFar).toBe(2);

      // Verify final chain
      expect(linkPrevStep.chainState[3].id).toBe('kitchen');
      expect(linkPrevStep.chainState.length).toBe(7);
    });

    it('edge case: insert after the tail requires only 1 pointer change', () => {
      // Tail is index 5 (Treasure)
      const steps = insertAfterSteps(INITIAL_CLUES, 5, KITCHEN_CLUE);
      // Walk: 6 steps (0..5)
      // Appear: step 7
      // Link tail: step 8 (1 pointer change)
      expect(steps.length).toBe(8);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.action).toBe('link-tail');
      expect(lastStep.pointerChangesSoFar).toBe(1);
      expect(lastStep.chainState[6].id).toBe('kitchen');
    });
  });

  describe('deleteSteps', () => {
    it('edge case: delete the head moves Start tag with 1 pointer change', () => {
      const steps = deleteSteps(INITIAL_CLUES, 0);
      expect(steps.length).toBe(1);
      expect(steps[0].action).toBe('move-head');
      expect(steps[0].pointerChangesSoFar).toBe(1);
      expect(steps[0].chainState[0].id).toBe('shoe-rack');
      expect(steps[0].chainState.length).toBe(5);
    });

    it('deletes in the middle by walking to previous node and 1 pointer change', () => {
      // Delete Mango tree (index 2)
      // Walk to Shoe rack (index 1): 2 steps (0, 1)
      // Redirect Shoe rack -> Water tank: step 3 (1 pointer change)
      const steps = deleteSteps(INITIAL_CLUES, 2);
      expect(steps.length).toBe(3);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.action).toBe('remove-link');
      expect(lastStep.sourceNodeId).toBe('shoe-rack');
      expect(lastStep.targetNodeId).toBe('water-tank');
      expect(lastStep.pointerChangesSoFar).toBe(1);
      expect(lastStep.chainState.map((n) => n.id)).not.toContain('mango-tree');
      expect(lastStep.chainState.length).toBe(5);
    });

    it('edge case: delete the tail unlinks it in 1 pointer change', () => {
      // Delete Treasure (index 5)
      // Walk to Rooftop (index 4): 5 steps (0..4)
      // Remove link: step 6
      const steps = deleteSteps(INITIAL_CLUES, 5);
      expect(steps.length).toBe(6);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.action).toBe('remove-link');
      expect(lastStep.sourceNodeId).toBe('rooftop');
      expect(lastStep.targetNodeId).toBeUndefined();
      expect(lastStep.pointerChangesSoFar).toBe(1);
      expect(lastStep.chainState[lastStep.chainState.length - 1].id).toBe('rooftop');
    });
  });
});
