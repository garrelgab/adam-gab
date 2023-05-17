import React, {useState, useEffect} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios';

import UpdateReservation from './UpdateReservation';

const DashboardReservation = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventStart, setSelectedEventStart] = useState(null);
  const [selectedEventEnd, setSelectedEventEnd] = useState(null);
  const [reservationID, setReservationID] = useState(null);

  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([]);

  const handleSelectedEvent = (events) => {
    setModalOpen(true);
    setSelectedEvent(events.title);
    setSelectedEventStart(events.start);
    setSelectedEventEnd(events.end);
    setReservationID(events.id);
  }

  useEffect(() => {
    axios.get("http://localhost:3001/api/events/pending")
    .then((response) => {
      setEvents(response.data);
    })
    .catch((err) => {
      console.log('Error fetching events:', err);
    });
  }, [events]);
  
  
  return (
    <div className='mx-[50px] mt-[30px] text-black'>
      <h1 className='text-[30px] font-light text-[#93F4D3]'>Reservation Management</h1>
      <div className='bg-[#D9D9D9] mt-[20px] rounded-lg shadow-2xl'>
        
        {events.length ? (
          <Calendar
          className='bg-white font-light rounded-lg'
          localizer={localizer}
          style={{ height: 700 }}
          min={new Date()}
          selectable
          events={events}
          onSelectEvent={handleSelectedEvent}
          />
        ) : (
          <Calendar
          className='bg-white font-light rounded-lg'
          localizer={localizer}
          style={{ height: 700 }}
          min={new Date()}
          selectable
          />
        )}
        {modalOpen && <UpdateReservation eventTitle={selectedEvent} reserveID={reservationID} eventStart={selectedEventStart} eventEnd={selectedEventEnd} onClose={() => setModalOpen(false)}/>}
      </div>
    </div>
  )
}

export default DashboardReservation