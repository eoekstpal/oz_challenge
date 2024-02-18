import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";

const App = () => {

const [expenses, setExpenses] = useState([
  {id: 1, charge: '콜라', amount: 2000},
  {id: 2, charge: '빵', amount: 1000},
  {id: 3, charge: '맥북', amount: 5000}
])

const [charge, setCharge] = useState("");
const [amount, setAmount] = useState();

const [alert, setAlert] = useState({show: false});

const handleCharge = (e) => {
  setCharge(e.target.value)
}

const handleAmount = (e) => {
  setAmount(e.target.valueAsNumber)
}

const handleDelete = (id) => {
  const newExpense = expenses.filter(expense => expense.id !== id)
  setExpenses(newExpense)
  handleAlert({type: "danger", text: "아이템이 삭제되었습니다."});
}

const handleSubmit = (e) => {
  e.preventDefault();
  if(charge !=="" && amount > 0) {
    const newExpense = {id: crypto.randomUUID(), charge, amount}

    const newExpenses = [...expenses, newExpense];
    setExpenses(newExpenses);
    setCharge("");
    setAmount("");
    handleAlert({type: "success", text: "아이템이 생성되었습니다."})
  } else{
    console.error('error')
    handleAlert({type: "danger", text: "charge는 빈 값일 수 없으며 amount의 값은 0보다 커야 합니다."})
  }
}

const handleAlert = ({type, text}) => {
  setAlert({show: true, type, text});
  setTimeout(() => {
    setAlert({show: false});
  }, 3000);
};

    return(
      <main className="main-container">
        <div className="sub-container">
          {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
          <h1>장바구니</h1>
          <div style={{width: '100%', backgroundColor: 'white', padding: '1rem'}}>
            {/*Expends form*/}
            <ExpenseForm charge={charge} handleSubmit={handleSubmit} handleCharge={handleCharge} amount={amount} handleAmount={handleAmount} />
          </div>

          <div style={{width: '100%', backgroundColor: 'white', padding: '1rem'}}>
            {/*Expends list*/}
            <ExpenseList initialExpenses={expenses} handleDelete={handleDelete} />
          </div>
          <div style={{display: 'flex', justifyContent: 'start', marginTop: '1rem'}}>
            <p style={{fontSize: '2rem'}}>
              총합계:
            </p>
          </div>
        </div>
      </main>
    )
}
export default App;