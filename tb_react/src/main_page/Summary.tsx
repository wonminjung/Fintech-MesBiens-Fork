import React from 'react'

const Summary: React.FC = () => {
  return (
    <div className="container_right">
      <h2>요약</h2>
      <hr style={{borderStyle: 'solid'}} />
      <h4>수입 / 지출 내역</h4>
      <div id="transactionDetails"></div>
    </div>
  )
}

export default Summary
