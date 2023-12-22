import React from 'react'
import loading from './loadingGif2.gif'

const Spinner = () => {
  
    return (
      <div className="text-center">
        <img src={loading} alt="loading" />
      </div>
    )
  
}

export default Spinner