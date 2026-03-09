import {test, Page, expect} from '@playwright/test';
import { afterEach, beforeEach } from 'node:test';
test.describe('Test Group 1', () => {
    test('Test 1', async ({ page }) => {
        console.log('This is Group 1 - Test 1');
    })

    test('Test 2', async ({ page }) => {
        console.log('This is Group 1 - Test 2');
    })

    test('Test 3', async ({ page }) => {
        console.log('This is Group 1 - Test 3');
    })
})

test.describe('Test Group 2', () => {
    test('Test 1', async ({ page }) => {
        console.log('This is Group 2 - Test 1');
    })

    test('Test 2', async ({ page }) => {
        console.log('This is Group 2 - Test 2');
    })

    test('Test 3', async ({ page }) => {
        console.log('This is Group 2 - Test 3');
    })
})


test.describe('Hooks Demo', () => {

    let page:Page; // Declare the page variable at the describe level because it will be used in multiple hooks and tests
    
    test.beforeEach(async () => {
        console.log('Logging in before each test');
    })

    test.beforeAll(async ({browser}) => {
        page = await browser.newPage(); // Initialize the page variable before all tests, this will be shared across all tests in this describe block
        console.log('Executing before all tests');
    })

    test.afterEach(async () => {
        console.log('Logging out after each test');
    })

    test.afterAll(async () => {
        console.log('Executing after all tests');
    })

    test('Test 1', async () => {
        console.log('This is Hooks - Test 1');
    })

    test('Test 2', async () => {
        console.log('This is Hooks - Test 2');
    })
})


/* Annotations in Playwright
test.only(...)
•	Purpose: Runs only this test and skips all others.
•	Use Case: Focus on a specific test during debugging.
test.skip(...)
•	Purpose: Skips the test entirely; it will not run, and Playwright will show it as skipped.
•	Use Case: Skip incomplete or irrelevant tests for the current run.
test.fail(...)
•	Purpose: Marks a test as expected to fail. If it passes, Playwright highlights it as an unexpected success.
•	Use Case: Track known issues without breaking the test suite.
test.fixme(...)
•	Purpose: Marks a test that needs to be fixed. The test is automatically skipped.
•	Use Case: Mark broken or incomplete tests for future fixing.
test.slow(...)
•	Purpose: Increases the timeout for this test.
•	Use Case: Tests that involve heavy computation, slow network requests, or large file downloads.
*/