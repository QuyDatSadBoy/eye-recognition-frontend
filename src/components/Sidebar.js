// src/components/Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, faChartBar, faDatabase, 
  faBrain, faEye, faUserPlus 
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="sidebar-sticky pt-3">
      <Nav className="flex-column">
        <Nav.Item>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Quản lý nhân viên</span>
          </h6>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/members"
            active={location.pathname === '/members'}
          >
            <FontAwesomeIcon icon={faUsers} className="me-2" />
            Danh sách nhân viên
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/members/create"
            active={location.pathname === '/members/create'}
          >
            <FontAwesomeIcon icon={faUserPlus} className="me-2" />
            Thêm nhân viên mới
          </Nav.Link>
        </Nav.Item>
        
        <Nav.Item>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Thống kê</span>
          </h6>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/statistics"
            active={location.pathname === '/statistics'}
          >
            <FontAwesomeIcon icon={faChartBar} className="me-2" />
            Số liệu nhận dạng
          </Nav.Link>
        </Nav.Item>
        
        <Nav.Item>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Huấn luyện & Nhận dạng</span>
          </h6>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/training/datasets"
            active={location.pathname === '/training/datasets'}
          >
            <FontAwesomeIcon icon={faDatabase} className="me-2" />
            Bộ dữ liệu huấn luyện
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/training/models"
            active={location.pathname === '/training/models'}
          >
            <FontAwesomeIcon icon={faBrain} className="me-2" />
            Mô hình nhận dạng
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/training/detect"
            active={location.pathname === '/training/detect'}
          >
            <FontAwesomeIcon icon={faEye} className="me-2" />
            Nhận dạng ảnh
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;