export default defineNuxtRouteMiddleware((to) => {
  // /posts -> /postsList/1
  if (to.path === "/posts" || to.path === "/posts/") {
    const config = useRuntimeConfig();
    return navigateTo("/postsList/1", { redirectCode: 301, external:false } );
  }
  // /postsList -> /postsList/1
  if (to.path === "/postsList" || to.path === "/postsList/") {
    const config = useRuntimeConfig();
    return navigateTo("/postsList/1", { redirectCode: 301, external:false } );
  }

  // /rss -> /rss.xml
  if(to.path == "/rss") {
    return navigateTo("/rss.xml", { redirectCode: 301, external:true } );
  }

});