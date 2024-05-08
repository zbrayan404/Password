import { redirect } from "@sveltejs/kit";

export const actions = {
  add: async ({ request, locals }) => {
    const formData = await request.formData();

    const name = formData.get("name")?.toString() ?? "";
    const url = formData.get("url")?.toString() ?? "";
    const image = formData.get("image") ?? null;

    const imageBlob = await getBlob(image);

    if (!imageBlob) {
      console.error("Image not provided");
    }

    const data = {
      user: locals.pb.authStore?.model.id,
      name: name,
      url: url,
      image: imageBlob,
    };

    try {
      await locals.pb.collection("passwords").create(data);
      throw redirect(303, "/save");
    } catch (error) {
      console.error(error);
    }
    throw redirect(303, "/home");
  },
};

async function getBlob(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
}
