// src/views/members/MemberDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import MemberController from '../../controllers/MemberController';
import EyeSampleController from '../../controllers/EyeSampleController';
import LoadingSpinner from '../../components/LoadingSpinner';

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Tải thông tin nhân viên
    MemberController.loadMemberById(id, setMember, setLoading, setError);
    
    // Tải danh sách mẫu đồng tử mắt
    loadSamples();
  }, [id]);

  const loadSamples = () => {
    EyeSampleController.loadSamplesByMemberId(id, setSamples, setLoading, setError);
  };

  const handleDeleteSample = async (sampleId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đồng tử mắt mắt này?')) {
      await EyeSampleController.deleteSample(
        sampleId, 
        setLoading, 
        setError,
        () => {
          alert('Xóa mẫu đồng tử mắt thành công!');
          loadSamples();
        }
      );
    }
  };

  const handleDeactivateSample = async (sampleId) => {
    await EyeSampleController.deactivateSample(
      sampleId, 
      setLoading, 
      setError,
      () => {
        alert('Vô hiệu hóa mẫu đồng tử mắt thành công!');
        loadSamples();
      }
    );
  };

  if (loading && !member) return <LoadingSpinner />;

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <Button 
            variant="secondary" 
            onClick={() => navigate('/members')}
          >
            &laquo; Quay lại danh sách
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {member && (
        <>
          <Card className="mb-4">
            <Card.Header as="h5">
              <div className="d-flex justify-content-between align-items-center">
                <span>Thông tin nhân viên</span>
                <Link to={`/members/edit/${id}`}>
                  <Button variant="warning" size="sm">
                    <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
                  </Button>
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p><strong>ID:</strong> {member.id}</p>
                  <p><strong>Tên đăng nhập:</strong> {member.username}</p>
                  <p>
                    <strong>Họ tên:</strong> {member.fullName ? 
                      `${member.fullName.firstName} ${member.fullName.lastName}` : 
                      'N/A'}
                  </p>
                  <p><strong>Email:</strong> {member.email || 'N/A'}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Phòng ban:</strong> {member.department || 'N/A'}</p>
                  <p><strong>Số điện thoại:</strong> {member.phoneNumber || 'N/A'}</p>
                  <p><strong>Vai trò:</strong> {member.role?.roleName || 'N/A'}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Mẫu đồng tử mắt</h5>
                <Link to={`/members/${id}/samples/upload`}>
                  <Button variant="primary" size="sm">
                    <FontAwesomeIcon icon={faPlus} /> Thêm mẫu mới
                  </Button>
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              {samples.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Ảnh</th>
                      <th>Ngày tạo</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {samples.map(sample => (
                      <tr key={sample.id}>
                        <td>{sample.id}</td>
                        {/* <td>
                          {sample.eyeImageLink && (
                            <img 
                              src={`http://localhost:8080${sample.eyeImageLink}`} 
                              alt="Eye Sample" 
                              style={{ height: '50px' }} 
                            />
                          )}
                        </td> */}
                        <td>
{sample.eyeImageLink && (
  <img 
    src={`http://localhost:8080${sample.eyeImageLink}`} 
    alt="Eye Sample" 
    style={{ height: '50px' }} 
    onError={(e) => {
      console.error("Lỗi tải ảnh:", sample.eyeImageLink);
      e.target.onerror = null;
      e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"%3E%3Crect width="50" height="50" fill="%23f0f0f0"/%3E%3Ctext x="25" y="25" font-family="Arial" font-size="8" text-anchor="middle" dominant-baseline="middle" fill="%23aaa"%3Eđồng tử mắt%3C/text%3E%3C/svg%3E';
    }}
  />
)}
                            </td>
                        <td>{new Date(sample.captureDate).toLocaleString()}</td>
                        <td>{sample.isActive === 1 ? 'Hoạt động' : 'Vô hiệu'}</td>
                        <td>
                          {sample.isActive === 1 ? (
                            <Button
                              variant="warning"
                              size="sm"
                              className="me-2"
                              onClick={() => handleDeactivateSample(sample.id)}
                            >
                              Vô hiệu hóa
                            </Button>
                          ) : (
                            <Button
                              variant="secondary"
                              size="sm"
                              className="me-2"
                              disabled
                            >
                              Đã vô hiệu hóa
                            </Button>
                          )}
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteSample(sample.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center">Nhân viên này chưa có mẫu đồng tử mắt nào.</p>
              )}
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default MemberDetail;