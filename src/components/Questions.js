import { Options } from "./Options"
export function Questions({questions, dispatch, answer}){

    return (
        <div className="question-card">
        
            <h4>{questions.question}</h4>
            <Options questions={questions} dispatch={dispatch} answer={answer}/>
        </div>
    )
}