import { test, expect } from "@playwright/test";

test.describe("test suite 1", () => {
  /**
   * these tests assume the following graph state:
   * {
   *   links: [
   *     // {
   *     //   source: "test",
   *     //   target: "test2",
   *     // },
   *     {
   *       source: "id1",
   *       target: "id3",
   *       undirected: true,
   *     },
   *   ],
   *   nodes: [
   *     // TODO delete this
   *     {
   *       id: "id1",
   *       title: "test1",
   *       content: "this is test 1",
   *       labels: ["Test"],
   *     },
   *     {
   *       id: "id2",
   *       title: "test2",
   *       content: "this is test2 ",
   *       labels: [],
   *     },
   *     {
   *       id: "id3",
   *       title: "test 3",
   *       content: "Hello from test3! ",
   *       labels: [],
   *     },
   *   ],
   *   deletedNodes: [],
   *   labels: [
   *     // "Test", "not a test"
   *   ],
   *   deletedLinks: [],
   * };
   */
  test("test add reference", async ({ page }) => {
    await page.goto("http://localhost:3000/notesProcessor");
    await page.getByText("test 3").click();
    await page.getByText("Hello from test3!").click();
    await page
      .locator("div")
      .filter({ hasText: /^Hello from test3!$/ })
      .nth(4)
      .fill("Hello from test3! [[");
    await page.getByRole("button", { name: "test2" }).click();
    await page.getByText("test2").nth(2).click();
    await page.getByText("test 3").nth(1).click();
  });

  test("test add then delete reference", async ({ page }) => {
    await page.goto("http://localhost:3000/notesProcessor");
    await page.getByText("test 3").click();
    await page.getByText("Hello from test3!").click();
    await page
      .locator("div")
      .filter({ hasText: /^Hello from test3!$/ })
      .nth(4)
      .fill("Hello from test3! [[");
    await page.getByRole("button", { name: "test1" }).click();
    await page.getByText("test1").nth(2).click();
    await page.getByText("test 3").nth(1).click();
    await page.getByText("Hello from test3! test1").click();
    await page
      .locator("div")
      .filter({ hasText: /^Hello from test3! test1$/ })
      .nth(4)
      .fill("Hello from test3! ");
    await page.getByText("article test1").first().click();
  });

  test("test add two references", async ({ page }) => {
    await page.goto("http://localhost:3000/notesProcessor");
    await page.getByText("test 3").click();
    await page.getByText("Hello from test3!").click();
    await page
      .locator("div")
      .filter({ hasText: /^Hello from test3!$/ })
      .nth(4)
      .fill("Hello from test3! [[");
    await page.getByRole("button", { name: "test2" }).click();
    await page.getByText("Hello from test3! test2").click();
    await page.locator(".tiptap").fill("Hello from test3! test2   [[");
    await page.getByRole("button", { name: "test2" }).click();
    await page.getByText("article").nth(3).click();
    await page.getByText("test 3").nth(1).click();
  });

  test("test referencedBy", async ({ page }) => {
    await page.goto("http://localhost:3000/notesProcessor");
    await page.getByText("article test 3").click();
    await page.getByText("Hello from test3!").click();
    await page
      .locator("div")
      .filter({ hasText: /^Hello from test3!$/ })
      .nth(4)
      .fill("Hello from test3! [[");
    await page.getByRole("button", { name: "test2" }).click();
    await page.getByText("test2").nth(2).click();
    await expect(page.getByText("test 4").nth(1)).not.toBeVisible();
    await expect(page.getByText("test 3").nth(1)).toBeVisible();
  });

  test("test add one reference", async ({ page }) => {
    await page.goto("http://localhost:3000/notesProcessor");
    await page.getByText("test 3").click();
    await page.getByText("Hello from test3!").click();
    await page
      .locator("div")
      .filter({ hasText: /^Hello from test3!$/ })
      .nth(4)
      .fill("Hello from test3! [[");
    await page.getByRole("button", { name: "test1" }).click();
    await expect(page.getByText("test1").nth(2)).toBeVisible();
  });
});

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//
//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });
//
// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//
//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();
//
//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
