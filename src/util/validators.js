exports.validProfile = (profile) => {
  if (
    profile.firstName &&
    profile.lastName &&
    profile.classYear &&
    profile.majors.filter(Boolean).length > 0 &&
    profile.interests1.length === 3 &&
    profile.interests2.length === 3 &&
    profile.interests3.length === 3 &&
    profile.imageUrl !==
      "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media"
  ) {
    return true;
  }
};
