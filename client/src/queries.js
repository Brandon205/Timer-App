import { gql } from 'apollo-boost';

export const SESSION_TIMES = gql`
  query($session: ID!, $userId: ID!) {
    sessionTimes(session: $session, userId: $userId) {
      time
      id
      dnf
    }
  }
`

export const SESSIONS = gql`
  {
    sessions {
      id
      type
    }
  }
`

export const SESSION = gql`
  query($search: String) {
    session(search: $search) {
      id
    }
  }
`

export const BESTS = gql`
  query($userId: ID!) {
    bests(userId: $userId) {
      pbs
    }
  }
`

export const ADD_TIME = gql`
  mutation($userId: ID!, $session: ID!, $time: String) {
    addTime(userId: $userId, session: $session, time: $time) {
      time
    }
  }
`

export const ADD_TWO = gql`
  mutation($timeId: ID!, $currTime: Number) {
    updateTime(timeId: $timeId, currTime: $currTime) {
      time
    }
  }
`

export const DNF_TIME = gql`
  mutation($timeId: ID!) {
    dnfTime(timeId: $timeId) {
      time
    }
  }
`

export const DELETE_TIME = gql`
  mutation($timeId: ID!) {
    deleteTime(timeId: $timeId) {
      time
    }
  }
`

export const DELETE_TIMES = gql`
  mutation($userId: ID!, $session: ID!) {
    deleteTimes(userId: $userId, session: $session) {
      acknowledged
      deletedCount
    }
  }
`
