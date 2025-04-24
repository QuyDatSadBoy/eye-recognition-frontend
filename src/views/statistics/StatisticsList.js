// src/views/statistics/StatisticsList.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Alert } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import StatisticController from '../../controllers/StatisticController';
import LoadingSpinner from '../../components/LoadingSpinner';

// Đăng ký các thành phần cần thiết cho Chart.js
Chart.register(...registerables);

const StatisticsList = () => {
  const navigate = useNavigate();
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    loadRankings();
  }, []);

  const loadRankings = async () => {
    await StatisticController.loadMembersRanking(
      startDate,
      endDate,
      setRankings,
      setLoading,
      setError
    );
  };

  const handleDateFilterChange = () => {
    loadRankings();
  };

  const handleMemberClick = (memberId) => {
    navigate(`/statistics/member/${memberId}?startDate=${startDate}&endDate=${endDate}`);
  };

  // Chuẩn bị dữ liệu cho biểu đồ
  const chartData = {
    labels: rankings.slice(0, 10).map(member => 
      member.fullName || member.username
    ),
    datasets: [
      {
        label: 'Số lần nhận dạng thành công',
        data: rankings.slice(0, 10).map(member => member.successfulRecognitions),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Độ chính xác trung bình (%)',
        data: rankings.slice(0, 10).map(member => member.averageAccuracy * 100),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <Container className="mt-4">
      <h2>Thống kê nhận dạng</h2>
      
      <Card className="mb-4">
        <Card.Header>Bộ lọc thống kê</Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Từ ngày</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Đến ngày</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button 
                variant="primary" 
                onClick={handleDateFilterChange}
                className="mb-3"
              >
                Áp dụng bộ lọc
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Card className="mb-4">
            <Card.Header>Biểu đồ top 10 nhân viên</Card.Header>
            <Card.Body>
              <div style={{ height: '400px' }}>
                <Bar 
                  data={chartData} 
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }} 
                />
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Bảng xếp hạng nhân viên</Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Xếp hạng</th>
                    <th>Họ tên</th>
                    <th>Phòng ban</th>
                    <th>Số lần nhận dạng thành công</th>
                    <th>Độ chính xác trung bình</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {rankings.length > 0 ? (
                    rankings.map((member, index) => (
                      <tr key={member.memberId}>
                        <td>{index + 1}</td>
                        <td>{member.fullName || member.username}</td>
                        <td>{member.department || 'N/A'}</td>
                        <td>{member.successfulRecognitions}</td>
                        <td>{(member.averageAccuracy * 100).toFixed(2)}%</td>
                        <td>
                          <Button 
                            variant="info" 
                            size="sm"
                            onClick={() => handleMemberClick(member.memberId)}
                          >
                            Xem chi tiết
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Không có dữ liệu thống kê trong khoảng thời gian này
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default StatisticsList;