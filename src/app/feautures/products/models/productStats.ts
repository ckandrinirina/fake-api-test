import {
  ApexAxisChartSeries,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
  ApexXAxis,
} from 'ng-apexcharts';

export interface BarStatsConfig {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
}


export interface PiesStatsConfig {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  labels: string[]
}
