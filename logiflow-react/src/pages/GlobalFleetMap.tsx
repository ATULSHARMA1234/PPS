import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AOS from 'aos';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Vehicle {
  id: string;
  location: string;
  lat: number;
  lng: number;
  status: string;
  type: string;
}

interface FleetStats {
  total: number;
  active: number;
  inTransit: number;
  maintenance: number;
}

interface Activity {
  id: string;
  vehicle: string;
  action: string;
  location: string;
  time: string;
}

export const GlobalFleetMap: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [stats, setStats] = useState<FleetStats>({
    total: 0,
    active: 0,
    inTransit: 0,
    maintenance: 0
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState<L.Map | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });

    // Simulate data loading
    setTimeout(() => {
      const vehicleData: Vehicle[] = [
        { id: 'TRK-001', location: 'Mumbai, India', lat: 19.0760, lng: 72.8777, status: 'Active', type: 'Truck' },
        { id: 'TRK-002', location: 'Delhi, India', lat: 28.6139, lng: 77.2090, status: 'In Transit', type: 'Truck' },
        { id: 'VAN-003', location: 'Bangalore, India', lat: 12.9716, lng: 77.5946, status: 'Active', type: 'Van' },
        { id: 'TRK-004', location: 'Chennai, India', lat: 13.0827, lng: 80.2707, status: 'Maintenance', type: 'Truck' },
        { id: 'AIR-005', location: 'Kolkata, India', lat: 22.5726, lng: 88.3639, status: 'Active', type: 'Aircraft' },
        { id: 'SHIP-006', location: 'Hyderabad, India', lat: 17.3850, lng: 78.4867, status: 'In Transit', type: 'Cargo Ship' }
      ];

      setVehicles(vehicleData);
      setStats({
        total: vehicleData.length,
        active: vehicleData.filter(v => v.status === 'Active').length,
        inTransit: vehicleData.filter(v => v.status === 'In Transit').length,
        maintenance: vehicleData.filter(v => v.status === 'Maintenance').length
      });

      setActivities([
        { id: 'ACT001', vehicle: 'TRK-001', action: 'Departed from hub', location: 'Mumbai', time: '2 hours ago' },
        { id: 'ACT002', vehicle: 'TRK-002', action: 'Route updated', location: 'Delhi', time: '3 hours ago' },
        { id: 'ACT003', vehicle: 'VAN-003', action: 'Delivery completed', location: 'Bangalore', time: '4 hours ago' },
        { id: 'ACT004', vehicle: 'AIR-005', action: 'Landed at airport', location: 'Kolkata', time: '5 hours ago' }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (!loading && vehicles.length > 0) {
        const randomIndex = Math.floor(Math.random() * vehicles.length);
        const vehicle = vehicles[randomIndex];
        
        // Small random movement
        const updatedVehicles = [...vehicles];
        updatedVehicles[randomIndex] = {
          ...vehicle,
          lat: vehicle.lat + (Math.random() - 0.5) * 0.01,
          lng: vehicle.lng + (Math.random() - 0.5) * 0.01
        };
        setVehicles(updatedVehicles);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [vehicles, loading]);

  const showNotification = (message: string, type: string = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const refreshFleetData = () => {
    showNotification('Refreshing fleet data...', 'info');
    setTimeout(() => {
      showNotification('Fleet data updated successfully!', 'success');
    }, 1500);
  };

  const showFilters = () => {
    showNotification('Filters feature coming soon!', 'info');
  };

  const dispatchVehicle = () => {
    showNotification('Opening vehicle dispatch form...', 'info');
    setTimeout(() => {
      showNotification('Vehicle dispatch form ready!', 'success');
    }, 1000);
  };

  const generateReport = () => {
    showNotification('Generating fleet report...', 'info');
    setTimeout(() => {
      showNotification('Report generated successfully! Downloading...', 'success');
    }, 2000);
  };

  const exportData = () => {
    showNotification('Exporting fleet data...', 'info');
    setTimeout(() => {
      showNotification('Data exported successfully!', 'success');
    }, 1500);
  };

  const getVehicleIcon = (status: string) => {
    const iconColors: { [key: string]: string } = {
      'Active': '#10b981',
      'In Transit': '#3b82f6',
      'Maintenance': '#f59e0b'
    };
    const color = iconColors[status] || '#6b7280';
    
    return L.divIcon({
      html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [16, 16],
      className: 'custom-div-icon'
    });
  };

  const routes: [number, number][][] = [
    [[19.0760, 72.8777], [12.9716, 77.5946]], // Mumbai to Bangalore
    [[28.6139, 77.2090], [22.5726, 88.3639]], // Delhi to Kolkata
    [[17.3850, 78.4867], [13.0827, 80.2707]], // Hyderabad to Chennai
    [[26.9124, 75.7873], [21.1702, 72.8311]]  // Jaipur to Surat
  ];

  if (loading) {
    return (
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-electric"></div>
            <p className="mt-4 text-slate-600">Loading fleet map...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-12 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8" data-aos="fade-down">
          <h1 className="text-4xl font-bold text-navy mb-2">Global Fleet Map</h1>
          <p className="text-slate-600 text-lg">Real-time fleet tracking and logistics visualization</p>
        </div>

        {/* Fleet Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="0">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 text-electric rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-navy mb-1">{stats.total}</div>
            <div className="text-sm text-slate-600">Total Vehicles</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-navy mb-1">{stats.active}</div>
            <div className="text-sm text-slate-600">Active</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 text-electric rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-navy mb-1">{stats.inTransit}</div>
            <div className="text-sm text-slate-600">In Transit</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-navy mb-1">{stats.maintenance}</div>
            <div className="text-sm text-slate-600">Maintenance</div>
          </div>
        </div>

        {/* Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" data-aos="fade-up" data-aos-delay="400">
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-navy">Live Fleet Tracking</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={refreshFleetData}
                    className="px-3 py-1 bg-electric text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Refresh
                  </button>
                  <button
                    onClick={showFilters}
                    className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Filters
                  </button>
                </div>
              </div>
            </div>
            <div className="h-[600px]">
              <MapContainer
                center={[20.5937, 78.9629]} // Center of India
                zoom={5}
                style={{ height: '100%', width: '100%' }}
                ref={setMap}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {vehicles.map((vehicle) => (
                  <Marker
                    key={vehicle.id}
                    position={[vehicle.lat, vehicle.lng]}
                    icon={getVehicleIcon(vehicle.status)}
                  >
                    <Popup>
                      <div className="p-2">
                        <div className="font-bold text-navy">{vehicle.id}</div>
                        <div className="text-sm text-slate-600">{vehicle.location}</div>
                        <div className="text-xs font-medium mt-1" style={{ color: '#10b981' }}>
                          {vehicle.status.toUpperCase()}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {routes.map((route, index) => (
                  <Polyline
                    key={index}
                    positions={route}
                    color="#2563eb"
                    weight={2}
                    opacity={0.6}
                    dashArray="5, 10"
                  />
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vehicle Types */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="500">
              <h3 className="text-lg font-bold text-navy mb-4">Vehicle Types</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Trucks</span>
                  </div>
                  <span className="text-sm font-medium text-navy">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Vans</span>
                  </div>
                  <span className="text-sm font-medium text-navy">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Aircraft</span>
                  </div>
                  <span className="text-sm font-medium text-navy">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Cargo Ships</span>
                  </div>
                  <span className="text-sm font-medium text-navy">1</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="600">
              <h3 className="text-lg font-bold text-navy mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <div key={index} className="border-l-2 border-electric pl-3">
                    <div className="text-sm font-medium text-navy">{activity.vehicle}</div>
                    <div className="text-xs text-slate-600">{activity.action}</div>
                    <div className="text-xs text-slate-500">{activity.location} {"\u2022"} {activity.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200" data-aos="fade-up" data-aos-delay="700">
              <h3 className="text-lg font-bold text-navy mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={dispatchVehicle}
                  className="w-full px-4 py-2 bg-electric text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  Dispatch New Vehicle
                </button>
                <button
                  onClick={generateReport}
                  className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                >
                  Generate Report
                </button>
                <button
                  onClick={exportData}
                  className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                >
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 px-6 py-4 rounded-xl shadow-lg z-50 ${
          notification.type === 'success' ? 'bg-green-500' : 
          notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white`}>
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div className="font-medium">{notification.message}</div>
          </div>
        </div>
      )}
    </main>
  );
};
