// Systemserien der erfundenen Lumora Systeme AG (Testdaten).
export interface Serie {
  id: string;
  name: string;
  breiteMm: [number, number];
  hoeheMm: [number, number];
  maxFluegelKg: number;
  oeffnungen: Oeffnung[];
  glasKgProM2: number;
  rahmenKgProM: number;
}

export type Oeffnung = "dreh" | "drehkipp" | "kipp" | "fest" | "schiebe";

export const SERIEN: Serie[] = [
  { id: "s70", name: "Lumora 70", breiteMm: [400, 1600], hoeheMm: [400, 2400], maxFluegelKg: 130, oeffnungen: ["dreh", "drehkipp", "kipp", "fest"], glasKgProM2: 30, rahmenKgProM: 1.9 },
  { id: "s82", name: "Lumora 82 Plus", breiteMm: [400, 1700], hoeheMm: [400, 2600], maxFluegelKg: 160, oeffnungen: ["dreh", "drehkipp", "kipp", "fest"], glasKgProM2: 40, rahmenKgProM: 2.3 },
  { id: "hs", name: "Lumora Hebeschiebe", breiteMm: [1200, 3300], hoeheMm: [1000, 2800], maxFluegelKg: 300, oeffnungen: ["schiebe", "fest"], glasKgProM2: 40, rahmenKgProM: 3.1 },
];
