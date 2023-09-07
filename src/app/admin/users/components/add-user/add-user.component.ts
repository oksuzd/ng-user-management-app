import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CORRECT_NAME, RegexFormValidator } from "../../validators/reg-name.validator";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  newUserForm: FormGroup = this.fb.group({
    id: 0,
    firstName: ['', [Validators.required, Validators.minLength(3), RegexFormValidator(CORRECT_NAME)]],
    lastName: ['', [Validators.required, Validators.minLength(3), RegexFormValidator(CORRECT_NAME)]],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent>,
  ) {}

  onCancelClick() {
    this.dialogRef.close();
  }

  isValid(controlName: string): boolean | undefined {
    const control = this.newUserForm.get(controlName);
    return !(control?.invalid && (control?.dirty || control?.touched));
  }

  hasError(controlName: string, error: string): boolean | undefined {
    const control = this.newUserForm.get(controlName);
    return control?.hasError(error) && (control?.dirty || control?.touched);
  }
}
