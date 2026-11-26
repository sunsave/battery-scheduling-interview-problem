export interface CustomerResponse {
  id: string;
  name: string;
  battery: BatteryResponse | null;
}

export interface BatteryResponse {
  serialNumber: string;
  model: string;
  capacityKwh: number;
  nickname: string | null;
  exportLimitKw: number;
}
