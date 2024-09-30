// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose

export default async function router(pathname = window.location.pathname) {
  switch (true) {
    case pathname === "/":
      await import("./views/home.js");
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
    case pathname.startsWith("/post/edit"):
      const editParams = new URLSearchParams(window.location.search);
      const editPostId = editParams.get("id");

      if (editPostId) {
        const editModule = await import("./views/postEdit.js");
        if (editModule.initEditPostPage) {
          await editModule.initEditPostPage(editPostId);
        } else {
          console.error("initEditPostPage function not found in postEdit module.");
        }
      } else {
        console.error("Invalid post URL, post ID is missing.");
      }
      break;
    case pathname.startsWith("/post"):
      const viewParams = new URLSearchParams(window.location.search);
      const postId = viewParams.get("id");

      if (postId) {
        const viewModule = await import("./views/post.js");
        if (viewModule.initPostPage) {
          await viewModule.initPostPage(postId);
        } else {
          console.error("initPostPage function not found in post module.");
        }
      } else {
        console.error("Invalid post URL, post ID is missing.");
      }
      break;
    case pathname === "/profile/":
      await import("./views/profile.js");
      break;
    default:
      await import("./views/notFound.js");
      alert("Page cannot be found in /src/views");
  }
}











