import { Pipe, PipeTransform } from '@angular/core';
import { formatNumberWithCommas } from "../_utils/formatNumberWithCommas";

@Pipe({
    name: 'addCommas',
    standalone: true
})
export class AddCommasPipe implements PipeTransform {

  transform(value: any): any {
    if (!value || isNaN(Number(value))) {
      return value;
    }

    return formatNumberWithCommas(value);
  }
}
import { Pipe, PipeTransform } from '@angular/core';
import { formatNumberWithCommas } from "../_utils/formatNumberWithCommas";

@Pipe({
    name: 'addCommas',
    standalone: true
})
export class AddCommasPipe implements PipeTransform {

  transform(value: any): any {
    if (!value || isNaN(Number(value))) {
      return value;
    }

    return formatNumberWithCommas(value);
  }
