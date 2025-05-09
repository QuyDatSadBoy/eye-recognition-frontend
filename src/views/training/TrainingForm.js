// src/views/training/TrainingForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import DetectEyeDataTrainController from '../../controllers/DetectEyeDataTrainController';
import TrainDetectionHistoryController from '../../controllers/TrainDetectionHistoryController';
import LoadingSpinner from '../../components/LoadingSpinner';

const TrainingForm = () => {
  const { datasetId } = useParams();
  const navigate = useNavigate();
  
  const [dataset, setDataset] = useState(null);
  const [epochs, setEpochs] = useState(50);
  const [batchSize, setBatchSize] = useState(16);
  const [imageSize, setImageSize] = useState(640);
  const [learningRate, setLearningRate] = useState(0.01);
  
  const [loading, setLoading] = useState(false);
  const [training, setTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    loadDataset();
  }, [datasetId]);

  const loadDataset = async () => {
    setLoading(true);
    
    try {
      const data = await DetectEyeDataTrainController.getDetectEyeDataTrainById(datasetId);
      setDataset(data.training_data);
    } catch (err) {
      setError('Không thể tải thông tin bộ dữ liệu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTraining(true);
    setProgress(0);
    setError(null);
    setSuccess(null);
    
    // Giả lập tiến trình huấn luyện
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (Math.random() * 5);
        if (newProgress >= 90) {
          clearInterval(interval);
          return 90; // Chờ khi API trả về kết quả để hiển thị 100%
        }
        return Math.min(newProgress, 90);
      });
    }, 1000);

    try {
      const result = await TrainDetectionHistoryController.startTraining(
        epochs,
        batchSize,
        imageSize,
        learningRate,
        datasetId
      );
      
      clearInterval(interval);
      setProgress(100);
      setSuccess('Huấn luyện mô hình thành công!');
      
      setTimeout(() => {
        navigate('/training/models');
      }, 2000);
      
    } catch (err) {
      clearInterval(interval);
      setError('Lỗi khi huấn luyện: ' + err.message);
      setProgress(0);
    } finally {
      setTraining(false);
    }
  };

  if (loading) return <LoadingSpinner />;

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
        <Card.Header as="h5">Huấn luyện mô hình mới</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          {dataset && (
            <div className="mb-4">
              <p><strong>Bộ dữ liệu:</strong> {dataset.dataTrainPath?.split('/').pop()}</p>
              <p><strong>File chi tiết:</strong> {dataset.detailFilePath?.split('/').pop()}</p>
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Số epochs</Form.Label>
              <Form.Control 
                type="number" 
                min="1"
                max="500"
                value={epochs}
                onChange={(e) => setEpochs(Number(e.target.value))}
                disabled={training}
                required
              />
              <Form.Text className="text-muted">
                Khuyến nghị: 50-100 epochs
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Batch size</Form.Label>
              <Form.Control 
                type="number" 
                min="1"
                max="64"
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                disabled={training}
                required
              />
              <Form.Text className="text-muted">
                Khuyến nghị: 8-32 tùy theo bộ nhớ GPU
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Kích thước ảnh</Form.Label>
              <Form.Control 
                type="number" 
                min="32"
                max="1280"
                step="32"
                value={imageSize}
                onChange={(e) => setImageSize(Number(e.target.value))}
                disabled={training}
                required
              />
              <Form.Text className="text-muted">
                Khuyến nghị: 640 hoặc 512
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tốc độ học</Form.Label>
              <Form.Control 
                type="number" 
                min="0.0001"
                max="0.1"
                step="0.0001"
                value={learningRate}
                onChange={(e) => setLearningRate(Number(e.target.value))}
                disabled={training}
                required
              />
              <Form.Text className="text-muted">
                Khuyến nghị: 0.01 hoặc 0.001
              </Form.Text>
            </Form.Group>

            {training && (
              <div className="mb-3">
                <p>Đang huấn luyện mô hình...</p>
                <ProgressBar animated now={progress} label={`${Math.round(progress)}%`} />
              </div>
            )}

            <div className="d-flex justify-content-end">
              <Button 
                variant="secondary" 
                className="me-2"
                onClick={() => navigate('/training/datasets')}
                disabled={training}
              >
                Hủy
              </Button>
              <Button 
                type="submit" 
                variant="primary"
                disabled={training}
              >
                {training ? 'Đang huấn luyện...' : 'Bắt đầu huấn luyện'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TrainingForm;
            