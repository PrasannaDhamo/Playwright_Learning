/* 
1) Create a new booking(POST API request) --> bookingID
2) Create a token
3) Update the booking details using bookingId and token (PUT API request)
4) Patch the booking details using bookingId and token (PATCH API request)
5) Delete the booking using bookingId and token (DELETE API request)
*/

import { test, expect } from '@playwright/test';
import fs from 'fs';

//Utility function to parse JSON file data
function readJSONfile(filepath: string) {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
}

test('Update Booking', async ({ request }) => {

//Step 1: Create a new booking and get the booking ID
    console.log("Step 1: Create a new booking and get the booking ID");
    let JsonFilePath1 = 'testdata/post_request_body.json';
    let requestBody = readJSONfile(JsonFilePath1);
    const repsonse1 = await request.post('https://restful-booker.herokuapp.com/booking', { data: requestBody });
    let response1body = await repsonse1.json();
    const bookingID = response1body.bookingid;
    console.log(bookingID);

//Step 2: Create a token
    console.log("Step 2: Create a token");
    const requestbody2 = {
        username: "admin",
        password: "password123"
    }
    const repsonse2 = await request.post('https://restful-booker.herokuapp.com/auth', { data: requestbody2 });
    let response2body = await repsonse2.json();
    const token = response2body.token;
    console.log(token);

//Step 3: Update the booking details using bookingId and token (PUT API request)
    console.log("Step 3: Update the booking details using bookingId and token (PUT API request)");
    let JsonFilePath2 = 'testdata/put_request_body.json';
    let requestBody3 = readJSONfile(JsonFilePath2);
    const repsonse3 = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingID}`,
        {
            data: requestBody3,
            headers: { "Cookie": `token=${token}` }
        });
    const response3body = await repsonse3.json();
    console.log(response3body);

//Step 4: Patch update the booking details using bookingId and token (PATCH API request)
    console.log("Step 4: Patch update the booking details using bookingId and token (PATCH API request)");
    const requestbody4 = {
        firstname: "Pooja",
        lastname: "Prasanna",
    }
    const repsonse4 = await request.patch(`https://restful-booker.herokuapp.com/booking/${bookingID}`,
        {
            data: requestbody4,
            headers: { "Cookie": `token=${token}` }
        });
    const response4body = await repsonse4.json();
    console.log(response4body);

//Step 5: Delete the booking using bookingId and token (DELETE API request)
    console.log("Step 5: Delete the booking using bookingId and token (DELETE API request)");
    const repsonse5 = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingID}`,
        {
            headers: { "Cookie": `token=${token}` }
        });
    
    expect(repsonse5.status()).toBe(201);
    console.log(repsonse5.statusText());
    console.log("Booking deleted successfully");
})