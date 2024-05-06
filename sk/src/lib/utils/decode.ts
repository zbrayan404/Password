import { MESSAGE_HEADER, MESSAGE_BORDER } from "$lib/constants";

export function* extractText(
  imageData: ImageData
): Generator<string, void, void> {
  let pixelBits = "";
  for (let i = 0; i < imageData.data.length; i += 1) {
    if (i % 4 === 3) {
      continue;
    }
    if (imageData.data[i] % 2 === 0) {
      pixelBits += "0";
    } else {
      pixelBits += "1";
    }
    if (pixelBits.length === 8) {
      yield toChar(pixelBits);
      pixelBits = "";
    }
  }
}

function toChar(bits: string): string {
  return String.fromCharCode(parseInt(bits, 2));
}

export function extractMessage(
  iterator: Generator<string, void, void>
): string {
  let header = "";
  let length = "";
  let border = 0;

  for (const value of iterator) {
    if (header.length < MESSAGE_HEADER.length) {
      header += value;
      if (header.length === MESSAGE_HEADER.length) {
        if (header !== MESSAGE_HEADER) {
          throw new Error("Message Header Not Found");
        }
      }
    } else {
      if (value === MESSAGE_BORDER) {
        border += 1;
        if (border === 1) {
          continue;
        }
        if (border === 2) {
          return getMessageContent(Number(length), iterator);
        }
      }
      if (isNaN(Number(value))) {
        throw new Error("Message Length Not Found");
      } else {
        length += value;
      }
    }
  }

  throw new Error("Message Not Found");
}

function getMessageContent(
  contentLength: number,
  iterator: Generator<string, void, void>
): string {
  let content = "";

  for (const value of iterator) {
    content += value;
    if (content.length == contentLength) {
      break;
    }
  }
  return content;
}
