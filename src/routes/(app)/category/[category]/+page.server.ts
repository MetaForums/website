import { baseApiUrl } from '$src/constants';
import { fail } from '@sveltejs/kit';

import type { Actions } from './$types';

const creatingPosts: Record<string, boolean> = {};

export const actions = {	
  default: async ({ cookies, request, params }) => {
    const data = await request.formData();
    const title = data.get('title');
    const content = data.get('content');
    const tags = data.get('tags')?.toString().split(',');
    const category = params.category;
    const token = cookies.get('token');

    if (!token) fail(401, { message: 'Unauthorized' });

    if (creatingPosts[token!.toString()]) 
      return;

    creatingPosts[token!.toString()] = true;

    const response = await fetch(`${baseApiUrl}/categories/${category}`, {
      method: 'POST',
      body: JSON.stringify({ title, content, tags }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    delete creatingPosts[token!.toString()];

    const body = await response.json();

    if (!response.ok) 
      return fail(body.status, { message: body.message });

    return { success: true, post: body };
  },
} satisfies Actions;