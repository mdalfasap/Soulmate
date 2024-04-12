import React from 'react'

function Button() {
  return (
    <><button
    className="nextbtn3 align-self-end"
    onClick={props.handleNext}
    type="submit"
  >next</button>
  </>
  )
}

export default Button