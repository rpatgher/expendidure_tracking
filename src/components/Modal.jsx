import { useState, useEffect } from 'react';

import Message from './Message';
import closeBtn from '../img/cerrar.svg';
import { generateId } from '../helpers'; '../helpers/index';

const Modal = ({ setModal, animateModal, setAnimateModal, saveExpenditure, editExpenditure, setEditExpenditure, expenditures, setExpenditures }) => {

    const [expenditure, setExpenditure] = useState({
        name: '',
        amount: 0,
        category: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(Object.keys(editExpenditure).length > 0){
            setExpenditure(editExpenditure);
        }
    }, []);

    const handleCloseModal = () => {
        setAnimateModal(false);
        setEditExpenditure({
            name: '',
            amount: 0,
            category: ''
        });
        setTimeout(() => {
            setModal(false);
        }, 300);
    }

    const handleChange = e => {
        setExpenditure({
            ...expenditure,
            [e.target.name]: (e.target.type === 'number' ) ? Number(e.target.value) : e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const allFieldsFilled = Object.values(expenditure).includes('');
        if(allFieldsFilled){
            setMessage('All fields are required');
            setTimeout(() => {
                setMessage('');
            }, 3000);
            return;
        }
        if(expenditure.id){
            const updatedExpenditures = expenditures.map(expenditureState => expenditureState.id === editExpenditure.id ? expenditure : expenditureState);
            setExpenditures(updatedExpenditures);
            setEditExpenditure({});
        }else{
            const expenditureObj = {
                ...expenditure,
                id: generateId(),
                date: Date.now()
            }
            saveExpenditure(expenditureObj);
        }

        // Reset form
        setExpenditure({
            name: '',
            amount: 0,
            category: ''
        });
        handleCloseModal();
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={closeBtn}
                    alt="Close Modal"
                    onClick={handleCloseModal}
                />
            </div>

            <form
                onSubmit={ handleSubmit }
                className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}
            >
                <legend>{expenditure.id ? 'Edit Expenditure' : 'New Expenditure'}</legend>
                {message && <Message type="error">{message}</Message>}
                <div className="campo">
                    <label htmlFor="name">Expenditure Name</label>
                    <input 
                        type="text"
                        id='name'
                        name='name'
                        placeholder='Type the expenditure name'
                        value={expenditure.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="amount">Amount</label>
                    <input 
                        type="number"
                        id='amount'
                        name='amount'
                        placeholder='Type the expenditure amount: e.g. 300'
                        value={expenditure.amount}
                        onChange={handleChange}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" value={expenditure.category}  onChange={handleChange}>
                        <option value="">-- Select Category --</option>
                        <option value="saving">Saving</option>
                        <option value="food">Food</option>
                        <option value="housing">Housing</option>
                        <option value="general">General</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="health">Health</option>
                        <option value="bills">Bills</option>
                    </select>
                </div>

                <input type="submit" value={expenditure.id ? 'Save Changes' : 'Add Expenditure'}  />
            </form>
        </div>
    )
}

export default Modal;
