import puppeteer from 'puppeteer';

import { beforeAll, describe, expect, it } from 'vitest';

describe('history', () => {
    let browser;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: 'new',
            slowMo: 1,
            args: ['--window-size=1920,1080'],
        });
    });
    it('should go to info page on click', async () => {
        const page = await browser.newPage();
        await page.goto('http://localhost:3002');
        await page.click('.start .btn');
        const url = await page.url();
        expect(url).toBe('http://localhost:3002/info');
    });
    it('should go accept typed value', async () => {
        const page = await browser.newPage();
        await page.goto('http://localhost:3002');
        await page.click('.start .btn');
        await page.type('.info .info__input', 'name');
        const text = await page.$eval('.info .info__input', el => el.value);
        expect(text).toBe('name');
    });
    it('should go to category page', async () => {
        const page = await browser.newPage();
        await page.goto('http://localhost:3002');
        await page.click('.start .btn');
        await page.type('.info .info__input', 'name');
        await page.click('.info .btn');
        const url = await page.url();
        expect(url).toBe('http://localhost:3002/category');
    });
    it('should go chose category', async () => {
        const page = await browser.newPage();
        await page.goto('http://localhost:3002');
        await page.click('.start .btn');
        await page.type('.info .info__input', 'name');
        await page.click('.info .btn');
        await page.click('.category .category__item');
        await page.waitForFunction('window.location.pathname == "/questions"');
        const url = await page.url();
        expect(url).toBe('http://localhost:3002/questions');
    });
    it('should go start quiz', async () => {
        const page = await browser.newPage();
        await page.goto('http://localhost:3002');
        await page.click('.start .btn');
        await page.type('.info .info__input', 'name');
        await page.click('.info .btn');
        await page.click('.category .category__item');

        await page.click('.prepare .btn');
        const el = await page.waitForSelector('.question .question__container');
        expect(el).not.toBeNull();
    });
});
