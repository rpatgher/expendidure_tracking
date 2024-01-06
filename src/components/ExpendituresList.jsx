import Expenditure from "./Expenditure"

const ExpendituresList = ({expenditures, setEditExpenditure, removeExpenditure}) => {
    return (
        <div className="listado-gastos contenedor">
            <h2>{expenditures.length ? 'Expenditures' : 'There are no expenditures yet'}</h2>
            {expenditures.map(expenditure => (
                <Expenditure
                    key={expenditure.id}
                    expenditure={expenditure}
                    setEditExpenditure={setEditExpenditure}
                    removeExpenditure={removeExpenditure}
                />
            ))}
        </div>
    )
}

export default ExpendituresList
