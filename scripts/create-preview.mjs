import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import {chromium} from '@playwright/test';

const screens=[['Allenamento · Deutsch','screenshots/redesign-home-de.png'],['Lanterne · Deutsch','screenshots/redesign-game-de.png']];
const html=`<!doctype html><html lang="it"><meta charset="utf-8"><title>Lanterna · Anteprima 1.2.0</title><style>*{box-sizing:border-box}body{margin:0;padding:32px;background:#e7e7ec;color:#25252a;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:26px}h1{font-size:23px;margin:0;letter-spacing:-.5px}header span{color:#606067;font-size:13px}.screens{display:flex;gap:24px;align-items:start}figure{margin:0;width:390px}figcaption{font-size:13px;margin-bottom:12px;color:#55555d}img{display:block;width:390px;height:844px;object-fit:cover;object-position:top;border:1px solid #d6d6de;border-radius:18px}@media(max-width:800px){.screens{flex-wrap:wrap}}</style><header><h1>Lanterna</h1><span>Nuova interfaccia · 1.2.0</span></header><div class="screens">${screens.map(([label,file])=>`<figure><figcaption>${label}</figcaption><img src="data:image/png;base64,${fs.readFileSync(file).toString('base64')}" alt="${label}"></figure>`).join('')}</div></html>`;
fs.mkdirSync('release',{recursive:true});fs.writeFileSync('release/Anteprima-1.2.0.html',html);
const browser=await chromium.launch({channel:'msedge',headless:true});
try{const page=await browser.newPage({viewport:{width:868,height:1000},deviceScaleFactor:1});await page.goto(pathToFileURL(path.resolve('release/Anteprima-1.2.0.html')).href);await page.screenshot({path:'release/Anteprima-1.2.0.png',fullPage:true});}finally{await browser.close();}
