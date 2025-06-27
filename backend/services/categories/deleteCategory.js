import categoryData from "../../data/categories.json" assert { type: "json" };

export const deleteCategory = (id) => {
  const index = categoryData.categories.findIndex(
    (category) => category.id === id
  );
  if (index === -1) {
    throw new Error(`Category with id ${id} is not found.`);
  }

  const deletedCategory = categoryData.categories.splice(index, 1)[0];
  return deletedCategory;
};
