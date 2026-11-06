import {t,getLanguage} from './i18n.js';
import {icon} from './ui.js';
import {meaningFor} from './collections.js';
import {studyComplete,nextStudyIndex} from './study.js';

export function practiceControlState(session){
 return {previous:!!session&&session.index>0,next:!session||studyComplete(session)||nextStudyIndex(session)>=0,
  nextLabel:!session?t('Allena il mazzo'):studyComplete(session)?t('Nuovo giro'):t('Prossima'),
  progress:session?`${t('Parole completate')}: ${session.completed.length} / ${session.ids.length}`:t('Parola singola')};
}
export function practiceMarkup({word,mode,ci,session,deckName,esc}){
 const controls=practiceControlState(session);
 return `<div class="study-context"><button id="back-study">← ${t('Allenamento')}</button><span>${esc(deckName)}</span></div>
 <div class="practice-heading"><div><h1>${esc(word.hanzi)}</h1><p class="pronunciation">${esc(word.pinyin)}</p></div><button id="listen" aria-label="${t('Ascolta la parola')}">${icon('audio')}</button></div>
 <p class="practice-meaning">${esc(meaningFor(word,getLanguage()))}</p>
 <p id="session-progress" class="session-progress" aria-live="polite">${controls.progress}</p>
 <div class="practice-workspace"><div id="writing" class="writing-grid"></div>
 <div class="character-progress">${[...word.hanzi].map((c,i)=>`<button data-char="${i}" aria-label="${t('Carattere')} ${i+1}" class="${ci===i?'selected':''}">${esc(c)}</button>`).join('')}</div>
 <h2 id="feedback" class="practice-feedback" aria-live="polite">${t(mode==='trace'?'Segui il pennello.':'Ora tocca a te.')}</h2>
 <div class="tabs"><button id="trace" class="${mode==='trace'?'selected':''}">${t('Nachzeichnen · Ricalca')}</button><button id="write" class="${mode==='write'?'selected':''}">${t('Schreiben · A memoria')}</button></div>
 <div class="practice-tools"><button id="animate">▷ ${t('Mostra animazione')}</button><button id="retry">↻ ${t('Ricomincia carattere')}</button></div>
 <p class="practice-explanation">${t('Rispetta l’ordine, la direzione e la posizione dei tratti. Un tratto sbagliato si illumina per aiutarti.')}</p></div>
 <div class="study-navigation" role="group" aria-label="${t('Navigazione parole')}"><button id="previous-word" aria-label="${t('Parola precedente')}" ${controls.previous?'':'disabled'}>← ${t('Precedente')}</button><span id="study-position">${session?`${session.index+1} / ${session.ids.length}`:'1 / 1'}</span><button id="next-word" ${controls.next?'':'disabled'}>${controls.nextLabel} →</button></div>`;
}
