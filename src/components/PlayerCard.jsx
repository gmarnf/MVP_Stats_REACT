import React from "react";

export default function PlayerCard({ player, onStat }) {
  const { numero, nom, t2, t3, lf, reb, pd, fautes } = player;

  return (
    <div className="player-card">
      <div className="player-top">
        <h3>#{numero} — {nom}</h3>
      </div>

      <div className="stat-grid">
        <div className="stat"><div className="label">2 pts</div><div className="value">{t2}</div></div>
        <div className="stat"><div className="label">3 pts</div><div className="value">{t3}</div></div>
        <div className="stat"><div className="label">LF</div><div className="value">{lf}</div></div>
        <div className="stat"><div className="label">REB</div><div className="value">{reb}</div></div>
        <div className="stat"><div className="label">PD</div><div className="value">{pd}</div></div>
        <div className="stat"><div className="label">Fautes</div><div className="value">{fautes}</div></div>
      </div>

      <div className="btns">
        <button className="btn-success" onClick={() => onStat(numero, "2pts")}>+1 tir 2 pts</button>
        <button className="btn-success" onClick={() => onStat(numero, "3pts")}>+1 tir 3 pts</button>
        <button onClick={() => onStat(numero, "lf")}>+1 LF</button>
        <button onClick={() => onStat(numero, "reb")}>+1 REB</button>
        <button onClick={() => onStat(numero, "pd")}>+1 PD</button>
        <button className="btn-danger" onClick={() => onStat(numero, "faute")}>+1 Faute</button>
      </div>
    </div>
  );
}
