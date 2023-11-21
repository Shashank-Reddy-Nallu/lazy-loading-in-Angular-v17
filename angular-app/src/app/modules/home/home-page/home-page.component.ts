import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Employee {
  id: string;
  age: number;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})

export class HomePageComponent {
  dataForm!: FormGroup;
  isEmpNumberSubmitted: boolean = false;
  employees: WritableSignal<Employee[]> = signal([]);
  youngEmp!: Signal<Employee[]>;
  adultEmp!: Signal<Employee[]>;
  seniorEmp!: Signal<Employee[]>;
  empCount!: Signal<number>;

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      empNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      age: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
    });

    this.youngEmp = computed(() => {
      return this.employees().filter(emp => emp.age < 30);
    });
    this.adultEmp = computed(() => {
      return this.employees().filter(emp => emp.age > 30 && emp.age < 50);
    });
    this.seniorEmp = computed(() => {
      return this.employees().filter(emp => emp.age > 50);
    });

    this.empCount = computed(() => {
      return this.employees().reduce((acc) => acc + 1, 0);
    })
  }

  addEmp(): void {
    this.isEmpNumberSubmitted = true;
    if (this.dataForm.valid) {
      this.employees.set([...this.employees(), { id: this.dataForm?.get('empNumber')?.value, age: this.dataForm?.get('age')?.value }])
      this.dataForm?.get('empNumber')?.setValue('');
      this.dataForm?.get('age')?.setValue('');
      this.isEmpNumberSubmitted = false;
    }
  }
}