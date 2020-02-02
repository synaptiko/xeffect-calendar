#!/usr/bin/node --experimental-modules
import puppeteer from 'puppeteer';

(async function() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('http://localhost:5000', {waitUntil: 'networkidle2'});
	await page.pdf({
		path: 'calendar.pdf',
		landscape: true,
		format: 'a4'
	});

	await browser.close();
}());
