/* 
Test : Create Booking
Request type : Post
Request body : Static
 */

import {test, expect} from '@playwright/test';

test('Create Post Request using static body', async ({request})=>{
    
    const requestBody = {
        firstname : "Pooja",
        lastname : "G",
        totalprice : 1502,
        depositpaid : true,
        bookingdates : {
            checkin : "2026-02-14",
            checkout : "2026-02-16"
        },
        additionalneeds : "Breakfast"
    }

    //Send post Request
    //Base URL can be configured in the playwright.config.ts

    const response1 = await request.post('https://restful-booker.herokuapp.com/booking', {data:requestBody});

//Print the response
    const responseBody = await response1.json(); //this will convert the response to json format
    console.log(responseBody); 

//Validate status
    expect(response1.ok()).toBeTruthy(); //This will check if the response status code is in the range of 200-299
    expect(response1.status()).toBe(200); //This will check if the response status code is exactly 200

//Validate response body Atributes
    expect(responseBody).toHaveProperty('bookingid'); //This will check if the response body has the property 'bookingid'
    expect(responseBody).toHaveProperty('booking');

//Validate booking details
    const booking = responseBody.booking;
    expect(booking).toMatchObject({
        firstname : "Pooja",
        lastname : "G",
        totalprice : 1502,
        depositpaid : true,
        additionalneeds : "Breakfast"
        });

    expect(booking.bookingdates).toMatchObject({
            checkin : "2026-02-14",
            checkout : "2026-02-16"
        });
})



//API related methods used in this test are :
//request.post() : This method is used to send a post request to the specified URL with the given data.
//response.json() : This method is used to convert the response to json format.
//response.ok() : This method is used to check if the response status code is in the range of 200-299.
//response.status() : This method is used to check the exact status code of the response.
//expect().toHaveProperty() : This method is used to check if the response body has a specific property.
//expect().toMatchObject() : This method is used to check if the response body matches the expected object structure and values.