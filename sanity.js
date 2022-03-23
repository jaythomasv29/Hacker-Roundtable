import {
  createImageUrlBuilder,
  createCurrentUserHook,
  createClient,
} from "next-sanity";

// https://www.nextjs.org/docs/basic-features/environment-variables
export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-03-25",
  useCdn: process.env.NODE_ENV === "production",
}

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)

/* Set up helpder function for generationg Image Urls with only the asset reference data in your documents
  https://www.sanity.io/docs/image-url
*/
export const urlFor = (source) => createImageUrlBuilder(config).image(source);