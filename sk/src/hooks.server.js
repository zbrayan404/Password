import { pb } from "$lib/pocketbase";

export async function handle({ event, resolve }) {
  event.locals.pb = pb;
  event.locals.pb.authStore.loadFromCookie(
    event.request.headers.get("cookie") || ""
  );

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    event.locals.pb.authStore.isValid &&
      (await event.locals.pb.collection("users").authRefresh());
  } catch (err) {
    console.log("error in hooks");
    // clear the auth store on failed refresh
    event.locals.pb.authStore.clear();
  }

  event.locals.user = structuredClone(pb.authStore.model);

  const response = await resolve(event);

  response.headers.append(
    "set-cookie",
    event.locals.pb.authStore.exportToCookie({ httpOnly: false })
  );

  return response;
}
