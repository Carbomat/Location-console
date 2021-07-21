import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from '../services/user.service';

const Appointments = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useSelector(state => state.auth);
  let appointments;

  useEffect(() => {
   
      UserService.getAppointments(currentUser.user.id).then(
          response => {
              console.log("appoi_content", response.data.appoint)
          setLoading(false);
          setContent(response.data.appoint);
        },
        error => {
          setLoading(false);
          const message = (error.response
              && error.response.data
              && error.response.data.message)
            || error.message
            || error.toString();
          setContent(message);
        },
      );
    
  }, []);
    /*
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  */
  if (!loading && content.length === 0) {
    appointments = (
      <h4>
        Vous n'avez pas encore de réservations. Faites en une.
        <Link to="/appointments/new">
          Ici
        </Link>
      </h4>
    );
  } else {
    appointments = content && content.map(appointment => {
      const d = new Date(appointment.appointment_date);
      const date = d.toString();
      return (
        
          <div className="card m-4">
            <div className="card-body">
              <p>
                Le &nbsp;
                {date}
              </p>
            </div>
          </div>
  
      );
    });
  }

  return (
    <div className="container text-center">
      <h3>Vos reservations</h3>
      {loading && <span className="spinner-border spinner-border-lg" />}
      <div className="d-flex flex-wrap">
        {appointments}
      </div>
    </div>
  );
};

export default Appointments;
