import { useState, useEffect } from "react";

export const useSort = (items, sorts) => {
  const [sortedItems, setSortedItems] = useState(items);

  const activeSortKey =
    Object.keys(sorts).find((sort) => sorts[sort] !== "") || "";

  const [sortKey, setSortKey] = useState(activeSortKey);

  useEffect(() => {
    setSortedItems(items);
  }, [items, sorts]);

  useEffect(() => {
    if (items?.length) {
      // make a copy of items, because sort() mutates array
      const allItems = [...items];

      const sortedItems = allItems.sort((a, b) => {
        const ascending = sorts[sortKey] === "asc" && a[sortKey] < b[sortKey];
        const descending = sorts[sortKey] === "desc" && a[sortKey] > b[sortKey];
        return ascending || descending ? -1 : 0;
      });

      // prevent items from being set to initial state when changing sorts
      if (sorts[sortKey]) {
        setSortedItems(sortedItems);
      }
    }
  }, [items, sorts, sortKey]);

  const sortBy = (sortKey) => {
    setSortKey(sortKey);
  };

  return [sortedItems, sortBy];
};
