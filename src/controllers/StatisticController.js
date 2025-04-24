// src/controllers/StatisticController.js
import StatisticService from '../services/StatisticService';

export default class StatisticController {
  static async loadMembersRanking(startDate, endDate, setRankings, setLoading, setError) {
    setLoading(true);
    setError(null);
    
    try {
      const data = await StatisticService.getMembersRanking(startDate, endDate);
      setRankings(data);
    } catch (err) {
      setError('Không thể tải thống kê nhân viên: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  static async loadMemberStats(memberId, startDate, endDate, setMemberStats, setLoading, setError) {
    setLoading(true);
    setError(null);
    
    try {
      const data = await StatisticService.getMemberStats(memberId, startDate, endDate);
      setMemberStats(data);
    } catch (err) {
      setError('Không thể tải thống kê chi tiết: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  static async loadSystemStats(startDate, endDate, setSystemStats, setLoading, setError) {
    setLoading(true);
    setError(null);
    
    try {
      const data = await StatisticService.getSystemStats(startDate, endDate);
      setSystemStats(data);
    } catch (err) {
      setError('Không thể tải thống kê hệ thống: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  static async loadTopMembers(n, startDate, endDate, setTopMembers, setLoading, setError) {
    setLoading(true);
    setError(null);
    
    try {
      const data = await StatisticService.getTopMembers(n, startDate, endDate);
      setTopMembers(data);
    } catch (err) {
      setError('Không thể tải danh sách top nhân viên: ' + err.message);
    } finally {
      setLoading(false);
    }
  }
}