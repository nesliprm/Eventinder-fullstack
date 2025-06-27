import categoryData from "../../data/categories.json" assert { type: "json" };

export const getCategorys = () => {
  let categories = categoryData.categories;
  return categories;
};
