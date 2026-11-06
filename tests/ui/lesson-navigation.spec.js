import {test,expect} from '@playwright/test';
test('changing tabs and opening practice resets scroll to the top',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await expect(page.locator('h1')).toHaveText('Allenamento');
 await page.locator('[data-nav="library"]').click();await page.evaluate(()=>window.scrollTo(0,1100));await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBeGreaterThan(500);
 await page.locator('[data-nav="settings"]').click();await expect(page.locator('h1')).toHaveText('Impostazioni');await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0);
 await page.evaluate(()=>window.scrollTo(0,1000));await page.locator('[data-nav="collections"]').click();await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0);
 await page.locator('.collection-open').filter({hasText:'A1 LehrBuch'}).click();await expect(page.locator('h1')).toHaveText('A1 LehrBuch');await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0);
 const row=page.locator('[data-collection-practice]').nth(20);await row.scrollIntoViewIfNeeded();await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBeGreaterThan(300);await row.click();await expect(page.locator('#writing svg')).toBeVisible();await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0);
});
test('bundled book survives restart, supports translated search and includes all ten numbers',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.locator('[data-nav="collections"]').click();await page.locator('.collection-open').filter({hasText:'A1 LehrBuch'}).click();await expect(page.locator('.intro')).toContainText('74 parole');
 await page.locator('#select-collection').click();await expect(page.locator('#active-deck')).toContainText('A1 LehrBuch');await page.locator('#collection-search').fill('你好');await expect(page.locator('.word-main b')).toHaveText('你好');await expect(page.locator('.word-main small')).toHaveText('ciao; buongiorno');
 await page.locator('[data-nav="settings"]').click();await page.locator('[data-language="de"]').click();await page.locator('#active-deck').click();await page.locator('#collection-search').fill('Deutschland');await expect(page.locator('.word-main b')).toHaveText('德国');await expect(page.locator('.word-main small')).toHaveText('Deutschland');
 await page.locator('#collection-search').fill('');await page.locator('#collection-next').click();const visible=await page.locator('.word-main b').allTextContents();expect(visible.slice(-10)).toEqual([...'一二三四五六七八九十']);await page.reload();await expect(page.locator('#active-deck')).toContainText('A1 LehrBuch');await page.locator('#active-deck').click();await expect(page.locator('.intro')).toContainText('74');await page.screenshot({path:'screenshots/a1-lehrbuch.png',fullPage:false});
});
