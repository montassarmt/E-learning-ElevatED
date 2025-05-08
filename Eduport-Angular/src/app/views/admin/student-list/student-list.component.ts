import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Aos from 'aos';
import { ListCardComponent } from './components/list-card/list-card.component';
import { GridCardComponent } from './components/grid-card/grid-card.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    NgbPaginationModule,
    ListCardComponent,
    GridCardComponent
  ],
  templateUrl: './student-list.component.html',

})
export class StudentListComponent implements OnInit {
  activeView: 'grid' | 'list' = 'grid';
  totalItems = 0;
  currentPage = 1;
  pageSize = 8;
  searchTerm = '';

  ngOnInit(): void {
    Aos.init();
  }

  setView(view: 'grid' | 'list'): void {
    this.activeView = view;
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.trim();
    // You would typically trigger a new data fetch here
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    // You would typically trigger a new data fetch here
  }
}