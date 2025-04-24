import { eyeRecognitionAPI } from './api';

export default class EyeSampleService {
  static async getAllSamples() {
    const response = await eyeRecognitionAPI.get('/samples');
    return response.data;
  }

  static async getSampleById(id) {
    const response = await eyeRecognitionAPI.get(`/samples/${id}`);
    return response.data;
  }

  static async getSamplesByMemberId(memberId) {
    const response = await eyeRecognitionAPI.get(`/samples/member/${memberId}`);
    return response.data;
  }

  static async createSample(memberId, sampleData) {
    const response = await eyeRecognitionAPI.post(`/samples?memberId=${memberId}`, sampleData);
    return response.data;
  }

  static async uploadSample(memberId, imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);
    
    const response = await eyeRecognitionAPI.post(`/samples/upload?memberId=${memberId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }

  static async updateSample(id, sampleData) {
    const response = await eyeRecognitionAPI.put(`/samples/${id}`, sampleData);
    return response.data;
  }

  static async deleteSample(id) {
    const response = await eyeRecognitionAPI.delete(`/samples/${id}`);
    return response.data;
  }

  static async deactivateSample(id) {
    const response = await eyeRecognitionAPI.put(`/samples/${id}/deactivate`);
    return response.data;
  }
}