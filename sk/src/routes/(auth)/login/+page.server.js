import { redirect } from "@sveltejs/kit";

export const load = ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  }
};

export const actions = {
  login: async ({ request, locals }) => {
    const formData = await request.formData();

    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    try {
      const { token, user } = await locals.pb
        .collection("users")
        .authWithPassword(email, password);
    } catch (err) {
      console.log("Error:", err);
      return {
        error: true,
        email: email,
      };
    }
    throw redirect(303, "/");
  },
};
