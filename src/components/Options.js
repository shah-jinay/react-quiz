export function Options({questions, dispatch, answer}){
    const hasAnswered = answer !== null;
    return (
        <div >
            {questions.options.map(((option, index) => <button key={option} className={`btn-options ${index === answer ? 
                "answer": ""} ${
                    hasAnswered ?
                    index === questions.correctOption ? "correct": "wrong": ""}`} 
                    onClick={()=> dispatch({type: "newAnswer", payload: index})}
                    disabled={hasAnswered}>
                        {option}</button>))}
        </div>
    )
}