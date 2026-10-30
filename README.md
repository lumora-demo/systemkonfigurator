# Systemkonfigurator

> Demo: Die Lumora Systeme AG ist erfunden. Alle Namen, Daten und Zahlen sind Testdaten.

Verarbeiter stellen Fenster und Türen aus den Lumora-Systemserien zusammen. Der Regelkern prüft, ob Maße, Öffnungsart und Beschlag zur Serie passen, und berechnet das Flügelgewicht; der Preisdienst rechnet den Listenpreis.

| | |
|---|---|
| **Set** | Digitale Produkte |
| **Betreut von** | Team Planung & Fertigung |
| **Genutzt von** | Verarbeiter, Anwendungstechnik, Vertrieb |
| **Technik** | Regelkern TypeScript (`regeln/`) · Preisdienst C# .NET 8 (`preisdienst/`) |
| **Betrieb (Zielbild)** | AWS Frankfurt: Regelkern im Browser und als Lambda, Preisdienst auf ECS Fargate |
| **Schnittstellen** | Produktdaten-API, Preis- und Rabattdienst, Statik-Rechner |

## Regelkern prüfen

```
cd regeln
npm test
```
