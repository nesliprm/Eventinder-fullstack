import categoryData from "../../data/categories.json" assert { type: "json" };

export const getCategories = () => {
  let categories = categoryData.categories;
  return categories;
};
