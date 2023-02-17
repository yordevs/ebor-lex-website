const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

//Get all posts returning their slugs so we know if the page requested is a real post
export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.posts;
}

//Get the latest 20 posts to display on the homepage
export async function getAllPostsForHome() {
  const data = await fetchAPI(
    `
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          name
          firstName
          lastName
          avatar {
            url
          }
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query LatestPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC }, tagNotIn: ["featured"] }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `
  );

  return data?.posts;
}

//Get the post based on the slug and then the latest 2 posts to show at the bottom of the post
// This is used for the post page
export async function getPostAndMorePosts(slug) {
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
      description
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }1
        }
      }
    }
  `,
    {
      variables: {
        id: slug,
        idType: "SLUG",
      },
    }
  );

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}

// Get the latest 3 posts based on their category
// This is used for the category page
export async function getPostsByCategory(category) {
  const data = await fetchAPI(
    `
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          name
          firstName
          lastName
          avatar {
            url
          }
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostsByCategory($category: String!) {
      posts(first: 3, where: { orderby: { field: DATE, order: DESC }, categoryName: $category }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        category,
      },
    }
  );

  return data;
}

// Get a list of the catagories that have posts
// This is used for the category page
export async function getCategories() {
  const data = await fetchAPI(
    `
    query Categories {
      categories {
        edges {
          node {
            name
          }
        }
      }
    }
  `
  );

  return data;
}

// Get the latest featured post to display on the homepage
// This is used for the homepage
export async function getFeaturedPost() {
  const data = await fetchAPI(
    `
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          name
          firstName
          lastName
          avatar {
            url
          }
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query FeaturedPost {
      posts(first: 1, where: { orderby: { field: DATE, order: DESC }, tag: "featured" }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `
  );

  return data;
}
