const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3001/");

  await page.focus("#emailInput");
  await page.keyboard.type("test@test.test");

  await page.focus("#passwordInput");
  await page.keyboard.type("test");

  await page.evaluate(() => {
    document.querySelector("button[type=submit]").click();
  });
  await page.waitForFunction(
    `document.querySelector("body").innerText.includes("Login")`
  );
  console.log("Login successful");
  await page.screenshot({ path: "login-succesful.png" });

  const page2 = await browser.newPage();
  await page2.goto("http://localhost:3001/");

  await page2.focus("#emailInput");
  await page2.keyboard.type("not@an.email");

  await page2.focus("#passwordInput");
  await page.keyboard.type("wrongpw");

  await page2.evaluate(() => {
    document.querySelector("button[type=submit]").click();
  });
  await page2.waitForFunction(
    `document.querySelector("body").innerText.includes("Login")`
  );
  console.log("Login failed");
  await page2.screenshot({ path: "login-error.png" });

  await browser.close();
})();
