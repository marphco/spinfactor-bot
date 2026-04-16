import { useState, useEffect } from 'react';

/**
 * Hook to fetch dynamic content for a specific section from the AI API.
 * 
 * @param sectionName The name of the section (e.g., 'Podcast', 'Chi Siamo')
 * @param fallbackText The static text to show if the API is slow or unavailable
 * @param queryOverride Optional custom query for the AI
 */
export const useSectionContent = (
  sectionName: string, 
  fallbackText: string,
  queryOverride?: string
) => {
  const [content, setContent] = useState(fallbackText);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const query = queryOverride || `Forniscimi una descrizione professionale e dettagliata per la sezione "${sectionName}" di Spin Factor.`;
        
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: query }),
        });

        if (!response.ok) throw new Error('Failed to fetch dynamic content');
        
        const data = await response.json();
        if (data.reply) {
          setContent(data.reply);
          setError(null);
        }
      } catch (err) {
        console.error(`Error fetching content for ${sectionName}:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Keep the fallback content on error
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [sectionName, queryOverride]);

  return { content, loading, error };
};
