import { Injectable } from '@nestjs/common';
import { Employee, EmployeeStatus, EmployeeTier } from './employee.model';
import { EmployeeSearchDto } from './employee.search.dto';
import { EmployeeUpdateDto } from './employee.update.dto';

@Injectable()
export class EmployeesService {
  private employees: Employee[] = [];

  getEmployeeById(id: string) {
    return this.employees.find((employee) => employee.id === id);
  }

  getAllEmployee() {
    return this.employees;
  }

  addEmployee(
    firstName: string,
    lastName: string,
    designation: string,
    nearestCity: string,
    tier: EmployeeTier,
  ) {
    const employee: Employee = {
      id: String(this.employees.length + 1),
      firstName,
      lastName,
      designation,
      nearestCity,
      tier,
      status: EmployeeStatus.ACTIVE, // Default status to ACTIVE if not provided
    };
    this.employees.push(employee);
    return employee;
  }

  employeeSearch(employeeSearchDto: EmployeeSearchDto) {
    console.log(employeeSearchDto);
    const { status, name } = employeeSearchDto;

    let employees = this.getAllEmployee();

    if (status) {
      employees = employees.filter((employee) => employee.status === status);
    }

    if (name) {
      employees = employees.filter(
        (employee) =>
          employee.firstName.includes(name) || employee.lastName.includes(name),
      );
    }

    return employees;
  }

  employeeUpdate(employeeUpdateDto: EmployeeUpdateDto) {
    const { id, city } = employeeUpdateDto;
    const employee = this.getEmployeeById(id);
    if (employee) {
      if (city) {
        employee.nearestCity = city;
      }
      return employee;
    }
    return null; // or throw an error if preferred
  }

  deleteEmployee(id) {
    let employees = this.getAllEmployee();
    this.employees = employees.filter((emp) => emp.id !== id);
    return 'Deleted successfully';
  }
}
