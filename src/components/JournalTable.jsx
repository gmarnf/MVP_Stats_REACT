import React from "react";

export default function JournalTable({ journal }) {
  if (!journal.length) {
    return <p>Aucune entrée pour le moment.</p>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Heure</th>
          <th>Période</th>
          <th>Joueur</th>
          <th>Statistique</th>
          <th>Score</th>
          <th>Joueurs actifs</th>
        </tr>
      </thead>
      <tbody>
        {journal.map((entry, idx) => (
          <tr key={idx}>
            <td>{entry.heure}</td>
            <td>{entry.periode}</td>
            <td>{entry.joueur}</td>
            <td>{entry.statistique}</td>
            <td>{entry.score}</td>
            <td>{entry.joueursActifs}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
