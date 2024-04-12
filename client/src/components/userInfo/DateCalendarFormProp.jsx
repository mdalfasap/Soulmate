import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';



import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function DateCalendarFormProps(props) {
  const [selectedDate, setSelectedDate] = useState();



  const handleDateChange = (e) => {
    props.handleDateChange(e)
    setSelectedDate(e);
  };
  useEffect(() => {
    setSelectedDate(props.value);
  }, []);


  return(
    <div
            className="mt-1 pb-0"
            
            style={{

              border: '1px solid transparent',
              backdropFilter: 'blur(20px)',
              color: 'white ',
            }}
          >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker    sx={{
          "& MuiPickersToolbar-root MuiPickersLayout-toolbar css-1eurbeq-MuiPickersToolbar-root-MuiDatePickerToolbar-root,.css-1eurbeq-MuiPickersToolbar-root-MuiDatePickerToolbar-root,.css-1hbyad5-MuiTypography-root,MuiDialogActions-root MuiDialogActions-spacing MuiPickersLayout-actionBar css-knqc4i-MuiDialogActions-root ":{display:'none'},
          "&  .css-1e6y48t-MuiButtonBase-root-MuiButton-root":{display:'none'},
          "&  MuiPickersToolbar-root MuiPickersLayout-toolbar css-16d8vrz-MuiPickersToolbar-root-MuiDatePickerToolbar-root,.css-1efdvvh-MuiPickersLayout-root .MuiPickersLayout-toolbar ,.css-16d8vrz-MuiPickersToolbar-root-MuiDatePickerToolbar-root":{display:'none'},
          "& .css-12mkn7b-MuiButtonBase-root-MuiIconButton-root-MuiPickersCalendarHeader-switchViewButton ,.css-1nkg345-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button,.css-kg9q0s-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button,.css-rhmlg1-MuiTypography-root-MuiDayCalendar-weekDayLabel,.css-1u23akw-MuiButtonBase-root-MuiPickersDay-root":{color:'white'},
            backgroundColor:'transparent',

            
            }}
            name={props.name}
            onChange={(e) => handleDateChange(e)}
             defaultValue={selectedDate?selectedDate:''} />

  </LocalizationProvider>
  </div>
  );
}


// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
  // const customStyles = {
  //   dayWrapper: {
  //     color: 'white',
  //   },
  //   selected: {
  //     '&.Mui-selected': {
  //       backgroundColor: 'white',
  //       color: 'black',
  //     },
  //   },
  // };

  // return (
  //   <LocalizationProvider dateAdapter={AdapterDayjs}>
  //     <DemoContainer components={['DateCalendar', 'DateCalendar']}>
  //       <DemoItem>
  //         <div
  //           className="mt-0 pb-0"
  //           style={{
  //             border: '1px solid transparent',
  //             backdropFilter: 'blur(20px)',
  //             color: 'black ',
  //           }}
  //         >
  //           <DateCalendar
  //             sx={{
  //               "& .css-1u23akw-MuiButtonBase-root-MuiPickersDay-root,.css-rhmlg1-MuiTypography-root-MuiDayCalendar-weekDayLabel,.css-1vooibu-MuiSvgIcon-root,.css-dplwbx-MuiPickersCalendarHeader-label,.css-1tkx1wf-MuiSvgIcon-root-MuiPickersCalendarHeader-switchViewIcon": {
  //                 color: "white"
  //               }
  //             }}
  //             value={selectedDate}
  //             onChange={handleDateChange}
  //             renderDay={(date, _value, DayProps) => (
  //               <div {...DayProps} style={{ ...DayProps.style, ...customStyles.dayWrapper }}>
  //                 {date.format('DD-MM-YYYY')}
  //               </div>
  //             )}
  //             renderInput={(startProps, endProps, _value, _open) => (
  //               <div>
  //                 <input {...startProps} style={{ color: 'black' }} />
  //                 <input {...endProps} style={{ color: 'black' }} />
  //               </div>
  //             )}
  //             renderDayWrapper={(dayProps, _value) => (
  //               <div {...dayProps} style={{ ...dayProps.style, ...customStyles.selected }} />
  //             )}
  //           />
  //         </div>
  //       </DemoItem>
  //     </DemoContainer>
  //   </LocalizationProvider>