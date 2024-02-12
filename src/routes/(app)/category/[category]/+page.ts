import { baseApiUrl } from '$src/constants.js';

export async function load({ params }) {
  return {
    category: params.category,
    categoryData: await fetch(`${baseApiUrl}/categories/${params.category}`)
      .then((data) => data.json()),
  }
}