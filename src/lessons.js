// Lesson packs are bundled with the APK. Revisions add words without replacing personal decks.
export function applyLessonPacks(state,packs,words){
 const byHanzi=new Map(words.map(word=>[word.hanzi,word.id]));
 state.lessonVersions??={};const unresolved=[];
 for(const pack of packs){
  if(!pack.id||!Array.isArray(pack.words)||state.lessonVersions[pack.id]===pack.revision)continue;
  const ids=[];for(const hanzi of pack.words){if(byHanzi.has(hanzi))ids.push(byHanzi.get(hanzi));else unresolved.push(hanzi);}
  const id=`lesson:${pack.id}`;const existing=state.collections.find(collection=>collection.id===id);
  if(existing)existing.ids=[...new Set([...existing.ids,...ids])];else state.collections.push({id,name:pack.name,ids:[...new Set(ids)]});
  state.lessonVersions[pack.id]=pack.revision;
 }
 return unresolved;
}
