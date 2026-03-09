/* 
Playwright can be used to test the application for many accessibility issues. 

Examples:
- Missing alt attributes on images
- Insufficient color contrast
- Missing ARIA labels
- Keyboard navigation issues

Every Website should follow WCAG (Web Content Accessibility Guidelines) to ensure that it is accessible to all users,
including those with disabilities.

Prerequisites:
- Install Playwright: npm install @playwright/test

https://playwright.dev/docs/accessibility-testing
https://www.w3.org/WAI/standards-guidelines/wcag/
https://www.npmjs.com/package/@axe-core/playwright
*/

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Accessibility test', async({page}, testInfo) => {
    //await page.goto('https://demowebshop.tricentis.com/');
    await page.goto('https://www.bbc.co.uk/accessibility');

// 1) Scanning all types of WCAG violations
    const axeScanresults = await new AxeBuilder({ page }).analyze();
    //console.log(axeScanresults.violations);

    console.log(`Total Violations1: ${axeScanresults.violations.length}`);

    // Attaching the accessibility violations to the test report
    // It will be stored as an attachment in the test report and can be accessed for further analysis.
    // The path is: tests/playwright-report/html/attachments
    testInfo.attach('Accessibility Violations', {
        body: JSON.stringify(axeScanresults.violations, null, 2),
        contentType: 'application/json',
    });

    //expect(axeScanresults.violations).toEqual([]);
    //expect(axeScanresults.violations.length).toBe(0);
    expect(axeScanresults.violations.length).toBeGreaterThan(0);

// 2) Scanning for specific WCAG violations with custom tags
    const axeScanresults2 = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a','wcag21aa']) 
        .analyze();

    //console.log(axeScanresults2.violations);
    console.log(`Total Violations2: ${axeScanresults2.violations.length}`);
    expect(axeScanresults2.violations).toEqual([]);

// 3) Scanning for specific WCAG violations with custom rules
    const axeScanresults3 = await new AxeBuilder({ page })
        .withRules(['duplicate-Id'])
        .analyze();

    /* const axeScanresults3 = await new AxeBuilder({ page })
        .disableRules(['duplicate-Id'])
        .analyze(); */
    console.log(`Total Violations3: ${axeScanresults3.violations.length}`);
    expect(axeScanresults3.violations.length).toBeLessThan(3);
})