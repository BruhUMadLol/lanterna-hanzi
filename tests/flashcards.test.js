import test from 'node:test';import assert from 'node:assert/strict';
import {reviewSession,freshReveal} from '../src/flashcards.js';
test('review shuffles each word once, resumes position, and reconciles deck additions',()=>{const first=reviewSession(null,'book',[1,2,3,3],()=>0);assert.deepEqual(first.ids,[2,3,1]);first.index=1;const resumed=reviewSession(first,'book',[1,2,3,4],()=>.5);assert.equal(resumed.ids[resumed.index],3);assert.deepEqual(resumed.ids,[2,3,1,4]);const other=reviewSession(resumed,'other',[8],()=>0);assert.deepEqual(other.ids,[8]);assert.equal(other.index,0);});
test('each card starts with two independent concealed fields',()=>{const a=freshReveal();a.pinyin=true;assert.equal(a.meaning,false);assert.deepEqual(freshReveal(),{pinyin:false,meaning:false});});
