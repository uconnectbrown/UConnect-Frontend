const majors = (
  <datalist id="majors">
    <option value="Africana Studies" />
    <option value="American Studies" />
    <option value="Anthropology" />
    <option value="Applied Mathematics" />
    <option value="Applied Mathematics-Biology" />
    <option value="Applied Mathematics-Computer Science" />
    <option value="Applied Mathematics-Economics" />
    <option value="Archaeology and the Ancient World" />
    <option value="Architecture" />
    <option value="Astronomy" />
    <option value="Behavioral Decision Sciences" />
    <option value="Biochemistry and Molecular Biology" />
    <option value="Biology" />
    <option value="Biomedical Engineering" />
    <option value="Biophysics" />
    <option value="Business, Entrepreneurship, and Organizations" />
    <option value="Chemical Physics" />
    <option value="Chemistry" />
    <option value="Classics" />
    <option value="Cognitive Neuroscience" />
    <option value="Cognitive Science" />
    <option value="Comparative Literature" />
    <option value="Computational Biology" />
    <option value="Computer Science" />
    <option value="Computer Science-Economics" />
    <option value="Contemplative Studies" />
    <option value="Development Studies" />
    <option value="Early Modern World" />
    <option value="East Asian Studies" />
    <option value="Economics" />
    <option value="Education Studies" />
    <option value="Egyptology and Assyriology" />
    <option value="Engineering" />
    <option value="Engineering and Physics" />
    <option value="English" />
    <option value="Environmental Studies" />
    <option value="Ethnic Studies" />
    <option value="French and Francophone Studies" />
    <option value="Gender and Sexuality Studies" />
    <option value="Geological Sciences" />
    <option value="Geology-Biology" />
    <option value="Geology-Chemistry" />
    <option value="Geology-Physics/Mathematics" />
    <option value="German Studies" />
    <option value="Health and Human Biology" />
    <option value="Hispanic Literatures and Cultures" />
    <option value="History" />
    <option value="History of Art and Architecture" />
    <option value="International and Public Affairs" />
    <option value="International Relations" />
    <option value="Italian Studies" />
    <option value="Judaic Studies" />
    <option value="Latin American and Caribbean Studies" />
    <option value="Linguistics" />
    <option value="Literary Arts" />
    <option value="Mathematics" />
    <option value="Mathematics-Computer Science" />
    <option value="Mathematics-Economics" />
    <option value="Medieval Cultures" />
    <option value="Middle East Studies" />
    <option value="Modern Culture and Media" />
    <option value="Music" />
    <option value="Neuroscience" />
    <option value="Philosophy" />
    <option value="Physics" />
    <option value="Physics and Philosophy" />
    <option value="Political Science" />
    <option value="Portuguese and Brazilian Studies" />
    <option value="Psychology" />
    <option value="Public Health" />
    <option value="Public Policy" />
    <option value="Religious Studies" />
    <option value="Science, Technology, and Society" />
    <option value="Slavic Studies" />
    <option value="Social Analysis and Research" />
    <option value="Sociology" />
    <option value="South Asian Studies" />
    <option value="Statistics" />
    <option value="Theatre Arts and Performance Studies" />
    <option value="Undecided" />
    <option value="Urban Studies" />
    <option value="Visual Art" />
  </datalist>
);

const CandAinterests = [
  "Academic and Scientific Research",
  "Architecture",
  "Art and Design",
  "Astronomy",
  "Finance and Economics",
  "Business and Marketing",
  "Computer Science and Web Design",
  "Cultural and Social Studies",
  "Data Science",
  "Education",
  "Engineering",
  "English",
  "Environment and Sustainability",
  "Entrepreneurship",
  "Health Care and Medicine",
  "History and Philosophy",
  "Innovation and Technology",
  "International Relations",
  "Journalism and Media",
  "Government, Law, and Public Policy",
  "Cognitive and Linguistic Studies",
  "Math and Statistics",
  "Natural and Physical Sciences",
  "Performing Arts",
];

const GHinterests = [
  "Animals and Pets",
  "Artistic Creation",
  "Baking and Cooking",
  "Board and Card Games",
  "Concerts and Festivals",
  "Clubs and Nightlife",
  "Home and Garden",
  "Media and Podcasts",
  "Movies",
  "Music",
  "Photography",
  "Plane, Trains, and Automobiles",
  "Reading and Writing",
  "Shopping and Fashion",
  "Theatre and Performing Arts",
  "Traveling",
  "TV/Shows",
  "Video Games",
];

const PAandWinterests = [
  "Baseball",
  "Basketball",
  "Boxing, MMA, and Wrestling",
  "Cycling",
  "Dance",
  "Football",
  "Golf",
  "Hiking and Camping",
  "Hunting and Fishing",
  "Meditation and Yoga",
  "Motor Sports",
  "Food and Nutrition",
  "Exercising and Working Out",
  "Sleep and Recovery",
  "Soccer",
  "Swimming and Diving",
  "Tennis",
  "Track and Field",
  "Water Sports",
  "Winter Sports",
];

const pronouns = (
  <datalist id="pronouns">
    <option value="he/him" />
    <option value="she/her" />
    <option value="they/their" />
    <option value="ze/hir" />
  </datalist>
);

const countries = [
  "United States of America",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const states = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Federated States of Micronesia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Marshall Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Palau",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Island",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export {
  majors,
  CandAinterests,
  PAandWinterests,
  GHinterests,
  pronouns,
  countries,
  states,
};
