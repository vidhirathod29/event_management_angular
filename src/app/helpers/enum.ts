export interface Category {
    id: number;
    category_name: string;
    category_description: string | null;
    user: {
      name: string;
    };
  }
  
export  interface Data {
    code: number;
    data: {
      totalCount: number;
      totalPages: number;
      currentPage: number;
      nextPage: number;
      data: Category[];
    };
    status: string;
  }
  