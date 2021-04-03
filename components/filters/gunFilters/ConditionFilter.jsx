const ConditionFilter = (props) => {
  const { conditions, handleConditionChange, selectedCondition } = props;

  return (
    <>
      {conditions.map((condition) => (
        <div className="hover:text-ssorange mb-2 md:mb-0" key={condition.condition.conID}>
          <input
            type="checkbox"
            id={condition.condition.name}
            value={condition.condition.name}
            checked={selectedCondition[condition.condition]}
            onChange={handleConditionChange}
            className="hover:ssorange"
          />
          <label key={condition.condition.conID} htmlFor={condition.condition.name} className="ml-1 uppercase">
            {condition.condition.name}
          </label>
        </div>
      ))}
    </>
  );
};

export default ConditionFilter;
