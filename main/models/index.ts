import { getDateId } from "../util/date";

export interface Recipe {
  post_no: number;
  user_id: string;
  upload_date: Date;
  title: string;
  desc: string;
  category: string;
  qtt: number; // 양
  duration: string;
  igr_array: Food[]; // 음식 객체의 배열
  steps: Step[];
  hit: number;
}

export interface Step {
  image_url: string;
  desc: string;
  image_data: string; // 실제 이미지 데이터 - base64기반 => decode해서 fileSystem에 저장하는 로직 필요.
}

export interface Food {}

export interface ImageFile {
  fieldName: string;
  originalFilename: string;
  path: string;
  headers: Object;
  size: number;
}

export class Diary {
  user_id: number;
  upload_date: string;
  reviews: [];
  meals: Array<{
    foods: any[];
    calories: number;
    fat: number;
    protein: number;
    carbs: number;
    image: File | null;
    imageBuffer: string | null;
    written: boolean;
  }>;
  total: {
    calories: number;
    fat: number;
    protein: number;
    carbs: number;
  };

  constructor(userId: number) {
    this.user_id = userId;
    this.upload_date = getDateId(new Date());
    this.reviews = [];
    this.meals = [
      {
        foods: [],
        calories: 0,
        fat: 0,
        protein: 0,
        carbs: 0,
        image: null,
        imageBuffer: null,
        written: false,
      },
      {
        foods: [],
        calories: 0,
        fat: 0,
        protein: 0,
        carbs: 0,
        image: null,
        imageBuffer: null,
        written: false,
      },

      {
        foods: [],
        calories: 0,
        fat: 0,
        protein: 0,
        carbs: 0,
        image: null,
        imageBuffer: null,
        written: false,
      },

      {
        foods: [],
        calories: 0,
        fat: 0,
        protein: 0,
        carbs: 0,
        image: null,
        imageBuffer: null,
        written: false,
      },
    ];
    this.total = {
      calories: 0,
      fat: 0,
      protein: 0,
      carbs: 0,
    };
  }
}
export interface Ingredient {
  food_id: number;
  quantity: number;
}
