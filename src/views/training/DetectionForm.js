// src/views/training/DetectionForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Row, Col, Image } from 'react-bootstrap';
import EyeDetectionModelController from '../../controllers/EyeDetectionModelController';
import LoadingSpinner from '../../components/LoadingSpinner';

const DetectionForm = () => {
  const { modelId } = useParams();
  const navigate = useNavigate();
  
  const [model, setModel] = useState(null);
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(modelId || null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    if (selectedModelId) {
      loadModel(selectedModelId);
    }
  }, [selectedModelId]);

  const loadModels = async () => {
    setLoading(true);
    
    try {
      const data = await EyeDetectionModelController.getAllEyeDetectionModel();
      setModels(data.models || []);
      // ... rest of the code
    } catch (err) {
      setError('Không thể tải danh sách mô hình: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const loadModel = async (id) => {
    setLoading(true);
    
    try {
      const data = await EyeDetectionModelController.getEyeDetectionModelById(id);
      setModel(data.model);
    } catch (err) {
      setError('Không thể tải thông tin mô hình: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResult(null); // Reset kết quả nhận dạng

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
      setError('Vui lòng chọn ảnh để nhận dạng');
      return;
    }
    
    if (!selectedModelId) {
      setError('Vui lòng chọn mô hình để nhận dạng');
      return;
    }

    setProcessing(true);
    setError(null);
    setResult(null);

    try {
      const data = await EyeDetectionModelController.detectEyesImage(file, selectedModelId);
      setResult(data);
    } catch (err) {
      setError('Lỗi khi nhận dạng: ' + err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Container className="mt-4">
      <Button 
        variant="secondary" 
        className="mb-3"
        onClick={() => navigate('/training/models')}
      >
        &laquo; Quay lại danh sách mô hình
      </Button>

      <Card>
        <Card.Header as="h5">Nhận dạng đồng tử mắt</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Chọn mô hình</Form.Label>
                <Form.Select
                  value={selectedModelId || ''}
                  onChange={(e) => setSelectedModelId(e.target.value)}
                  disabled={processing}
                >
                  <option value="">-- Chọn mô hình --</option>
                  {models.map(model => (
                    <option key={model.id} value={model.id}>
                      {model.modelName} {model.isActive === 1 ? '(Đang sử dụng)' : ''}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {model && (
                <div className="mb-3">
                  <p><strong>Thông tin mô hình:</strong></p>
                  <p>Độ chính xác (mAP): {model.mapMetric ? `${(model.mapMetric * 100).toFixed(2)}%` : 'N/A'}</p>
                  <p>Ngày tạo: {new Date(model.createDate).toLocaleString()}</p>
                </div>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Chọn ảnh để nhận dạng</Form.Label>
                <Form.Control 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={processing}
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
                  type="submit" 
                  variant="primary"
                  disabled={processing || !file || !selectedModelId}
                >
                  {processing ? 'Đang nhận dạng...' : 'Bắt đầu nhận dạng'}
                </Button>
              </div>
            </Form>
          )}

          {/* Hiển thị kết quả nhận dạng */}
          {result && (
            <Card className="mt-4">
              <Card.Header>Kết quả nhận dạng</Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <h6>Ảnh đã phân tích:</h6>
                    <Image 
                      src={`http://localhost:8000${result.annotated_image}`} 
                      alt="Annotated" 
                      thumbnail 
                      style={{ maxHeight: '400px' }} 
                    />
                  </Col>
                  <Col md={6}>
                    <h6>đồng tử mắt đã phát hiện:</h6>
                    {result.detected_eyes.length > 0 ? (
                      <div>
                        {result.detected_eyes.map((eye, index) => (
                          <div key={index} className="mb-3">
                            <p>Phát hiện #{index + 1} (Độ chính xác: {(eye.confidence * 100).toFixed(2)}%)</p>
                            {eye.image_path && (
                              <Image 
                                src={`http://localhost:8000${eye.image_path}`} 
                                alt={`Eye ${index + 1}`} 
                                thumbnail 
                                style={{ maxHeight: '150px' }} 
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>Không tìm thấy đồng tử mắt nào trong ảnh.</p>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DetectionForm;