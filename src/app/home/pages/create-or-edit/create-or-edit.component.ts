import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CREATE_FORM } from 'src/app/home/formularios/create-form';
import { TransactionType } from 'src/app/shared/transaction/enums/transaction-type';
import { NgxMaskDirective } from 'ngx-mask';
import { TransactionService } from 'src/app/shared/transaction/services/transaction';
import { Router } from '@angular/router';
import { Transaction, TransactionRequest } from 'src/app/shared/transaction/interfaces/transaction';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FeedbackService } from 'src/app/shared/feedback/services/feedback.service';
import { CustomFormFieldDirective } from 'src/app/shared/material/form-field/directives/custom-form-field.directive';


@Component({
  selector: 'app-create-or-edit',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    NgxMaskDirective,
    CustomFormFieldDirective,
  ],
  templateUrl: './create-or-edit.component.html',
  styleUrl: './create-or-edit.component.scss',
})
export class CreateOrEditComponent implements OnInit {
  readonly transactionType = TransactionType;

  form!: FormGroup;

  transaction = input<Transaction>();

  titleErrorMessage = signal('');

  valueErrorMessage = signal('');

  transactionTypeErrorMessage = signal('');

  private readonly formBuilder = inject(FormBuilder);
  private readonly transactionService = inject(TransactionService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly feedbackService = inject(FeedbackService);

  ngOnInit() {
    this.iniciarFormulario();
    if (this.transaction()) {
      this.form.patchValue(this.transaction()!);
    }
  }

  iniciarFormulario() {
    this.form = this.formBuilder.group(CREATE_FORM);
  }

  updateTitleErrorMessage() {
    if (this.form.controls['title'].hasError('required')) {
      this.titleErrorMessage.set('Título é obrigatório');
    } else if (this.form.controls['title'].hasError('minlength')) {
      this.titleErrorMessage.set('O título deve ter pelo menos 3 caracteres');
    } else {
      this.titleErrorMessage.set('');
    }
  }
  updateValueErrorMessage() {
    if (this.form.controls['value'].hasError('required')) {
      this.valueErrorMessage.set('Valor é obrigatório');
    } else if (this.form.controls['value'].hasError('min')) {
      this.valueErrorMessage.set('O valor deve ser maior que zero');
    } else {
      this.valueErrorMessage.set('');
    }
  }
  updateTransactionTypeErrorMessage() {
    if (this.form.controls['type'].hasError('required')) {
      this.transactionTypeErrorMessage.set('Tipo de transação é obrigatório');
    } else {
      this.transactionTypeErrorMessage.set('');
    }
  }

  createOrEditTransaction() {
    if (this.form.valid) {
      const request: TransactionRequest = this.form.value;

      if (this.transaction()) {
        this.transactionService
          .update(this.transaction()!.id, request)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.feedbackService.success('Transação atualizada com sucesso!');
              this.router.navigate(['/']);
            },
            error: (error) => {
              console.error('Erro ao atualizar transação:', error);
            },
          });
      } else {
        this.transactionService
          .create(request)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.feedbackService.success('Transação criada com sucesso!');
              this.router.navigate(['/']);
            },
            error: (error) => {
              console.error('Erro ao criar transação:', error);
            },
          });
      }
    }
  }
}
