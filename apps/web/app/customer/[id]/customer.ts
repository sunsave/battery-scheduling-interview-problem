export interface Customer {
  id: string;
  name: string;
  battery: Battery | null;
}

export interface Battery {
  serialNumber: string;
  model: string;
  capacityKwh: number;
  nickname: string | null;
  exportLimitKw: number;
}
