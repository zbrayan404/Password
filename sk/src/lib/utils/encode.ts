import { MESSAGE_FORMAT } from "$lib/constants";

export function formattedMessage(message: string): string {
  const length: string = message.length.toString();
  return MESSAGE_FORMAT.replace("<L>", length).replace("<M>", message);
}

export function toBinary(message: string): string {
  let binaryMessage: string = "";
  for (let i = 0; i < message.length; i += 1) {
    binaryMessage += message[i].charCodeAt(0).toString(2).padStart(8, " ");
  }
  return binaryMessage;
}

export async function embedMessage(
  message: string,
  imageData: ImageData
): Promise<ImageData> {
  if (message.length > 3 * imageData.height * imageData.width) {
    throw new Error("Message length is too large to hide in image");
  }
  for (let i = 0, j = 0; i < imageData.data.length; i += 1) {
    if (i % 4 === 3) {
      imageData.data[i] = 255;
      continue;
    }
    if (j < message.length) {
      imageData.data[i] = (imageData.data[i] & 254) + Number(message[j]);
      j += 1;
    }
  }
  return imageData;
}
