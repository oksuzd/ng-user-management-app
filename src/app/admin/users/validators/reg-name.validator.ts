import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const CORRECT_NAME = /[a-zA-Zа-яА-Я-]+$/;

export function RegexFormValidator(reg: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && !control.value.toString().match(reg)) {
      return {invalidName: true};
    }
    return null;
  };
}

export function isNameValid(value: string): boolean {
  return !!value.toString().match(CORRECT_NAME);
}
