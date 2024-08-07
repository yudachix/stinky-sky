declare module "canvas-filters" {
  const ImgaeFilters: {
    Oil: (pixels: ImageData, range: number, levels: number) => ImageData;
  };

  export default ImgaeFilters;
}
