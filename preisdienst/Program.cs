// Preisdienst: Listenpreis einer Konfiguration (Testpreise der erfundenen Lumora Systeme AG).
// Zielbild: ECS Fargate auf AWS, Region Frankfurt; Rabatte kommen aus dem Preis- und Rabattdienst.
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var grundpreisProM2 = new Dictionary<string, decimal> { ["s70"] = 310m, ["s82"] = 365m, ["hs"] = 540m };
var zuschlag = new Dictionary<string, decimal> { ["dreh"] = 85m, ["drehkipp"] = 120m, ["kipp"] = 60m, ["fest"] = 0m, ["schiebe"] = 680m };

app.MapGet("/api/gesund", () => Results.Ok(new { ok = true }));

app.MapPost("/api/preis", (Anfrage a) =>
{
    if (!grundpreisProM2.TryGetValue(a.SerieId, out var proM2)) return Results.BadRequest(new { fehler = "Serie unbekannt" });
    var flaeche = a.BreiteMm / 1000m * (a.HoeheMm / 1000m);
    var preis = Math.Round(flaeche * proM2 + zuschlag.GetValueOrDefault(a.Oeffnung), 2);
    return Results.Ok(new Antwort(a.SerieId, flaeche, preis, "EUR", "Testpreis"));
});

app.Run();

record Anfrage(string SerieId, decimal BreiteMm, decimal HoeheMm, string Oeffnung);
record Antwort(string SerieId, decimal FlaecheM2, decimal Listenpreis, string Waehrung, string Hinweis);
