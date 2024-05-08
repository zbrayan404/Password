import { MESSAGE_HEADER, MESSAGE_BORDER } from "$lib/constants";

export function* extractText(
  imageData: ImageData
): Generator<string, void, void> {
  let bits = "";
  for (let byte = 0; byte < imageData.data.length; byte += 1) {
    if (byte % 4 === 3) {
      continue;
    }
    if (imageData.data[byte] % 2 === 0) {
      bits += "0";
    } else {
      bits += "1";
    }
    if (bits.length === 8) {
      yield toChar(bits);
      bits = "";
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
