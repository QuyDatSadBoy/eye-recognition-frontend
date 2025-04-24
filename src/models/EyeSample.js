export default class EyeSample {
  constructor(data = {}) {
    this.id = data.id || null;
    this.eyeImageLink = data.eyeImageLink || '';
    this.isActive = data.isActive || 1;
    this.captureDate = data.captureDate || new Date();
    this.eyeRecognitionSampleTrainId = data.eyeRecognitionSampleTrainId || null;
    this.member = data.member || null;
  }

  toJSON() {
    return {
      id: this.id,
      eyeImageLink: this.eyeImageLink,
      isActive: this.isActive,
      captureDate: this.captureDate,
      eyeRecognitionSampleTrainId: this.eyeRecognitionSampleTrainId,
      member: this.member
    };
  }
}