import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "sortBy",
  pure: false
})
export class SortPipe {
  transform(array: Array<string>, args: string): Array<string> {
    if(args!=null && args.length > 0) {
      array.sort((a: any, b: any) => {
        if ( a[args] < b[args] ){
          return -1;
        } else if( a[args] > b[args] ){
          return 1;
        } else{
          return 0;
        }
      });
    }
    return array;
  }
}
