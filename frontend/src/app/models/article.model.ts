export interface Article {
  id: number;
  articleNumber: string;
  name: string;
  articleCategory: string;
  bicycleCategory: string[];
  material: string;
  netWeight: number;
  dimensions?: string;
}

export interface ArticleCreateDto {
  articleNumber: string;
  name: string;
  articleCategory: string;
  bicycleCategory: string[];
  material: string;
  netWeight: number;
  dimensions?: string;
}

export interface ArticleUpdateDto extends Partial<ArticleCreateDto> {}