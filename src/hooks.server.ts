import type { Handle } from '@sveltejs/kit';
import { baseApiUrl } from './constants';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.token = event.cookies.get('token');

  if (event.locals.token) {
    const response = await fetch(`${baseApiUrl}/users/@me`, {
      headers: {
        Authorization: `Bearer ${event.locals.token}`
      }
    });

    if (!response.ok) {
      event.locals.token = undefined;
      event.cookies.delete('token', { path: '/' });
    } else {
      event.locals.user = await response.json();
    }
  }

  return await resolve(event);
}