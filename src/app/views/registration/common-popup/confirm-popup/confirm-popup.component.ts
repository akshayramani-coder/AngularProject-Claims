import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private profileService : ProfileService,
    public dialogRef: MatDialogRef<ConfirmPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }
  public cancel() {
    this.close(false);
  }
  public close(value: any) {
    this.dialogRef.close(value);
  }
  public confirm() {
    this.close(true);
  }
  public NomineeAlert(){
    this.close(true);
    this.profileService.emitJobPreviousBtnFn(2);
  }
  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }

  
}
