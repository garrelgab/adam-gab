import React, {useState, useEffect} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios';
import CustomerReservationDetails from './CustomerReservationDetails';
import UpdateReservation from './UpdateReservation';

const DashboardReservation = () => {
  const [modalOpenDetails, setModalOpenDetails] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventStart, setSelectedEventStart] = useState(null);
  const [selectedEventEnd, setSelectedEventEnd] = useState(null);
  const [reservationID, setReservationID] = useState(null);

  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([]);

  const handleSelectedEvent = (events) => {
    
    if(events.status === 'Approved') {
      setModalOpenDetails(true);
      setSelectedEvent(events.title);
      setSelectedEventStart(events.start);
      setSelectedEventEnd(events.end);
      setReservationID(events.id);
    } else {
      setModalOpen(true);
      setSelectedEvent(events.title);
      setSelectedEventStart(events.start);
      setSelectedEventEnd(events.end);
      setReservationID(events.id);
    }
  }

  const [pendingCount, setPendingCount] = useState(null);
  const [eventCount, setEventCount] = useState(null);
  const [approvedCount, setApprovedCount] = useState(null);

  const fetchCounts = () => {
    axios.get('http://localhost:3001/pending-count')
    .then(response => {
      setPendingCount(response.data[0].count);
    })
    .catch(error => console.log(error));

    axios.get('http://localhost:3001/event-count')
    .then(response => {
      setEventCount(response.data[0].count);
    })
    .catch(error => console.log(error));

    axios.get('http://localhost:3001/approved-count')
    .then(response =>  {
      setApprovedCount(response.data[0].count);
    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    axios.get("http://localhost:3001/events-reservation")
    .then((response) => {
      setEvents(response.data);
    })
    .catch((err) => {
      console.log('Error fetching events:', err);
    });
  }, [events]);

  // useEffect(() => {
  //   axios.get("http://localhost:3001/events/pending")
  //   .then((response) => {
  //     setEvents(response.data);
  //   })
  //   .catch((err) => {
  //     console.log('Error fetching events:', err);
  //   });
  //   fetchCounts();
  // }, [events]);
  
  const views = {
    month: true,
    agenda: true,
  }
  const getEventProp = (event, start, end, isSelected) => {
    // Check if the event's start date is in the past
    const isPastEvent = start < new Date();
  
    // Return custom style and behavior for past events
    if (isPastEvent) {
      return {
        style: {
          backgroundColor: 'lightgray',
          cursor: 'default', // Make the event unclickable
        },
      };
    }
  };
  
  return (
    <div className='bg-[#d3d3d3] px-[50px] py-[90px] text-white'>
      <h1 className='text-[30px] font-extrabold text-[#1ca350]'>Reservation Management</h1>
      <div className='blocked flex md:justify-between  mt-[20px] mx-[0px]'>
        <div className='bg-[#1ca350] h-[100px] md:h-[130px] md:w-[550px] rounded-lg flex flex-col justify-center my-4 md:mx-0 md:my-0 md:shadow-lg'>
          <h1 className='p-[0px] md:text-[30px] text-[20px] text-center font-bold mt-[-50px] mb-[0px]'>Approved Reservation</h1>
          {approvedCount !== null ? (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>{approvedCount}</h1>
          ) : (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>0</h1>
          )}
        </div>
        <div className='bg-[#1ca350] h-[100px] md:h-[130px] md:w-[550px] rounded-lg flex flex-col justify-center my-4 md:mx-[30px] md:my-0 md:shadow-lg'>
          <h1 className='p-[0px] md:text-[30px] text-[20px] text-center font-bold mt-[-50px] mb-[0px]'>Pending Reservation</h1>
          {pendingCount !== null ? (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>{pendingCount}</h1>
          ) : (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>0</h1>
          )}
        </div>
        <div className='bg-[#1ca350] h-[100px] md:h-[130px] md:w-[550px] rounded-lg flex flex-col justify-center my-4 md:mx-0 md:my-0 md:shadow-lg'>
          <h1 className='p-[0px] md:text-[30px] text-[20px] text-center font-bold mt-[-50px] mb-[0px]'>Total Reservation</h1>
          {eventCount !== null ? (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>{eventCount}</h1>
          ) : (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>0</h1>
          )}
        </div>
      </div>
      <div className='bg-[#D9D9D9] mt-[20px] rounded-lg shadow-2xl'>
        {events.length ? (
          <Calendar
          className='bg-white font-light rounded-lg text-black'
          localizer={localizer}
          style={{ height: 700 }}
          min={new Date()}
          views={views}
          selectable
          events={events}
          onSelectEvent={handleSelectedEvent}
          eventPropGetter={getEventProp}
          maxRows={Infinity}
          />
        ) : (
          <Calendar
          className='bg-white font-light rounded-lg text-black'
          localizer={localizer}
          views={views}
          style={{ height: 700 }}
          min={new Date()}
          selectable
          />
        )}
        {modalOpen && <UpdateReservation eventTitle={selectedEvent} reserveID={reservationID} eventStart={selectedEventStart} eventEnd={selectedEventEnd} onClose={() => setModalOpen(false)}/>}
        {modalOpenDetails && <CustomerReservationDetails eventTitle={selectedEvent} eventStart={selectedEventStart} eventEnd={selectedEventEnd} onClose={() => setModalOpenDetails(false)}/>}
      </div>
    </div>
  )
}

export default DashboardReservation