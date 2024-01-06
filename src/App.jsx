import { useState, useEffect } from 'react'

import Header from './components/Header';

import newExpenditureIcon from './img/nuevo-gasto.svg';
import Modal from './components/Modal';
import Filter from './components/Filter';
import ExpendituresList from './components/ExpendituresList';

function App() {
  const [budget, setBudget] = useState(Number(localStorage.getItem('budget')) ?? 0);
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [expenditures, setExpenditures] = useState(localStorage.getItem('expenditures') ? JSON.parse(localStorage.getItem('expenditures')) : []);

  const [editExpenditure, setEditExpenditure] = useState({});

  const [filter, setFilter] = useState('');
  const [filteredExpenditures, setFilteredExpenditures] = useState([]);

  useEffect(() => {
    if(Object.keys(editExpenditure).length > 0){
      handleNewExpenditure();
    }
  }, [editExpenditure]);

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('expenditures', JSON.stringify(expenditures) ?? []);
  }, [expenditures]);

  useEffect(() => {
    const oldBudget = Number(localStorage.getItem('budget')) ?? 0;
    if(oldBudget > 0){
      setIsValidBudget(true);
    } else {
      setIsValidBudget(false);
    }
  }, []);

  useEffect(() => {
    if(filter){
      const filteredExpenditures = expenditures.filter(expenditure => expenditure.category === filter);
      setFilteredExpenditures(filteredExpenditures);
    }
  }, [filter]);


  const handleNewExpenditure = () => {
    setModal(true);
    setTimeout(() => {
      setAnimateModal(true);
    }, 300);
  }

  const saveExpenditure = (expenditure) => {
    setExpenditures([
      ...expenditures,
      expenditure
    ]);
  };

  const removeExpenditure = (id) => {
    const updatedExpenditures = expenditures.filter(expenditure => expenditure.id !== id);
    setExpenditures(updatedExpenditures);
  };

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        budget={budget}
        expenditures={expenditures}
        setBudget={setBudget}
        setExpenditures={setExpenditures}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />

      {isValidBudget && (
        <>
          <main>
            <Filter
              filter={filter}
              setFilter={setFilter}
            />
            <ExpendituresList
              expenditures={filter ? filteredExpenditures : expenditures}
              budget={budget}
              setEditExpenditure={setEditExpenditure}
              removeExpenditure={removeExpenditure}
            />
          </main>
          <div className="nuevo-gasto">
            <img 
              src={newExpenditureIcon}
              alt="New Expenditure"
              onClick={handleNewExpenditure}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveExpenditure={saveExpenditure}
          editExpenditure={editExpenditure}
          setEditExpenditure={setEditExpenditure}
          expenditures={expenditures}
          setExpenditures={setExpenditures}
        />
      )}
    </div>
  )
}

export default App
