/* 
Test : Create Booking
Request type : Post
Request body : JSON file
 */

import {test, expect} from '@playwright/test';
import fs from 'fs';

test('Create Post Request using JSOn File body', async ({request})=>{
    
    //Read data from JSON
    const json_path = 'testdata/post_request_body.json';
    const requestBody = JSON.parse(fs.readFileSync(json_path, "utf-8"));

    //Send post Request
    //Base URL cn be configured in the palywright.config.ts
    const repsonse1 = await request.post('https://restful-booker.herokuapp.com/booking', {data:requestBody});

//Print the repsonse
    const responseBody = await repsonse1.json();
    console.log(responseBody);

//Validate status
    expect(repsonse1.ok()).toBeTruthy();
    expect(repsonse1.status()).toBe(200);

//Validate response body Atributes
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody).toHaveProperty('booking');

//Validate booking details
    const booking = responseBody.booking;
    expect(booking).toMatchObject({
        firstname : requestBody.firstname,
        lastname : requestBody.lastname,
        totalprice : requestBody.totalprice,
        depositpaid : requestBody.depositpaid,
        additionalneeds : requestBody.additionalneeds
        });

    expect(booking.bookingdates).toMatchObject({
            checkin : requestBody.bookingdates.checkin,
            checkout : requestBody.bookingdates.checkout
        });
})