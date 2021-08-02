const emptyProfile = {
  // Basic Info
  firstName: "",
  lastName: "",
  email: "",
  classYear: "",
  major1: "",
  major2: "",
  major3: "",
  preferredPronouns: "",
  // Interests
  interests1: [],
  interests2: [],
  interests3: [],
  // Courses
  course1: { code: "", name: "", color: "" },
  course2: { code: "", name: "", color: "" },
  course3: { code: "", name: "", color: "" },
  course4: { code: "", name: "", color: "" },
  course5: { code: "", name: "", color: "" },
  // Miscellaneous
  loading: false,
  errors: {},
  validProfile: true,
  secondMajor: false,
  thirdMajor: false,
  fifthCourse: false,
};

export default emptyProfile;
