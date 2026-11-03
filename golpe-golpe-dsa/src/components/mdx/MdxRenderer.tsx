import { MDXRemote } from 'next-mdx-remote/rsc';
import { Story } from '@/components/content/Story';
import { Definition } from '@/components/content/Definition';
import { Remember } from '@/components/content/Remember';
import { CodeTabs } from '@/components/content/CodeTabs';
import { Quiz } from '@/components/content/Quiz';
import { BookSearchLab } from '@/components/labs/BookSearchLab';
import { LockerArrayLab } from '@/components/labs/LockerArrayLab';
import { ClueChainLab } from '@/components/labs/ClueChainLab';
import { Locale } from '@/lib/i18n/config';
import { getChapterQuiz } from '@/lib/quizzes';
import { getChapterCode } from '@/lib/codeSnippets';

interface MdxRendererProps {
  source: string;
  lang: Locale;
  slug: string;
}

export function MdxRenderer({ source, lang, slug }: MdxRendererProps) {
  const components = {
    Story,
    Definition,
    Remember,
    CodeTabs: (props: any) => {
      const code = getChapterCode(slug, lang);
      return (
        <CodeTabs
          jsCode={props.jsCode || props.js || code.js}
          pyCode={props.pyCode || props.py || code.py}
          jsTitle={props.jsTitle}
          pyTitle={props.pyTitle}
          {...props}
        />
      );
    },
    BookSearchLab: () => <BookSearchLab lang={lang} />,
    LockerArrayLab: () => <LockerArrayLab lang={lang} />,
    ClueChainLab: () => <ClueChainLab lang={lang} />,
    Quiz: (props: any) => {
      const questions =
        props.questions && props.questions.length > 0
          ? props.questions
          : getChapterQuiz(slug, lang);
      return <Quiz chapterSlug={slug} lang={lang} questions={questions} {...props} />;
    },
  };

  return (
    <article className="prose dark:prose-invert max-w-none font-body text-[18px] leading-relaxed">
      <MDXRemote source={source} components={components} />
    </article>
  );
}
