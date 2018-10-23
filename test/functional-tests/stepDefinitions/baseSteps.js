const {Before,After, AfterAll, Status , BeforeAll} = require('cucumber');
let fs = require('fs');

let {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

    Before(async () => {
        browser.ignoreSynchronization = true
    });

    AfterAll(async () => {
        await browser.close();
        await browser.quit();
    });

    After(async () => {
        await browser.restart();
    });

    After(function (scenario, done) {
        const world = this;
        if (scenario.status === Status.FAILED) {
                browser.takeScreenshot().then(stream => {
                const decodedImage = new Buffer(stream.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
                world.attach(decodedImage, 'image/png');
            })
              .then(() => {
                  done();
              });
        } else {
          done();
        }
    });
