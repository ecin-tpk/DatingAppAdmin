import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: any) {
    const timeDiff = Math.abs(Date.now() - new Date(value).getTime());
    return Math.floor(timeDiff / (3600 * 24 * 1000) / 365.25);
  }
}
