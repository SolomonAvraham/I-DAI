interface RiskCategory {
  category: string;
  facts: string[];
}
interface Fact {
  fact: string;
}

const getCategoryFacts = (
  categoryName: string,
  riskCategories: RiskCategory[]
): Fact[] => {
  const category = riskCategories.find(
    (item) => item.category === categoryName
  );
  return category ? category.facts.map((fact) => ({ fact })) : [];
};

export default getCategoryFacts;
