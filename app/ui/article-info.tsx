interface ArticleInfoProps {
  category: string;
  title: string;
  description?: string;
  author: {
    avatar: string;
    name: string;
    date?: string;
  };
}

export default function ArticleInfo({
  category,
  title,
  description,
  author,
}: ArticleInfoProps) {
  return (
    <div className="flex flex-col gap-2 lg:gap-3">
      <p className="text-paragraphColor text-xs md:text-sm lg:text-lg">
        {category}
      </p>
      <b className="text-sm line-clamp-3 md:text-base lg:text-[26px]">
        {title}
      </b>
      <p className="text-xs text-paragraphColor line-clamp-2 md:text-sm lg:text-lg">
        {description}
      </p>
      <div className="flex gap-2 items-center mt-1 lg:gap-3">
        <img
          src={author.avatar}
          alt=""
          className="size-5 rounded-full lg:size-7"
        />
        <b className="text-xs md:text-sm">{author.name}</b>
        {author.date && (
          <p className="font-medium text-xs text-paragraphColor ml-2 md:text-sm">
            {author.date}
          </p>
        )}
      </div>
    </div>
  );
}
