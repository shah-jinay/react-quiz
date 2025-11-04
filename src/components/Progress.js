export function Progress({numQuestions, index, points, maxPossiblePoints}){
    return (
        <header className="progress">
            <progress max={numQuestions} value={index}></progress>
            <div className="progress-info">
                <p style={{alignItems: "left"}}>Questions <strong>{index}</strong> / {numQuestions}</p>
                <p >Points: <strong>{points}</strong> / {maxPossiblePoints}</p>
            </div>
        </header>
    )
}