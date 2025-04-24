// src/views/training/DatasetList.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import TrainingController from '../../controllers/TrainingController';
import LoadingSpinner from '../../components/LoadingSpinner';

const DatasetList = () => {
  const navigate = useNavigate();
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDatasets();
  }, []);

  const loadDatasets = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await TrainingController.getAllDatasets();
      setDatasets(data.datasets || []);
    } catch (err) {
      setError('Không thể tải danh sách bộ dữ liệu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bộ dữ liệu này?')) {
      setLoading(true);
      
      try {
        await TrainingController.deleteDataset(id);
        alert('Xóa bộ dữ liệu thành công!');
        loadDatasets();
      } catch (err) {
        setError('Không thể xóa bộ dữ liệu: ' + err.message);
        setLoading(false);
      }
    }
  };

  const handleTrain = (id) => {
    navigate(`/training/start/${id}`);
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Bộ dữ liệu huấn luyện</h2>
        <Link to="/training/datasets/upload">
          <Button variant="primary">
            <FontAwesomeIcon icon={faUpload} /> Tải lên bộ dữ liệu mới
          </Button>
        </Link>
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
                  <th>Đường dẫn</th>
                  <th>File chi tiết</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {datasets.length > 0 ? (
                  datasets.map(dataset => (
                    <tr key={dataset.id}>
                      <td>{dataset.id}</td>
                      <td>
                        {dataset.dataTrainPath ? 
                          dataset.dataTrainPath.split('/').pop() : 
                          'N/A'}
                      </td>
                      <td>
                        {dataset.detailFilePath ? 
                          dataset.detailFilePath.split('/').pop() : 
                          'N/A'}
                      </td>
                      <td>
                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={() => handleTrain(dataset.id)}
                        >
                          <FontAwesomeIcon icon={faDumbbell} /> Huấn luyện
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(dataset.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Không có bộ dữ liệu nào được tìm thấy
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

export default DatasetList;