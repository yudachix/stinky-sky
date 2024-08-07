import { toNumber } from "@/utils/color";
import ImageFilters from "canvas-filters";
import Color from "color";
import { type LabColor, closest_lab } from "color-diff";
import MedianCut from "mediancut";

const closestRgbColors = new Map<number, Color>();

type Data = {
  offscreenCanvas: OffscreenCanvas;
  imageBitmap: ImageBitmap;
  colorSize: number;
  palette: string[];
};

// canvas-filters: document is not defined
Object.defineProperty(self, "document", {
  value: {
    createElement: (tagName: string) => {
      if (tagName !== "canvas") {
        throw new Error("Unsupported");
      }

      return new OffscreenCanvas(300, 300);
    },
  },
});

self.addEventListener("message", ({ data }) => {
  const { offscreenCanvas, imageBitmap, colorSize, palette } = data as Data;
  const mappedPalette: LabColor[] = palette.map((color) => {
    const labColor = new Color(color).lab();

    return {
      L: labColor.l(),
      a: labColor.a(),
      b: labColor.b(),
    };
  });

  offscreenCanvas.width = imageBitmap.width;
  offscreenCanvas.height = imageBitmap.height;

  const context = offscreenCanvas.getContext("2d");

  if (!context) {
    throw new Error("Can't get context");
  }

  context.drawImage(imageBitmap, 0, 0);

  const imageData = context.getImageData(
    0,
    0,
    offscreenCanvas.width,
    offscreenCanvas.height,
  );
  const medianCut = new MedianCut(imageData);
  const reducedImageData = medianCut.reduce(colorSize);
  const pixels = reducedImageData.data;
  const pixelsLength = pixels.length;
  let prev = performance.now();

  for (let i = 0; i < pixelsLength; i += 4) {
    const r = pixels[i] as number;
    const g = pixels[i + 1] as number;
    const b = pixels[i + 2] as number;
    const key = toNumber(r, g, b);
    let closestRgbColor = closestRgbColors.get(key);

    if (!closestRgbColor) {
      const labColor = Color.rgb(r, g, b).lab();
      const closestLabColor = closest_lab(
        {
          L: labColor.l(),
          a: labColor.a(),
          b: labColor.b(),
        },
        mappedPalette,
      );

      closestRgbColor = Color.lab(
        closestLabColor.L,
        closestLabColor.a,
        closestLabColor.b,
      ).rgb();
      closestRgbColors.set(key, closestRgbColor);
    }

    pixels[i] = closestRgbColor.red();
    pixels[i + 1] = closestRgbColor.green();
    pixels[i + 2] = closestRgbColor.blue();

    if (performance.now() - prev > 500) {
      self.postMessage({
        type: "progress",
        progress: (i / pixelsLength) * 100,
      });
      prev = performance.now();
    }
  }

  // context.putImageData(ImageFilters.Oil(reducedImageData, 1, 127), 0, 0);
  context.putImageData(reducedImageData, 0, 0);

  const resultImageBitmap = offscreenCanvas.transferToImageBitmap();

  self.postMessage({
    type: "progress",
    progress: 100,
  });
  self.postMessage(
    {
      type: "done",
      resultImageBitmap,
    },
    [resultImageBitmap],
  );
});
