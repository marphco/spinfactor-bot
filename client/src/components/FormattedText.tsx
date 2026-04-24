import React from 'react';

interface FormattedTextProps {
  text: string;
}

/**
 * A simple component to render text with basic Markdown support (specifically bolds).
 * This avoids adding heavy dependencies like react-markdown for simple needs.
 */
export const FormattedText: React.FC<FormattedTextProps> = ({ text }) => {
  // Regex to find **bold text** or [link](url)
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

  return (
    <>
      {parts.map((part, i) => {
        // Handle bold
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} style={{ fontWeight: 700, color: 'var(--text-white)' }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        // Handle link
        if (part.startsWith('[') && part.includes('](')) {
          const match = part.match(/\[(.*?)\]\((.*?)\)/);
          if (match) {
            return (
              <a 
                key={i} 
                href={match[2]} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#0D2B67', textDecoration: 'underline', fontWeight: 600 }}
              >
                {match[1]}
              </a>
            );
          }
        }
        return part;
      })}
    </>
  );
};
