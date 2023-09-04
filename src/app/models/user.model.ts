export interface User {
  id: number;
  avatar?: string;
  firstName: string;
  lastName: string;
  email: string;
  updatedAt?: string;
}

export interface UserCellsParams<T = any> {
  onDelete: (entity: T) => void;
}
