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
    case pathname === "/auth/":
      await import("./views/auth.js");
      break;
    case pathname === "/auth/login/":
      await import("./views/login.js");
      break;
    case pathname === "/auth/register/":
      await import("./views/register.js");
      break;
    case pathname === "/post/create/":
      await import("./views/postCreate.js");
      break;
    case pathname === "/post/": {
      // Check if the URL has an id query parameter
      const params = new URLSearchParams(window.location.search);
      const postId = params.get("id");

      if (postId) {
        await import("./views/post.js");
      } else {
        await import("./views/notFound.js");
      }
      break;
    }
    case pathname === "/profile/":
      await import("./views/profile.js");
      break;
    default:
      await import("./views/notFound.js");
  }
}




