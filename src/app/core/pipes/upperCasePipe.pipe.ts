import { Pipe,PipeTransform } from "@angular/core";

@Pipe({name:'upperCase'})

export class UpperCase implements PipeTransform {
  transform(value: any, ...args: any[]) {
    if(typeof(value) === 'boolean'){
      if(value === true)
        value = "true"
    }else{
      value = "false"
    }
    if(!value) return value

    return value.toUpperCase()
  }
}
