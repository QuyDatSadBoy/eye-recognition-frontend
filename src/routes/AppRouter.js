// src/routes/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

// Members
import MemberList from '../views/members/MemberList';
import MemberForm from '../views/members/MemberForm';
import MemberDetail from '../views/members/MemberDetail';

// Eye Samples
import SampleUpload from '../views/eyesamples/SampleUpload';

// Statistics
import StatisticsList from '../views/statistics/StatisticsList';
import StatDetail from '../views/statistics/StatDetail';

// Training
import DatasetList from '../views/training/DatasetList';
import DatasetUpload from '../views/training/DatasetUpload';
import TrainingForm from '../views/training/TrainingForm';
import ModelList from '../views/training/ModelList';
import DetectionForm from '../views/training/DetectionForm';

const AppRouter = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="container-fluid flex-grow-1">
          <div className="row">
            <div className="col-md-2 d-none d-md-block sidebar">
              <Sidebar />
            </div>
            <div className="col-md-10 ms-sm-auto px-md-4 main-content">
              <Routes>
                {/* Home */}
                <Route path="/" element={<Navigate to="/members" />} />
                
                {/* Members */}
                <Route path="/members" element={<MemberList />} />
                <Route path="/members/create" element={<MemberForm />} />
                <Route path="/members/edit/:id" element={<MemberForm />} />
                <Route path="/members/:id" element={<MemberDetail />} />
                
                {/* Eye Samples */}
                <Route path="/members/:memberId/samples/upload" element={<SampleUpload />} />
                
                {/* Statistics */}
                <Route path="/statistics" element={<StatisticsList />} />
                <Route path="/statistics/member/:memberId" element={<StatDetail />} />
                
                {/* Training */}
                <Route path="/training/datasets" element={<DatasetList />} />
                <Route path="/training/datasets/upload" element={<DatasetUpload />} />
                <Route path="/training/start/:datasetId" element={<TrainingForm />} />
                <Route path="/training/models" element={<ModelList />} />
                <Route path="/training/detect" element={<DetectionForm />} />
                <Route path="/training/detect/:modelId" element={<DetectionForm />} />
              </Routes>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;
