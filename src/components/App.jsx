import React, { useMemo, useState } from "react";
import PlayerCard from "./components/PlayerCard.jsx";
import JournalTable from "./components/JournalTable.jsx";

function parseActifs(text) {
  return text.split("-").map(v => parseInt(v, 10)).filter(n => !Number.isNaN(n)).slice(0, 5);
}

function nowTime() {
  return new Date().toLocaleTimeString("fr-FR", { hour12: false });
}

export default function App() {
  const [periode, setPeriode] = useState("Q1");
  const [score, setScore] = useState("00-00");
  const [actifsText, setActifsText] = useState("4-7-9-11-15");
  const actifs = useMemo(() => parseActifs(actifsText), [actifsText]);

  const [players, setPlayers] = useState([
    { numero: 4, nom: "Joueur 4", t2: 0, t3: 0, lf: 0, reb: 0, pd: 0, fautes: 0 },
    { numero: 7, nom: "Joueur 7", t2: 0, t3: 0, lf: 0, reb: 0, pd: 0, fautes: 0 },
    { numero: 9, nom: "Joueur 9", t2: 0, t3: 0, lf: 0, reb: 0, pd: 0, fautes: 0 },
  ]);

  const [journal, setJournal] = useState([]);

  function ajouterLog(periode, joueur, statistique, score, joueursActifs) {
    const entree = {
      heure: nowTime(),
      periode,
      joueur,
      statistique,
      score,
      joueursActifs: joueursActifs.join("-"),
    };
    setJournal(prev => [...prev, entree]);
  }

  function onStat(numero, type) {
    setPlayers(prev => prev.map(p => {
      if (p.numero !== numero) return p;
      const up = { ...p };
      if (type === "2pts") up.t2 += 1;
      else if (type === "3pts") up.t3 += 1;
      else if (type === "lf") up.lf += 1;
      else if (type === "reb") up.reb += 1;
      else if (type === "pd") up.pd += 1;
      else if (type === "faute") up.fautes += 1;
      return up;
    }));

    if (actifs.length === 5) {
      const label =
        type === "2pts" ? "tir 2pts réussi" :
        type === "3pts" ? "tir 3pts réussi" :
        type === "lf" ? "lancer franc réussi" :
        type === "reb" ? "rebond" :
        type === "pd" ? "passe décisive" :
        "faute";
      ajouterLog(periode, numero, label, score, actifs);
    }
  }

  function exporterCSV() {
    let csv = "Heure;Période;Joueur;Statistique;Score;Joueurs actifs\n";
    journal.forEach(entry => {
      csv += `${entry.heure};${entry.periode};${entry.joueur};${entry.statistique};${entry.score};${entry.joueursActifs}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "journal_stats.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <header>
        <h1>MVP Stats Basket (React)</h1>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button onClick={exporterCSV}>Exporter le journal en CSV</button>
        </div>
      </header>

      <main>
        <section className="section">
          <h2>Paramètres match</h2>
          <div className="input-row">
            <label>
              Période
              <select value={periode} onChange={e => setPeriode(e.target.value)}>
                <option value="Q1">Q1</option>
                <option value="Q2">Q2</option>
                <option value="Q3">Q3</option>
                <option value="Q4">Q4</option>
                <option value="OT">OT</option>
              </select>
            </label>
            <label>
              Score (ex: 45-42)
              <input value={score} onChange={e => setScore(e.target.value)} placeholder="00-00" />
            </label>
            <label>
              Joueurs actifs (5 numéros séparés par -)
              <input value={actifsText} onChange={e => setActifsText(e.target.value)} placeholder="4-7-9-11-15" />
            </label>
          </div>
        </section>

        <section className="section">
          <h2>Prise de statistiques</h2>
          <div className="grid">
            {players.map(p => (
              <PlayerCard key={p.numero} player={p} onStat={onStat} />
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Journal des statistiques (HTML)</h2>
          <JournalTable journal={journal} />
        </section>
      </main>

      <footer>
        <small>© MVP Stats</small>
      </footer>
    </>
  );
}
