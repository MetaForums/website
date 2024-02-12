import { baseApiUrl } from '$src/constants';
import { fail } from '@sveltejs/kit';

import type { Actions } from './$types';

const creatingThreads: Record<string, boolean> = {};

export const actions = {	
  default: async ({ cookies, request, params }) => {
    const data = await request.formData();
    const content = data.get('content');
    const thread = params.thread;
    const token = cookies.get('token');

    if (!token) fail(401, { message: 'Unauthorized' });

    if (creatingThreads[token!.toString()])
      return;

    creatingThreads[token!.toString()] = true;

    const response = await fetch(`${baseApiUrl}/threads/${thread}`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    delete creatingThreads[token!.toString()];

    const body = await response.json();

    if (!response.ok) 
      return fail(body.status, { message: body.message });

    return { success: true, post: body };
  },
} satisfies Actions;