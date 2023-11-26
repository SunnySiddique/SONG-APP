import './queue.css';

const Queue = ({tracks, setCurrentIndex}) => {
  console.log(tracks)
  return (
    <div className='queue-container'>
      <div className="queue flex">
          <p className='upNext'>Up Nex</p>
          <div className="queue-list">
              {
                tracks?.map((item, index) => {
                  return (
                    <div key={index} className='queue-item flex' onClick={() => setCurrentIndex(index)}>
                    <p className='track-name'>{item?.track?.name}</p>
                    <p>0:30</p>
                  </div>
                  );
                })
              }
          </div>
      </div>
    </div>
  )
}

export default Queue
