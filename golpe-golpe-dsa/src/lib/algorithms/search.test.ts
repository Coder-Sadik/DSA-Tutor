import { describe, it, expect } from 'vitest';
import { linearSearchSteps, binarySearchSteps } from './search';

describe('Search Algorithms Step Tracers', () => {
  const items = [10, 20, 30, 40, 50, 60, 70];
  const sorted16 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  describe('linearSearchSteps', () => {
    it('edge case: target at FIRST position (index 0)', () => {
      const steps = linearSearchSteps(items, 10);
      expect(steps.length).toBe(1);
      expect(steps[0].found).toBe(true);
      expect(steps[0].status).toBe('found');
      expect(steps[0].currentIndex).toBe(0);
      expect(steps[0].currentValue).toBe(10);
      expect(steps[0].discardedIndices).toEqual([]);
    });

    it('edge case: target in the MIDDLE position', () => {
      // Middle of items (length 7) is index 3 (value 40)
      const steps = linearSearchSteps(items, 40);
      expect(steps.length).toBe(4);
      expect(steps[3].found).toBe(true);
      expect(steps[3].status).toBe('found');
      expect(steps[3].currentIndex).toBe(3);
      expect(steps[3].currentValue).toBe(40);
      expect(steps[3].discardedIndices).toEqual([0, 1, 2]);
    });

    it('edge case: target at LAST position', () => {
      const steps = linearSearchSteps(items, 70);
      expect(steps.length).toBe(7);
      expect(steps[6].found).toBe(true);
      expect(steps[6].status).toBe('found');
      expect(steps[6].currentIndex).toBe(6);
      expect(steps[6].currentValue).toBe(70);
      expect(steps[6].discardedIndices).toEqual([0, 1, 2, 3, 4, 5]);
    });

    it('handles target not found', () => {
      const steps = linearSearchSteps(items, 999);
      expect(steps.length).toBe(8); // 7 checks + 1 not-found step
      expect(steps[7].found).toBe(false);
      expect(steps[7].status).toBe('not-found');
      expect(steps[7].discardedIndices.length).toBe(7);
    });
  });

  describe('binarySearchSteps', () => {
    it('edge case: target at FIRST position (value 1 in 1..16)', () => {
      const steps = binarySearchSteps(sorted16, 1);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.found).toBe(true);
      expect(lastStep.status).toBe('found');
      expect(lastStep.currentIndex).toBe(0);
      expect(lastStep.currentValue).toBe(1);
      expect(steps.length).toBeLessThanOrEqual(5);
    });

    it('edge case: target in the MIDDLE position (value 8 in 1..16, mid = 7)', () => {
      const steps = binarySearchSteps(sorted16, 8);
      expect(steps.length).toBe(1);
      expect(steps[0].found).toBe(true);
      expect(steps[0].status).toBe('found');
      expect(steps[0].currentIndex).toBe(7);
      expect(steps[0].currentValue).toBe(8);
      expect(steps[0].discardedIndices).toEqual([]);
    });

    it('edge case: target at LAST position (value 16 in 1..16)', () => {
      const steps = binarySearchSteps(sorted16, 16);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.found).toBe(true);
      expect(lastStep.status).toBe('found');
      expect(lastStep.currentIndex).toBe(15);
      expect(lastStep.currentValue).toBe(16);
      expect(steps.length).toBeLessThanOrEqual(5);
    });

    it('guarantees finding any of 16 items in at most 5 steps', () => {
      for (const item of sorted16) {
        const steps = binarySearchSteps(sorted16, item);
        expect(steps.length).toBeLessThanOrEqual(5);
        const lastStep = steps[steps.length - 1];
        expect(lastStep.found).toBe(true);
        expect(lastStep.currentValue).toBe(item);
      }
    });

    it('handles target not found', () => {
      const steps = binarySearchSteps(sorted16, 42);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.found).toBe(false);
      expect(lastStep.status).toBe('not-found');
    });
  });
});
