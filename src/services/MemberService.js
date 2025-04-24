import { eyeRecognitionAPI } from './api';

export default class MemberService {
  static async getAllMembers() {
    const response = await eyeRecognitionAPI.get('/members');
    return response.data;
  }

  static async getMemberById(id) {
    const response = await eyeRecognitionAPI.get(`/members/${id}`);
    return response.data;
  }

  static async createMember(memberData) {
    const response = await eyeRecognitionAPI.post('/members', memberData);
    return response.data;
  }

  static async updateMember(id, memberData) {
    const response = await eyeRecognitionAPI.put(`/members/${id}`, memberData);
    return response.data;
  }

  static async deleteMember(id) {
    const response = await eyeRecognitionAPI.delete(`/members/${id}`);
    return response.data;
  }
}