import {test,expect} from '@playwright/test';
test.beforeEach(async({page})=>{await page.goto('/');await expect(page.locator('h1')).toContainText('Allenamento');});
test('active collection stays visible, opening another does not select it, contents can be managed',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await expect(page.locator('#active-deck')).toContainText('Il mio primo mazzo');await page.locator('#active-deck').click();await expect(page.locator('[data-collection-word]')).toHaveCount(20);
 const firstId=await page.locator('[data-collection-word]').first().getAttribute('data-collection-word');const firstHanzi=await page.locator('[data-collection-practice]').first().locator('b').textContent();
 await page.locator('#collection-search').fill(firstHanzi);await expect(page.locator(`[data-collection-word="${firstId}"]`)).toBeVisible();await page.locator(`[data-collection-remove="${firstId}"]`).click();await expect(page.locator(`[data-collection-word="${firstId}"]`)).toHaveCount(0);await expect(page.locator('#active-deck')).toContainText('19 parole');
 await page.locator('#back-collections').click();await page.locator('#deck-name').fill('Viaggio');await page.locator('#new-deck').click();await expect(page.locator('#active-deck')).toContainText('Viaggio');await expect(page.locator('.active-collection')).toContainText('Viaggio');
 await page.locator('[data-open-collection="first"]').click();await expect(page.locator('h1')).toHaveText('Il mio primo mazzo');await expect(page.locator('#active-deck')).toContainText('Viaggio');await expect(page.locator('[data-collection-word]')).toHaveCount(19);
 await page.locator('#select-collection').click();await expect(page.locator('#active-deck')).toContainText('Il mio primo mazzo');await page.reload();await expect(page.locator('#active-deck')).toContainText('Il mio primo mazzo');
 await page.locator('[data-nav="collections"]').click();await page.locator('.collection-open').filter({hasText:'Viaggio'}).click();await expect(page.locator('.empty-collection')).toContainText('prime parole');await page.locator('#add-collection-words').click();await expect(page.locator('#active-deck')).toContainText('Viaggio');await page.locator('#search').fill('xue2xi2');await page.locator('[data-add]').first().click();await page.locator('#active-deck').click();await expect(page.locator('[data-collection-word]')).toHaveCount(1);await expect(page.locator('.word-main b')).toHaveText('学习');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);await page.screenshot({path:'screenshots/collection-mobile.png',fullPage:true});
});
test('desktop, collection persistence, pinyin search, writing animation',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.screenshot({path:'screenshots/home-desktop.png',fullPage:true});
 await page.locator('[data-nav="library"]').click();await page.locator('#search').fill('xue2xi2');await expect(page.locator('.word').first()).toBeVisible();
 await page.locator('[data-add]').first().click();await page.reload();await page.locator('[data-nav="collections"]').click();await expect(page.locator('.active-collection')).toContainText('21 parole');
 await page.locator('[data-nav="library"]').click();await page.locator('#search').fill('学习');await page.locator('[data-practice]').first().click();await expect(page.locator('#writing svg')).toBeVisible();await page.locator('#write').click();await page.locator('#animate').click();await page.waitForTimeout(500);await page.locator('[data-nav="home"]').click();await page.waitForTimeout(2500);expect(errors).toEqual([]);
});
test('mobile layout and lantern wrong answer loses exactly one life',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'screenshots/home-mobile.png',fullPage:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
 await page.locator('[data-nav="game"]').click();await page.locator('#play').click();await expect(page.locator('[data-answer]')).toHaveCount(3);
 const hanzi=await page.locator('#lantern span').textContent();const pinyin=await page.evaluate(async h=>(await (await fetch('/data/words.json')).json()).find(w=>w.hanzi===h).pinyin,hanzi);
 await page.locator('[data-answer]').filter({hasText:pinyin}).first().click();await expect(page.locator('#writing svg')).toBeVisible();await page.screenshot({path:'screenshots/game-mobile.png',fullPage:true});
 await page.locator('#quit').click();await expect(page.locator('h1')).toHaveText('Partita completata');
 await page.locator('#again').click();await page.locator('#play').click();const h=await page.locator('#lantern span').textContent();const correct=await page.evaluate(async h=>(await (await fetch('/data/words.json')).json()).find(w=>w.hanzi===h).pinyin,h);await page.locator(`[data-answer]:not([data-answer="${correct}"])`).first().click();await expect(page.locator('#lives')).toHaveText('♥ ♥');
});
test('match is bounded to 180 seconds and timeout consumes lives',async({page})=>{
 await page.clock.install();await page.locator('[data-nav="game"]').click();await page.locator('#play').click();await page.clock.runFor(12100);await expect(page.locator('#lives')).toHaveText('♥ ♥');await page.clock.runFor(24100);await expect(page.locator('h1')).toHaveText('Partita completata');
});
test('actual stroke path completes a character, reverse direction rejected',async({page})=>{
 await page.locator('[data-nav="library"]').click();await page.locator('#search').fill('一');await page.locator('[data-practice="9754"]').click();await page.locator('#write').click();await expect(page.locator('#writing svg')).toBeVisible();await page.waitForTimeout(300);
 const medians=await page.evaluate(async()=> (await (await fetch('/data/strokes/一.json')).json()).medians);const box=await page.locator('#writing').boundingBox();const size=Math.min(box.width,360),scale=(size-44)/1024;
 async function draw(points){for(let i=0;i<points.length;i++){const [x,y]=points[i];await page.mouse.move(box.x+22+x*scale,box.y+22+(900-y)*scale,{steps:3});if(!i)await page.mouse.down();}await page.mouse.up();}
 await draw([...medians[0]].reverse());await expect(page.locator('#feedback')).toContainText('Riprova');await draw(medians[0]);await expect(page.locator('#feedback')).toContainText('Ben fatto');
});
test('three-minute absolute deadline ends match even across delayed timer',async({page})=>{
 await page.clock.install();await page.locator('[data-nav="game"]').click();await page.locator('#play').click();await page.clock.fastForward(180001);await expect(page.locator('h1')).toHaveText('Partita completata');await expect(page.locator('.intro')).toContainText('Tempo terminato');
});
test('five successfully drawn characters increase game difficulty',async({page})=>{
 await page.evaluate(async()=>{const all=await(await fetch('/data/words.json')).json();const s=JSON.parse(localStorage.getItem('lanterna'));s.collections[0].ids=all.filter(w=>['一','二','三'].includes(w.hanzi)).map(w=>w.id);localStorage.setItem('lanterna',JSON.stringify(s));});await page.reload();await page.locator('[data-nav="game"]').click();await page.locator('#play').click();
 for(let n=0;n<5;n++){
  const char=await page.locator('#lantern span').textContent();const pinyin=await page.evaluate(async h=>(await(await fetch('/data/words.json')).json()).find(w=>w.hanzi===h).pinyin,char);await page.locator(`[data-answer="${pinyin}"]`).click();await expect(page.locator('#writing svg')).toBeVisible();await page.waitForTimeout(300);
  const medians=await page.evaluate(async c=>(await(await fetch(`/data/strokes/${c}.json`)).json()).medians,char);const box=await page.locator('#writing').boundingBox();const scale=(Math.min(box.width,360)-44)/1024;
  for(const points of medians){for(let i=0;i<points.length;i++){await page.mouse.move(box.x+22+points[i][0]*scale,box.y+22+(900-points[i][1])*scale,{steps:3});if(!i)await page.mouse.down();}await page.mouse.up();await page.waitForTimeout(250);}
  await expect(page.locator('#lantern')).toBeVisible();
 }
 await expect(page.locator('.section-head')).toContainText('RITMO 2');await expect(page.locator('#score')).not.toHaveText('0 punti');
});
