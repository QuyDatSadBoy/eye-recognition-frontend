import { trainingAPI } from './api';

export default class EyeDetectionModelService {
  static async getAllEyeDetectionModel() {
    const response = await trainingAPI.get('/models');
    return response.data;
  }

  static async getEyeDetectionModelById(id) {
    const response = await trainingAPI.get(`/models/${id}`);
    return response.data;
  }

  static async createEyeDetectionModel(modelName, modelFile, isActive = 0) {
    const formData = new FormData();
    formData.append('modelName', modelName);
    formData.append('modelFile', modelFile);
    formData.append('isActive', isActive);
    
    const response = await trainingAPI.post('/models', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  static async updateEyeDetectionModel(id, eyeDetectionModel) {
    const response = await trainingAPI.put(`/models/${id}`, eyeDetectionModel);
    return response.data;
  }

  static async deleteEyeDetectionModel(id) {
    const response = await trainingAPI.delete(`/models/${id}`);
    return response.data;
  }

  static async activateModel(id) {
    const response = await trainingAPI.put(`/models/${id}/activate`);
    return response.data;
  }

  static async detectEyesImage(image, modelId = null) {
    const formData = new FormData();
    formData.append('image', image);
    if (modelId) {
      formData.append('modelId', modelId);
    }
    
    const response = await trainingAPI.post('/models/detect', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  static async batchDetectEyes(images, modelId = null) {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });
    if (modelId) {
      formData.append('modelId', modelId);
    }
    
    const response = await trainingAPI.post('/models/batch-detect', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
}