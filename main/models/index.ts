import { getDateId, returnIdToDate } from "../util/date";

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

export class Meal {
  foods: any[];
  calories: number;
  fat: number;
  protein: number;
  carbs: number;
  image: File | null;
  imageBuffer: string | null;
  written: boolean;

  constructor() {
    this.foods = [];
    this.calories = 0;
    this.fat = 0;
    this.protein = 0;
    this.carbs = 0;
    this.image = null;
    this.imageBuffer = null;
    this.written = false;
  }
}

export class Diary {
  user_id: number;
  upload_date: string;
  reviews: [];
  meals: Array<Meal>;
  total: {
    calories: number;
    fat: number;
    protein: number;
    carbs: number;
  };
  date: Date;

  constructor(userId: number, uploadDate?: string) {
    this.user_id = userId;
    this.upload_date = uploadDate || getDateId(new Date());
    this.date = returnIdToDate(this.upload_date);
    this.reviews = [];
    this.meals = [new Meal(), new Meal(), new Meal(), new Meal()];
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

export type LiveData = {
  name: string;
  message: string;
  date?: Date;
};

export class UserBmr {
  gender: string;
  heightFeet: number | "";
  weight: number | "";
  age: number | "";
  bmr: number | "";
  activity: number | "";
  error: string;
  flag: boolean;
  system: string;

  constructor() {
    this.gender = "1";
    this.weight = "";
    this.age = "";
    this.activity = "";
    this.error = "";
    this.flag = false;
    this.system = "";
    this.heightFeet = "";
    this.bmr = "";
  }
}
