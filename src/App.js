import {  useEffect, useReducer } from "react";
import { Main } from "./components/Main";
import { Header } from "./components/Header";
import { Loading } from "./components/Loading";
import { Error } from "./components/Error";
import { StartScreen } from "./components/StartScreen";
import {NextButton } from "./components/NextButton";
import { Questions } from "./components/Questions";
import { Progress } from "./components/Progress";
import { Finished } from "./components/Finished";
const intialState ={
  questions: [],
  //'loading', 'error', 'ready', 'active', 'finished
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
};

function recuder(state, action){
  switch(action.type){
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
      case "dataFailed":
        return {
          ...state,
          status: "error",
        };
      case "start":
        return {
          ...state, status: "active"
        }
        case "newAnswer":
          const question = state.questions.at(state.index);
          return {
            ...state,
            answer: action.payload,
            points: action.payload === question.correctOption ? state.points + question.points: state.points,
          }
        case "nextQuestion":
          return {
            ...state, index: state.index + 1, answer: null
          }
        case "finish":
          return {
            ...state, status: "finished"
          }
        case "restart":
          return {
            ...intialState, questions: state.questions, status: "ready" 
        }
      default:
          throw new Error("Action Unkmown");
  }
}

function App() {
  // const [loading,setLoading] = useState(false)
  // const [err,setErr] = useState("")

  const [{questions, status, index, answer, points}, dispatch] = useReducer(recuder, intialState)
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points,0);
  useEffect(function () {
      fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({type: 'dataReceived', payload: data}))
      .catch((err) => dispatch({type: "dataFailed"}))
  },[])

//   useEffect(() => {
//     const controller = new AbortController()
//     async function getData(){
//       try{
//         setLoading(true)
//         setErr("")
//         const res = await fetch(`http://localhost:8000/questions`,{singal: controller.signal})
//         if(!res.ok) throw new Error("something went wtong")
//         const data = await res.json()
//         console.log(data)
//       }catch(e){
//         setErr(e.message || "Failed to Fetch")
//       }finally{
//         setLoading(false)
//       }
//     }
//     getData()
//     return () => controller.abort()
// },[])

  return (
    <div className="app">
    <Header/>
    <Main>
      {status === 'loading' && <Loading />}
      {status === 'error' && <Error />}
      {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
      
      {status === 'active' && (<div className="question-card">
      <Progress index={index}  numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints}/>
      <Questions questions={questions[index]} dispatch={dispatch} answer={answer}/> <NextButton dispatch={dispatch} answer={answer} numQuestions={numQuestions} index={index}/></div>)}
      {status === 'finished' && <Finished dispatch={dispatch} points={points} maxPossiblePoints={maxPossiblePoints}/>}
    </Main>
    </div>
  );
}

export default App;
