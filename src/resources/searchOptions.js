const searchTypes = [
  {
    value: 0,
    label: "Name",
  },
  {
    value: 1,
    label: "Class Year",
  },
  {
    value: 2,
    label: "Concentration",
  },
  {
    value: 3,
    label: "Varsity Sport",
  },
  {
    value: 4,
    label: "Pickup Sport",
  },
  {
    value: 5,
    label: "Instrument",
  },
];

const classYears = [
  {
    value: "2021.5",
    label: "2021.5",
  },
  {
    value: "2022",
    label: "2022",
  },
  {
    value: "2022.5",
    label: "2022.5",
  },
  {
    value: "2023",
    label: "2023",
  },
  {
    value: "2023.5",
    label: "2023.5",
  },
  {
    value: "2024",
    label: "2024",
  },
  {
    value: "2024.5",
    label: "2024.5",
  },
  {
    value: "2025",
    label: "2025",
  },
];

const majors = [
  { value: "Africana Studies", label: "Africana Studies" },
  { value: "American Studies", label: "American Studies" },
  { value: "Anthropology", label: "Anthropology" },
  { value: "Applied Mathematics", label: "Applied Mathematics" },
  {
    value: "Applied Mathematics-Biology",
    label: "Applied Mathematics-Biology",
  },
  {
    value: "Applied Mathematics-Computer Science",
    label: "Applied Mathematics-Computer Science",
  },
  {
    value: "Applied Mathematics-Economics",
    label: "Applied Mathematics-Economics",
  },
  {
    value: "Archaeology and the Ancient World",
    label: "Archaeology and the Ancient World",
  },
  { value: "Architecture", label: "Architecture" },
  { value: "Astronomy", label: "Astronomy" },
  {
    value: "Behavioral Decision Sciences",
    label: "Behavioral Decision Sciences",
  },
  {
    value: "Biochemistry and Molecular Biology",
    label: "Biochemistry and Molecular Biology",
  },
  { value: "Biology", label: "Biology" },
  { value: "Biomedical Engineering", label: "Biomedical Engineering" },
  { value: "Biophysics", label: "Biophysics" },
  {
    value: "Business, Entrepreneurship, and Organizations",
    label: "Business, Entrepreneurship, and Organizations",
  },
  { value: "Chemical Physics", label: "Chemical Physics" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Classics", label: "Classics" },
  { value: "Cognitive Neuroscience", label: "Cognitive Neuroscience" },
  { value: "Cognitive Science", label: "Cognitive Science" },
  { value: "Comparative Literature", label: "Comparative Literature" },
  { value: "Computational Biology", label: "Computational Biology" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Computer Science-Economics", label: "Computer Science-Economics" },
  { value: "Contemplative Studies", label: "Contemplative Studies" },
  { value: "Development Studies", label: "Development Studies" },
  { value: "Early Modern World", label: "Early Modern World" },
  { value: "East Asian Studies", label: "East Asian Studies" },
  { value: "Economics", label: "Economics" },
  { value: "Education Studies", label: "Education Studies" },
  { value: "Egyptology and Assyriology", label: "Egyptology and Assyriology" },
  { value: "Engineering", label: "Engineering" },
  { value: "Engineering and Physics", label: "Engineering and Physics" },
  { value: "English", label: "English" },
  { value: "Environmental Studies", label: "Environmental Studies" },
  { value: "Ethnic Studies", label: "Ethnic Studies" },
  {
    value: "French and Francophone Studies",
    label: "French and Francophone Studies",
  },
  {
    value: "Gender and Sexuality Studies",
    label: "Gender and Sexuality Studies",
  },
  { value: "Geological Sciences", label: "Geological Sciences" },
  { value: "Geology-Biology", label: "Geology-Biology" },
  { value: "Geology-Chemistry", label: "Geology-Chemistry" },
  {
    value: "Geology-Physics/Mathematics",
    label: "Geology-Physics/Mathematics",
  },
  { value: "German Studies", label: "German Studies" },
  { value: "Health and Human Biology", label: "Health and Human Biology" },
  {
    value: "Hispanic Literatures and Cultures",
    label: "Hispanic Literatures and Cultures",
  },
  { value: "History", label: "History" },
  {
    value: "History of Art and Architecture",
    label: "History of Art and Architecture",
  },
  {
    value: "International and Public Affairs",
    label: "International and Public Affairs",
  },
  { value: "International Relations", label: "International Relations" },
  { value: "Italian Studies", label: "Italian Studies" },
  { value: "Judaic Studies", label: "Judaic Studies" },
  {
    value: "Latin American and Caribbean Studies",
    label: "Latin American and Caribbean Studies",
  },
  { value: "Linguistics", label: "Linguistics" },
  { value: "Literary Arts", label: "Literary Arts" },
  { value: "Mathematics", label: "Mathematics" },
  {
    value: "Mathematics-Computer Science",
    label: "Mathematics-Computer Science",
  },
  { value: "Mathematics-Economics", label: "Mathematics-Economics" },
  { value: "Medieval Cultures", label: "Medieval Cultures" },
  { value: "Middle East Studies", label: "Middle East Studies" },
  { value: "Modern Culture and Media", label: "Modern Culture and Media" },
  { value: "Music", label: "Music" },
  { value: "Neuroscience", label: "Neuroscience" },
  { value: "Philosophy", label: "Philosophy" },
  { value: "Physics", label: "Physics" },
  { value: "Physics and Philosophy", label: "Physics and Philosophy" },
  { value: "Political Science", label: "Political Science" },
  {
    value: "Portuguese and Brazilian Studies",
    label: "Portuguese and Brazilian Studies",
  },
  { value: "Psychology", label: "Psychology" },
  { value: "Public Health", label: "Public Health" },
  { value: "Public Policy", label: "Public Policy" },
  { value: "Religious Studies", label: "Religious Studies" },
  {
    value: "Science, Technology, and Society",
    label: "Science, Technology, and Society",
  },
  { value: "Slavic Studies", label: "Slavic Studies" },
  {
    value: "Social Analysis and Research",
    label: "Social Analysis and Research",
  },
  { value: "Sociology", label: "Sociology" },
  { value: "South Asian Studies", label: "South Asian Studies" },
  { value: "Statistics", label: "Statistics" },
  {
    value: "Theatre Arts and Performance Studies",
    label: "Theatre Arts and Performance Studies",
  },
  { value: "Urban Studies", label: "Urban Studies" },
  { value: "Visual Art", label: "Visual Art" },
];

const varsitySports = [
  { value: "Baseball", label: "Baseball", disabled: false },
  { value: "Basketball", label: "Basketball", disabled: false },
  { value: "Crew", label: "Crew", disabled: false },
  { value: "Cross Country", label: "Cross Country", disabled: false },
  { value: "Equestrian", label: "Equestrian", disabled: false },
  { value: "Fencing", label: "Fencing", disabled: false },
  { value: "Field Hockey", label: "Field Hockey", disabled: false },
  { value: "Football", label: "Football", disabled: false },
  { value: "Gymnastics", label: "Gymnastics", disabled: false },
  { value: "Ice Hockey", label: "Ice Hockey", disabled: false },
  { value: "Lacrosse", label: "Lacrosse", disabled: false },
  { value: "Rugby", label: "Rugby", disabled: false },
  { value: "Sailing", label: "Sailing", disabled: false },
  { value: "Soccer", label: "Soccer", disabled: false },
  { value: "Softball", label: "Softball", disabled: false },
  {
    value: "Swimming and Diving",
    label: "Swimming and Diving",
    disabled: false,
  },
  { value: "Tennis", label: "Tennis", disabled: false },
  { value: "Track and Field", label: "Track and Field", disabled: false },
  { value: "Volleyball", label: "Volleyball", disabled: false },
  { value: "Water Polo", label: "Water Polo", disabled: false },
  { value: "Wrestling", label: "Wrestling", disabled: false },
];

const pickUpSports = [
  { value: "Basketball", label: "Basketball", disabled: false },
  { value: "Football", label: "Football", disabled: false },
  { value: "Soccer", label: "Soccer", disabled: false },
  { value: "Spikeball", label: "Spikeball", disabled: false },
  { value: "Table Tennis", label: "Table Tennis", disabled: false },
  { value: "Tennis", label: "Tennis", disabled: false },
  { value: "Ultimate Frisbee", label: "Ultimate Frisbee", disabled: false },
  { value: "Volleyball", label: "Volleyball", disabled: false },
];

const instruments = [
  { value: "Bass", label: "Bass", disabled: false },
  { value: "Cello", label: "Cello", disabled: false },
  { value: "Clarinet", label: "Clarinet", disabled: false },
  { value: "Drums", label: "Drums", disabled: false },
  { value: "Flute", label: "Flute", disabled: false },
  { value: "Guitar", label: "Guitar", disabled: false },
  { value: "Piano", label: "Piano", disabled: false },
  { value: "Saxophone", label: "Saxophone", disabled: false },
  { value: "Trumpet", label: "Trumpet", disabled: false },
  { value: "Violin", label: "Violin", disabled: false },
  { value: "Vocals", label: "Vocals", disabled: false },
];

const searchOptions = [
  [],
  classYears,
  majors,
  varsitySports,
  pickUpSports,
  instruments,
];

export { searchOptions, searchTypes, classYears, majors };
