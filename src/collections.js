// The collection detail view keeps browsing separate from the active study deck.
export function collectionWords(collection, words, query, normalize) {
  const byId = new Map(words.map(word=>[word.id,word]));
  const search = normalize(query.trim());
  return [...new Set(collection.ids)].map(id=>byId.get(id)).filter(word=>word && matchesWord(word, search, normalize));
}
export function matchesWord(word, query, normalize) {
  const search=normalize(query.trim());
  return !search || [word.hanzi,word.pinyin,word.numeric,word.meaning,word.meaningDe,word.meaningIt].filter(Boolean).some(value=>normalize(value).includes(search));
}
export function meaningFor(word,language){return (language==='de'?word.meaningDe:word.meaningIt)||word.meaning;}
