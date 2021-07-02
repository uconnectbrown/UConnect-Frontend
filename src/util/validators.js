exports.validProfile = (profile) => {
  if (
    profile.firstName &&
    profile.lastName &&
    profile.class &&
    profile.interests.filter(Boolean).length > 2 &&
    profile.majors.filter(Boolean).length > 0 &&
    profile.favorites.movie &&
    profile.favorites.book &&
    profile.favorites.tvShow &&
    profile.favorites.artist &&
    profile.courses.filter((course) => Object.keys(course).length > 1).length >
      2
  ) {
    return true;
  }
};