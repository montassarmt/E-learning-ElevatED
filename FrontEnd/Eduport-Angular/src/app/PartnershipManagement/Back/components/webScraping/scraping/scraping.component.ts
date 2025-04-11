import { ScrapingService } from '@/app/PartnershipManagement/Services/scraping.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-scraping',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './scraping.component.html',
  styleUrl: './scraping.component.scss'
})
export class ScrapingComponent implements OnInit {
  scrapedData: any[] = [];
  filteredData: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  searchTerm: string = '';

  constructor(private scrapingService: ScrapingService) {}

  ngOnInit(): void {
    this.getScrapedData();
  }

  getScrapedData(): void {
    this.isLoading = true;
    this.scrapingService.getScrapedData().subscribe(
      (data) => {
        this.scrapedData = data;
        this.filteredData = data; // Initialize filtered data with all items
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching data';
        this.isLoading = false;
        console.error(error);
      }
    );
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.filteredData = this.scrapedData.filter(item =>
        (item.Title && item.Title.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (item.Description && item.Description.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    } else {
      this.filteredData = [...this.scrapedData]; // Reset to all data if no search term
    }
  }
  
  // Method to sort the table by highest score (descending)
  filterByHighestScore(): void {
    this.filteredData = [...this.scrapedData]
      .sort((a, b) => b.Score - a.Score);
  }

  // Method to sort the table by most popular (by number of reviews, descending)
  filterByMostPopular(): void {
    //console.log('Sorting by most popular (number of reviews)...');
    this.filteredData = [...this.scrapedData]
      .sort((a, b) => b.Reviews - a.Reviews); // Sort by number of reviews in descending order
    //console.log(this.filteredData); // Debug output to verify sorting
  }
  

}
