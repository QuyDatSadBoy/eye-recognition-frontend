export default class EyeDetectionModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.modelName = data.modelName || '';
    this.mapMetric = data.mapMetric || null;
    this.createDate = data.createDate || null;
    this.isActive = data.isActive || 0;
    this.modelLink = data.modelLink || '';
  }

  toJSON() {
    return {
      id: this.id,
      modelName: this.modelName,
      mapMetric: this.mapMetric,
      createDate: this.createDate,
      isActive: this.isActive,
      modelLink: this.modelLink
    };
  }
}