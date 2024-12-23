import { Pipe,PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({name:'timeTransform'})

export class TimeTransform implements PipeTransform {
  transform(value: any, ...args: any[]) {
    // let date = new Date(value * 1000);
    // const date = new Date().getTime();
    // console.log(date)
    return  moment.unix(value).format("DD/MM/YYYY")

  }
}
