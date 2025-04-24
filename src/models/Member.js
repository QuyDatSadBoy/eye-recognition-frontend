export default class Member {
  constructor(data = {}) {
    this.id = data.id || null;
    this.username = data.username || '';
    this.password = data.password || '';
    this.phoneNumber = data.phoneNumber || null;
    this.email = data.email || '';
    this.department = data.department || '';
    this.fullName = data.fullName || { firstName: '', lastName: '' };
    this.role = data.role || { id: null, roleName: '' };
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      phoneNumber: this.phoneNumber,
      email: this.email,
      department: this.department,
      fullName: this.fullName,
      role: this.role
    };
  }
}