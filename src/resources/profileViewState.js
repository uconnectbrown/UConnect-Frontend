const profileViewState = {
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
  course1: { code: "", name: "", color: "" },
  course2: { code: "", name: "", color: "" },
  course3: { code: "", name: "", color: "" },
  course4: { code: "", name: "", color: "" },
  course5: { code: "", name: "", color: "" },
  imageUrl: "",
  // Required Edits
  firstName_: "",
  lastName_: "",
  classYear_: "",
  major1_: "",
  major2_: "",
  major3_: "",
  preferredPronouns_: "",
  interests1_: [],
  interests2_: [],
  interests3_: [],
  //Optional
  bio: "",
  varsitySport1: "",
  varsitySport2: "",
  group1: "",
  group2: "",
  group3: "",
  greekLife: "",
  pickUpSport1: "",
  pickUpSport2: "",
  pickUpSport3: "",
  // Optional Edits
  bio_: "",
  varsitySport1_: "",
  varsitySport2_: "",
  group1_: "",
  group2_: "",
  group3_: "",
  greekLife_: "",
  pickUpSport1_: "",
  pickUpSport2_: "",
  pickUpSport3_: "",
  // Dialog Controls
  imageOpen: false,
  bioOpen: false,
  groupsOpen: false,
  varsityOpen: false,
  interestsOpen: false,
  //
  addCourseCode: "",
  addCourseName: "",
  addCourseColor: "",
  affinitySports: [],

  class_: "",

  createdAt: "",
  delete: false,
  email: "",
  favorites: {},
  favoriteBook: "",
  favoriteMovie: "",
  favoriteShow: "",
  favoriteArtist: "",

  firstTime: false,

  greekOpen: false,

  groups: [],

  addOpen: false,
  removeOpen: false,
  deleteCourse: false,

  userId: "",

  varsitySports: [],

  basicOpen: false,

  favoritesOpen: false,

  loading: true,
  colorOpen: [false, false, false, false, false],
  courseColor: "",
  courseColor0: "",
  courseColor1: "",
  courseColor2: "",
  courseColor3: "",
  courseColor4: "",
  tabIndex: 0,
};

export default profileViewState;
