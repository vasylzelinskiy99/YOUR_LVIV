import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom'
import {Card, Col, Row} from 'antd';
import axios from 'axios'
import EventsListItem from '../containers/EventsListItem'

export const FETCH_EVENTS = 'FETCH_EVENTS'
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS'
export const FETCH_EVENTS_ERROR = "FETCH_EVENTS_ERROR"

export function fetchEvents(filter) {
   return function (dispatch) {
    dispatch({type: FETCH_EVENTS})
    return axios.get('http://localhost:3001/events?lat=49.839683&lng=24.029717&distance=5000&sort=time&'+filter+'accessToken=194370554467183|qb0BhT3-pFuCRHDxDRbebnbGlpY')
      .then((response) => {
        dispatch(receiveEvents(response))
      })
      .catch((err) => {
      dispatch({type: FETCH_EVENTS_ERROR, payload: err})
      })
   }
}


export function receiveEvents(response) {
  var events = response.data.events.map((event) => {
    return (<Col key={event.id} span={6} style={{
        margin: '1em 0'
      }}>
      <Link to={{
          pathname: '/event'
        }}>
        <EventsListItem id={event.id} title={event.name} description={event.description} img={event.coverPicture} place={event.place.name} time={event.startTime}/>
        </Link>
    </Col>)
  })
    return {
        type: RECEIVE_EVENTS,
        payload: {
            events: events
        }
    };
}