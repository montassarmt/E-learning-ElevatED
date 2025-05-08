import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { 
  NgbDropdownModule, 
  NgbProgressbarModule, 
  NgbTooltipModule,
  NgbPaginationModule 
} from '@ng-bootstrap/ng-bootstrap';
import Aos from 'aos';
import { UserService } from '../../../../../UserFrontEnd/service/user.service';

interface User {
  id: number;
  username: string;
  email: string;
  location: string;
  payments: number;
  total_courses: number;
  progress: number;
  join_date: string;
  roles: {
    id: number;
    name: string;
  }[];
}

@Component({
  selector: 'grid-card',
  standalone: true,
  imports: [
    CommonModule,
    DecimalPipe,
    NgbProgressbarModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbPaginationModule
  ],
  templateUrl: './grid-card.component.html',
  
})
export class GridCardComponent implements OnInit {
  @Input() searchTerm: string = '';
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 8;
  @Output() viewUser = new EventEmitter<number>();
  @Output() editUser = new EventEmitter<number>();
  @Output() deleteUser = new EventEmitter<number>();

  users: User[] = [];
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
        this.users = data.map(user => ({
          id: user.id,
          username: user.username,
          email: user.email,
          location: user.location || 'Unknown',
          payments: user.payments || 0,
          total_courses: user.total_courses || 0,
          progress: user.progress || 0,
          join_date: user.join_date || new Date().toLocaleDateString(),
          roles: user.roles || []
        }));
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
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }
}