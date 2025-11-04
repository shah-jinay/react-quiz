export function StartScreen({numQuestions, dispatch}){
    return (
        <div className="app-startscreen">
            <h2>
                Welcome to React Quiz!
            </h2>
            <h3>{numQuestions} question to test your React mastery</h3>
            <button className="start-button" onClick={() => dispatch({type: "start"})}>Let's Start</button>
        </div>
    )
}