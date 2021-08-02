const emptyProfile = {
  // Basic Info
  firstName: "",
  lastName: "",
  email: "",
  classYear: "",
  majorOne: "",
  majorTwo: "",
  majorThree: "",
  preferredPronouns: "",
  // Interests
  interests1: [],
  interests2: [],
  interests3: [],
  // Courses
  courseOne: { code: "", name: "", color: "" },
  courseTwo: { code: "", name: "", color: "" },
  courseThree: { code: "", name: "", color: "" },
  courseFour: { code: "", name: "", color: "" },
  courseFive: { code: "", name: "", color: "" },
  // Miscellaneous
  loading: false,
  errors: {},
  validProfile: true,
  secondMajor: false,
  thirdMajor: false,
  fifthCourse: false,
};

export default emptyProfile;
