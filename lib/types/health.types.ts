export interface DiseaseRisk {
  name: string;
  riskLevel: "low" | "medium" | "high";
  percentage: number;
  factors: string[];
}

export interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  vitamins: Record<string, number>;
}

export interface MedAlarm {
  id: string;
  disease: string;
  medicineName: string;
  dosage: string;
  times: string[]; // ["08:00", "20:00"]
  notes: string;
}