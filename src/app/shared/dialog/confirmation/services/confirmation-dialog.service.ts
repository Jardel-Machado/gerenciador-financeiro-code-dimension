import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { ExcluirDialogComponent } from 'src/app/shared/components/excluir-dialog/excluir-dialog.component';
import { DialogData } from 'src/app/shared/interfaces/dialog-data';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  private readonly dialog = inject(MatDialog);

  open(data: DialogData) {
    return this.dialog
      .open(ExcluirDialogComponent, {
        data
      })
      .afterClosed()
      .pipe(filter((result: boolean) => result === true));
  }
}
