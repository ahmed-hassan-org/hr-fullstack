import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hr-fullstack-add-edit-employees',
  templateUrl: './add-edit-employees.component.html',
  styleUrls: ['./add-edit-employees.component.scss'],
})
export class AddEditEmployeesComponent implements OnInit {
  @Input('id') id!: number;
  constructor() {}

  ngOnInit(): void {
    console.log('income emp id: ', this.id);
  }
}
