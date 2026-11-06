export function createStudySession(deckId,ids,random=Math.random){
 const order=[...new Set(ids)];
 for(let i=order.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
 return {deckId,ids:order,index:0,completed:[],characters:{}};
}
export function reconcileStudySession(session,deckId,ids,random=Math.random){
 const allowed=new Set(ids);
 if(!session||session.deckId!==deckId||!Array.isArray(session.ids)||!Array.isArray(session.completed)||!session.characters||!Number.isInteger(session.index))return createStudySession(deckId,ids,random);
 const activeId=session.ids[session.index];
 session.ids=[...new Set(session.ids)].filter(id=>allowed.has(id));
 const added=createStudySession(deckId,ids.filter(id=>!session.ids.includes(id)),random).ids;
 session.ids.push(...added);session.completed=session.completed.filter(id=>allowed.has(id));
 session.characters=Object.fromEntries(Object.entries(session.characters).filter(([id])=>allowed.has(Number(id))));
 const position=session.ids.indexOf(activeId);session.index=position>=0?position:Math.max(0,Math.min(session.index,session.ids.length-1));
 return session;
}
export function markStudyCharacter(session,wordId,characterIndex,characterCount){
 if(!session.ids.includes(wordId))return;
 const done=new Set(session.characters[wordId]||[]);done.add(characterIndex);session.characters[wordId]=[...done];
 if(Array.from({length:characterCount},(_,i)=>i).every(i=>done.has(i))&&!session.completed.includes(wordId))session.completed.push(wordId);
}
export const studyComplete=session=>session.ids.length>0&&session.ids.every(id=>session.completed.includes(id));
export function nextStudyIndex(session){
 if(session.index<session.ids.length-1)return session.index+1;
 return session.ids.findIndex((id,index)=>index!==session.index&&!session.completed.includes(id));
}
