import { describe, it, expect } from 'vitest';
import {
  readSteps,
  appendSteps,
  insertSteps,
  deleteSteps,
  CAPACITY,
} from './array';

describe('Array Algorithm Step Generators', () => {
  const initialLockers = [
    'Rafi',
    'Nila',
    'Sumon',
    'Mitu',
    'Arif',
    'Joya',
    'Tuhin',
    null,
    null,
    null,
  ];

  describe('readSteps', () => {
    it('always takes exactly 1 step to read any locker by index', () => {
      const steps = readSteps(initialLockers, 3);
      expect(steps.length).toBe(1);
      expect(steps[0].action).toBe('read');
      expect(steps[0].student).toBe('Mitu');
      expect(steps[0].movesSoFar).toBe(0);
    });

    it('reads empty locker in 1 step', () => {
      const steps = readSteps(initialLockers, 8);
      expect(steps.length).toBe(1);
      expect(steps[0].action).toBe('read');
      expect(steps[0].student).toBeUndefined();
    });
  });

  describe('appendSteps', () => {
    it('adds item at the end with 0 moves', () => {
      const steps = appendSteps(initialLockers, 'Tania');
      expect(steps.length).toBe(1);
      expect(steps[0].action).toBe('append');
      expect(steps[0].index).toBe(7);
      expect(steps[0].student).toBe('Tania');
      expect(steps[0].movesSoFar).toBe(0);
      expect(steps[0].arrayState[7]).toBe('Tania');
    });
  });

  describe('insertSteps', () => {
    it('edge case: insert at 0 shifts all existing students right', () => {
      // 7 students, inserting at 0 requires 7 shifts + 1 place step = 8 steps
      const steps = insertSteps(initialLockers, 0, 'Tania');
      expect(steps.length).toBe(8);
      const lastStep = steps[steps.length - 1];
      expect(lastStep.action).toBe('place');
      expect(lastStep.index).toBe(0);
      expect(lastStep.student).toBe('Tania');
      expect(lastStep.movesSoFar).toBe(7);
      expect(lastStep.arrayState[0]).toBe('Tania');
      expect(lastStep.arrayState[1]).toBe('Rafi');
    });

    it('inserting at index 2 with 7 students causes exactly 5 moves', () => {
      // 7 students (0..6). Inserting at 2 means shifting 6,5,4,3,2 (5 students)
      const steps = insertSteps(initialLockers, 2, 'Tania');
      expect(steps.length).toBe(6); // 5 shifts + 1 place
      const lastStep = steps[steps.length - 1];
      expect(lastStep.action).toBe('place');
      expect(lastStep.movesSoFar).toBe(5);
      expect(lastStep.arrayState[2]).toBe('Tania');
      expect(lastStep.arrayState[3]).toBe('Sumon');
    });

    it('edge case: insert at the end behaves like append (0 moves)', () => {
      const steps = insertSteps(initialLockers, 7, 'Tania');
      expect(steps.length).toBe(1);
      expect(steps[0].action).toBe('append');
      expect(steps[0].movesSoFar).toBe(0);
      expect(steps[0].arrayState[7]).toBe('Tania');
    });

    it('edge case: insert into full array returns error step and does not mutate', () => {
      const fullArray = [
        'S0', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9',
      ];
      const snapshot = [...fullArray];
      const steps = insertSteps(fullArray, 2, 'Tania');
      expect(steps.length).toBe(1);
      expect(steps[0].action).toBe('error');
      expect(steps[0].movesSoFar).toBe(0);
      expect(steps[0].messageEn).toContain('The row is full');
      expect(steps[0].messageBn).toContain('সারি ভরে গেছে');
      // Must not mutate
      expect(steps[0].arrayState).toEqual(snapshot);
      expect(fullArray).toEqual(snapshot);
    });
  });

  describe('deleteSteps', () => {
    it('edge case: delete the last item requires 0 shifts', () => {
      // 7 students (0..6). Deleting index 6 (last)
      const steps = deleteSteps(initialLockers, 6);
      expect(steps.length).toBe(1);
      expect(steps[0].action).toBe('remove');
      expect(steps[0].student).toBe('Tuhin');
      expect(steps[0].movesSoFar).toBe(0);
      expect(steps[0].arrayState[6]).toBeNull();
    });

    it('delete in the middle shifts subsequent students left', () => {
      // Deleting index 2 ('Sumon'). Students at 3..6 (4 students) shift left
      const steps = deleteSteps(initialLockers, 2);
      expect(steps.length).toBe(5); // 1 remove + 4 shifts
      const lastStep = steps[steps.length - 1];
      expect(lastStep.action).toBe('shift-left');
      expect(lastStep.movesSoFar).toBe(4);
      expect(lastStep.arrayState[2]).toBe('Mitu');
      expect(lastStep.arrayState[5]).toBe('Tuhin');
      expect(lastStep.arrayState[6]).toBeNull();
    });
  });
});

