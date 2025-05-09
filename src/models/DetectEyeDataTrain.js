export default class DetectEyeDataTrain {
  constructor(data = {}) {
    this.id = data.id || null;
    this.dataTrainPath = data.dataTrainPath || '';
    this.detailFilePath = data.detailFilePath || '';
  }

  toJSON() {
    return {
      id: this.id,
      dataTrainPath: this.dataTrainPath,
      detailFilePath: this.detailFilePath
    };
  }
}