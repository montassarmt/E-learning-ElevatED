export interface Feedback {
    feedbackId?: number; // Optionnel pour la création
    comments: string;
    rating: number;
    feedbackType: 'TEXT' | 'AUDIO';
    audioFilePath?: string; // Optionnel si feedbackType est TEXT
    userId: number;
    user?: {
        name: string;
      };
      timestamp?: string; // Add this if your backend returns it // ID de l'utilisateur associé
  }
  export interface PaginatedResponse<T> {
    content: T[];
    pageable: {
      pageNumber: number;
      pageSize: number;
    };
    totalElements: number;
    totalPages: number;
    last: boolean;
  }