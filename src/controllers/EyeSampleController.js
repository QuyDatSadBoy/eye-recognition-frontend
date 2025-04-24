// src/controllers/EyeSampleController.js
import EyeSampleService from '../services/EyeSampleService';

export default class EyeSampleController {
  static async loadSamples(setData, setLoading, setError) {
    setLoading(true);
    setError(null);
    
    try {
      const response = await EyeSampleService.getAllSamples();
      setData(response);
    } catch (err) {
      setError('Không thể tải danh sách mẫu mống mắt: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  static async loadSamplesByMemberId(memberId, setData, setLoading, setError) {
    setLoading(true);
    setError(null);
    
    try {
      const response = await EyeSampleService.getSamplesByMemberId(memberId);
      setData(response);
    } catch (err) {
      setError('Không thể tải danh sách mẫu mống mắt: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  static async uploadSample(memberId, file, setLoading, setError, onSuccess) {
    setLoading(true);
    setError(null);
    
    try {
      const response = await EyeSampleService.uploadSample(memberId, file);
      if (onSuccess) onSuccess(response);
    } catch (err) {
      setError('Không thể tải lên mẫu mống mắt: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  static async deleteSample(id, setLoading, setError, onSuccess) {
    setLoading(true);
    setError(null);
    
    try {
      await EyeSampleService.deleteSample(id);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Không thể xóa mẫu mống mắt: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  static async deactivateSample(id, setLoading, setError, onSuccess) {
    setLoading(true);
    setError(null);
    
    try {
      await EyeSampleService.deactivateSample(id);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Không thể vô hiệu hóa mẫu mống mắt: ' + err.message);
    } finally {
      setLoading(false);
    }
  }
}
