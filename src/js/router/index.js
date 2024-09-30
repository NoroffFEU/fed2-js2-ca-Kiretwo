// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose
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




