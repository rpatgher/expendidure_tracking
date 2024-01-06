import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const BudgetTracker = ({expenditures, budget, setExpenditures, setBudget, setIsValidBudget}) => {
    const [percentage, setPercentage] = useState(0);
    const [available, setAvailable] = useState(0);
    const [spent, setSpent] = useState(0);

    
    useEffect(() => {
        const calculteAvailableSpent = () => {
            let totalSpent = expenditures.reduce( (total, expenditure) => (
                total + expenditure.amount
            ), 0);
                
            let newPercentage = ((totalSpent / budget) * 100).toFixed(2);
            setSpent(totalSpent);
            setAvailable(budget - totalSpent);
            setTimeout(() => {
                setPercentage(newPercentage);
            }, 700);
        };
        calculteAvailableSpent();
    }, [expenditures]);
        
    const handleResetApp = () => {
        const confirm = window.confirm('Are you sure you want to reset the app?');
        if(confirm){
            setExpenditures([]);
            setBudget(0);
            setIsValidBudget(false);
        }
    };
        
    const formatAmount = (amount) => {
        return amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        
        // Another way to do it:
        // return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(budget);
    }


    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textSize: '16px',
                        textColor: percentage > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    value={percentage}
                    text={`${percentage}% Spent`}
                />
            </div>

            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={handleResetApp}>
                    Reset App
                </button>
                <p>
                    <span>Budget: </span> {formatAmount(budget)}
                </p>
                <p className={available < 0 ? 'negativo' : ''}>
                    <span>Available: </span> {formatAmount(available)}
                </p>
                <p>
                    <span>Spent: </span> {formatAmount(spent)}
                </p>
            </div>

            
        </div>
    )
}

export default BudgetTracker
