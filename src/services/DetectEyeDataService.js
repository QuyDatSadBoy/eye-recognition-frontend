import { trainingAPI } from './api';

export default class DetectEyeDataService {
  static async getAllDetectEyeData(detectEyeDataTrainId) {
    const response = await trainingAPI.get(`/detect-data/${detectEyeDataTrainId}`);
    return response.data;
  }

  static async getDetectEyeDataById(id) {
    const response = await trainingAPI.get(`/detect-data/detail/${id}`);
    return response.data;
  }

  static async createDetectEyeData(detectEyeData) {
    const response = await trainingAPI.post('/detect-data', detectEyeData);
    return response.data;
  }

  static async deleteDetectEyeData(id) {
    const response = await trainingAPI.delete(`/detect-data/${id}`);
    return response.data;
  }
}