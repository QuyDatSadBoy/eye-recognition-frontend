// src/views/training/ModelList.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Alert, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import EyeDetectionModelController from '../../controllers/EyeDetectionModelController';
import LoadingSpinner from '../../components/LoadingSpinner';

const ModelList = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await EyeDetectionModelController.getAllEyeDetectionModel();
      setModels(data.models || []);
    } catch (err) {
      setError('Không thể tải danh sách mô hình: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleActivate = async (id) => {
    setLoading(true);
    
    try {
      await EyeDetectionModelController.activateModel(id);
      alert('Kích hoạt mô hình thành công!');
      loadModels();
    } catch (err) {
      setError('Không thể kích hoạt mô hình: ' + err.message);
      setLoading(false);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mô hình này?')) {
      setLoading(true);
      
      try {
        await EyeDetectionModelController.deleteEyeDetectionModel(id);
        alert('Xóa mô hình thành công!');
        loadModels();
      } catch (err) {
        setError('Không thể xóa mô hình: ' + err.message);
        setLoading(false);
      }
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Danh sách mô hình</h2>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <Card>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên mô hình</th>
                  <th>Độ chính xác (mAP)</th>
                  <th>Ngày tạo</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {models.length > 0 ? (
                  models.map(model => (
                    <tr key={model.id}>
                      <td>{model.id}</td>
                      <td>{model.modelName}</td>
                      <td>{model.mapMetric ? `${(model.mapMetric * 100).toFixed(2)}%` : 'N/A'}</td>
                      <td>{new Date(model.createDate).toLocaleString()}</td>
                      <td>
                        {model.isActive === 1 ? (
                          <Badge bg="success">Đang sử dụng</Badge>
                        ) : (
                          <Badge bg="secondary">Không hoạt động</Badge>
                        )}
                      </td>
                      <td>
                        <Link to={`/training/detect/${model.id}`} className="me-2">
                          <Button variant="info" size="sm">
                            <FontAwesomeIcon icon={faEye} />
                          </Button>
                        </Link>
                        
                        {model.isActive !== 1 && (
                          <Button
                            variant="success"
                            size="sm"
                            className="me-2"
                            onClick={() => handleActivate(model.id)}
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </Button>
                        )}
                        
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(model.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Không có mô hình nào được tìm thấy
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ModelList;