// src/views/statistics/StatDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Table, Alert } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import StatisticController from '../../controllers/StatisticController';
import LoadingSpinner from '../../components/LoadingSpinner';

// Đăng ký các thành phần cần thiết cho Chart.js
Chart.register(...registerables);

const StatDetail = () => {
  const { memberId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [memberStats, setMemberStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy startDate và endDate từ query parameters
  const searchParams = new URLSearchParams(location.search);
  const startDate = searchParams.get('startDate') || 
    new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0];
  const endDate = searchParams.get('endDate') || 
    new Date().toISOString().split('T')[0];

  useEffect(() => {
    StatisticController.loadMemberStats(
      memberId,
      startDate,
      endDate,
      setMemberStats,
      setLoading,
      setError
    );
  }, [memberId, startDate, endDate]);

  const prepareChartData = () => {
    if (!memberStats || !memberStats.recognitionByDate) return null;

    const dates = Object.keys(memberStats.recognitionByDate).sort();
    const counts = dates.map(date => memberStats.recognitionByDate[date]);

    return {
      labels: dates,
      datasets: [
        {
          label: 'Số lần nhận dạng thành công',
          data: counts,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1
        }
      ]
    };
  };

  const chartData = prepareChartData();

  return (
    <Container className="mt-4">
      <Button 
        variant="secondary" 
        className="mb-3"
        onClick={() => navigate('/statistics')}
      >
        &laquo; Quay lại danh sách
      </Button>

      <h2>Chi tiết thống kê nhân viên</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <LoadingSpinner />
      ) : memberStats ? (
        <>
          <Card className="mb-4">
            <Card.Header>Thông tin nhân viên</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p><strong>Họ tên:</strong> {memberStats.fullName || memberStats.username}</p>
                  <p><strong>Phòng ban:</strong> {memberStats.department || 'N/A'}</p>
                  <p><strong>Email:</strong> {memberStats.email || 'N/A'}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Tổng số lần nhận dạng thành công:</strong> {memberStats.successCount}</p>
                  <p><strong>Độ chính xác trung bình:</strong> {(memberStats.averageAccuracy * 100).toFixed(2)}%</p>
                  <p><strong>Khoảng thời gian:</strong> {startDate} đến {endDate}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {chartData && (
            <Card className="mb-4">
              <Card.Header>Biểu đồ nhận dạng theo ngày</Card.Header>
              <Card.Body>
                <div style={{ height: '400px' }}>
                  <Line 
                    data={chartData} 
                    options={{
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            stepSize: 1
                          }
                        }
                      }
                    }} 
                  />
                </div>
              </Card.Body>
            </Card>
          )}
        </>
      ) : (
        <Alert variant="info">
          Không tìm thấy thông tin thống kê cho nhân viên này trong khoảng thời gian đã chọn.
        </Alert>
      )}
    </Container>
  );
};

export default StatDetail;