import type { ChartOptions } from '@/app/common/apexchart.model';
import { getCssVariableValue } from '@/app/core/utils/chartColor';
import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClient } from '@angular/common/http';
import { AnalyticsService } from '@/app/services/analytics.service';

@Component({
  selector: 'review-analytics',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './review-analytics.component.html',
  styles: [],
})
export class ReviewAnalyticsComponent {
  // Chart Options
  pageViewChart: Partial<ChartOptions> = {
    series: [0, 0], // Initialize with 0 values
    labels: ['Positive', 'Negative'],
    chart: {
      height: 300,
      width: 300,
      type: 'donut',
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      colors: ['transparent'],
    },
    colors: [
      getCssVariableValue('--bs-success'),
      getCssVariableValue('--bs-danger'),
    ],
    tooltip: {
      theme: 'dark',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 100,
            width: 100,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  // Arrays to store positive and negative comments
  positiveComments: string[] = [];
  negativeComments: string[] = [];

  analytics: any = {}; // Store the analytics data

  constructor(private http: HttpClient, private analytic_service: AnalyticsService) {}

  ngOnInit() {
    this.getFeedbackAnalytics();
  }

  getFeedbackAnalytics() {
    this.analytic_service.getAnalytics().subscribe({
      next: (response: any) => {
        console.log('API Response analytics:', response); // Debugging
        
        // Update the feedback data
        this.positiveComments = response.positiveComments;
        this.negativeComments = response.negativeComments;

        // Set the chart series with percentage values
        const totalReviews = response.positiveCount + response.negativeCount;
        const positivePercentage = (response.positiveCount / totalReviews) * 100;
        const negativePercentage = (response.negativeCount / totalReviews) * 100;

        // Update chart series
        this.pageViewChart.series = [positivePercentage, negativePercentage];
      },
      error: (err) => {
        console.error('Error fetching analytics data', err);
      },
    });
  }
}
