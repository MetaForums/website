import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
  cookies.delete('token', { path: '/' });
  throw redirect(302, '/signin');
}