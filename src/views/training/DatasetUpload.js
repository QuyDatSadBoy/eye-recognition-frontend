// src/views/training/DatasetUpload.js
import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TrainingController from '../../controllers/TrainingController';

const DatasetUpload = () => {
  const navigate = useNavigate();
  const [datasetName, setDatasetName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!datasetName) {
      setError('Vui lòng nhập tên bộ dữ liệu');
      return;
    }
    
    if (!file) {
      setError('Vui lòng chọn file ZIP để tải lên');
      return;
    }
    
    if (!file.name.endsWith('.zip')) {
      setError('Chỉ hỗ trợ file ZIP');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);
    
    // Giả lập tiến trình tải lên
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 90) {
          clearInterval(interval);
          return 90; // Chờ khi API trả về kết quả để hiển thị 100%
        }
        return newProgress;
      });
    }, 500);

    try {
      await TrainingController.uploadDataset(
        datasetName,
        file,
        description,
        setError,
        (data) => {
          clearInterval(interval);
          setProgress(100);
          setSuccess(`Tải lên bộ dữ liệu thành công! ID: ${data.dataset_id}`);
          
          // Đặt timeout để chuyển hướng sau khi hiển thị thông báo
          setTimeout(() => {
            navigate('/training/datasets');
          }, 2000);
        }
      );
    } catch (err) {
      clearInterval(interval);
      setProgress(0);
      setError('Lỗi khi tải lên: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Button 
        variant="secondary" 
        className="mb-3"
        onClick={() => navigate('/training/datasets')}
      >
        &laquo; Quay lại danh sách bộ dữ liệu
      </Button>

      <Card>
        <Card.Header as="h5">Tải lên bộ dữ liệu huấn luyện mới</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên bộ dữ liệu</Form.Label>
              <Form.Control 
                type="text" 
                value={datasetName}
                onChange={(e) => setDatasetName(e.target.value)}
                disabled={uploading}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả (không bắt buộc)</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={uploading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>File ZIP chứa bộ dữ liệu YOLO</Form.Label>
              <Form.Control 
                type="file" 
                accept=".zip"
                onChange={handleFileChange}
                disabled={uploading}
                required
              />
              <Form.Text className="text-muted">
                Chỉ hỗ trợ file ZIP. Cấu trúc YOLO: images, labels, data.yaml
              </Form.Text>
            </Form.Group>

            {uploading && (
              <div className="mb-3">
                <p>Đang tải lên và xử lý...</p>
                <ProgressBar animated now={progress} label={`${progress}%`} />
              </div>
            )}

            <div className="d-flex justify-content-end">
              <Button 
                variant="secondary" 
                className="me-2"
                onClick={() => navigate('/training/datasets')}
                disabled={uploading}
              >
                Hủy
              </Button>
              <Button 
                type="submit" 
                variant="primary"
                disabled={uploading || !datasetName || !file}
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

export default DatasetUpload;