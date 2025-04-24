// src/views/eyesamples/SampleUpload.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Row, Col, Image } from 'react-bootstrap';
import MemberController from '../../controllers/MemberController';
import EyeSampleController from '../../controllers/EyeSampleController';
import LoadingSpinner from '../../components/LoadingSpinner';

const SampleUpload = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (memberId) {
      MemberController.loadMemberById(memberId, setMember, setLoading, setError);
    }
  }, [memberId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Tạo preview
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Vui lòng chọn ảnh để tải lên');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      await EyeSampleController.uploadSample(
        memberId,
        file,
        setUploading,
        setError,
        (response) => {
          setSuccess('Tải lên mẫu mống mắt thành công!');
          setFile(null);
          setPreview(null);
        }
      );
    } catch (err) {
      setError('Lỗi khi tải lên: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container className="mt-4">
      <Button 
        variant="secondary" 
        className="mb-3"
        onClick={() => navigate(`/members/${memberId}`)}
      >
        &laquo; Quay lại thông tin nhân viên
      </Button>

      <Card>
        <Card.Header as="h5">Tải lên mẫu mống mắt mới</Card.Header>
        <Card.Body>
          {member && (
            <div className="mb-4">
              <h6>Nhân viên:</h6>
              <p>
                <strong>{member.fullName?.firstName} {member.fullName?.lastName}</strong>
                {member.department && <span> - {member.department}</span>}
              </p>
            </div>
          )}

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Chọn ảnh khuôn mặt (hệ thống sẽ tự động trích xuất mống mắt)</Form.Label>
              <Form.Control 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
              />
              <Form.Text className="text-muted">
                Hỗ trợ các định dạng: JPG, JPEG, PNG
              </Form.Text>
            </Form.Group>

            {preview && (
              <Row className="mb-3">
                <Col md={6}>
                  <p>Ảnh đã chọn:</p>
                  <Image 
                    src={preview} 
                    alt="Preview" 
                    thumbnail 
                    style={{ maxHeight: '300px' }} 
                  />
                </Col>
              </Row>
            )}

            <div className="d-flex justify-content-end">
              <Button 
                variant="secondary" 
                className="me-2"
                onClick={() => navigate(`/members/${memberId}`)}
                disabled={uploading}
              >
                Hủy
              </Button>
              <Button 
                type="submit" 
                variant="primary"
                disabled={uploading || !file}
              >
                {uploading ? 'Đang tải lên...' : 'Tải lên'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SampleUpload;