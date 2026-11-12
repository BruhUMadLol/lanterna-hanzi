import {createStudySession} from './study.js';

export function reviewSession(previous,deckId,ids,random=Math.random){
 const unique=[...new Set(ids)];
 if(!previous||previous.deckId!==deckId||!Array.isArray(previous.ids)||!Number.isInteger(previous.index))return {deckId,ids:createStudySession(deckId,unique,random).ids,index:0};
 const active=previous.ids[previous.index];const allowed=new Set(unique);
 const order=[...new Set(previous.ids)].filter(id=>allowed.has(id));
 order.push(...createStudySession(deckId,unique.filter(id=>!order.includes(id)),random).ids);
 const index=order.indexOf(active);
 return {deckId,ids:order,index:index>=0?index:Math.max(0,Math.min(previous.index,order.length-1))};
}
export function freshReveal(){return {pinyin:false,meaning:false};}
