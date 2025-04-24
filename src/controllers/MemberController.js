import MemberService from '../services/MemberService';
import Member from '../models/Member';

export default class MemberController {
  static async loadMembers(setMembers, setLoading, setError) {
    setLoading(true);
    try {
      const data = await MemberService.getAllMembers();
      setMembers(data);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách nhân viên: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  static async loadMemberById(id, setMember, setLoading, setError) {
    setLoading(true);
    try {
      const data = await MemberService.getMemberById(id);
      setMember(new Member(data));
      setError(null);
    } catch (err) {
      setError('Không thể tải thông tin nhân viên: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  static async createMember(memberData, setLoading, setError, onSuccess) {
    setLoading(true);
    try {
      const member = new Member(memberData);
      const response = await MemberService.createMember(member.toJSON());
      setError(null);
      if (onSuccess) onSuccess(response);
    } catch (err) {
      setError('Không thể tạo nhân viên: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  static async updateMember(id, memberData, setLoading, setError, onSuccess) {
    setLoading(true);
    try {
      const member = new Member(memberData);
      const response = await MemberService.updateMember(id, member.toJSON());
      setError(null);
      if (onSuccess) onSuccess(response);
    } catch (err) {
      setError('Không thể cập nhật nhân viên: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  static async deleteMember(id, setLoading, setError, onSuccess) {
    setLoading(true);
    try {
      await MemberService.deleteMember(id);
      setError(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Không thể xóa nhân viên: ' + err.message);
    } finally {
      setLoading(false);
    }
  }
}