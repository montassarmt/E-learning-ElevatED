import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../../UserFrontEnd/service/user.service';
import Aos from 'aos';

interface User {
  id: number;
  username: string;
  email: string;
  roles: {
    id: number;
    name: string;
  }[];
}

@Component({
  selector: 'list-card',
  standalone: true,
  imports: [
    CommonModule,
    DecimalPipe,
    NgbTooltipModule,
    NgbPaginationModule
  ],
  templateUrl: './list-card.component.html',

})
export class ListCardComponent implements OnInit {
  users: User[] = [];
  page = 1;
  pageSize = 8;
  collectionSize = 0;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    Aos.init();
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.collectionSize = this.users.length;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.errorMessage = 'Failed to load user data';
        this.isLoading = false;
      }
    });
  }

  getRoleNames(roles: any[]): string {
    return roles.length > 0 
      ? roles.map(role => role.name).join(', ') 
      : 'No role assigned';
  }

  get paginatedUsers(): User[] {
    return this.users.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }
}