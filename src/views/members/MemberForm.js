import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button, Card, Alert } from 'react-bootstrap';
import MemberController from '../../controllers/MemberController';
import LoadingSpinner from '../../components/LoadingSpinner';

const MemberForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState({
    username: '',
    password: '',
    phoneNumber: '',
    email: '',
    department: '',
    fullName: {
      firstName: '',
      lastName: ''
    },
    role: {
      id: 1 // Mặc định role ID = 1
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      MemberController.loadMemberById(id, setMember, setLoading, setError);
    }
  }, [id, isEditing]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
    password: !isEditing ? Yup.string().required('Vui lòng nhập mật khẩu') : Yup.string(),
    email: Yup.string().email('Email không hợp lệ'),
    fullName: Yup.object().shape({
      firstName: Yup.string().required('Vui lòng nhập họ'),
      lastName: Yup.string().required('Vui lòng nhập tên')
    })
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (isEditing) {
      await MemberController.updateMember(
        id,
        values,
        setLoading,
        setError,
        () => {
          alert('Cập nhật nhân viên thành công!');
          navigate('/members');
        }
      );
    } else {
      await MemberController.createMember(
        values,
        setLoading,
        setError,
        () => {
          alert('Thêm nhân viên thành công!');
          navigate('/members');
        }
      );
    }
    setSubmitting(false);
  };

  if (loading && isEditing) return <LoadingSpinner />;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">
          {isEditing ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Formik
            initialValues={member}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, touched, errors }) => (
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="username">Tên đăng nhập</label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage name="username" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="password">Mật khẩu {isEditing && '(để trống nếu không thay đổi)'}</label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="fullName.firstName">Họ</label>
                      <Field
                        type="text"
                        id="fullName.firstName"
                        name="fullName.firstName"
                        className={`form-control ${
                          touched.fullName?.firstName && errors.fullName?.firstName ? 'is-invalid' : ''
                        }`}
                      />
                      <ErrorMessage name="fullName.firstName" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="fullName.lastName">Tên</label>
                      <Field
                        type="text"
                        id="fullName.lastName"
                        name="fullName.lastName"
                        className={`form-control ${
                          touched.fullName?.lastName && errors.fullName?.lastName ? 'is-invalid' : ''
                        }`}
                      />
                      <ErrorMessage name="fullName.lastName" component="div" className="text-danger" />
                    </div>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="phoneNumber">Số điện thoại</label>
                      <Field
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        className="form-control"
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="department">Phòng ban</label>
                      <Field
                        type="text"
                        id="department"
                        name="department"
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="role.id">Vai trò</label>
                      <Field
                        as="select"
                        id="role.id"
                        name="role.id"
                        className="form-control"
                      >
                        <option value="1">Nhân viên</option>
                        <option value="2">Quản lý</option>
                        <option value="3">Admin</option>
                      </Field>
                    </div>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end mt-3">
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => navigate('/members')}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading ? 'Đang xử lý...' : isEditing ? 'Cập nhật' : 'Thêm mới'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MemberForm;