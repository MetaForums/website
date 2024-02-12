import { baseApiUrl } from '$src/constants.js';

export async function load({ fetch }) {
  return {
    categories: await fetch(`${baseApiUrl}/categories`)
      .then((data) => data.json()),
  }
}