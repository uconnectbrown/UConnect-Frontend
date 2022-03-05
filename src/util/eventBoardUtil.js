import axios from "axios";

const ipsum =
  "Bacon ipsum dolor amet burgdoggen frankfurter corned beef pork swine prosciutto pig doner chicken alcatra meatball chislic leberkas fatback. T-bone strip steak alcatra tenderloin pork chop kielbasa. Pork ball tip buffalo hamburger. Shankle porchetta venison sirloin flank. Prosciutto venison pastrami spare ribs ground round tenderloin. Jerky short ribs rump pastrami ribeye.";

// Input: integer event id number
// Output: event object
export async function getEvent(eventNumber) {
  try {
    const response = await axios.get(
      `/v1/event-board/anonymous/event/get?index=${eventNumber}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Output: array of event objects
export async function getEvents() {
  try {
    const response = await axios.get(
      "/v1/event-board/anonymous/event/get-latest",
      {
        startIndex: -1,
        eventCount: 10,
      }
    );
    return response.data.events;
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

// Input: string parent (either an event or a comment)'s id, string comment text, string author name, boolean if comment is anon
// Output: response body
export async function postComment(parentId, content, author, isAnonymous) {
  const identity = isAnonymous ? "anonymous" : "verified";
  try {
    const response = await axios.post(
      `/v1/event-board/${identity}/comment/new`,
      {
        parentId: parentId,
        author: author,
        content: content,
        anonymous: isAnonymous,
      }
    );
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
  hostedBy,
  isAnonymous,
  author
) {
  try {
    const response = await axios.post("/v1/event-board/verified/event/new", {
      title: eventTitle,
      author: author.firstName,
      host: hostedBy,
      description: eventDescription,
      date: eventDate,
      location: eventLocation,
      isAnonymous,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}