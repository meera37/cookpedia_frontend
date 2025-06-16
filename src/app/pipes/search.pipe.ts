import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

//     class classname  pipetranform interface use cheya
export class SearchPipe implements PipeTransform {

  //enthine aano tranform cheyande, etra pravishyam and their type
  //ethu data, ethu format
  transform(allRecipes: any[], searchKey: string): any[] {
   let result:any = []

   if(!allRecipes || searchKey == ""){
    return allRecipes
   }
   //engane cheynaam 
   result = allRecipes.filter((item:any)=>item.name.toLowerCase().includes(searchKey.toLowerCase()))
   return result
   
  }

}
