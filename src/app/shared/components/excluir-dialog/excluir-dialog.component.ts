import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/interfaces/dialog-data';

@Component({
  selector: 'app-excluir-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './excluir-dialog.component.html',
  styleUrl: './excluir-dialog.component.scss',
})
export class ExcluirDialogComponent {
  readonly dialogData = signal(inject<DialogData>(MAT_DIALOG_DATA));

  private defaultDialogData: Partial<DialogData> = {
    cancelText: 'Cancelar',
    confirmText: 'Confirmar',
  };

  resolvedDialogData = computed(() => {
    return { ...this.defaultDialogData, ...this.dialogData() };
  });
}
