import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DataSharingService } from '../../../../../UserFrontEnd/service/data-sharing.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'review-analytics',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './review-analytics.component.html',
})
export class ReviewAnalyticsComponent implements OnInit {
  positivePercentage = 0;
  negativePercentage = 0;
  
  chartOptions: any = {
    series: [0, 0],
    labels: ['Satisfied (≥3★)', 'Not Satisfied (<3★)'],
    chart: {
      type: 'donut',
      height: 300
    },
    colors: ['#10b981', '#ef4444'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    tooltip: {
      enabled: true,
      theme: 'dark'
    }
  };

  constructor(private dataSharing: DataSharingService) {}

  ngOnInit(): void {
    this.dataSharing.predictedUsers$.subscribe(users => {
      this.calculateSatisfaction(users);
    });
  }

  private calculateSatisfaction(users: any[]) {
    const ratedUsers = users.filter(u => u.rating !== null);
    const total = ratedUsers.length;

    if (total === 0) {
      this.positivePercentage = 0;
      this.negativePercentage = 0;
    } else {
      const satisfied = ratedUsers.filter(u => (u.rating || 0) >= 3).length;
      this.positivePercentage = Math.round((satisfied / total) * 100);
      this.negativePercentage = 100 - this.positivePercentage;
    }

    this.chartOptions.series = [this.positivePercentage, this.negativePercentage];
    // Créer une nouvelle référence pour forcer la détection des changements
    this.chartOptions = {...this.chartOptions};
  }
}