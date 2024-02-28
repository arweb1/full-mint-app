import { useEffect, useState } from 'react';
import './Notifications.scss';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification } from '../../features/notificationsSlice';


function Notifications() {
  const notifications = useSelector(state => state.notifications.notifications)
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if(notifications.length > 0){
        dispatch(removeNotification(notifications[0].id))
      }
      console.log('c');
    }, 2500)
    return () => clearTimeout(timer)
  }, [dispatch, notifications])

  return (
    <div>
      {notifications.map(notification => (
        <div className={`notifications-block ${notification.type}`}>
        <div className="status-message" key={notification.id}>
          {notification.message}
        </div>
        <div className="close-btn">
          X
        </div>
      </div>
      ))}
    </div>
  )
}

export default Notifications