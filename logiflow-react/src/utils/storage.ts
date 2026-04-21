export interface Warehouse {
  id: string;
  name: string;
  location: string;
  totalCapacity: number; // in sq ft
  availableCapacity: number; // in sq ft
}

const STORAGE_KEY = 'logiflow_warehouses';

export const getWarehouses = (): Warehouse[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  // Initialize with default mock warehouses if empty
  const defaultWarehouses: Warehouse[] = [
    { id: 'W-001', name: 'Mumbai Logistics Hub A', location: 'Mumbai, MH', totalCapacity: 100000, availableCapacity: 45000 },
    { id: 'W-002', name: 'Delhi National Depot', location: 'New Delhi, DL', totalCapacity: 250000, availableCapacity: 120000 },
    { id: 'W-003', name: 'Chennai Port Storage', location: 'Chennai, TN', totalCapacity: 80000, availableCapacity: 12000 }
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultWarehouses));
  return defaultWarehouses;
};

export const addWarehouse = (warehouse: Warehouse) => {
  const warehouses = getWarehouses();
  warehouses.push(warehouse);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(warehouses));
};

export const bookWarehouseCapacity = (id: string, amount: number): boolean => {
  const warehouses = getWarehouses();
  let success = false;
  
  const updatedWarehouses = warehouses.map(w => {
    if (w.id === id) {
      if (w.availableCapacity >= amount) {
        success = true;
        return { ...w, availableCapacity: w.availableCapacity - amount };
      }
    }
    return w;
  });

  if (success) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWarehouses));
  }
  return success;
};
