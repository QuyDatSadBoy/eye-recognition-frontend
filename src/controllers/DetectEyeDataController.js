import DetectEyeDataService from '../services/DetectEyeDataService';
import DetectEyeData from '../models/DetectEyeData';

export default class DetectEyeDataController {
  static async getAllDetectEyeData(detectEyeDataTrainId) {
    return await DetectEyeDataService.getAllDetectEyeData(detectEyeDataTrainId);
  }

  static async getDetectEyeDataById(id) {
    return await DetectEyeDataService.getDetectEyeDataById(id);
  }

  static async createDetectEyeData(detectEyeData) {
    return await DetectEyeDataService.createDetectEyeData(detectEyeData);
  }

  static async deleteDetectEyeData(id) {
    return await DetectEyeDataService.deleteDetectEyeData(id);
  }
}