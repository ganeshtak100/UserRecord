export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface UserFormData {
  name: string;
  email: string;
  phone: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
  loadingText?: string;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
}
