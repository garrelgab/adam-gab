import React, {useEffect, useState} from 'react'
import { Calendar, momentLocalizer, Event } from 'react-big-calendar'
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios';
import CustomerReservationDetails from './CustomerReservationDetails';
import { Line, Pie } from 'react-chartjs-2';
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

  const [totalSales, setTotalSales] = useState(null);

  const fetchSumSales = () => {
    axios.get('http://localhost:3001/api/fetch-total-sales')
    .then(response => {
      setTotalSales(formatPrice(response.data[0].total));
    })
    .catch(error => {
      console.log(error);
    });
  };
  
  const [totalSalesToday, setTotalSalesToday] = useState(null);

  const fetchSumSalesToday = () => {
    axios.get('http://localhost:3001/api/fetch-total-sales-today')
    .then(response => {
      setTotalSalesToday(formatPrice(response.data[0].total));
    })
    .catch(error => {
      console.log(error);
    });
  };

  const formatPrice = (price) => {
    return Number(price).toFixed(2);
  };

  useEffect(() => {
    fetchSumSales();
    fetchSumSalesToday();
  }, []);
  const views = {
    month: true,
    agenda: true,
  }

  const getEventStyle = (event, start, end, isSelected) => {
    let backgroundColor = '';
    
    if (event.status === 'Pending') {
      backgroundColor = 'yellow'; // Set the desired background color for pending events
    } else if (event.status === 'Approved') {
      backgroundColor = 'green'; // Set the desired background color for approved events
    }
    
    return {
      style: {
        backgroundColor
      }
    };
  };

  const [showCharts, setShowCharts] = useState(true);

  const toggleCharts = () => {
    setShowCharts(!showCharts);
  };

  const pieChartData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const lineGraphData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3, 10],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
    ],
  };
  
  
  return (
    <div className='px-[50px] bg-[#d3d3d3] py-[90px] text-white'>
      <h1 className='text-[30px] font-extrabold text-[#1ca350]'>Dashboard</h1>
      <div className='blocked flex flex-col md:flex-row md:justify-between  mt-[20px] mx-[0px]'>
        <div className='bg-[#1ca350] h-[100px] md:h-[130px] md:w-[550px] rounded-lg flex flex-col justify-center my-4 md:mx-[10px] md:my-0 md:shadow-lg'>
          <h1 className='p-[0px] md:text-[25px] text-[20px] text-center font-bold mt-[-50px] mb-[0px]'>Total Members</h1>
          {membersCount !== null ? (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>{membersCount}</h1>
          ) : (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>0</h1>
          )}
        </div>
        <div className='bg-[#1ca350] h-[100px] md:h-[130px] md:w-[550px] rounded-lg flex flex-col justify-center my-4 md:mx-[10px] md:my-0 md:shadow-lg'>
          <h1 className='p-[0px] md:text-[25px] text-[20px] text-center font-bold mt-[-50px] mb-[0px]'>Total Sales</h1>
          {totalSales !== null ? (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>{totalSales}</h1>
          ) : (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>0</h1>
          )}
        </div>
        <div className='bg-[#1ca350] h-[100px] md:h-[130px] md:w-[550px] rounded-lg flex flex-col justify-center my-4 md:mx-[10px] md:my-0 md:shadow-lg'>
          <h1 className='p-[0px] md:text-[25px] text-[20px] text-center font-bold mt-[-50px] mb-[0px]'>Total Sales Today</h1>
          {totalSalesToday !== null ? (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>{totalSalesToday}</h1>
          ) : (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>0</h1>
          )}
        </div>
        <div className='bg-[#1ca350] h-[100px] md:h-[130px] md:w-[550px] rounded-lg flex flex-col justify-center my-4 md:mx-[10px] md:my-0 md:shadow-lg'>
          <h1 className='p-[0px] md:text-[25px] text-[20px] text-center font-bold mt-[-50px] mb-[0px]'>Total Pending Reservation</h1>
          {pendingCount !== null ? (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>{pendingCount}</h1>
          ) : (
            <h1 className='p-[0px] md:text-[40px] text-center font-light mb-[-50px]'>0</h1>
          )}
        </div>
        <div className='bg-[#1ca350] h-[100px] md:h-[130px] md:w-[550px] rounded-lg flex flex-col justify-center my-4 md:mx-[10px] md:my-0 md:shadow-lg'>
          <h1 className='p-[0px] md:text-[25px] text-[20px] text-center font-bold mt-[-50px] mb-[0px]'>Total Reservation</h1>
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
            className='bg-white font-light rounded-lg text-black'
            localizer={localizer}
            style={{ height: 700 }}
            min={new Date()}
            views={views}
            selectable
            events={events}
            onSelectEvent={handleSelectedEvent}
            // eve={getEventStyle}
            eventStyleGetter={getEventStyle}
            />
          ) : (
            <Calendar
            className='bg-white font-light rounded-lg text-black'
            localizer={localizer}
            style={{ height: 700 }}
            min={new Date()}
            views={views}
            eventStyleGetter={getEventStyle}
            selectable
            />
          )}
        {modalOpenDetails && <CustomerReservationDetails eventTitle={selectedEvent} eventStart={selectedEventStart} eventEnd={selectedEventEnd} onClose={() => setModalOpenDetails(false)}/>}

      </div>
    </div>
  )
}

export default DashboardContent