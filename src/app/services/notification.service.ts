import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  notifier(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 2000
    })
  }

  notifierErreur(messageErreur: string) {
    this._snackBar.open('ERREUR : ' + messageErreur, undefined, {
      verticalPosition: 'bottom',
      duration: 2000,
      panelClass: 'notification-erreur'
    })
  }
}
