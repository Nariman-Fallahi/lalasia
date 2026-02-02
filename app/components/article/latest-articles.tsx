import { ARTICLE_INTRO } from "~/constants/intros";
import type { Article } from "~/types";
import ArticleInfo from "~/ui/article-info";
import EyebrowHeader from "~/ui/section-header/eyebrow-header";
import TitleHeader from "~/ui/section-header/title-header";
import { formatDateReadable } from "~/utils/format-date-readable";

interface LatestArticlesProps {
  latestArticles: Article[];
}

export default function LatestArticles({
  latestArticles,
}: LatestArticlesProps) {
  const { title, eyebrow } = ARTICLE_INTRO.latest;
  return (
    <div className="w-full flex flex-col px-3 mt-10 md:px-6 lg:p-8 gap-2">
      <EyebrowHeader text={eyebrow} />
      <TitleHeader text={title} />

      <div className="mt-3 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:mt-10 lg:gap-10">
        {latestArticles.map((item) => (
          <div className="flex flex-col gap-3">
            <img
              src={item.image}
              alt=""
              className="w-full h-50 object-center object-cover lg:h-80"
            />
            <ArticleInfo
              category={item.category!}
              title={item.title}
              description={item.description}
              author={{
                avatar: item.author_avatar,
                name: `By ${item.author_name}`,
                date: formatDateReadable(item.created_at),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
