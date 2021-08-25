exports.validProfile = (profile) => {
  if (
    profile.firstName &&
    profile.lastName &&
    profile.classYear &&
    profile.majors.filter(Boolean).length > 0 &&
    profile.interests1.length +
      profile.interests2.length +
      profile.interests3.length ===
      10 &&
    profile.interests1.length > 0 &&
    profile.interests2.length > 0 &&
    profile.interests3.length > 0
  ) {
    return true;
  }
};
