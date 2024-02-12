import { baseApiUrl } from '$src/constants';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {	
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    const response = await fetch(`${baseApiUrl}/auth/signin`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const body = await response.json();

    if (!response.ok) 
      return fail(body.status, { incorrect: true, message: body.message });

    cookies.set('token', body.access_token, { path: '/' });

    return { success: true };
  },
} satisfies Actions;