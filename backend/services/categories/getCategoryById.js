import categoryData from "../../data/categories.json" assert { type: "json" };

export const getCategoryById = (id) => {
  const category = categoryData.categories.find(
    (category) => category.id === id
  );
  if (!category) {
    throw new Error(`Category with id ${id} is not found.`);
  }
  return category;
};
