import axios from "axios";

const ipsum =
  "Bacon ipsum dolor amet burgdoggen frankfurter corned beef pork swine prosciutto pig doner chicken alcatra meatball chislic leberkas fatback. T-bone strip steak alcatra tenderloin pork chop kielbasa. Pork ball tip buffalo hamburger. Shankle porchetta venison sirloin flank. Prosciutto venison pastrami spare ribs ground round tenderloin. Jerky short ribs rump pastrami ribeye.";

// Input: integer event id number
// Output: event object
export async function getEvent(eventNumber) {
  return {
    eventId: eventNumber,
    eventTitle: "UConnect Launch Party",
    eventDescription: ipsum,
    eventDate: new Date(),
    eventLocation: "Petteruti Lounge",
    likeCount: Math.floor(Math.random() * 100),
    commentCount: Math.floor(Math.random() * 100),
    timeAgoPosted: Math.floor(Math.random() * 100),
    author: {
      displayName: "John Doe",
      avatar: "https://placekitten.com/g/64/64",
    },
    hostedBy: "UConnect Team",
    comments: [
      {
        author: {
          displayName: "John Doe",
          avatar: "https://placekitten.com/g/62/62",
        },
        timestamp: "1 hour ago",
        comment: "This is a comment",
        commentNumber: 1,
      },
      {
        author: {
          displayName: "Bob Smith",
          avatar: "https://placekitten.com/g/60/60",
        },
        timestamp: "2 hour ago",
        comment: "This is another comment!!!",
        commentNumber: 2,
      },
    ],
  };

  try {
    const response = await axios.get(`/api/events/${eventNumber}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Output: array of event objects
export async function getEvents() {
  return Array.from({ length: 10 }).map((_, idx) => ({
    eventId: idx,
    eventTitle: "UConnect Launch Party",
    eventDescription: ipsum,
    eventDate: new Date(),
    eventLocation: "Petteruti Lounge",
    likeCount: Math.floor(Math.random() * 100),
    commentCount: Math.floor(Math.random() * 100),
    timeAgoPosted: Math.floor(Math.random() * 100),
    author: {
      displayName: "John Doe",
      avatar: "https://placekitten.com/g/64/64",
    },
    hostedBy: "UConnect Team",
    comments: [
      {
        author: {
          displayName: "John Doe",
          avatar: "https://placekitten.com/g/62/62",
        },
        timestamp: "1 hour ago",
        comment: "This is a comment",
        commentNumber: 1,
      },
      {
        author: {
          displayName: "Bob Smith",
          avatar: "https://placekitten.com/g/60/60",
        },
        timestamp: "2 hour ago",
        comment: "This is another comment!!!",
        commentNumber: 2,
      },
    ],
  }));

  try {
    const response = await axios.get(`/api/events`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Output: array of post objects
export async function getModFeedEvents() {
  return Array.from({ length: 10 }).map((_, idx) => ({
    eventId: idx,
    eventTitle: "UConnect Launch Party",
    eventDescription: ipsum,
    eventDate: new Date(),
    eventLocation: "Petteruti Lounge",
    hostedBy: "UConnect Team",
    author: {
      displayName: "John Doe",
      avatar: "https://placekitten.com/g/64/64",
    },
  }));

  try {
    const response = await axios.get(`/api/events/modfeed`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Input: integer event id number, boolean for like or unlike
// Output: event object
export async function likeEvent(eventId, like) {
  try {
    const response = await axios.post(`/api/events/${eventId}/like`, {
      like,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Input: integer event id number, string comment text
// Output: event object
export async function postComment(eventId, comment) {
  try {
    const response = await axios.post(`/api/events/${eventId}/comment`, {
      comment,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Input: string attributes about the event, plus a Date object for the event date
// Output: event object
export async function postEvent(
  eventTitle,
  eventDescription,
  eventDate,
  eventLocation,
  hostedBy
) {
  try {
    const response = await axios.post(`/api/events`, {
      eventTitle,
      eventDescription,
      eventDate,
      eventLocation,
      hostedBy,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
