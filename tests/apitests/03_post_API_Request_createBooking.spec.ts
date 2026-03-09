/* 
Test : Create Booking
Request type : Post
Request body : Random/Dynamic data


Pre-requisite : 
Install faker library to generate random data
    npm install @faker-js/faker

Install luxon library to generate dynamic date and time
    npm install luxon
 */

import {test, expect} from '@playwright/test';
import { faker, Faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

test('Create Post Request using JSOn File body', async ({request})=>{
    

//Data generation using faker and luxon
    const fname = faker.person.firstName();
    const lname = faker.person.lastName();
    const totprice = faker.number.int({min:100, max:1000});
    const deppaid = faker.datatype.boolean();
    const currentDate = DateTime.now();
    const checkinDate = currentDate.toFormat('yyyy-MM-dd');
    const checkoutDate = currentDate.plus({days: 5}).toFormat('yyyy-MM-dd');
    const addneeds = 'Breakfast';

//Request body (Dynamic data/Faker data)
    const requestBody = {
        firstname : fname,
        lastname : lname,
        totalprice : totprice,
        depositpaid : deppaid,
        bookingdates : {
            checkin : checkinDate,
            checkout : checkoutDate
        },
        additionalneeds : addneeds
    }

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