import Jimp from "jimp";
import { ApiError } from "src/errors/apiError";
import { EditedPhotoDto } from "src/models/photo";
class PhotoEditor {
  private watermark: Jimp | null;
  constructor() {
    this.watermark = null;
  }
  setWatermark = async (buffer: Buffer) => {
    this.watermark = await Jimp.read(buffer);
  };
  addWatermark = async (imageBuffer: Buffer): Promise<EditedPhotoDto> => {
    if (!this.watermark) {
      throw ApiError.IsNull("Watermark");
    }
    const jimpImg = await Jimp.read(imageBuffer);
    const mime = jimpImg.getMIME();
    const width = jimpImg.getWidth();
    const height = jimpImg.getHeight();
    const resizedWatermark = await this.watermark.scaleToFit(
      width / 1.2,
      height / 1.2
    );
    const watermarkedPhoto = await jimpImg
      .composite(resizedWatermark, width * 0.12, height * 0.2, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
        opacitySource: 0.5,
      })
      .getBufferAsync(mime);
    return { buffer: watermarkedPhoto, mime };
  };
  createPreview = async (imageBuffer: Buffer): Promise<EditedPhotoDto> => {
    const previewImage = await Jimp.read(imageBuffer);
    const mime = previewImage.getMIME();
    previewImage.quality(25).blur(8);
    const preview = await previewImage.getBufferAsync(mime);
    return { buffer: preview, mime };
  };
}

const photoEditor = new PhotoEditor();
export default photoEditor;
