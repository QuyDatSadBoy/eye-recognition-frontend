export default class TrainDetectionHistory {
  constructor(data = {}) {
    this.id = data.id || null;
    this.epochs = data.epochs || 0;
    this.batchSize = data.batchSize || 0;
    this.imageSize = data.imageSize || 0;
    this.learningRate = data.learningRate || 0;
    this.timeTrain = data.timeTrain || null;
    this.tblDetectEyeDataTrainId = data.tblDetectEyeDataTrainId || null;
    this.tblEyeDetectionModelId = data.tblEyeDetectionModelId || null;
  }

  toJSON() {
    return {
      id: this.id,
      epochs: this.epochs,
      batchSize: this.batchSize,
      imageSize: this.imageSize,
      learningRate: this.learningRate,
      timeTrain: this.timeTrain,
      tblDetectEyeDataTrainId: this.tblDetectEyeDataTrainId,
      tblEyeDetectionModelId: this.tblEyeDetectionModelId
    };
  }
}