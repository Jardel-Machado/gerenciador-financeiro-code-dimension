import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customKeyValue',
  pure: false
})
export class CustomKeyValuePipe implements PipeTransform {

  transform(obj: Record<string, unknown>): { key: string; value: unknown }[] | null {
    console.log(obj);
    return Object.keys(obj).map(key => {
      return{
        key,
        value: obj[key]
      }
    });
  }
}
