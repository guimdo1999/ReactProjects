import { useMemo, useState } from "react";

function useSortOnTable(items, config = null) {
  const [sortedWay, setsortedWay] = useState(config);

  //Organizando em ascendente ou descendente usando memória cache
  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortedWay !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortedWay.key] < b[sortedWay.key]) {
          return sortedWay.direction === "ascending" ? -1 : 1;
        }
        if (a[sortedWay.key] > b[sortedWay.key]) {
          return sortedWay.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortedWay]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortedWay &&
      sortedWay.key === key &&
      sortedWay.direction === "ascending"
    ) {
      direction = "descending";
    }
    setsortedWay({ key, direction });
  };

  return { items: sortedItems, requestSort };
}
export default useSortOnTable;
