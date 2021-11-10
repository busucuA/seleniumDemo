const {Builder, By, Key} = require ("selenium-webdriver");
const assert = require ("assert");

async function testSearchInput(){

//launch the browser
let driver = await new Builder().forBrowser("firefox").build();

//navigate to the website
await driver.get("https://www.pearson.com/");

//input text and search
await driver.findElement(By.id("search-box-input")).sendKeys("Social Capabilities", Key.RETURN);
    
//
setTimeout(async() => {
    //close cookie notifications
    await driver.findElement(By.id("cookie-notification-policy-accept-continue")).click();
    //assert 10 articles shown
    let results = await driver.findElements(By.className("productItem")).then(elements => elements.length);
    assert.strictEqual(results, 10);
    //click next
    await driver.findElement(By.xpath("//ul[@class='pagination']//a[contains(text(), 'Next')]")).click();
    //wait for the articles to load
    setTimeout(async() => {
        //click 3rd article
        await driver.findElement(By.xpath("//div[@class='st-results-container']//article[3]//a")).click();
        //assert if at proper article
        let curentUrl = await driver.getCurrentUrl();
        assert.strictEqual(curentUrl, 'https://www.pearson.com/content/dam/one-dot-com/one-dot-com/global/Files/efficacy-and-research/skills-for-today/Self-Management-ExecSum-PolicyMakers.pdf');
    }, 1000);
}, 5000);

//close the browser
//await driver.quit();
}

testSearchInput()



