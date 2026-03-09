/* 
1) No auth(Public API)
2) Basic auth/Preemptive auth (Username and password)
3) Bearer token auth
4) API key auth
*/

import { test, expect } from '@playwright/test';

//1) No auth(Public API)
test('No auth API request', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.ok()).toBeTruthy();
    console.log(await response.json());
})

//2) Basic auth
test('Basic Auth', async ({ request }) => {
    const response = await request.get('https://httpbin.org/basic-auth/user/pass', {
        headers:{
            Authorization:"Basic "+Buffer.from("user:pass").toString('base64')
        }
    });
    expect(response.ok()).toBeTruthy();
    console.log(await response.json());
})


//3) Bearer token auth
test('Bearer Token Auth - Get repos', async ({ request }) => {
    const Bearertoken = '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';
    const response = await request.get('https://api.github.com/user/repos', {
        headers:{
            Authorization:`Bearer ${Bearertoken}`
        }
    });
    expect(response.ok()).toBeTruthy();
    console.log(await response.json());
})

test('Bearer Token Auth - Get user info', async ({ request }) => {
    const Bearertoken = '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';
    const response = await request.get('https://api.github.com/user', {
        headers:{
            Authorization:`Bearer ${Bearertoken}`
        }
    });
    expect(response.ok()).toBeTruthy();
    console.log(await response.json());
})

//4) API key auth
test('API Key Auth - openweathermap.org', async ({ request }) => {
        const API_Key = '8271699f01400e208627fc34fce8d845';
    const response = await request.get('https://api.openweathermap.org/data/2.5/weather', {
        params:{
            q:'Delhi',
            appid:API_Key
        }
    });
    expect(response.ok()).toBeTruthy();
    console.log(await response.json());
})

test.only('API Key Auth - https://www.weatherapi.com/', async ({ request }) => {
    const API_Key = '4d8354f4372a49c3ad463503260903';
    const response = await request.get('http://api.weatherapi.com/v1/current.json', {
        params:{
            q:'London',
            key:API_Key
        }
    });
    expect(response.ok()).toBeTruthy();
    console.log(await response.json());
})