export interface UserType {
    user_id: string;
    user_age: string; 
    user_gender: string;
    user_race: string | null; 
  }

  export interface User  {
    id: string;
    gender: string;
    age: Number;
    race: string;
    // Add any other user attributes as needed
  }