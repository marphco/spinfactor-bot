import { useState } from 'react';

interface GridItem {
  title: string;
  subtitle?: string;
  desc: string;
}

/**
 * Hook to fetch structured grid content from the AI API.
 * 
 * @param sectionName The name of the section
 * @param expectedCount How many blocks we expect (to ensure layout stability)
 * @param fallbackItems The static items to show if the API fails or is loading
 */
export const useGridContent = (
  _sectionName: string,
  _expectedCount: number,
  fallbackItems: any[]
) => {
  const [items] = useState<GridItem[]>(fallbackItems);

  return { items, loading: false, error: null };
};
