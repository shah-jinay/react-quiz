export function NextButton({dispatch, answer, index, numQuestions}){
    if (answer === null) return null;

    if(index < numQuestions - 1 ) return (
        <div>
            <button className="start-button" onClick={() => dispatch({type: "nextQuestion"})}>Next</button>
        </div>
    )
    if(index === numQuestions - 1 ) return (
        <div>
            <button className="start-button" onClick={() => dispatch({type: "finish"})}>Next</button>
        </div>
    )
}