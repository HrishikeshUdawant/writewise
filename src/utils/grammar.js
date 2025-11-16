export async function grammarCheck(text) {
  const response = await fetch("https://api.languagetool.org/v2/check", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      text: text,
      language: "en-US"
    })
  });

  const data = await response.json();

  let correctedText = text;
  const suggestions = [];

  // 🔥 SORT BY OFFSET DESCENDING (VERY IMPORTANT)
  const sortedMatches = data.matches.sort((a, b) => b.offset - a.offset);

  sortedMatches.forEach(match => {
    if (match.replacements && match.replacements.length > 0) {
      const replacement = match.replacements[0].value;

      const original = correctedText.substring(
        match.offset,
        match.offset + match.length
      );

      suggestions.push({
        original,
        replacement,
        explanation: match.message
      });

      // Apply replacement safely
      correctedText =
        correctedText.substring(0, match.offset) +
        replacement +
        correctedText.substring(match.offset + match.length);
    }
  });

  return {
    correctedText,
    suggestions
  };
}
