import NewBudget from "./NewBudget";
import BudgetTracker from "./BudgetTracker";

const Header = ({budget, setBudget, isValidBudget, setIsValidBudget, expenditures, setExpenditures}) => {
    
    
    return (
      <header>
          <h1>Expediture Tracking</h1>
          { isValidBudget ? (
              <BudgetTracker 
                budget={budget}
                expenditures={expenditures}
                setExpenditures={setExpenditures}
                setBudget={setBudget}
                setIsValidBudget={setIsValidBudget}
              />
          ):  <NewBudget
                budget={budget}
                setBudget={setBudget}
                setIsValidBudget={setIsValidBudget}
              />
          }
      </header>
    )
  }
  
  export default Header
  