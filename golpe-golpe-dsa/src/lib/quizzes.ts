import { Locale } from './i18n/config';
import { QuizQuestion } from '@/components/content/Quiz';

export const CHAPTER_QUIZZES: Record<string, Record<Locale, QuizQuestion[]>> = {
  'what-is-a-data-structure': {
    bn: [
      {
        question:
          'রাফির এলোমেলো স্তূপে ১৬টি বই থাকলে সবচেয়ে খারাপ পরিস্থিতিতে (Worst Case) বইটি খুঁজে পেতে সর্বোচ্চ কতটি বই দেখতে হতে পারে?',
        options: [
          {
            text: 'সর্বোচ্চ ৪টি বই',
            isCorrect: false,
            explanation:
              'না, এলোমেলো স্তূপে কোনো নির্দিষ্ট প্যাটার্ন থাকে না। তাই প্রথম ৪টিতে না পেলে আরও খুঁজতে হবে।',
          },
          {
            text: 'সর্বোচ্চ ১৬টি বই',
            isCorrect: true,
            explanation:
              'সঠিক! যদি বইটি স্তূপের একদম শেষ বই হয় বা সেখানে না-ই থাকে, তবে ১৬টি বই-ই একে একে দেখতে হবে।',
          },
          {
            text: 'সর্বোচ্চ ৮টি বই',
            isCorrect: false,
            explanation:
              'এটি কেবল তখনই হতো যদি আমরা প্রতি পদক্ষেপে অর্ধেক বাদ দিতে পারতাম, যা অগোছালো স্তূপে সম্ভব নয়।',
          },
        ],
      },
      {
        question:
          'নীলা তার সাজানো তাকে ১৬টি বইয়ের মধ্যে খুঁজতে গিয়ে প্রতি ধাপে কী কৌশল ব্যবহার করেছে?',
        options: [
          {
            text: 'একদম শেষ বই থেকে উল্টো দিকে খোঁজা শুরু করেছে',
            isCorrect: false,
            explanation:
              'শেষ থেকে শুরু করলেও তা এক ধরণের লিনিয়ার সার্চ হতো, যা কোনো সময় বাঁচাত না।',
          },
          {
            text: 'মাঝের বইটি দেখে বুঝতে পেরেছে কোন পাশের অর্ধেক সম্পূর্ণ বাদ দেওয়া যায়',
            isCorrect: true,
            explanation:
              'একেবারে সঠিক! বইগুলো ছোট থেকে বড় ক্রমে সাজানো থাকায় মাঝের বইটির মান দেখে এক পাশের সম্পূর্ণ অংশ বাদ দেওয়া সম্ভব হয়েছে।',
          },
          {
            text: 'লটারি করে যেকোনো একটি বই তুলে দেখেছে',
            isCorrect: false,
            explanation:
              'লটারি বা এলোমেলোভাবে বাছাই করা কোনো নির্ভরযোগ্য অ্যালগরিদম নয়।',
          },
        ],
      },
      {
        question:
          'যদি কোনো তাকে ১,০০০টি বই ক্রমানুসারে সাজানো থাকে, তবে বাইনারি সার্চ পদ্ধতিতে সর্বোচ্চ কয়টি পদক্ষেপে যেকোনো বই খুঁজে বের করা সম্ভব?',
        options: [
          {
            text: 'প্রায় ৫০০টি',
            isCorrect: false,
            explanation:
              '৫০০টি পদক্ষেপ লাগবে না; বাইনারি সার্চ প্রতি ধাপে অর্ধেক বাদ দেয় (১০০০ -> ৫০০ -> ২৫০ -> ১২৫...)।',
          },
          {
            text: 'মাত্র ১০টি পদক্ষেপের আশেপাশে',
            isCorrect: true,
            explanation:
              'চমৎকার! ২ এর ঘাত হিসেবে ২^১০ = ১০২৪। তাই ১,০০০টি সাজানো উপাত্তের মধ্যে বাইনারি সার্চে সর্বোচ্চ ১০ থেকে ১১টি ধাপ লাগে।',
          },
          {
            text: '১,০০০টি পদক্ষেপ',
            isCorrect: false,
            explanation:
              '১,০০০টি পদক্ষেপ লাগত যদি বইগুলো অগোছালো স্তূপে থাকত।',
          },
        ],
      },
    ],
    en: [
      {
        question:
          "In Rafi's messy pile of 16 books, what is the maximum number of books he might have to inspect in the worst-case scenario?",
        options: [
          {
            text: 'At most 4 books',
            isCorrect: false,
            explanation:
              'No, because the books are unsorted, you cannot safely rule out books in batches.',
          },
          {
            text: 'At most 16 books',
            isCorrect: true,
            explanation:
              'Correct! If the target book is at the very bottom of the pile or missing, all 16 books must be inspected.',
          },
          {
            text: 'At most 8 books',
            isCorrect: false,
            explanation:
              'Halving the search space is only possible when data is already sorted.',
          },
        ],
      },
      {
        question:
          'What core strategy allows Nila to find her book so much faster on her shelf?',
        options: [
          {
            text: 'She checks books from the right end backwards',
            isCorrect: false,
            explanation:
              'Starting backwards is still linear search and does not improve worst-case complexity.',
          },
          {
            text: 'Because the shelf is sorted, opening the middle book allows her to discard an entire half of the books',
            isCorrect: true,
            explanation:
              'Spot on! By comparing the target with the middle element, she safely eliminates half of the remaining books in a single check.',
          },
          {
            text: 'She guesses a random book and hopes for luck',
            isCorrect: false,
            explanation:
              'Random guessing is not a deterministic algorithm and provides no guarantees.',
          },
        ],
      },
      {
        question:
          'If a shelf contains 1,000 sorted books, approximately how many steps does Binary Search need in the worst case?',
        options: [
          {
            text: 'Around 500 steps',
            isCorrect: false,
            explanation:
              'Binary search divides by 2 on every step (1000 -> 500 -> 250 -> 125...), so it finishes vastly quicker.',
          },
          {
            text: 'Around 10 steps',
            isCorrect: true,
            explanation:
              'Excellent! Since 2^10 = 1024, repeatedly dividing 1,000 in half reaches a single item in just 10 steps.',
          },
          {
            text: '1,000 steps',
            isCorrect: false,
            explanation:
              '1,000 steps would only be required if the books were in a completely disordered pile.',
          },
        ],
      },
    ],
  },
};

export function getChapterQuiz(slug: string, lang: Locale): QuizQuestion[] {
  return CHAPTER_QUIZZES[slug]?.[lang] || [];
}

