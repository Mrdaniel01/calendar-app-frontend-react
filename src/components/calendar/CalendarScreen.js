import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { useDispatch, useSelector } from 'react-redux';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es')
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

  const {events} = useSelector(state => state.calendar)
  const {uid} = useSelector(state => state.auth)

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch ( eventStartLoading() )
  }, [dispatch])


  const onDoubleClick = (e) => {
    dispatch(uiOpenModal())
  }

  const onSelectEvent = (e) => {
    dispatch ( eventSetActive(e) )
    
  }

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }
  
  const {activeEvent} = useSelector(state => state.calendar)
    const eventStyleGetter = (event, start, end, isSelected) => {

    

    const style = {
      backgroundColor:(uid === event.user._id) ? '#367cf7':'#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return {
      style
    }
  }

  const onSelectSlot = () => {
    dispatch( eventClearActiveEvent() )
  }

  return (
    <div className='calendar-screen'>
      <Navbar />
      
        
          <Calendar 
          localizer={localizer}
          events={events}
          startAccessor='start'
          endAccessor='end'
          messages={messages}
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          view={lastView}
          onSelectSlot={onSelectSlot}
          selectable={true}
          components={{
            event: CalendarEvent
          }}
      />
        
      
      {
        (activeEvent) &&
        <DeleteEventFab />
      } 
      <AddNewFab />

      <CalendarModal />



    </div>
  )
}
