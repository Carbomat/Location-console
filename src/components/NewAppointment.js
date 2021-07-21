import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { useAlert } from 'react-alert';
import userService from '../services/user.service';
import { setMessage } from '../actions/message';
import getDoctors from '../actions/user';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est requis !
      </div>
    );
  }
  return null;
};

const NewAppointment = ({ location }) => {
  const form = useRef();
  const checkBtn = useRef();
  const { user: currentUser } = useSelector(state => state.auth);
  const [doctorId, setDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const { message } = useSelector(state => state.message);
  const { doctors } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  useEffect(() => {
    if (location.doctorId) {
      setDoctorId(location.doctorId);
    } else {
      setDoctorId(1);
    }
    if (doctors.length === 0 && currentUser) {
      setLoadingDoctors(true);
      dispatch(getDoctors())
        .then(() => {
          setLoadingDoctors(false);
        })
        .catch(() => {
          dispatch(setMessage('Unable to get doctors list'));
        });
    }
  }, [doctors, dispatch]);

  const onChangDoctorId = e => {
    const doctorId = e.target.value;
    setDoctorId(doctorId);
  };

  const onChangAppointmentDate = e => {
    const appointmentDate = e.target.value;
    setAppointmentDate(appointmentDate);
  };

  const handleRegister = e => {
    e.preventDefault();
    setLoading(true);
    setSuccessful(false);

    form.current.validateAll();


      if (checkBtn.current.context._errors.length === 0) {
        console.log("datasend",doctorId,appointmentDate)
      userService.postAppointment(currentUser.user.id, doctorId, appointmentDate)
        .then(() => {
          setLoading(false);
          setSuccessful(true);
          alert.show('Reservation reussie', {
            type: 'success',
            timeout: 2000,
          });
        })
        .catch(() => {
          dispatch(setMessage('Something went wrong'));
          setLoading(false);
          setSuccessful(false);
        });
    } else {
      setLoading(false);
    }
  };
  const options = doctors.map(product => (
    <option
          key={product.id}
          value={product.id}
    >
          {product.name}
    </option>
  ));
    /*
  if (!currentUser) {
    return <Redirect to="/login" />;
  }*/
  if (successful) {
    return <Redirect to="/appointments" />;
  }
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="appointmentDate">Date de reservation</label>
                <Input
                  type="datetime-local"
                  className="form-control"
                  name="appointmentDate"
                  value={appointmentDate}
                  onChange={onChangAppointmentDate}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="doctorId">Select list:</label>
                <select className="form-control" id="doctorId" onChange={onChangDoctorId} value={doctorId}>
                  {loadingDoctors ? <option>Loading..</option> : options }
                </select>
              </div>
              <div className="form-group">
                <button className="btn btn-danger btn-block" disabled={loading || loadingDoctors} type="submit">
                  {loading && (
                  <span className="spinner-border spinner-border-sm" />
                  )}
                  <span>Reserver</span>
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

NewAppointment.propTypes = {
  location: PropTypes.shape({
    doctorId: PropTypes.number,
  }).isRequired,
};
export default NewAppointment;
