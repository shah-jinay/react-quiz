export function Finished({ dispatch, points, maxPossiblePoints }) {
  const pct = maxPossiblePoints > 0 ? (points / maxPossiblePoints) * 100 : 0;

  // pick a band for styling
  const band =
    pct >= 90 ? "is-excellent" :
    pct >= 75 ? "is-good" :
    pct >= 50 ? "is-ok" :
                "is-poor";

  return (
    <div className={`final-score ${band}`} style={{"--pct": `${pct.toFixed(2)}%`}}>
      <div className="final-score__title">Final score</div>
      <div className="final-score__value">
        {points} / {maxPossiblePoints}
      </div>
      <div className="final-score__subtitle">
        {pct.toFixed(2)}%
        {" · "}
        <span className="final-score__badge">
          {band.replace("is-","").toUpperCase()}
        </span>
      </div>

      <div className="final-score__meter">
        <div className="final-score__meter-fill" />
      </div>
      <button className="start-button" onClick={() => dispatch({type: "restart"})}>Restart Quiz</button>
    </div>
  );
}
