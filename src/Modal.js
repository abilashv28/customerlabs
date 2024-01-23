import React, { useState, useEffect, useCallback, useMemo } from 'react';
import SelectedOption from './SelectedOption';
import NewSchema from './NewSchema';
import axios from 'axios';

const Modal = ({ setResults, initialOptions, setOptions, setSelectedOptions, segmentName, selectedOptions, options, newOption, setSegmentName, handleAddNewSchema, deleteSelectedOption, newOptions, setNewOption }) => {
  const [segmentstatus, setSegmentStatus] = useState('');
  const [selectedstatus, setSelectedStatus] = useState('');
  const [sentstatus, setsentstatus] = useState('');
  
  useEffect(() => {
    document.getElementById('myModal').style.display = 'none';
    document.getElementById('myModal').style.backdropFilter = 'blur(0px)';
  }, []);

  const handleSaveSegment = useCallback(() => {
    if (segmentName !== '' && selectedOptions.length !== 0) {
      const data = {
        segmentName,
        selectedOptions: selectedOptions.map(option => ({ [option.value]: option.label })),
      };
      const data_type = {
        segmentName,
        selectedOptions: selectedOptions.map(option => ({ [option.value]: option.label, type: option.type })),
      };

      const fetchData = async () => {
        try {
          const postUrl = 'https://webhook.site/711737ce-7f49-4f15-af27-2daa7f873f17';
          const response = await axios.post(postUrl, data);
          console.log('Response:', response.data);
          setsentstatus(response.data);
          setTimeout(() => {
            setsentstatus('');
          }, 1800);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
      setResults(prev => [...prev, data_type]);
      document.getElementById('new_schema').classList = 'hidden';
      setSegmentName('');
      setSelectedOptions([]);
      setOptions(initialOptions);
    } else {
      if (segmentName === '') {
        setSegmentStatus('*Enter Segment Name');
        setTimeout(() => {
          setSegmentStatus('');
        }, 1800);
      }
      if (selectedOptions.length === 0) {
        setSelectedStatus('*Select Atleast One Schema');
        setTimeout(() => {
          setSelectedStatus('');
        }, 1800);
      }
    }
  }, [segmentName, selectedOptions, setResults, setSegmentName, setSelectedOptions, setOptions, initialOptions]);
  const legendInfo = useMemo(() => (
    <span id="legends" className="pb-6">
      <span className="user-dot"></span> &nbsp;-&nbsp;User Traits &nbsp;<span className="group-dot"></span> &nbsp;-&nbsp;Group Traits
    </span>
  ), []);

  
  return (
    <div id="myModal" className="modal position-relative" style={{display:"none"}}>
    <div className='modal-content'>   
    <h2 style={{backgroundColor:"#23cce1",margin:"0px",height:"53px", color:"white"}}><span className='seg'>	<span className='segg' onClick={()=>{document.getElementById("myModal").style.display="none";document.getElementById("myModal").style.backdropFilter="blur(0px)";}}>	&nbsp;&nbsp;&lt;&nbsp;&nbsp;</span>Save Segment</span></h2>
    <br />
    <div id='content'>
    <label className='pb-6'>
      Enter the Name of the Segment <br /></label>
      <input className='form-control pb-6'
        type="text"
        value={segmentName}
        onChange={event => setSegmentName(event.target.value)}
      />
      <div className='status'>{segmentstatus}</div>
    
    <br />
    <span className='pb-6'>
      To save your segment, you need to add the schemas to build the query </span><br />

     {legendInfo}
     <br />

          <SelectedOption
        setOptions={setOptions}
        initialOptions={initialOptions}
        setSelectedOptions={setSelectedOptions}  
        selectedOptions={selectedOptions}
        options={options}
        deleteSelectedOption={deleteSelectedOption}
        setNewOption={setNewOption}
      />
            <NewSchema
        options={options}
        newOption={newOption}
        setNewOption={setNewOption}
        newOptions={newOptions}
      />
      <div className='status'>{selectedstatus}</div>
      <div className='sentstatus' style={{color: "#26a126"}}>{sentstatus}</div>
      <label className='newschemalabl' onClick={handleAddNewSchema}>+ Add new schema</label>
    <button className='bottom-btn btn' id='save' onClick={handleSaveSegment}>Save the Segment</button>        <button className='bottom-btn cancel btn' id='cancel' onClick={()=>{document.getElementById("myModal").style.display="none";document.getElementById("myModal").style.backdropFilter="blur(0px)";}} >Cancel</button>
    </div>
    </div>
  </div>
  );
};

export default Modal;
