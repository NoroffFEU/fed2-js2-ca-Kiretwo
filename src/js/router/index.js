// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose

// Router 1
/*
export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("./views/home.js");
      break;
    case "/auth/":
      await import("./views/auth.js");
      break;
    case "/auth/login/":
      await import("./views/login.js");
      break;
    case "/auth/register/":
      await import("./views/register.js");
      break;
    case "/post/":
      await import("./views/post.js");
      break;
    case "/post/edit/":
      await import("./views/postEdit.js");
      break;
    case "/post/create/":
      await import("./views/postCreate.js");
      break;
    case "/profile/":
      await import("./views/profile.js");
      break;
    default:
      await import("./views/notFound.js");
  }
}
*/

// Router 2
/*
export default async function router(pathname = window.location.pathname) {
  switch (true) {
    case pathname === "/":
      await import("./views/home.js");
      break;

    case pathname.startsWith("/auth/login"):
      await import("./views/login.js");
      break;

    case pathname.startsWith("/auth/register"):
      await import("./views/register.js");
      break;

    case pathname === "/post/create/": // Handle the create post page separately
      await import("./views/postCreate.js");
      break;

    case pathname.startsWith("/post"):
      const module = await import("./views/post.js");
      const queryString = window.location.search;
      const params = new URLSearchParams(queryString);
      const postId = params.get("id");

      if (postId) {
        module.initPostPage(postId); // Initialize the post page
      } else {
        console.error("Invalid post URL, post ID is missing.");
      }
      break;

    case pathname === "/profile/":
      await import("./views/profile.js");
      break;

    default:
      await import("./views/notFound.js");
  }
}
*/

/*
// Router 3
export default async function router(pathname = window.location.pathname) {
  switch (true) {
    case pathname === "/":
      await import("./views/home.js");
      break;
    case pathname.startsWith("/auth/login"):
      await import("./views/login.js");
      break;
    case pathname.startsWith("/auth/register"):
      await import("./views/register.js");
      break;
    case pathname.startsWith("/post/edit"):
      // Extract the post ID from the query string
      const editQueryString = window.location.search;
      const editParams = new URLSearchParams(editQueryString);
      const editPostId = editParams.get("id");

      if (editPostId) {
        const module = await import("./views/postEdit.js");
        module.initEditPostPage(editPostId); // Initialize the post edit page with correct function
      } else {
        console.error("Invalid post URL, post ID is missing.");
      }
      break;
    case pathname.startsWith("/post"):
      const queryString = window.location.search;
      const params = new URLSearchParams(queryString);
      const postId = params.get("id");

      if (postId) {
        const module = await import("./views/post.js");
        module.initPostPage(postId); // Initialize the post page
      } else {
        console.error("Invalid post URL, post ID is missing.");
      }
      break;
    case pathname === "/profile/":
      await import("./views/profile.js");
      break;
    default:
      await import("./views/notFound.js");
  }
}
*/

// Router 4
export default async function router(pathname = window.location.pathname) {
  switch (true) {
    case pathname === "/":
      await import("./views/home.js");
      break;
    case pathname.startsWith("/auth/login"):
      await import("./views/login.js");
      break;
    case pathname.startsWith("/auth/register"):
      await import("./views/register.js");
      break;
    case pathname.startsWith("/post/create"):
      await import("./views/postCreate.js");
      break;
    case pathname.startsWith("/post") && pathname.includes("id="):
      const module = await import("./views/post.js");
      const queryString = window.location.search;
      const params = new URLSearchParams(queryString);
      const postId = params.get("id");

      if (postId) {
        module.initPostPage(postId); // Initialize the post page
      } else {
        console.error("Invalid post URL, post ID is missing.");
      }
      break;
    case pathname === "/profile/":
      await import("./views/profile.js");
      break;
    default:
      await import("./views/notFound.js");
  }
}






