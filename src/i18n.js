import de from './locales/de.json' with {type:'json'};

export function initialLanguage(preferred, deviceLanguage='it') {
  return ['it','de'].includes(preferred) ? preferred : /^de(?:-|$)/i.test(deviceLanguage) ? 'de' : 'it';
}
let language=initialLanguage(undefined,globalThis.navigator?.language);
export function setLanguage(value) { language=initialLanguage(value);if(globalThis.document)document.documentElement.lang=language; }
export function getLanguage() { return language; }
export function t(source) { return language==='de' ? de[source] ?? source : source; }
