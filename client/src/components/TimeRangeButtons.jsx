import { StyledRangeButtons } from '../styles';

const TimeRangeButtons = ({ activeRange, setActiveRange }) => {
  return (
    <StyledRangeButtons>
      <li>
        <button
          className={activeRange === 'short' ? 'active' : ''}
          onClick={() => setActiveRange('short')}
        >
          Nesse mês
        </button>
      </li>
      <li>
        <button
          className={activeRange === 'medium' ? 'active' : ''}
          onClick={() => setActiveRange('medium')}
        >
          Últimos 6 meses
        </button>
      </li>
      <li>
        <button
          className={activeRange === 'long' ? 'active' : ''}
          onClick={() => setActiveRange('long')}
        >
          Todos os tempos
        </button>
      </li>
    </StyledRangeButtons>
  );
};

export default TimeRangeButtons;
