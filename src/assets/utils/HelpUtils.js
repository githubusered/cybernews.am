export const getShortText = (bodyText, maxParagraphs = 3) => {
  if (!Array.isArray(bodyText)) return '';

  return bodyText
    .filter((block) => block?.type === 'paragraph') // Only use paragraphs
    .slice(0, maxParagraphs)
    .map((block) => {
      if (!Array.isArray(block.children)) return '';
      return block.children
        .map((child) => (typeof child.text === 'string' ? child.text : ''))
        .join(' ');
    })
    .join(' ');
}

export const getSlugFromTitle = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .split(" ")
    .join('-');
}

export const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`;
}

export const  timeAgo = (publishedAt, t)=> {

  const now = new Date();
  const publishedDate = new Date(publishedAt);
  const diffMs = now - publishedDate; // difference in milliseconds
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return t('timeAgo.justNow');
  if (diffMinutes < 60) return t('timeAgo.minutesAgo', { count: diffMinutes });
  if (diffHours < 24) return t('timeAgo.hoursAgo', { count: diffHours });
  return t('timeAgo.daysAgo', { count: diffDays });
}

export const generateCombinations = (words, comboLength) => {
          const combos = [];
          for (let i = 0; i <= words.length - comboLength; i++) {
            combos.push(words.slice(i, i + comboLength).join(' '));
          }
          return combos;
};

