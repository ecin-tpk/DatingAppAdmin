interface PaginationParams {
  pageNumber: number;
  pageSize: number;
}

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface MessageParams extends PaginationParams {
  messageContainer: 'any' | 'inbox' | 'outbox' | 'unread';
}

export interface UserParamsTest extends PaginationParams {
  orderBy: '' | 'name' | 'gender' | 'age' | 'email' | 'phone' | 'verification';
  verification: '' | 'verified' | 'unverified';
  name: string;
  gender: '' | 'male' | 'female';
  status: 'active' | 'disabled' | 'deleted';
}
