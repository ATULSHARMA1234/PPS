import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { RouteGuard } from './components/RouteGuard';
import { Home } from './pages/Home';
import { Overview } from './pages/Overview';
import { Personnel } from './pages/Personnel';
import { RevenueHub } from './pages/RevenueHub';
import { GlobalFleetMap } from './pages/GlobalFleetMap';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLogin } from './pages/AdminLogin';
import { Manager } from './pages/Manager';
import { ManagerLogin } from './pages/ManagerLogin';
import { Driver } from './pages/Driver';
import { DriverLogin } from './pages/DriverLogin';
import { Customer } from './pages/Customer';
import { OceanFreight } from './pages/OceanFreight';
import { SmartWarehousing } from './pages/SmartWarehousing';
import { LastMileDelivery } from './pages/LastMileDelivery';
import { BookOceanFreight } from './pages/BookOceanFreight';
import { BookLastMile } from './pages/BookLastMile';
import { BookWarehouse } from './pages/BookWarehouse';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-slate-800">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book-warehouse" element={<BookWarehouse />} />
          <Route path="/book-ocean-freight" element={<BookOceanFreight />} />
          <Route path="/book-last-mile" element={<BookLastMile />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/ocean-freight" element={<OceanFreight />} />
          <Route path="/smart-warehousing" element={<SmartWarehousing />} />
          <Route path="/last-mile-delivery" element={<LastMileDelivery />} />
          
          {/* Admin/Manager only routes - protected from customers */}
          <Route path="/overview" element={
            <RouteGuard allowedRoles={['admin', 'manager']}>
              <Overview />
            </RouteGuard>
          } />
          <Route path="/personnel" element={
            <RouteGuard allowedRoles={['admin', 'manager']}>
              <Personnel />
            </RouteGuard>
          } />
          <Route path="/revenue-hub" element={
            <RouteGuard allowedRoles={['admin', 'manager']}>
              <RevenueHub />
            </RouteGuard>
          } />
          <Route path="/global-fleet-map" element={
            <RouteGuard allowedRoles={['admin', 'manager']}>
              <GlobalFleetMap />
            </RouteGuard>
          } />
          <Route path="/fleet-map" element={
            <RouteGuard allowedRoles={['admin', 'manager']}>
              <GlobalFleetMap />
            </RouteGuard>
          } />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <RouteGuard allowedRoles={['admin']}>
              <AdminDashboard />
            </RouteGuard>
          } />
          <Route path="/manager/login" element={<ManagerLogin />} />
          <Route path="/manager" element={
            <RouteGuard allowedRoles={['manager']}>
              <Manager />
            </RouteGuard>
          } />
          <Route path="/driver/login" element={<DriverLogin />} />
          <Route path="/driver" element={
            <RouteGuard allowedRoles={['driver']}>
              <Driver />
            </RouteGuard>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
