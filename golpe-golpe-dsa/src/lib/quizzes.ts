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
  array: {
    bn: [
      {
        question: 'অ্যারেতে গোনা ০ থেকে শুরু হয় কেন?',
        options: [
          {
            text: 'কম্পিউটার ১ পছন্দ করে না',
            isCorrect: false,
            explanation: 'না, কম্পিউটার যে কোনো সংখ্যা গণনা করতে পারে।',
          },
          {
            text: 'ইনডেক্স হলো শুরু থেকে দূরত্ব, আর প্রথম জিনিস শুরু থেকে ০ ধাপ দূরে',
            isCorrect: true,
            explanation:
              'সঠিক! ইনডেক্স নির্দেশ করে শুরুর দেয়াল বা অবস্থান থেকে কত ঘর সামনে এগোতে হবে। প্রথম উপাদানটি শুরুর অবস্থানেই থাকে, তাই তার দূরত্ব ০।',
          },
          {
            text: 'প্রথম লকারটা ভাঙা',
            isCorrect: false,
            explanation: 'না, এটি বাস্তবসম্মত কোনো কারণ নয়।',
          },
        ],
      },
      {
        question: '১০,০০,০০০টি লকারের সারিতে ৫৭ নম্বর লকার খুলতে কত ধাপ লাগে?',
        options: [
          {
            text: '৫৭টি ধাপ',
            isCorrect: false,
            explanation: '৫৭টি ধাপ লাগত যদি একটি একটি করে হেঁটে দেখতে হতো।',
          },
          {
            text: '১০,০০,০০০টি ধাপ',
            isCorrect: false,
            explanation: '১০ লাখ ধাপ কখনোই লাগবে না।',
          },
          {
            text: 'মাত্র ১টি ধাপ',
            isCorrect: true,
            explanation:
              'অসাধারণ! অ্যারেতে ইনডেক্স জানা থাকলে মেমরি সরাসরি সেই ঠিকানায় লাফ দেয়। সারিতে ১০টি উপাদান থাক বা ১ কোটি, সময় সবসময় ধ্রুব বা ১ ধাপ।',
          },
        ],
      },
      {
        question:
          '০ থেকে ৬ নম্বর লকারে ৭ জন ছাত্র আছে। ০ নম্বর লকারে নতুন একজনকে বসাতে কতজনকে সরতে হবে?',
        options: [
          {
            text: '০ জন',
            isCorrect: false,
            explanation: '০ নম্বরে জায়গা করতে হলে কাউকে না কাউকে সরাতেই হবে।',
          },
          {
            text: '৭ জন',
            isCorrect: true,
            explanation:
              'একদম ঠিক! ০ থেকে ৬ পর্যন্ত থাকা ৭ জন ছাত্রের প্রত্যেককে ১ ঘর করে ডানে (১ থেকে ৭ এ) সরতে হবে।',
          },
          {
            text: '১ জন',
            isCorrect: false,
            explanation: 'শুধু ১ জনকে সরালে বাকিদের সাথে জায়গা ধাক্কাধাক্কি লেগে যাবে।',
          },
        ],
      },
    ],
    en: [
      {
        question: 'Why does an array start counting at 0?',
        options: [
          {
            text: 'Because computers dislike 1',
            isCorrect: false,
            explanation: 'No, computers have no emotional preference for numbers!',
          },
          {
            text: 'Because the index is the distance from the start, and the first item is 0 steps away',
            isCorrect: true,
            explanation:
              'Correct! An index measures memory offset (distance) from the starting address. The very first element is at offset 0.',
          },
          {
            text: 'Because the first locker is broken',
            isCorrect: false,
            explanation: 'No, all lockers in memory work fine!',
          },
        ],
      },
      {
        question: 'A row has 1,000,000 lockers. How many steps to open locker 57?',
        options: [
          {
            text: '57 steps',
            isCorrect: false,
            explanation: '57 steps would be linear traversal, not direct indexing.',
          },
          {
            text: '1,000,000 steps',
            isCorrect: false,
            explanation: 'You do not have to check the whole row.',
          },
          {
            text: '1 step',
            isCorrect: true,
            explanation:
              'Exactly right! With the index in hand, direct access computes the memory address instantly in 1 step (O(1)).',
          },
        ],
      },
      {
        question:
          '7 students are in lockers 0 to 6. How many students must move to put a new student in locker 0?',
        options: [
          {
            text: '0 students',
            isCorrect: false,
            explanation: 'Locker 0 is currently occupied, so someone must move.',
          },
          {
            text: '7 students',
            isCorrect: true,
            explanation:
              'Spot on! All 7 students currently occupying indices 0 through 6 must shift right by one locker to make room at index 0.',
          },
          {
            text: '1 student',
            isCorrect: false,
            explanation: 'Shifting only 1 student would overwrite locker 1.',
          },
        ],
      },
    ],
  },
  'linked-list': {
    bn: [
      {
        question: 'গুপ্তধন খোঁজায় ৫ নম্বর চিরকুটে কীভাবে পৌঁছাবেন?',
        options: [
          {
            text: 'নম্বর ধরে সরাসরি লাফ দিয়ে',
            isCorrect: false,
            explanation:
              'না, লিংকড লিস্টে কোনো ইনডেক্স ধরে সরাসরি লাফ দেওয়া যায় না। প্রতিটি নোড শুধু পরেরটার ঠিকানা জানে।',
          },
          {
            text: 'প্রথম চিরকুট থেকে শুরু করে লিংক ধরে এগিয়ে',
            isCorrect: true,
            explanation:
              'সঠিক! ৫ নম্বর চিরকুট কোথায়, তা জানে শুধু ৪ নম্বর চিরকুট, তাই শুরু (হেড) থেকে শিকল ধরে একটার পর একটা লিংক পার হতে হবে।',
          },
          {
            text: '৫ নম্বর চিরকুটকেই জিজ্ঞেস করে',
            isCorrect: false,
            explanation:
              '৫ নম্বর চিরকুট কোথায় আছে তা আপনি পৌঁছানোর আগে তাকে জিজ্ঞেস করার কোনো সুযোগ নেই।',
          },
        ],
      },
      {
        question:
          '"আমগাছ" আর "পানির ট্যাংক"-এর মাঝখানে "রান্নাঘর" ঢোকালেন। আগে থেকে থাকা কয়টি চিরকুট বদলাতে হলো?',
        options: [
          {
            text: 'আমগাছের পরের সবগুলো চিরকুট',
            isCorrect: false,
            explanation:
              'না, অ্যারের মতো এখানে কাউকে সরাতে হয় না বা পেছনের কারও লিংক বদলাতে হয় না।',
          },
          {
            text: 'শুধু আমগাছের চিরকুটটা',
            isCorrect: true,
            explanation:
              'একেবারে সঠিক! নতুন চিরকুট নিজে পানির ট্যাংকের দিকে তাকায়, আর আমগাছের পুরোনো চিরকুটটি এখন রান্নাঘরের দিকে তাকায়। আগে থেকে থাকা বাকি কোনো চিরকুটকে ছুঁতেও হয় না।',
          },
          {
            text: 'একটাও না',
            isCorrect: false,
            explanation:
              'অন্তত একটি চিরকুট বদলাতেই হবে, নইলে আমগাছের পর রান্নাঘরে যাওয়ার কোনো লিংক তৈরি হবে না।',
          },
        ],
      },
      {
        question:
          '৫০০ নম্বর জিনিসটা বারবার সবচেয়ে দ্রুত পড়তে হবে। কোনটা ভালো?',
        options: [
          {
            text: 'লিংকড লিস্ট',
            isCorrect: false,
            explanation:
              'না, লিংকড লিস্টে ৫০০ নম্বর জিনিসে পৌঁছাতে প্রতিবারই শুরু থেকে ৪৯৯টি হপ বা লিংক পার হতে হবে।',
          },
          {
            text: 'অ্যারে',
            isCorrect: true,
            explanation:
              'চমৎকার! অ্যারে যেকোনো অবস্থান মেমরি সূত্র দিয়ে সরাসরি ১ ধাপে (O(1)) পড়তে পারে, যেখানে লিংকড লিস্টে লাগে ৪৯৯টি হপ।',
          },
          {
            text: 'দুটোই সমান',
            isCorrect: false,
            explanation:
              'মোটেই সমান নয়—অ্যারে ১ ধাপে পড়বে এবং লিংকড লিস্টে ৪৯৯টি ধাপ পার হতে হবে।',
          },
        ],
      },
    ],
    en: [
      {
        question: 'How do you reach the 5th clue in the treasure hunt?',
        options: [
          {
            text: 'Jump straight to it using its number',
            isCorrect: false,
            explanation:
              'No, in a linked list there are no numbered slots to jump to; each node only points to the next.',
          },
          {
            text: 'Start at the first clue and follow the links',
            isCorrect: true,
            explanation:
              'Correct! Only the 4th clue knows where the 5th one is, so you must follow the chain from the start (the head).',
          },
          {
            text: 'Ask the 5th clue where it is',
            isCorrect: false,
            explanation:
              'You cannot talk to the 5th clue before finding it!',
          },
        ],
      },
      {
        question:
          'You insert "Kitchen" between "Mango tree" and "Water tank". How many existing clues must be changed?',
        options: [
          {
            text: 'All the clues after the mango tree',
            isCorrect: false,
            explanation:
              'No, unlike arrays, subsequent items do not shift or change memory addresses.',
          },
          {
            text: "Only the mango tree's clue",
            isCorrect: true,
            explanation:
              "Spot on! The new clue points to the water tank, and the mango tree's clue now points to the kitchen. Nobody else changes.",
          },
          {
            text: 'None',
            isCorrect: false,
            explanation:
              "At least one existing clue's pointer must change to link the new node into the chain.",
          },
        ],
      },
      {
        question:
          'You need to read item number 500 as fast as possible, again and again. Which is better?',
        options: [
          {
            text: 'A linked list',
            isCorrect: false,
            explanation:
              'No, a linked list must traverse 499 hops from the head every single time.',
          },
          {
            text: 'An array',
            isCorrect: true,
            explanation:
              'Exactly right! An array reads any position in 1 step (O(1)) via direct address calculation; a linked list needs 499 hops.',
          },
          {
            text: 'Both are the same',
            isCorrect: false,
            explanation:
              'They are very different: 1 step vs 499 hops!',
          },
        ],
      },
    ],
  },
};

export function getChapterQuiz(slug: string, lang: Locale): QuizQuestion[] {
  return CHAPTER_QUIZZES[slug]?.[lang] || [];
}
