import React, {useState, useEffect} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useLocation } from 'react-router';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddReservation from './AddReservation'
import axios from 'axios';
import CustomerReservationDetails from './CustomerReservationDetails';
// import { response } from 'express';

const CustomerCalendar = (props) => {
  const location = useLocation();
  const id = props.id;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenDetails, setModalOpenDetails] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate1, setSelectedDate1] = useState(null);
  const handleSelectSlot = (slotInfo) => {
    // setModalOpen(true);
    if (moment(slotInfo.start).isBefore(moment(), "day")) {
      // Slot is in the past
      setSelectedDate(null);
      return;
    }
    const formattedDate = moment(slotInfo.start).format('dddd, MMMM DD, YYYY');
    const formattedDate1 = moment(slotInfo.start).format('MM-DD-YYYY');
    setSelectedDate(formattedDate);
    setSelectedDate1(formattedDate1);
  };

  const handleCloseModal= () => {
    setModalOpen(false);
    setSelectedDate(null);
  }

  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventStart, setSelectedEventStart] = useState(null);
  const [selectedEventEnd, setSelectedEventEnd] = useState(null);

  const handleSelectedEvent = (events) => {
    setModalOpenDetails(true);
    setSelectedEvent(events.title);
    setSelectedEventStart(events.start);
    setSelectedEventEnd(events.end);
  }

  useEffect(() => {
    axios.get("http://localhost:3001/api/events/approved")
    .then((response) => {
      setEvents(response.data);
    })
    .catch((err) => {
      console.log('Error fetching events:', err);
    });
  }, []);

  const views = {
    month: true,
    agenda: true,
  }
  return (
    <div className='px-[50px] py-[90px] bg-[#d3d3d3] text-black z-10'>
      <h1 className='text-[30px] text-[#1ca350] font-extrabold'>Calendar</h1>
      <div className='bg-[#D9D9D9] mt-[20px] rounded-lg shadow-2xl'>
        
        {events.length ? (
          <Calendar
          className='bg-white font-light rounded-lg'
          localizer={localizer}
          style={{ height: 700 }}
          min={new Date()}
          selectable
          views={views}
          events={events}
          selected={selectedDate}
          onSelectEvent={handleSelectedEvent}
          onSelectSlot={handleSelectSlot}
          />
        ) : (
          <Calendar
          className='bg-white font-light rounded-lg'
          localizer={localizer}
          style={{ height: 700 }}
          min={new Date()}
          selectable
          selected={selectedDate}
          onSelectEvent={[]}
          onSelectSlot={handleSelectSlot}
          />
        )}
        {selectedDate && <AddReservation className='z-50' date1={selectedDate} id={id} myDate={selectedDate1} onClose={handleCloseModal} />}
        {modalOpenDetails && <CustomerReservationDetails eventTitle={selectedEvent} eventStart={selectedEventStart} eventEnd={selectedEventEnd} onClose={() => setModalOpenDetails(false)}/>}

      </div>
    </div>
  )
}

export default CustomerCalendar