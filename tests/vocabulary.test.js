import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {mergeCourseVocabulary,numericPinyin} from '../src/vocabulary.js';
import {applyLessonPacks} from '../src/lessons.js';
import {meaningFor,collectionWords} from '../src/collections.js';import {normalize} from '../src/engine.js';
const course=JSON.parse(fs.readFileSync('public/data/a1-lehrbuch.json','utf8'));
const words=JSON.parse(fs.readFileSync('public/data/words.json','utf8'));
const packs=JSON.parse(fs.readFileSync('public/data/lessons.json','utf8'));
test('A1 LehrBuch includes 64 vocabulary items and ten numbers, with complete stroke coverage',()=>{
 assert.equal(course.length,74);assert.equal(new Set(course.map(w=>w.hanzi)).size,74);
 assert.equal(packs[0].name,'A1 LehrBuch');assert.deepEqual(packs[0].words,course.map(w=>w.hanzi));
 assert.deepEqual(course.slice(-10).map(w=>w.hanzi),[...'一二三四五六七八九十']);
 for(const entry of course){const w=words.find(w=>w.hanzi===entry.hanzi);assert.ok(w?.writable,entry.hanzi);assert.equal(w.pinyin,entry.pinyin);assert.ok(w.meaningDe&&w.meaningIt);for(const c of entry.hanzi){const data=JSON.parse(fs.readFileSync(`public/data/strokes/${c}.json`,'utf8'));assert.ok(data.strokes.length);assert.equal(data.strokes.length,data.medians.length);}}
});
test('course readings correct dictionary homographs while preserving saved word IDs',()=>{const ma=words.find(w=>w.hanzi==='吗');assert.equal(ma.pinyin,'ma');assert.equal(ma.numeric,'ma5');const merged=mergeCourseVocabulary([{id:42,hanzi:'吗',pinyin:'má',levels:['old-1']}],[{id:1000032,hanzi:'吗',pinyin:'ma',meaning:'question particle'}]);assert.equal(merged.length,1);assert.equal(merged[0].id,42);assert.deepEqual(merged[0].levels,['old-1']);});
test('numeric tone conversion includes neutral tones and ü',()=>{assert.equal(numericPinyin('nǚ shì'),'nv3 shi4');assert.equal(numericPinyin('zǎo shang hǎo'),'zao3 shang5 hao3');assert.equal(numericPinyin('Ào dì lì'),'ao4 di4 li4');});
test('a previous installation gains the book without losing its selected deck or progress',()=>{const state={selected:'own',stats:{characters:18},collections:[{id:'own',name:'La mia A1',ids:[42]}]};assert.deepEqual(applyLessonPacks(state,packs,words),[]);assert.equal(state.selected,'own');assert.equal(state.stats.characters,18);const book=state.collections.find(c=>c.name==='A1 LehrBuch');assert.equal(book.ids.length,74);const list=collectionWords(book,words,'',normalize);assert.deepEqual(list.map(w=>w.hanzi),packs[0].words);assert.equal(meaningFor(list.find(w=>w.hanzi==='德国'),'de'),'Deutschland');assert.equal(collectionWords(book,words,'Deutschland',normalize)[0].hanzi,'德国');applyLessonPacks(state,packs,words);assert.equal(state.collections.length,2);});
