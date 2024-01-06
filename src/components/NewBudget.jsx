import { useState } from 'react';

import Message from './Message';

const NewBudget = ({budget, setBudget, setIsValidBudget}) => {

    const [message, setMessage] = useState('');

    const handleBudget = (e) => {
        e.preventDefault();
        if(!Number(budget) || Number(budget) < 0){
            setMessage('Budget must be a number and greater than 0');
            return;
        }
        setMessage('');
        setBudget(Number(budget));
        setIsValidBudget(true);
    }


    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form
                className="formulario"
                onSubmit={handleBudget}
            >
                <div className="campo">
                    <label>Define Budget</label>
                    <input
                        type="text"
                        className="nuevo-presupuesto"
                        placeholder="Type your budget"
                        value={budget}
                        onChange={e => setBudget(e.target.value)}
                    />
                </div>
                <input type="submit" value="Add"/>
                {message && <Message type="error">{message}</Message>}
            </form>
        </div>
    )
}

export default NewBudget
