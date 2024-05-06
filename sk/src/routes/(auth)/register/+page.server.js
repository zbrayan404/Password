import { redirect } from "@sveltejs/kit";

export const load = ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  }
};

async function blob(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
}

export const actions = {
  register: async ({ locals, request }) => {
    const formData = await request.formData();

    const email = formData.get("email") ?? "";
    const password = formData.get("password") ?? "";
    const name = formData.get("name") ?? "";
    const avatar = formData.get("avatar") ?? "";

    const avatarBlob = await blob(avatar);

    const data = new FormData();
    data.append("email", email);
    data.append("name", name);
    data.append("avatar", avatarBlob, name + ".svg");

    try {
      data.append("password", password);
      data.append("passwordConfirm", password);
      const newUser = await locals.pb.collection("users").create(data);
    } catch (err) {
      console.log("Error:", err);
      return {
        error: true,
        email: email,
      };
    }

    throw redirect(303, "/login");
  },
};
