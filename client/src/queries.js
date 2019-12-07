import { gql } from 'apollo-boost';

export const SESSION_TIMES = gql`
  query($session: ID!, $userId: ID!) {
    sessionTimes(session: $session, userId: $userId) {
      time
      id
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

// GET ALL SESSIONS
//  {
//    sessions {
//      type
//    }
//  }

//Find times/ session 5de9691c860afac9d0ad8044 & 5de9644398c1d3c8e2f9281a - others, 5de98724bbc60acf10873df4 & 5de98706bbc60acf10873df3 - 20.72
// {
//   sessionTimes(session: "5de9691c860afac9d0ad8044", userId: "5de9644398c1d3c8e2f9281a") {
//     time
//     id
//   }
// }

// ADD A Session (me only)
// mutation {
//   addSession(type: "3x3") {
//     type
//   }
// }

//ADD A Time
// mutation {
//   addTime(userId: "5de98706bbc60acf10873df3", session: "5de98724bbc60acf10873df4", time: 20.72) {
//     time
//     userId(userId: "5de98706bbc60acf10873df3") {
//       name
//       id
//     }
//     session(session: "5de98724bbc60acf10873df4") {
//       type
//       id
//     }
//   }
// }


//Update time to time + 2
// mutation {
//   updateTime(timeId: "5de992ae889608d0460aa996", currTime: 10.72) {
//     time
//   }
// }

//Update time to DNF=True
// mutation {
//   dnfTime(timeId: "5de992ae889608d0460aa996") {
//     time
//     dnf
//   }
// }

//Delete one time
// mutation {
//   deleteTime(timeId: "5de992ae889608d0460aa996") {
//     time
//     id
//     dnf
//   }
// }

//Delete all times in a session based on session id and userId
// mutation {
//   deleteTimes(userId: "5de9644398c1d3c8e2f9281a", session: "5de9691c860afac9d0ad8044") {
//     acknowledged
//     deletedCount
//   }
// }