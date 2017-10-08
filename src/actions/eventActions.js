/**
 * Created by jolaadeadewale on 08/10/2017.
 */
import * as Types from './actionTypes';
import EventApi from '../api/eventApi';

export function getEventsSuccess(event) {
    return {
        type: Types.GET_EVENTS,  event
    }
}

export function getSponsoredSuccess(sponsor){
    return {
        type: Types.GET_SPONSORED, sponsor
    }
}

export function getEvents () {
    return dispatch => {
        return EventApi.getEvents().then(data => {
            dispatch(getEventsSuccess(data));
        }).catch(err=> {
            throw(err);
        })
    }
}

export function getSponsored() {
    return dispatch => {
        return EventApi.getSponsors().then(data => {
            dispatch(getSponsoredSuccess(data));
        }).catch(err=> {
            throw(err);
        })
    }
}
