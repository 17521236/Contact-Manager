import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})

export class PhonePipe implements PipeTransform {

  transform(rawNum: string) {
    if (rawNum[0] === '0'){
      let tmp = rawNum.split('');
      tmp[0] = '(+84) ';
      tmp[3] = tmp[3] + ' ';
      tmp[6] = tmp[6] + ' ';
      return tmp.join('');
    }
    return rawNum;
  }

}