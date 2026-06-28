import { test, expect } from '@playwright/test';
import { apiData } from '../test-data/api-testdata';

test('ReqRes API Automation', async ({ request }) => {

    // Create User
    const createResponse = await request.post('https://reqres.in/api/users', {
        headers: {
            'x-api-key': 'pro_815e5e029ce369aa03f69c8e1b75bf3b4da44a3c9b650347ceffb91b2047817d',
            'Content-Type': 'application/json'
        },
        data: apiData.createUser
    });

    expect(createResponse.status()).toBe(201);

    const createBody = await createResponse.json();

    expect(createBody.name).toBe(apiData.createUser.name);
    expect(createBody.job).toBe(apiData.createUser.job);

    const userId = createBody.id;

    console.log("Created User Id :", userId);

    expect(userId).toBeTruthy();

    // Get User
    // ReqRes doesn't persist created users, Validating it by 404 Status Code
    const getCreatedUser = await request.get(`https://reqres.in/api/users/${userId}`,
        {
            headers: {
                'x-api-key': 'pro_815e5e029ce369aa03f69c8e1b75bf3b4da44a3c9b650347ceffb91b2047817d'
            }
        }
    );

    expect(getCreatedUser.status()).toBe(404);

    // Using an existing user for GET validation.

    const getResponse = await request.get('https://reqres.in/api/users/2', {
        headers: {
            'x-api-key': 'pro_815e5e029ce369aa03f69c8e1b75bf3b4da44a3c9b650347ceffb91b2047817d'
        }
    });

    expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();

    expect(getBody.data.id).toBe(2);
    expect(getBody.data.first_name).toBe('Janet');

    // Update User

    const updateResponse = await request.put(`https://reqres.in/api/users/${userId}`, {
        headers: {
            'x-api-key': 'pro_815e5e029ce369aa03f69c8e1b75bf3b4da44a3c9b650347ceffb91b2047817d'
        },
        data: apiData.updatedUser
    });

    expect(updateResponse.status()).toBe(200);

    const updateBody = await updateResponse.json();

    expect(updateBody.name).toBe(apiData.updatedUser.name);
    expect(updateBody.job).toBe(apiData.updatedUser.job);

    console.log(updateBody);
});