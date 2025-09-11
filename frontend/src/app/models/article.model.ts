export interface Article {
  id: number;
  articleNumber: string;
  name: string;
  articleCategory: string;
  bicycleCategory: string[];
  material: string;
  netWeightGrams: number;
  lengthMm: number;
  widthMm: number;
  heightMm: number;
}

export interface ArticleCreateDto {
  articleNumber: string;
  name: string;
  articleCategory: string;
  bicycleCategory: string[];
  material: string;
  netWeightGrams: number;
  lengthMm: number;
  widthMm: number;
  heightMm: number;
}

export interface ArticleUpdateDto extends Partial<ArticleCreateDto> {}