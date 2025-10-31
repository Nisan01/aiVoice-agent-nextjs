

import React from 'react'
import ReactMarkdown from 'react-markdown';

function Summary({summaryData}) {
  return (
    <div>
        
     <ReactMarkdown>{summaryData}</ReactMarkdown>
        
        
        </div>
  )
}

export default Summary