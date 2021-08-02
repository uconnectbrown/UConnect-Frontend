exports.validProfile = (profile) => {
  if (
    profile.firstName &&
    profile.lastName &&
    profile.classYear &&
    profile.majors.filter(Boolean).length > 0 &&
    profile.courses.filter((course) => course.code.length > 4).length > 1 &&
    profile.interests1.length +
      profile.interests2.length +
      profile.interests3.length ===
      10
  ) {
    return true;
  }
};
