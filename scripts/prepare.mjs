import fs from 'node:fs';
import {mergeCourseVocabulary} from '../src/vocabulary.js';
const raw=JSON.parse(fs.readFileSync('public/data/source.json','utf8'));
const base=raw.map((w,i)=>({id:i,hanzi:w.simplified,pinyin:w.forms[0].transcriptions.pinyin,numeric:w.forms[0].transcriptions.numeric,meaning:w.forms[0].meanings.join('; '),levels:w.level}));
const course=JSON.parse(fs.readFileSync('public/data/a1-lehrbuch.json','utf8'));
const words=mergeCourseVocabulary(base,course);
const chars=new Set(words.flatMap(w=>[...w.hanzi]));fs.mkdirSync('public/data/strokes',{recursive:true});let available=0;
for(const c of chars){const p=`node_modules/hanzi-writer-data/${c}.json`;if(fs.existsSync(p)){fs.copyFileSync(p,`public/data/strokes/${c}.json`);available++;}}
for(const w of words)w.writable=[...w.hanzi].every(c=>fs.existsSync(`public/data/strokes/${c}.json`));
fs.writeFileSync('public/data/words.json',JSON.stringify(words));
for(const [dir,prefix] of [['hanzi-writer','WRITER'],['hanzi-writer-data','STROKES']])for(const f of fs.readdirSync(`node_modules/${dir}`).filter(f=>/license|arphic/i.test(f)))if(fs.statSync(`node_modules/${dir}/${f}`).isFile())fs.copyFileSync(`node_modules/${dir}/${f}`,`public/data/${prefix}-${f}`);
console.log({words:words.length,characters:available,writable:words.filter(w=>w.writable).length});
