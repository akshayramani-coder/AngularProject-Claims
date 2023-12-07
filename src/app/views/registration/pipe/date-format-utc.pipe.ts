import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatUTC'
})
export class DateFormatUTCPipe extends DatePipe  implements PipeTransform {

  override transform(value: any, args?: any): any {
    return super.transform(value,'dd/MM/yyyy',"+0000");
  }

}
