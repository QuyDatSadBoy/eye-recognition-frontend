export default class DetectEyeData {
  constructor(data = {}) {
    this.id = data.id || null;
    this.imageLink = data.imageLink || '';
    this.labelLink = data.labelLink || '';
    this.tblDetectEyeDataTrainId = data.tblDetectEyeDataTrainId || null;
  }

  toJSON() {
    return {
      id: this.id,
      imageLink: this.imageLink,
      labelLink: this.labelLink,
      tblDetectEyeDataTrainId: this.tblDetectEyeDataTrainId
    };
  }
}