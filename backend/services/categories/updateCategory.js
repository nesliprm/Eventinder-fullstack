import categoryData from "../../data/categories.json" assert { type: "json" };

export const updateCategory = (id, name) => {
  const category = categoryData.categories.find(
    (category) => category.id === id
  );
  if (!category) {
    throw new Error(`Category with id ${id} is not found.`);
  }

  category.name = name ?? category.name;

  return category;
};
