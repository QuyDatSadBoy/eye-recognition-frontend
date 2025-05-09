import { trainingAPI } from './api';

export default class TrainDetectionHistoryService {
  static async getAllTrainDetectionHistory() {
    const response = await trainingAPI.get('/training');
    return response.data;
  }

  static async getTrainDetectionHistoryById(id) {
    const response = await trainingAPI.get(`/training/${id}`);
    return response.data;
  }

  static async startTraining(epochs, batchSize, imageSize, learningRate, detectEyeDataTrainId) {
    const formData = new FormData();
    formData.append('epochs', epochs);
    formData.append('batchSize', batchSize);
    formData.append('imageSize', imageSize);
    formData.append('learningRate', learningRate);
    formData.append('detectEyeDataTrainId', detectEyeDataTrainId);
    
    const response = await trainingAPI.post('/training', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  static async activateTrainedModel(id) {
    const response = await trainingAPI.post(`/training/${id}/activate`);
    return response.data;
  }
}