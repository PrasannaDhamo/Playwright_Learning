//Frames are used to embed another document within the current HTML document.

import {test,expect,Locator} from "@playwright/test";

test("Frames", async ({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/");
    //Get the number of frames in the page
    const frames = page.frames();
    console.log("Number of frames in the page:", frames.length);
    expect(frames.length).toBe(7);

    //Approach 1: Access using page.frame()
    const frame1 = page.frame({url:'https://ui.vision/demo/webtest/frames/frame_1.html'});
    if(frame1){
        await frame1.locator("input[name='mytext1']").fill("Frame 1 Text");
        //Option 2 - await frame1.fill("input[name='mytext1']","Frame 1 Text");
    }

    //Approach 2: Access using frameLocator()
    const frame2 = page.frameLocator("src=['frame_2.html']");
    await frame2.locator("input[name='mytext2']").fill("Frame 2 Text");
    //Option 2 - await frame2.fill("input[name='mytext2']","Frame 2 Text");

    //Approach 3: child frames
    const frame3 = page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3.html'});
    if(frame3){
        const childframes = frame3.childFrames();
        console.log("Number of child frames in Frame 3:", childframes.length);
        const radio = childframes[0].getByLabel('I am a human');
        await radio.check();
        await expect(radio).toBeChecked();
    }
})


test.only("Frames test", async ({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frame = page.frameLocator('[src="frame_5.html"]');
    await page.frameLocator('[src="frame_5.html"]').locator("input[name='mytext5']").fill("Frame Text");

    const link = frame.locator("a[href='https://a9t9.com']");
    await link.click();
    await page.waitForLoadState('networkidle');

    const isheaderVisible = await frame.getByAltText('Ui.Vision by a9t9 software - Image-Driven Automation').isVisible();
    expect(isheaderVisible).toBeTruthy();   
})