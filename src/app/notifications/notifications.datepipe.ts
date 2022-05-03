import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Pipe({
    name: 'dateFormatPipe',
})
export class dateFormatPipe implements PipeTransform {
  
    transform(value: string) {
        var datePipe = new DatePipe("en-US");
        value = datePipe.transform(value, 'yyyy-MM-dd  HH:mm:ss');
        return value;
    }

    transformnew(value: number) {
        var datePipe = new DatePipe("en-US");
        var values = datePipe.transform(value, 'dd/MM/yyyy');
        return values;
    }

    transform02(value: number) {
        var datePipe = new DatePipe("en-US");
        var nvalue = datePipe.transform(value, 'yyyy-MM-dd');
        return nvalue;
    }

    transform03(value: number) {
        var datePipe = new DatePipe("en-US");
        var nvalue = datePipe.transform(value, 'yyyy-MM-dd HH:mm:ss');
        return nvalue;
    }


    transform04() {
        var today: string = moment().format('YYYY-MM-DD HH:mm:ss');
        return today;
    }


    transform05(value: number) {
        var datePipe = new DatePipe("en-US");
        var nvalue = datePipe.transform(value, 'yyyy-MM-dd');
        return nvalue;
    }

    transform06() {
        var today: string = moment().format('HH:mm:ss');
        return today;
    }

}