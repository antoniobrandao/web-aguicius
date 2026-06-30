export type ImageDimensions = {
  width: number;
  height: number;
};

export function getImageDimensions(file: File): Promise<ImageDimensions> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = reject;
      img.src = String(event.target?.result ?? "");
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
