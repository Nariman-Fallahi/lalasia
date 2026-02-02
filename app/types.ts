export type HomeBenefitFeature = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export type HomeOurProductStat = {
  id: number;
  value: string;
  label: string;
};

export type HomeTestimonial = {
  id: number;
  author_name: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  author_image: string;
};

export type AboutMissionStat = {
  id: number;
  value: string;
  label: string;
};

export type AboutMissionFeature = {
  id: number;
  title: string;
  icon: string;
  description: string;
};

export type AboutTeamMember = {
  id: number;
  image: string;
  name: string;
  position: string;
};

export type Article = {
  id: number;
  created_at: string;
  image: string;
  category: string | undefined;
  title: string;
  author_name: string;
  author_avatar: string;
  description: string;
};

export type ArticleCategory = {
  id: number;
  category: string;
};

export type User = {
  id: string;
  email: string;
};

export type ProductHeroSlide = {
  id: number;
  image: string;
  title: string;
  description: string;
};

export type Product = {
  id: number;
  title: string;
  short_description: string;
  long_description: string;
  price: string;
  image: string;
  category: string;
  color_id: string;
};

export type ServiceData = {
  id: number;
  title: string;
  description: string;
};

export interface ServicePortfolioFeature extends ServiceData {
  image: string;
}
