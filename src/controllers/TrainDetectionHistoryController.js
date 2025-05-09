import TrainDetectionHistoryService from '../services/TrainDetectionHistoryService';
import TrainDetectionHistory from '../models/TrainDetectionHistory';

export default class TrainDetectionHistoryController {
  static async getAllTrainDetectionHistory() {
    return await TrainDetectionHistoryService.getAllTrainDetectionHistory();
  }

  static async getTrainDetectionHistoryById(id) {
    return await TrainDetectionHistoryService.getTrainDetectionHistoryById(id);
  }

  static async startTraining(epochs, batchSize, imageSize, learningRate, detectEyeDataTrainId) {
    return await TrainDetectionHistoryService.startTraining(epochs, batchSize, imageSize, learningRate, detectEyeDataTrainId);
  }

  static async activateTrainedModel(id) {
    return await TrainDetectionHistoryService.activateTrainedModel(id);
  }
}