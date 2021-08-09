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
  course1: { code: "", name: "", color: "#16a085" },
  course2: { code: "", name: "", color: "#8e44ad" },
  course3: { code: "", name: "", color: "#f1c40f" },
  course4: { code: "", name: "", color: "#e74c3c" },
  course5: { code: "", name: "", color: "#95a5a6" },
  // Miscellaneous
  loading: false,
  errors: {},
  validProfile: true,
  secondMajor: false,
  thirdMajor: false,
  fifthCourse: false,
};

export default emptyProfile;
