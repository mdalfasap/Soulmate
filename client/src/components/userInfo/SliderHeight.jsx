import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';



export default function SliderHeight(props) {
  const [defaultValue,SetDefaultValue]= React.useState(1.8)
  const marks = [
    { value: 1.5, label: '1.5M' },
    { value: 1.6, label: '1.6M' },
    { value: 1.7, label: '1.7M' },
    { value: 1.8, label: '1.8M' },
    { value: 1.9, label: '1.9M' },
    { value: 2.0, label: '2.0M' },
    { value: 2.1, label: '2.1M' },
  ];
  
  function valuetext(value) {
    return `${value}M`;
  }
  const handleStatusSelection = (e) => {
    props.handleChange(e)
  };
  React.useEffect(()=>{
SetDefaultValue(props.value)
  },[])
  return (
    <Box sx={{ width: 300,  marginTop: '40px' }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={defaultValue}
        getAriaValueText={valuetext}
        step={0.01}
        name={props.name}
        value={props.value}
        valueLabelDisplay={props.value}
        marks={marks}
        min={1.5}
        max={2.1}
        onChange={(e) => handleStatusSelection(e)}
        sx={{
          '& .MuiSlider-track': {
            backgroundColor: '#6B77A8',
            height: '10px',
            borderRadius: '10px',
          },
          '& .MuiSlider-thumb': {
            backgroundColor: '#6268FF',
            border: '5px solid white',
          },
          '& .MuiSlider-markLabel': {
            color: '#6B77A8', // Set the color for the label
          },
        }}
      />
    </Box>
  );
}
