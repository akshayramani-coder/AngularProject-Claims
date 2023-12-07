import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat1830'
})
export class DateFormat1830Pipe extends DatePipe  implements PipeTransform {

  override transform(value: any, args?: any): any {
    return super.transform(value,'dd/MM/yyyy',"+0530");
  }

}
