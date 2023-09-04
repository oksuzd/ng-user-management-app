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
  url: string
}

export  interface ColorsCardsResponse{
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  support?: ResponseSupport;
  data: ColorCardDataResponse[];

}

export interface ColorCardDataResponse {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}
