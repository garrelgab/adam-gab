import React, {useEffect, useState} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios';
import CustomerReservationDetails from './CustomerReservationDetails';

const DashboardContent = () => {

  const localizer = momentLocalizer(moment);

  const [modalOpenDetails, setModalOpenDetails] = useState(false);
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
    axios.get("http://localhost:3001/api/events")
    .then((response) => {
      setEvents(response.data);
    })
    .catch((err) => {
      console.log('Error fetching events:', err);
    });
  }, []);

  const [membersCount, setMembersCount] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/members-count')
      .then(response => response.json())
      .then(data => setMembersCount(data.count))
      .catch(error => console.log(error));
  }, []);

  const [pendingCount, setPendingCount] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/pending-count')
      .then(response => response.json())
      .then(data => setPendingCount(data.count))
      .catch(error => console.log(error));
  }, []);

  const [eventCount, setEventCount] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/event-count')
      .then(response => response.json())
      .then(data => setEventCount(data.count))
      .catch(error => console.log(error));
  }, []);

  const views = {
    month: true,
    agenda: true,
  }
  return (
    <div className='mx-[50px] my-[90px] text-black'>
      <h1 className='text-[30px] text-[#93F4D3] font-light'>Dashboard</h1>
      <div className='blocked flex md:justify-between  mt-[20px] mx-[0px]'>
        <div className='bg-[#D9D9D9] h-[100px] md:h-[130px] md:w-[550px] rounded-lg flex flex-col justify-center my-4 md:mx-0 md:my-0 md:shadow-lg'>
          <h1 className='p-[0px] md:text-xl text-center font-light mt-[-50px] mb-[0px]'>Total Members</h1>
          {membersCount !== null ? (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>{membersCount}</h1>
          ) : (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>0</h1>
          )}
        </div>
        <div className='bg-[#D9D9D9] h-[100px] md:h-[130px] md:w-[550px] rounded-lg flex flex-col justify-center my-4 md:mx-[30px] md:my-0 md:shadow-lg'>
          <h1 className='p-[0px] md:text-xl text-center font-light mt-[-50px] mb-[0px]'>Total Pending Reservation</h1>
          {pendingCount !== null ? (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>{pendingCount}</h1>
          ) : (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>0</h1>
          )}
        </div>
        <div className='bg-[#D9D9D9] h-[100px] md:h-[130px] md:w-[550px] rounded-lg flex flex-col justify-center my-4 md:mx-0 md:my-0 md:shadow-lg'>
          <h1 className='p-[0px] md:text-xl text-center font-light mt-[-50px] mb-[0px]'>Total Reservation</h1>
          {eventCount !== null ? (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>{eventCount}</h1>
          ) : (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>0</h1>
          )}
        </div>
      </div>
      <div className='bg-[#D9D9D9] mt-[20px] rounded-lg'>
        {events.length ? (
            <Calendar
            className='bg-white font-light rounded-lg'
            localizer={localizer}
            style={{ height: 700 }}
            min={new Date()}
            views={views}
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
            views={views}
            selectable
            />
          )}
        {modalOpenDetails && <CustomerReservationDetails eventTitle={selectedEvent} eventStart={selectedEventStart} eventEnd={selectedEventEnd} onClose={() => setModalOpenDetails(false)}/>}

      </div>
    </div>
  )
}

export default DashboardContent