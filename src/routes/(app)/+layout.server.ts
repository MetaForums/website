export function load({ locals }) {
  return {
    user: locals.user,
    token: locals.token
  };
}