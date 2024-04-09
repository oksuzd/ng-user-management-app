import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { User } from "../../../models/user.model";

export const CORRECT_NAME = /[a-zA-Zа-яА-Я-]+$/;
export const CORRECT_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export function RegexFormValidator(reg: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && !control.value.toString().match(reg)) {
      return {invalidData: true};
    }
    return null;
  };
}

export function EmailIsTakenValidator(usersList: User[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && isEmailTaken(control.value, usersList)) {
      return {existingEmail: true};
    }
    return null;
  };
}

function isEmailTaken(email: string, usersList: User[]): boolean {
  return usersList.some((user: User) => email === user.email);
}

export function isNameValid(value: string): boolean {
  return !!value.toString().match(CORRECT_NAME);
}

export function isEmailInvalid(email: string): boolean {
  return !email?.toString().match(CORRECT_EMAIL);
}
