// src/controllers/TrainingController.js
import TrainingService from '../services/TrainingService';

export default class TrainingController {
  // Model management
  static async getAllModels() {
    return await TrainingService.getAllModels();
  }

  static async getModelById(id) {
    return await TrainingService.getModelById(id);
  }

  static async activateModel(id) {
    return await TrainingService.activateModel(id);
  }

  static async deleteModel(id) {
    return await TrainingService.deleteModel(id);
  }

  // Dataset management
  static async getAllDatasets() {
    return await TrainingService.getAllDatasets();
  }

  static async getDatasetById(id) {
    return await TrainingService.getDatasetById(id);
  }

  static async uploadDataset(name, file, description, setError, onSuccess) {
    try {
      const response = await TrainingService.uploadDataset(name, file, description);
      if (onSuccess) onSuccess(response);
      return response;
    } catch (err) {
      if (setError) setError('Không thể tải lên bộ dữ liệu: ' + err.message);
      throw err;
    }
  }

  static async deleteDataset(id) {
    return await TrainingService.deleteDataset(id);
  }

  // Training
  static async startTraining(datasetId, epochs, batchSize, imageSize, learningRate) {
    return await TrainingService.startTraining(datasetId, epochs, batchSize, imageSize, learningRate);
  }

  static async getTrainingHistory() {
    return await TrainingService.getTrainingHistory();
  }

  // Detection
  static async detectEyes(image, modelId) {
    return await TrainingService.detectEyes(image, modelId);
  }
}