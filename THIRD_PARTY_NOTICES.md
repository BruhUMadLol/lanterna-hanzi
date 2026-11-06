# Datenquellen und Drittanbieter

Die Lizenzbedingungen der folgenden Komponenten und Daten gelten unabhängig vom Anwendungscode.

## Wörterbuch

- **Complete HSK Vocabulary**, © 2026 Yanis Zafirópulos: [Projekt](https://github.com/drkameleon/complete-hsk-vocabulary), [beigefügte MIT-Lizenz](public/data/VOCABULARY-LICENSE.txt).
- Die zugrunde liegenden Wörterbuchdefinitionen stammen aus **CC-CEDICT** und stehen unter **CC BY-SA 4.0**: [Quelle und Lizenzinformationen](https://www.mdbg.net/chinese/dictionary?page=cedict), [Lizenztext](https://creativecommons.org/licenses/by-sa/4.0/).
- `public/data/source.json` enthält den heruntergeladenen Ausgangsdatensatz. `scripts/prepare.mjs` erstellt daraus die vereinfachten Einträge in `words.json` und ergänzt die A1-Lernwörter mit festen IDs, ausgewählten Lesungen sowie deutschen und italienischen Bedeutungen. Die ursprünglichen HSK-Zuordnungen werden bei vorhandenen Wörtern beibehalten.
- Die Zusammenstellung **A1 LehrBuch** basiert auf den vom Projektinhaber bereitgestellten Vokabellisten. Die Originalfotos, Lehrbuchseiten und abgebildeten Personen werden nicht mitveröffentlicht.

## Schreiben und Strichdaten

- **Hanzi Writer**, © 2014 David Chanin, MIT: [Projekt](https://github.com/chanind/hanzi-writer), [beigefügte Lizenz](public/data/WRITER-LICENSE).
- **Hanzi Writer Data / Make Me a Hanzi**: [Hanzi Writer Data](https://github.com/chanind/hanzi-writer-data), [Make Me a Hanzi](https://github.com/skishore/makemeahanzi).
- Die verwendeten Strichdaten sind von Arphic-Schriften abgeleitet und unterliegen der **Arphic Public License**. Die einzelnen Strichdateien werden unverändert kopiert. [Beigefügter Lizenztext](public/data/STROKES-ARPHICPL.TXT).

## Laufzeit und Werkzeuge

Capacitor, dessen Plugins, Vite, Playwright und weitere npm-Abhängigkeiten werden über `package.json` und `package-lock.json` referenziert. Ihre Lizenztexte befinden sich in den jeweiligen Paketen. Das Veröffentlichen dieses Projekts ändert diese Bedingungen nicht.

Die Mandarin-Aussprache wird durch die installierte Sprachausgabe des Geräts erzeugt. Es werden keine Aufnahmen von Yoyo Chinese mitgeliefert. Die [Pinyin-Tabelle von Yoyo Chinese](https://yoyochinese.com/chinese-learning-tools/Mandarin-Chinese-pronunciation-lesson/pinyin-chart-table) wurde bei der ursprünglichen Recherche als Referenz verwendet.

Für den selbst erstellten Anwendungscode wurde bisher keine gesonderte Projektlizenz festgelegt. Öffentlich einsehbarer Quellcode und die Lizenzen der eingebundenen Daten sind getrennt zu betrachten.
