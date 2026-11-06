export function numericPinyin(pinyin){
 const tones=['āáǎà','ēéěè','īíǐì','ōóǒò','ūúǔù','ǖǘǚǜ'];
 return pinyin.split(/\s+/).map(syllable=>{let tone=5;const letters=[...syllable.toLowerCase()].map(letter=>{for(let i=0;i<tones.length;i++){const index=tones[i].indexOf(letter);if(index>=0){tone=index+1;return ['a','e','i','o','u','v'][i];}}return letter==='ü'?'v':letter;}).join('');return letters+tone;}).join(' ');
}
export function mergeCourseVocabulary(base,course){
 const words=base.map(word=>({...word}));const byHanzi=new Map(words.map(word=>[word.hanzi,word]));const ids=new Set(words.map(word=>word.id));
 for(const entry of course){const existing=byHanzi.get(entry.hanzi);const values={...entry,numeric:numericPinyin(entry.pinyin)};
  if(existing){const id=existing.id;Object.assign(existing,values,{id});}
  else{if(ids.has(entry.id))throw Error(`Duplicate vocabulary id: ${entry.id}`);const word={...values,levels:[]};words.push(word);byHanzi.set(word.hanzi,word);ids.add(word.id);}
 }
 return words;
}
