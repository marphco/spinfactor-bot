import React from 'react';

interface FormattedTextProps {
  text: string;
}

/**
 * A simple component to render text with basic Markdown support (specifically bolds).
 * This avoids adding heavy dependencies like react-markdown for simple needs.
 */
export const FormattedText: React.FC<FormattedTextProps> = ({ text }) => {
  // Regex to find **bold text**
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} style={{ fontWeight: 700, color: 'var(--text-white)' }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </>
  );
};
