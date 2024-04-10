export interface UserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  support?: ResponseSupport;
  data: UserDataResponse[];
}

export interface UserDataResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ResponseSupport {
  text: string;
  url: string;
}
