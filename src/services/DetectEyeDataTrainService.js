import { trainingAPI } from './api';

export default class DetectEyeDataTrainService {
  static async getAllDetectEyeDataTrain() {
    const response = await trainingAPI.get('/training-data');
    return response.data;
  }

  static async getDetectEyeDataTrainById(id) {
    const response = await trainingAPI.get(`/training-data/${id}`);
    return response.data;
  }

  static async createDetectEyeDataTrain(datasetName, datasetZip, description = '') {
    const formData = new FormData();
    formData.append('datasetName', datasetName);
    formData.append('datasetZip', datasetZip);
    if (description) {
      formData.append('description', description);
    }
    
    const response = await trainingAPI.post('/training-data', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  static async updateDetectEyeDataTrain(id, detectEyeDataTrain) {
    const response = await trainingAPI.put(`/training-data/${id}`, detectEyeDataTrain);
    return response.data;
  }

  static async deleteDetectEyeDataTrain(id) {
    const response = await trainingAPI.delete(`/training-data/${id}`);
    return response.data;
  }
}