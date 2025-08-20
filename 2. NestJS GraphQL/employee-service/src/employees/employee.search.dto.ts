import { EmployeeStatus } from './employee.model';

export interface EmployeeSearchDto {
  status: EmployeeStatus;
  name: string;
}
