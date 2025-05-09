import EyeDetectionModelService from '../services/EyeDetectionModelService';
import EyeDetectionModel from '../models/EyeDetectionModel';

export default class EyeDetectionModelController {
  static async getAllEyeDetectionModel() {
    return await EyeDetectionModelService.getAllEyeDetectionModel();
  }

  static async getEyeDetectionModelById(id) {
    return await EyeDetectionModelService.getEyeDetectionModelById(id);
  }

  static async createEyeDetectionModel(modelName, modelFile, isActive = 0) {
    return await EyeDetectionModelService.createEyeDetectionModel(modelName, modelFile, isActive);
  }

  static async updateEyeDetectionModel(id, eyeDetectionModel) {
    return await EyeDetectionModelService.updateEyeDetectionModel(id, eyeDetectionModel);
  }

  static async deleteEyeDetectionModel(id) {
    return await EyeDetectionModelService.deleteEyeDetectionModel(id);
  }

  static async activateModel(id) {
    return await EyeDetectionModelService.activateModel(id);
  }

  static async detectEyesImage(image, modelId = null) {
    return await EyeDetectionModelService.detectEyesImage(image, modelId);
  }

  static async batchDetectEyes(images, modelId = null) {
    return await EyeDetectionModelService.batchDetectEyes(images, modelId);
  }
}