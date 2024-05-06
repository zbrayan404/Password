export function getImageData(base64Image: string): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const image: HTMLImageElement = new Image();
    image.onload = () => {
      const canvas: HTMLCanvasElement = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (context) {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const imageData: ImageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        resolve(imageData);
      } else {
        reject(new Error("Canvas context is not supported"));
      }
    };
    image.onerror = () => {
      reject(new Error("Failed to load image"));
    };
    image.src = base64Image;
  });
}

export function getBase64Image(data: Blob | ImageData): Promise<string> {
  return new Promise((resolve, reject) => {
    if (data instanceof Blob) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(data);
      reader.onload = (event: ProgressEvent<FileReader>) =>
        resolve(event.target?.result as string);
      reader.onerror = () =>
        reject(new Error("Error occurred while converting Blob to base64"));
    } else if (data instanceof ImageData) {
      const canvas: HTMLCanvasElement = document.createElement("canvas");
      canvas.width = data.width;
      canvas.height = data.height;
      const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (!context) {
        reject(
          new Error("Error occurred while converting imageDate to base64")
        );
        return;
      }
      context.putImageData(data, 0, 0);
      const base64Image = canvas.toDataURL("image/png");
      resolve(base64Image);
    } else {
      reject(new Error("Invalid data type"));
    }
  });
}
