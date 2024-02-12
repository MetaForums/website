import { baseApiUrl } from '$src/constants';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {	
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const username = data.get('username');
    const displayName = data.get('displayName');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');
    const email = data.get('email');

    if (confirmPassword != password)
      return fail(400, { incorrect: true, message: 'Passwords do not match' });

    const response = await fetch(`${baseApiUrl}/users/signup`, {
      method: 'POST',
      body: JSON.stringify({ username, password, email, displayName }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const body = await response.json();

    if (!response.ok) 
      return fail(body.status, { incorrect: true, message: body.message });

    const token = await fetch(`${baseApiUrl}/auth/signin`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(result => result.json());

    cookies.set('token', token.access_token, { path: '/' });

    return { success: true };
  },
} satisfies Actions;