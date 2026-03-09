import {test, expect} from '@playwright/test'

test('Get Booking Details by ID - Path Parameter', async({request})=>{
    const bookingID = 8; //we can pass this as path parameter
    let response1 = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`);
    let responseBody = await response1.json();
    console.log(responseBody);

    expect(responseBody).toHaveProperty("firstname");
    expect(responseBody).toMatchObject({
        firstname : "Mark",
        lastname : "Jackson",});
})


test.only('Get Booking Details by ID - Query Parameter', async({request})=>{
    const fname = 'Josh';
    const lname = 'Allen'
    let response1 = await request.get(`https://restful-booker.herokuapp.com/booking?firstname=${fname}&lastname=${lname}`);
    let response2 = await request.get("https://restful-booker.herokuapp.com/booking",{params:{fname,lname}});
    let responseBody = await response2.json();
    //console.log(responseBody);

    expect(responseBody.length).toBeGreaterThan(0);

    for(let i of responseBody){
        if(i.bookingid==708){
            console.log(i);
            break;
        }
    }
})

