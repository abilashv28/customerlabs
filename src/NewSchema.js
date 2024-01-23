import React from 'react';

const NewSchema = ({ options, newOption, setNewOption, newOptions }) => {
  return (
    <div id='new_schema' className='hidden'>
      <select
        className='form-select'
        aria-label="Default select example"
        value={newOption}
        onChange={event => setNewOption(event.target.value)}
      >
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span id='delete_selected_option' onClick={newOptions}> —</span>
      <br /><br />
    </div>
  );
};

export default NewSchema;