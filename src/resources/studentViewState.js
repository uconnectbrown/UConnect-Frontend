const studentViewState = {
  // Required
  firstName: "",
  lastName: "",
  classYear: "",
  major1: "",
  major2: "",
  major3: "",
  preferredPronouns: "",
  interests1: [],
  interests2: [],
  interests3: [],
  courses: [{}, {}, {}, {}, {}],
  imageUrl: "",
  // Optional
  bio: "",
  varsitySport1: "",
  varsitySport2: "",
  group1: "",
  group2: "",
  group3: "",
  greekLife: "",
  instrument1: "",
  instrument2: "",
  instrument3: "",
  pickUpSport1: "",
  pickUpSport2: "",
  pickUpSport3: "",
  pet1: "",
  pet2: "",
  pet3: "",
  favoriteBook: "",
  favoriteMovie: "",
  favoriteShow: "",
  favoriteArtist: "",
  // Props from courseView
  // Send back on return
  code: "",
  name: "",
  color: "",
  numCourses: "",
  // Prop for studentView
  studentEmail: "",
};

export default studentViewState;
