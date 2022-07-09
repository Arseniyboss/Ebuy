import { useState, useEffect, useMemo } from "react";

export const usePagination = (items, page, itemsPerPage = 4) => {
  const [paginatedItems, setPaginatedItems] = useState(items);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    if (items?.length) {
      setPages(Math.ceil(items.length / itemsPerPage));
    }
  }, [items, itemsPerPage]);

  useMemo(() => {
    if (!items?.length) {
      return setPaginatedItems(items);
    }
    const paginatedItems = Array.from({ length: pages }, (_, index) => {
      const pageStart = index * itemsPerPage;
      const pageEnd = pageStart + itemsPerPage;
      return items.slice(pageStart, pageEnd);
    });
    if (paginatedItems.length) {
      setPaginatedItems(paginatedItems[page]);
    }
  }, [pages, page, items, itemsPerPage]);

  return [paginatedItems, pages];
};
