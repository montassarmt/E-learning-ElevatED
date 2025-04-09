import { ScrapingService } from '@/app/PartnershipManagement/Services/scraping.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-scraping',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './scraping.component.html',
  styleUrl: './scraping.component.scss'
})
export class ScrapingComponent implements OnInit {
  scrapedData: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private scrapingService: ScrapingService) {}

  ngOnInit(): void {
    this.getScrapedData();
  }

  getScrapedData(): void {
    this.isLoading = true;
    this.scrapingService.getScrapedData().subscribe(
      (data) => {
        this.scrapedData = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching data';
        this.isLoading = false;
        console.error(error);
      }
    );
  }

}
