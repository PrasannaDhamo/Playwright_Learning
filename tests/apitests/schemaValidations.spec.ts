/* 
Pre-requisites:
npm install --save-dev playwright ajv
Ajv is a JSON schema validator that can be used to validate the response body against a predefined schema.
*/

import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

//1) Scehema validation - 1
test('Schema Validation - 1', async ({ request }) => {
    const response = await request.get('https://mocktarget.apigee.net/json');
    const responseBody = await response.json();
    console.log(responseBody);

//Define the Json Scheme
    const schema = {
            "type": "object",
            "properties": {
                "firstName": { type: "string" },
                "lastName": { type: "string" },
                "city": { type: "string" },
                "state": { type: "string" }
            },
            "required": ["city","firstName","lastName","state"],
            "additionalProperties": false
        };
    const ajv = new Ajv();
    const validate = ajv.compile(schema) //ajv.compile() returns  a validator function
    const isValid = validate(responseBody);//this will validate the response body against the schema and return boolean value. 
    expect(isValid).toBeTruthy();
})


//2) Scehema validation - 2
test.only('Schema Validation - 2', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    const responseBody = await response.json();
    console.log(responseBody);

//Define the Json Scheme
    const schema = {
            "type": "object",
            "properties": {
                "userId": { type: "integer" },
                "id": { type: "integer" },
                "title": { type: "string" },
                "body": { type: "string" }
            },
            "required": ["body","id","title","userId"],
            "additionalProperties": false
        };
    const ajv = new Ajv();
    const validate = ajv.compile(schema) //ajv.compile() returns  a validator function
    const isValid = validate(responseBody);//this will validate the response body against the schema and return boolean value. 
    expect(isValid).toBeTruthy();
})