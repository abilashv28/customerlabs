import React from 'react';

const SelectedOption = ({ setOptions, initialOptions, setSelectedOptions, selectedOptions, options, deleteSelectedOption, setNewOption }) => {
  const selectedValueChange = (event,index) => {
    let new_changed_value = initialOptions.filter(optionss => optionss.value === event.target.value);
    let old_selected_values = [...selectedOptions];
    let set_options = old_selected_values[index];
    old_selected_values[index] = new_changed_value[0];
    let new_options = options.filter(prev => prev.value !== new_changed_value[0].value);
    setOptions([...new_options,set_options]);
    setSelectedOptions(old_selected_values);
  }
  return (
    <div className='selectedoptions'>
      {selectedOptions.map((soption, index) => (
        <div key={index} className='optionss'>
          <span className={soption.type + "-dot mr-15"}></span>
          <select
            className='form-select'
            aria-label="Default select example"
            value={soption.label}
            onChange={(e)=>selectedValueChange(e,index)}
          >
            <option key={index} value={soption.label}>{soption.label}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span id='delete_new_selected_option' onClick={() => deleteSelectedOption(soption.value)}> —</span>
          <br />
        </div>
      ))}
    </div>
  );
};

export default SelectedOption;
