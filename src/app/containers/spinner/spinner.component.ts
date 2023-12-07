import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/common/services/spinner/spinner.service'; 
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  loading = false;
  loadingSubscription!: Subscription;
  SpinnerServiceService!: Subscription;
  constructor(private loadingScreenService: SpinnerService, private elmRef: ElementRef,
              private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.elmRef.nativeElement.style.display = 'none';
    this.loadingSubscription = this.loadingScreenService.loadingStatus.pipe().subscribe(
        (status: boolean) => {
          this.elmRef.nativeElement.style.display = status ? 'block' : 'none';
          this.changeDetectorRef.detectChanges();
        }
    );
  }
  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
