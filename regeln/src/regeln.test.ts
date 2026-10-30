import assert from "node:assert/strict";
import { test } from "node:test";
import { pruefe } from "./regeln.ts";

test("Übliches Drehkipp-Fenster in Lumora 70 ist gültig", () => {
  const e = pruefe({ serieId: "s70", breiteMm: 1230, hoeheMm: 1480, oeffnung: "drehkipp" });
  assert.equal(e.ok, true);
  assert.ok(e.fluegelKg > 50 && e.fluegelKg < 80);
});

test("Zu breit und falsche Öffnung werden am Feld gemeldet", () => {
  const e = pruefe({ serieId: "s70", breiteMm: 1900, hoeheMm: 1200, oeffnung: "schiebe" });
  assert.equal(e.ok, false);
  assert.deepEqual(e.hinweise.map((h) => h.feld).sort(), ["breiteMm", "oeffnung"]);
});

test("Zu schwerer Flügel wird erkannt, Festverglasung nicht", () => {
  assert.equal(pruefe({ serieId: "s70", breiteMm: 1600, hoeheMm: 2400, oeffnung: "dreh" }).ok, false);
  assert.equal(pruefe({ serieId: "s70", breiteMm: 1600, hoeheMm: 2400, oeffnung: "fest" }).ok, true);
});
