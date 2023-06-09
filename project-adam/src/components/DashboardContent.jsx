import React, {useEffect, useState} from 'react'
import { Calendar, momentLocalizer, Event } from 'react-big-calendar'
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios';
import CustomerReservationDetails from './CustomerReservationDetails';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from "chart.js";
import { Line, Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);
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
    axios.get("http://localhost:3001/events")
    .then((response) => {
      setEvents(response.data);
    })
    .catch((err) => {
      console.log('Error fetching events:', err);
    });
  }, []);

  const [membersCount, setMembersCount] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/members-count')
      .then(response => {
        setMembersCount(response.data[0].count);
        // console.log(response);
      })
      // .then(data => (data.count))
      .catch(error => console.log(error));
  }, []);

  const [pendingCount, setPendingCount] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/pending-count')
      .then(response => {
        setPendingCount(response.data[0].count);
        // console.log(response);
      })
      // .then(data => setPendingCount(data.count))
      .catch(error => console.log(error));
  }, []);

  const [eventCount, setEventCount] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/event-count')
      .then(response => {
        setEventCount(response.data[0].count);
        // console.log(response);
      })
      .catch(error => console.log(error));
  }, []);

  const [totalSales, setTotalSales] = useState(null);

  const fetchSumSales = () => {
    axios.get('http://localhost:3001/fetch-total-sales')
    .then(response => {
      setTotalSales(formatPrice(response.data[0].total));
    })
    .catch(error => {
      console.log(error);
    });
  };
  
  const [totalSalesToday, setTotalSalesToday] = useState(null);

  const fetchSumSalesToday = () => {
    axios.get('http://localhost:3001/fetch-total-sales-today')
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
    fetchSalesLineGraph();
    fetchSalesBarGraph();
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

  const [lineGraphData, setLineGraphData] = useState(null);

  const fetchSalesLineGraph = () => {
    axios
      .get('http://localhost:3001/sum-linegraph-sales-report')
      .then(response => {
        const salesData = response.data;

        // Process the sales data and convert it to the desired format
        const updatedLineGraphData = {
          labels: [],
          datasets: [
            {
              label: 'Sales',
              data: [],
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.4)',
            },
          ],
        };

        // Iterate over the sales data and populate the updatedLineGraphData
        salesData.forEach((item) => {
          updatedLineGraphData.labels.push(item.date);
          updatedLineGraphData.datasets[0].data.push(item.total);
        });

        if (updatedLineGraphData.labels.length > 0 && updatedLineGraphData.datasets[0].data.length > 0) {
          setLineGraphData(updatedLineGraphData);
        }
      })
      .catch(error => {
        console.log('Failed to fetch sales report', error);
      });
  };
  function getWeekFromDate(dateString) {
    const date = new Date(dateString);
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const week = Math.ceil(((date - oneJan) / millisecondsPerDay + oneJan.getDay() + 1) / 7);
    return week;
  }

  // const fetchSalesLineGraph = () => {
  //   axios
  //     .get('http://localhost:3001/sales-report')
  //     .then(response => {
  //       const salesData = response.data;
  
  //       // Process the sales data and convert it to the desired format
  //       const updatedLineGraphData = {
  //         labels: [],
  //         datasets: [
  //           {
  //             label: 'Sales',
  //             data: [],
  //             borderColor: 'rgba(75,192,192,1)',
  //             backgroundColor: 'rgba(75,192,192,0.4)',
  //           },
  //         ],
  //       };
  
  //       // Group sales data by week
  //       const weeklySalesData = {};
  //       salesData.forEach((item) => {
  //         const week = getWeekFromDate(item.date); // Custom function to get the week from a given date
  //         if (!weeklySalesData[week]) {
  //           weeklySalesData[week] = {
  //             total: 0,
  //             count: 0,
  //           };
  //         }
  //         weeklySalesData[week].total += item.total;
  //         weeklySalesData[week].count++;
  //       });
  
  //       // Iterate over the weekly sales data and populate the updatedLineGraphData
  //       Object.keys(weeklySalesData).forEach((week) => {
  //         const averageSales = weeklySalesData[week].total / weeklySalesData[week].count;
  //         updatedLineGraphData.labels.push(`Week ${week}`);
  //         updatedLineGraphData.datasets[0].data.push(averageSales);
  //       });
  
  //       if (updatedLineGraphData.labels.length > 0 && updatedLineGraphData.datasets[0].data.length > 0) {
  //         setLineGraphData(updatedLineGraphData);
  //       }
  //     })
  //     .catch(error => {
  //       console.log('Failed to fetch sales report', error);
  //     });
  // };
  

  const getMonthName = (monthIndex) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex];
  };
  // const fetchSalesLineGraph = () => {
  //   axios
  //     .get('http://localhost:3001/sales-report')
  //     .then(response => {
  //       const salesData = response.data;
  
  //       // Process the sales data and convert it to the desired format
  //       const updatedLineGraphData = {
  //         labels: [],
  //         datasets: [
  //           {
  //             label: 'Sales',
  //             data: [],
  //             borderColor: 'rgba(75,192,192,1)',
  //             backgroundColor: 'rgba(75,192,192,0.4)',
  //           },
  //         ],
  //       };
  
  //       // Group sales data by month
  //       const monthlySalesData = {};
  //       salesData.forEach((item) => {
  //         const date = new Date(item.date);
  //         const monthIndex = date.getMonth(); // Get the month index (0-11)
  //         const monthName = getMonthName(monthIndex); // Custom function to get the month name from the index
  
  //         if (!monthlySalesData[monthName]) {
  //           monthlySalesData[monthName] = {
  //             total: 0,
  //             count: 0,
  //           };
  //         }
  //         monthlySalesData[monthName].total += item.total;
  //         monthlySalesData[monthName].count++;
  //       });
  
  //       // Iterate over the monthly sales data and populate the updatedLineGraphData
  //       Object.keys(monthlySalesData).forEach((month) => {
  //         const averageSales = monthlySalesData[month].total / monthlySalesData[month].count;
  //         updatedLineGraphData.labels.push(month);
  //         updatedLineGraphData.datasets[0].data.push(averageSales);
  //       });
  
  //       if (updatedLineGraphData.labels.length > 0 && updatedLineGraphData.datasets[0].data.length > 0) {
  //         setLineGraphData(updatedLineGraphData);
  //       }
  //     })
  //     .catch(error => {
  //       console.log('Failed to fetch sales report', error);
  //     });
  // };
  
  


  const [barGraphData, setBarGraphData] = useState(null);
  const fetchSalesBarGraph = () => {
    axios
      .get('http://localhost:3001/category-sales-report')
      .then(response => {
        const salesData = response.data;

        // Process the sales data and convert it to the desired format
        const updatedBarGraphData = {
          labels: [],
          datasets: [
            {
              label: 'Sales',
              data: [],
              backgroundColor: [],
              hoverBackgroundColor: [],
            },
          ],
        };

        // Iterate over the sales data and populate the updatedBarGraphData
        salesData.forEach((item) => {
          updatedBarGraphData.labels.push(item.category);
          updatedBarGraphData.datasets[0].data.push(item.total);
          updatedBarGraphData.datasets[0].backgroundColor.push('rgba(75,192,192,0.4)');
          updatedBarGraphData.datasets[0].hoverBackgroundColor.push('rgba(75,192,192,1)');
        });

        if (updatedBarGraphData.labels.length > 0 && updatedBarGraphData.datasets[0].data.length > 0) {
          setBarGraphData(updatedBarGraphData);
        }
      })
      .catch(error => {
        console.log('Failed to fetch sales report', error);
    });
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
      <div className=' mt-[20px] max-w-[1240px] mx-auto hidden md:flex flex-col md:flex-row justify-between items-center'>
        <div className='w-auto h-[400px] items-center justify-center flex bg-white rounded-xl'>
          {/* <Bar data={barGraphData} className='rounded-md w-auto h-[250px]  mx-[50px]'/> */}
          {barGraphData !== null && barGraphData.labels && barGraphData.datasets && (
            <Bar data={barGraphData} className='rounded-md w-auto h-[250px] mx-[50px]' />
          )}
        </div>
        <div className='w-auto h-[400px] items-center justify-center flex bg-white rounded-xl'>
        {lineGraphData !== null && lineGraphData.labels !== undefined && (
          <Line data={lineGraphData} className='rounded-md w-auto h-[250px] mx-[50px]' />
        )}
        </div>
        {/* <div className='w-auto h-auto items-center justify-center flex bg-white rounded-xl'>
          <Pie data={pieChartData} className='w-auto h-auto mx-[50px]'/>
        </div> */}
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