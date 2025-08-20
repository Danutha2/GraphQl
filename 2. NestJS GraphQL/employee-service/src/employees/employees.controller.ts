import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeTier } from './employee.model';
import { EmployeeSearchDto } from './employee.search.dto';
import { EmployeeUpdateDto } from './employee.update.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  // Handles GET requests for employees
  @Get('/get-employees')
  getEmployee(@Query() param: EmployeeSearchDto) {
    // To do: Implement
    if (Object.keys(param).length > 0) {
      console.log('filtering employees based on search criteria');
      return this.employeesService.employeeSearch(param);
    } else {
      console.log('fetching all employees');
      return this.employeesService.getAllEmployee();
    }
    console.log(param);
    return this.employeesService.getAllEmployee();
  }

  @Get('/get-employee/:id')
  getEmployeeById(@Param('id') id: string) {
    // To do: Implement
    return this.employeesService.getEmployeeById(id);
  }

  @Post('/add-employee')
  addEmployee(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('designation') designation: string,
    @Body('nearestCity') nearestCity: string,
    @Body('tier') tier: EmployeeTier,
  ) {
    // To do: Implement
    return this.employeesService.addEmployee(
      firstName,
      lastName,
      designation,
      nearestCity,
      tier, // Default status
    );
  }

  @Put('/:id/city')
  employeeUpdate(@Param('id') id: string, @Body() body: EmployeeUpdateDto) {
    // To do: Implement
    body.id = id;
    return this.employeesService.employeeUpdate(body);
  }

  @Delete('/delete-employee/:id')
  @HttpCode(204)
  /**
   * Delete an employee by their ID.
   *
   * Returns a message if the employee is not found.
   *
   * @param id The ID of the employee to delete.
   *
   * @returns A message indicating if the employee was found or not.
   */
  deleteEmployee(@Param('id') id: string) {
    const employee = this.employeesService.getEmployeeById(id);
    if (!employee) {
      return { message: 'Employee not found' };
    } else {
      return this.employeesService.deleteEmployee(id);
    }
  }
}
