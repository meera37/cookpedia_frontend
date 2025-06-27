import { Component } from '@angular/core';
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { ApiService } from '../../service/api.service';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HighchartsChartComponent } from 'highcharts-angular';

@Component({
  selector: 'app-adminhome',
  imports: [AdminsidebarComponent, AdminheaderComponent,MatCardModule, MatDatepickerModule, HighchartsChartComponent],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent {

  allusers:any =[]
  allrecipes:any=[]
  alldownloadsCount:any=0
  selected = new Date()
  chartOptions:any={}

  
    


constructor(private api:ApiService){
    this.chartOptions =  {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Cookpedia Website Analysis'
    },
    // subtitle: {
    //     text: 'Source: <a ' +
    //         'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
    //         'target="_blank">Wikipedia.org</a>'
    // },
    xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe'],
        title: {
            text: null
        },
        gridLineWidth: 1,
        lineWidth: 0
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        },
        gridLineWidth: 0
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            borderRadius: '50%',
            dataLabels: {
                enabled: true
            },
            groupPadding: 0.1
        }
    },
    // legend: {
    //     layout: 'vertical',
    //     align: 'right',
    //     verticalAlign: 'top',
    //     x: -40,
    //     y: 80,
    //     floating: true,
    //     borderWidth: 1,
    //     backgroundColor:
    //         Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
    //     shadow: true
    // },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Year 1990',
        data: [632, 727, 3202, 721]
    }, {
        name: 'Year 2000',
        data: [814, 841, 3714, 726]
    }, {
        name: 'Year 2021',
        data: [1393, 1031, 4695, 745]
    }]
}

}

ngOnInit(){
  this.getcount()
}

getcount(){
this.api.getAllUsersApi().subscribe({
  next:(res:any)=>{
  //  console.log(res);
  this.allusers = res.length -1 //or in html allrecipes.length(here all recipes = res)
  console.log(this.allusers);
  
    
  },
  error:(err:any)=>{
   console.log(err);
  
    
  }
})
this.api.allRecipesApi().subscribe({
  next:(res:any)=>{
   // console.log(res);
   this.allrecipes = res.length
    console.log(this.allrecipes);
    
  },
  error:(err:any)=>{
    console.log(err);
    
  }
})
this.api.getAllDownloadApi().subscribe({
  next:(res:any)=>{
   console.log(res);
  //  this.alldownloads = res.length
  //   console.log(this.alldownloads);
  let count = res.map((item:any)=>item.count).reduce((n1:any, n2:any)=>n1+n2) 
  this.alldownloadsCount = count 
  //console.log(count);
  
  },
  error:(err:any)=>{
    console.log(err);
    
  }
})
}

}
