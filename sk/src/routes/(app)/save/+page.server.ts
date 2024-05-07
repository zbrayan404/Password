import { error } from "@sveltejs/kit";

export async function load({ locals }) {
  const getData = async () => {
    try {
      const records = await locals.pb.collection("passwords").getFullList();
      let data = records.map((record) => ({
        id: record.id,
        name: record.name,
        url: record.url,
        image: replaceHost(locals.pb.files.getUrl(record, record.image)),
      }));
      return data;
    } catch (error) {
      console.error("Error fetching budgets:", error);
      throw error; // rethrow the error
    }
  };

  return {
    data: await getData(),
  };
}

function replaceHost(url: string): string {
  const urlObj = new URL(url);
  urlObj.hostname = "localhost";
  return urlObj.toString();
}
