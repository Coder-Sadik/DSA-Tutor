export interface ChapterMeta {
  order: number;
  slug: string;
  status: 'ready' | 'soon';
  titleBn: string;
  titleEn: string;
  hookBn: string;
  hookEn: string;
}

export const CHAPTERS: ChapterMeta[] = [
  {
    order: 1,
    slug: 'what-is-a-data-structure',
    status: 'ready',
    titleBn: 'ডেটা স্ট্রাকচার কী?',
    titleEn: 'What is a Data Structure?',
    hookBn: 'রাফির এলোমেলো ঘর বনাম নীলার সাজানো বইয়ের তাক',
    hookEn: "Rafi's messy room vs Nila's organized shelf",
  },
  {
    order: 2,
    slug: 'array',
    status: 'ready',
    titleBn: 'অ্যারে (Array)',
    titleEn: 'Array',
    hookBn: 'সারিবদ্ধ নম্বর দেওয়া লকারের গল্প',
    hookEn: 'A row of numbered school lockers',
  },
  {
    order: 3,
    slug: 'linked-list',
    status: 'soon',
    titleBn: 'লিংকড লিস্ট (Linked List)',
    titleEn: 'Linked List',
    hookBn: 'একটি চিরকুটের সূত্র ধরে পরেরটিতে পৌঁছানোর গুপ্তধন সন্ধান',
    hookEn: 'A treasure hunt where each clue leads to the next',
  },
  {
    order: 4,
    slug: 'stack',
    status: 'soon',
    titleBn: 'স্ট্যাক (Stack)',
    titleEn: 'Stack',
    hookBn: 'দাওয়াতের একটার ওপর একটা সাজিয়ে রাখা থালার স্তূপ',
    hookEn: 'A tall pile of plates at a wedding banquet',
  },
  {
    order: 5,
    slug: 'queue',
    status: 'soon',
    titleBn: 'কিউ (Queue)',
    titleEn: 'Queue',
    hookBn: 'কমলাপুর রেলস্টেশনের টিকিট কাউন্টারের লম্বা লাইন',
    hookEn: 'The ticket counter queue at Kamalapur railway station',
  },
  {
    order: 6,
    slug: 'hash-table',
    status: 'soon',
    titleBn: 'হ্যাশ টেবিল (Hash Table)',
    titleEn: 'Hash Table',
    hookBn: 'স্কুলের হাজিরা খাতা ও রোল নম্বরের জাদু',
    hookEn: 'The school attendance roll book and instant lookups',
  },
  {
    order: 7,
    slug: 'tree',
    status: 'soon',
    titleBn: 'ট্রি (Tree)',
    titleEn: 'Tree',
    hookBn: 'দাদার আমল থেকে শুরু হওয়া পারিবারিক বংশলতিকা',
    hookEn: 'A sprawling family tree tracing roots and branches',
  },
  {
    order: 8,
    slug: 'graph',
    status: 'soon',
    titleBn: 'গ্রাফ (Graph)',
    titleEn: 'Graph',
    hookBn: 'ঢাকা শহরের অলিগলি, জ্যাম আর সংযোগকারী উড়ালসেতু',
    hookEn: 'The winding alleys, intersections, and flyovers of Dhaka',
  },
  {
    order: 9,
    slug: 'sorting',
    status: 'soon',
    titleBn: 'সর্টিং (Sorting)',
    titleEn: 'Sorting',
    hookBn: 'স্কুলের প্রাত্যহিক সমাবেশে উচ্চতা অনুযায়ী সারিবদ্ধ দাঁড়ানো',
    hookEn: 'Lining up by height at morning school assembly',
  },
  {
    order: 10,
    slug: 'recursion-and-dynamic-programming',
    status: 'soon',
    titleBn: 'রিকার্শন ও ডাইনামিক প্রোগ্রামিং (Recursion & DP)',
    titleEn: 'Recursion & Dynamic Programming',
    hookBn: 'এক পুতুলের পেটে আরেক পুতুল এবং হিসাব মনে রাখার কৌশল',
    hookEn: 'Russian nesting dolls and remembering previously solved answers',
  },
];
