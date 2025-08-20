import { Validators } from "@angular/forms";

export const CREATE_FORM = {
  type: ['', [Validators.required]],
  title: ['', [Validators.required, Validators.minLength(3)]],
  value: ['', [Validators.required, Validators.min(0)]]
}
