export const herbalPlants = [
  {
    name: "Temulawak",
    compounds: ["Kurkumin", "Xanthorrhizol", "Germakron"],
    benefits: ["Anti-inflamasi", "Hepatoprotektif"],
    interactions: [
      { drug: "Warfarin", safe: false, note: "Meningkatkan risiko pendarahan" },
      { drug: "Antasida", safe: true, note: "Aman dikombinasi" }
    ]
  },
];