import DetectEyeDataTrainService from '../services/DetectEyeDataTrainService';
import DetectEyeDataTrain from '../models/DetectEyeDataTrain';

export default class DetectEyeDataTrainController {
  static async getAllDetectEyeDataTrain() {
    return await DetectEyeDataTrainService.getAllDetectEyeDataTrain();
  }

  static async getDetectEyeDataTrainById(id) {
    return await DetectEyeDataTrainService.getDetectEyeDataTrainById(id);
  }

  static async createDetectEyeDataTrain(datasetName, datasetZip, description = '', setError, onSuccess) {
    try {
      const response = await DetectEyeDataTrainService.createDetectEyeDataTrain(datasetName, datasetZip, description);
      if (onSuccess) onSuccess(response);
      return response;
    } catch (err) {
      if (setError) setError('Không thể tải lên bộ dữ liệu: ' + err.message);
      throw err;
    }
  }

  static async updateDetectEyeDataTrain(id, detectEyeDataTrain) {
    return await DetectEyeDataTrainService.updateDetectEyeDataTrain(id, detectEyeDataTrain);
  }

  static async deleteDetectEyeDataTrain(id) {
    return await DetectEyeDataTrainService.deleteDetectEyeDataTrain(id);
  }
}