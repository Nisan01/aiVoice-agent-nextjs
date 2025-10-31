
import React from 'react'
import FeatureAssistants from './_components/FeatureAssistants'
import Feedback from './_components/Feedback'
import LectureHistory from './_components/LectureHistory'

 function Dashboard() {
  return (
<>
<FeatureAssistants />

<div className='mt-17 grid grid-cols-1 md:grid-cols-2 '>
   <LectureHistory />
  <Feedback />

</div>

</>
  )
}

export default Dashboard