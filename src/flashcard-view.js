import {t,getLanguage} from './i18n.js';
import {meaningFor} from './collections.js';
import {icon} from './ui.js';

export function flashcardMarkup({word,session,revealed,deckName,esc}){
 return `<section class="flashcard-screen"><div class="study-context"><button id="back-review">← ${t('Allenamento')}</button><span>${esc(deckName)}</span></div>
 <div class="review-heading"><h1>${t('Schede di ripasso')}</h1><button id="review-audio" aria-label="${t('Ascolta la parola')}">${icon('audio')}</button></div>
 <div class="review-navigation" role="group" aria-label="${t('Navigazione parole')}"><button id="review-previous" ${session.index===0?'disabled':''}>← ${t('Precedente')}</button><span>${session.index+1} / ${session.ids.length}</span><button id="review-next">${t(session.index===session.ids.length-1?'Nuovo giro':'Prossima')} →</button></div>
 <div class="flashcard-character" style="--characters:${[...word.hanzi].length}" aria-label="${esc(word.hanzi)}"><span>${esc(word.hanzi)}</span></div>
 <div class="review-field"><span class="review-field-label">Pinyin</span><button class="review-answer pinyin-answer" data-reveal="pinyin" aria-expanded="${revealed.pinyin}" aria-label="${t(revealed.pinyin?'Nascondi il pinyin':'Mostra il pinyin')}">${revealed.pinyin?esc(word.pinyin):t('Nascosto')}</button></div>
 <div class="review-field"><span class="review-field-label">${t('Significato')}</span><button class="review-answer meaning-answer" data-reveal="meaning" aria-expanded="${revealed.meaning}" aria-label="${t(revealed.meaning?'Nascondi il significato':'Mostra il significato')}">${revealed.meaning?esc(meaningFor(word,getLanguage())):t('Nascosto')}</button></div>
 </section>`;
}
