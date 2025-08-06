// src/Utils/api/imageUtils.js

const BASE_URL = "https://www.royalcaribbean.com";

/**
 * Extracts stateroom image URLs from a single cruise object.
 * @param {object} cruise - The specific cruise object from the API's 'cruises' array.
 * @returns {string[]} An array of full, unique image URLs.
 */
export const getImagesFromCruiseObject = (cruise) => {
  // Safely access the stateroom classes directly from the cruise object.
  const stateroomClasses =
    cruise?.masterSailing?.itinerary?.ship?.stateroomClasses;

  if (!stateroomClasses || !Array.isArray(stateroomClasses)) {
    return []; // Return empty if no staterooms are found
  }

  // Use flatMap to get all images from all stateroom classes into a single array
  const imageUrls = stateroomClasses.flatMap(
    (stateroom) =>
      stateroom?.content?.media?.images?.map(
        (image) => `${BASE_URL}${image.path}`
      ) ?? []
  );

  // Return only unique image URLs
  return [...new Set(imageUrls)];
};
