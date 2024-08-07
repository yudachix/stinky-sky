export const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = document.createElement("img");
    const clean = (): void => {
      image.onload = image.onerror = null;
    };

    image.onload = () => {
      clean();
      resolve(image);
    };
    image.onerror = (error) => {
      clean();
      reject(error);
    };
    image.src = src;
  });
