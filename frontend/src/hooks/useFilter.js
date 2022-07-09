import { useState, useMemo } from "react";
import { search } from "../helpers/search";
import { getCommonItems } from "../helpers/getCommonItems";

export const useFilter = (items, filters) => {
  const [filteredItems, setFilteredItems] = useState(items);

  // useMemo instead of useEffect to prevent additional rerenders that cause text flicker (No items matched your search criteria)
  useMemo(() => {
    if (items?.length) {
      const allItems = [];

      Object.entries(filters).forEach((filter) => {
        const property = filter[0];
        const value = filter[1];

        if (typeof value === "string") {
          allItems.push(items.filter((item) => search(item[property], value)));
        }

        if (typeof value === "number" && value > 0) {
          allItems.push(items.filter((item) => item[property] === value));
        }

        if (property === "range" && typeof value === "object") {
          Object.entries(filters[property]).forEach((entry) =>
            allItems.push(items.filter((item) => item[entry[0]] >= entry[1]))
          );
        }
      });

      const filteredItems = getCommonItems(allItems);

      setFilteredItems(filteredItems);
    }
  }, [items, filters]);

  return filteredItems;
};
