import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import { formatDate } from '../helpers/index';

import SavingIcon from '../img/icono_ahorro.svg';
import FoodIcon from '../img/icono_comida.svg';
import HousingIcon from '../img/icono_casa.svg';
import GeneralIcon from '../img/icono_gastos.svg';
import EntretainmentIcon from '../img/icono_ocio.svg';
import HealthIcon from '../img/icono_salud.svg';
import BillsIcon from '../img/icono_suscripciones.svg';
// import OthersIcon from '../img/icono_ahorro.svg';

const icons = {
    saving: SavingIcon,
    food: FoodIcon,
    housing: HousingIcon,
    general: GeneralIcon,
    entertainment: EntretainmentIcon,
    health: HealthIcon,
    bills: BillsIcon
}

const Expenditure = ({expenditure, setEditExpenditure, removeExpenditure}) => {

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setEditExpenditure(expenditure)}>
                Edit
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => removeExpenditure(expenditure.id)} destructive={true} >
                Delete
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <div className="icono">
                            <img 
                                src={icons[expenditure.category]} 
                                alt={expenditure.category}
                            />
                        </div>
                        <div className="descripcion-gasto">
                            <p className="categoria">{expenditure.category}</p>
                            <p className="nombre-gasto">{expenditure.name}</p>
                            <p className="fecha-gasto">Added: <span>{formatDate(expenditure.date)}</span></p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">${expenditure.amount}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Expenditure
