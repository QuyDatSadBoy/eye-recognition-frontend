import { trainingAPI } from './api';

export default class TrainingService {
  // Model management
  static async getAllModels() {
    const response = await trainingAPI.get('/models');
    return response.data;
  }

  static async getActiveModel() {
    const response = await trainingAPI.get('/models/active');
    return response.data;
  }

  static async uploadModel(modelName, modelFile, isActive = 0) {
    const formData = new FormData();
    formData.append('modelName', modelName);
    formData.append('modelFile', modelFile);
    formData.append('isActive', isActive);
    
    const response = await trainingAPI.post('/models', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }

  static async activateModel(modelId) {
    const response = await trainingAPI.put(`/models/${modelId}/activate`);
    return response.data;
  }

  static async deleteModel(modelId) {
    const response = await trainingAPI.delete(`/models/${modelId}`);
    return response.data;
  }

  // Sample datasets
  static async getAllDatasets() {
    const response = await trainingAPI.get('/samples/datasets');
    return response.data;
  }

  static async uploadDataset(datasetName, datasetZip, description = '') {
    const formData = new FormData();
    formData.append('dataset_name', datasetName);
    formData.append('dataset_zip', datasetZip);
    if (description) {
      formData.append('description', description);
    }
    
    const response = await trainingAPI.post('/samples/datasets/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }

  // Training
  static async startTraining(datasetId, epochs, batchSize, imageSize, learningRate) {
    const formData = new FormData();
    formData.append('dataset_id', datasetId);
    formData.append('epochs', epochs);
    formData.append('batch_size', batchSize);
    formData.append('image_size', imageSize);
    formData.append('learning_rate', learningRate);
    
    const response = await trainingAPI.post('/training/start', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }

  static async getTrainingHistory() {
    const response = await trainingAPI.get('/training/history');
    return response.data;
  }

  // Detection
  static async detectEyes(image, modelId = null) {
    const formData = new FormData();
    formData.append('image', image);
    if (modelId) {
      formData.append('model_id', modelId);
    }
    
    const response = await trainingAPI.post('/models/detect-eyes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
}