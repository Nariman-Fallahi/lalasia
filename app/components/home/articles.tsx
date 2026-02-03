import { HOME_INTRO } from "~/constants/intros";
import type { Article } from "~/types";
import ArticleInfo from "~/ui/article-info";
import DescriptionHeader from "~/ui/section-header/description-header";
import EyebrowHeader from "~/ui/section-header/eyebrow-header";
import TitleHeader from "~/ui/section-header/title-header";

interface ArticlesProps {
  articles: Article[];
  latestArticle: Article;
}

export default function Articles({ articles, latestArticle }: ArticlesProps) {
  const { title, description, eyebrow } = HOME_INTRO.article;

  return (
    <div className="w-full flex flex-col px-3 mt-10 md:px-6 lg:p-8 md:flex-row md:gap-5 lg:gap-10">
      <div className="w-full flex flex-col md:w-[70%]">
        <div className="flex flex-col lg:gap-2">
          <EyebrowHeader text={eyebrow} />
          <div className="gap-2 flex flex-col lg:gap-3">
            <TitleHeader text={title} />
            <DescriptionHeader className="md:w-full" text={description} />
          </div>
        </div>

        <div className="mt-6 relative bg-red-50 md:mt-8 lg:mt-10">
          <img
            src={latestArticle?.image}
            alt=""
            className="md:h-full rounded"
          />

          <div className="absolute w-full px-3 bottom-12 flex flex-col text-white gap-3">
            <b className="text-xs mt-14 lg:text-lg">{latestArticle?.category}</b>
            <b className="lg:text-[26px]">{latestArticle?.title}</b>
            <p className="text-sm text-gray-200 line-clamp-1 font-medium lg:text-lg">
              {latestArticle?.description}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:w-[90%] gap-6 md:gap-8 mt-10 md:mt-0">
        {articles.map((item) => (
          <div
            key={item?.id}
            className="flex justify-between md:items-center gap-4 lg:gap-8"
          >
            <img
              src={item?.image}
              alt=""
              className="h-40 md:h-full w-[35%] lg:w-[40%] rounded"
            />
            <ArticleInfo
              category={item?.category || ""}
              title={item?.title}
              description={item?.description}
              author={{
                avatar: item?.author_avatar,
                name: `By ${item?.author_name}`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
