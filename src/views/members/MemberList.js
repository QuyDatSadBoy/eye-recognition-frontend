import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import MemberController from '../../controllers/MemberController';
import LoadingSpinner from '../../components/LoadingSpinner';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    MemberController.loadMembers(setMembers, setLoading, setError);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      await MemberController.deleteMember(
        id,
        setLoading,
        setError,
        () => {
          setMembers(members.filter(member => member.id !== id));
          alert('Xóa nhân viên thành công!');
        }
      );
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h2>Danh sách nhân viên</h2>
        </Col>
        <Col className="text-end">
          <Link to="/members/create">
            <Button variant="primary">
              <FontAwesomeIcon icon={faPlus} /> Thêm nhân viên mới
            </Button>
          </Link>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên đăng nhập</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Phòng ban</th>
              <th>Vai trò</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map(member => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.username}</td>
                  <td>
                    {member.fullName ? 
                      `${member.fullName.firstName} ${member.fullName.lastName}` : 
                      'N/A'}
                  </td>
                  <td>{member.email}</td>
                  <td>{member.department}</td>
                  <td>{member.role ? member.role.roleName : 'N/A'}</td>
                  <td>
                    <Link to={`/members/${member.id}`} className="me-2">
                      <Button variant="info" size="sm">
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </Link>
                    <Link to={`/members/edit/${member.id}`} className="me-2">
                      <Button variant="warning" size="sm">
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                    </Link>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDelete(member.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Không có nhân viên nào được tìm thấy
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MemberList;