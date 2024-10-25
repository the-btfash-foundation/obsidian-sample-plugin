import { expect } from "@playwright/test";
import { test } from "obsidian-testing-library";
import { TFile } from "obsidian";
import {
	assertLineEquals,
	doWithApp,
	readFile,
} from "obsidian-testing-library/utils";
test("page url", async ({ page }) => {
	console.log(page.url());
	expect(/obsidian\.md/i.test(page.url())).toBeTruthy();
});
test("file basename", async ({ page }) => {
	let tfile = await doWithApp<TFile | null>(page, async (app) => {
		return app.metadataCache.getFirstLinkpathDest("Welcome", "/");
	});
	expect(tfile?.basename).toEqual("Welcome");
});

test("check file line", async ({ page }) => {
	console.log(await readFile(page, "Welcome.md"));
	await assertLineEquals(page, "Welcome.md", 0, "This is your new *vault*.");
});
