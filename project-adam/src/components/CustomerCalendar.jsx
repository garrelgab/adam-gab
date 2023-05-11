import React, {useState, useEffect} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddReservation from './AddReservation'
import axios from 'axios';

const CustomerCalendar = (props) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [status, setStatus] = useState('');
  const handleSelectSlot = (slotInfo) => {
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

  useEffect(() => {
    axios.get("http://localhost:3001/api/events")
  }, []);

  return (
    <div className='mx-[50px] mt-[30px] text-black z-10'>
      <h1 className='text-[30px] text-white font-light'>Calendar</h1>
      <div className='bg-[#D9D9D9] mt-[20px] rounded-lg shadow-2xl'>
        <Calendar
          className='bg-white font-light rounded-lg'
          localizer={localizer}
          style={{ height: 700 }}
          min={new Date()}
          selectable
          events={[]}
          onSelectEvent={[]}
          selected={selectedDate}
          onSelectSlot={handleSelectSlot}
        />
        {selectedDate && <AddReservation className='z-50' date1={selectedDate} myDate={selectedDate1} onClose={handleCloseModal} />}
      </div>
    </div>
  )
}

export default CustomerCalendar