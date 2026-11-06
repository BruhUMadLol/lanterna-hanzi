import test from 'node:test';import assert from 'node:assert/strict';import {limits,optionsFor,normalize} from '../src/engine.js';
test('difficulty increases every five characters with safe minimums',()=>{assert.equal(limits(4).stage,0);assert.equal(limits(5).stage,1);assert.ok(limits(5).write<limits(4).write);assert.equal(limits(999).choose,3);assert.equal(limits(999).write,8);});
test('answers have distinct pronunciations and always contain correct answer',()=>{const w={pinyin:'nǐ'};const opts=optionsFor(w,[w,{pinyin:'hǎo'},{pinyin:'hǎo'},{pinyin:'mā'}]);assert.equal(opts.length,3);assert.equal(new Set(opts).size,3);assert.ok(opts.includes('nǐ'));});
test('search tolerates tones and spaces',()=>assert.equal(normalize('nǐ hǎo'),normalize('ni3hao3')));
