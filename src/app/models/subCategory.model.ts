export interface GetSubCategoryIndexDto extends GetCategoryIndexDto {
  mainCategoryName: string;
  isOther: boolean;
  showAddition: boolean;
  showArrange: boolean;
}
export interface GetCategoryIndexDto extends AddCategoryDto {
  id: string;
}

export interface AddCategoryDto {
  id: string;
  name: string;
  order: number;
  color: string;
  icon: string;
}
