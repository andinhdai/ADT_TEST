import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  selectedEmployee: any;

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      data => {
        this.employees = data.result; 
      },
      error => {
        console.error('Error loading employees:', error);
      }
    );
  }

  selectEmployee(employee: any): void {
    this.selectedEmployee = employee;
  }

  viewEmployee(): void {
    if (this.selectedEmployee) {
      this.dialog.open(EmployeeDialogComponent, {
        width: '300px',
        data: this.selectedEmployee
      });
    }
  }
}
