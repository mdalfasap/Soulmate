import React from 'react'

function Title(props) {
  return (
    <>
    <div style={{ justifyContent: 'center', display: 'flex', marginTop:'110px',color: 'white'}}>
        <h1>{props.title}</h1>
        </div>
    </>
  )
}

export default Title