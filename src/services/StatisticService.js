import { statisticsAPI } from './api';

export default class StatisticService {
  static async getMembersRanking(startDate, endDate) {
    const response = await statisticsAPI.get(`/members/ranking?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  }

  static async getMemberStats(memberId, startDate, endDate) {
    const response = await statisticsAPI.get(`/members/${memberId}?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  }

  static async getSystemStats(startDate, endDate) {
    const response = await statisticsAPI.get(`/system?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  }

  static async getTopMembers(n, startDate, endDate) {
    const response = await statisticsAPI.get(`/members/top/${n}?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  }

  static async getDepartmentStats(startDate, endDate) {
    const response = await statisticsAPI.get(`/departments?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  }
}