import { SERIEN, type Oeffnung, type Serie } from "./serien.ts";

// Regelkern: prüft eine Konfiguration gegen die Grenzen der Serie. Gibt Hinweise statt Ausnahmen zurück,
// damit die Oberfläche sie am Feld zeigen kann.

export interface Konfiguration {
  serieId: string;
  breiteMm: number;
  hoeheMm: number;
  oeffnung: Oeffnung;
}

export interface Ergebnis {
  ok: boolean;
  fluegelKg: number;
  hinweise: { feld: keyof Konfiguration; text: string }[];
}

export function fluegelgewicht(serie: Serie, breiteMm: number, hoeheMm: number): number {
  const flaecheM2 = (breiteMm / 1000) * (hoeheMm / 1000);
  const umfangM = (2 * (breiteMm + hoeheMm)) / 1000;
  return Math.round((flaecheM2 * serie.glasKgProM2 + umfangM * serie.rahmenKgProM) * 10) / 10;
}

export function pruefe(k: Konfiguration): Ergebnis {
  const serie = SERIEN.find((s) => s.id === k.serieId);
  if (!serie) return { ok: false, fluegelKg: 0, hinweise: [{ feld: "serieId", text: "Diese Serie gibt es nicht." }] };
  const hinweise: Ergebnis["hinweise"] = [];
  const [bMin, bMax] = serie.breiteMm;
  const [hMin, hMax] = serie.hoeheMm;
  if (k.breiteMm < bMin || k.breiteMm > bMax) hinweise.push({ feld: "breiteMm", text: `Breite ${bMin}–${bMax} mm in ${serie.name}.` });
  if (k.hoeheMm < hMin || k.hoeheMm > hMax) hinweise.push({ feld: "hoeheMm", text: `Höhe ${hMin}–${hMax} mm in ${serie.name}.` });
  if (!serie.oeffnungen.includes(k.oeffnung)) hinweise.push({ feld: "oeffnung", text: `${serie.name} gibt es nicht als ${k.oeffnung}.` });
  const fluegelKg = fluegelgewicht(serie, k.breiteMm, k.hoeheMm);
  if (k.oeffnung !== "fest" && fluegelKg > serie.maxFluegelKg) {
    hinweise.push({ feld: "breiteMm", text: `Flügel zu schwer (${fluegelKg} kg, höchstens ${serie.maxFluegelKg} kg).` });
  }
  return { ok: hinweise.length === 0, fluegelKg, hinweise };
}
