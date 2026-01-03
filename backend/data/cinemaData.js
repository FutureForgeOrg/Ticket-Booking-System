const cinemaData = [
  {
    name: "PVR Cinemas Phoenix",
    location: {
      name: "Phoenix Marketcity",
      city: "Mumbai",
      state: "Maharashtra"
    },
    screens: [
      {
        name: "Screen 1",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "A", number: 4, type: "regular" },
          { row: "A", number: 5, type: "regular" },
          { row: "B", number: 1, type: "regular" },
          { row: "B", number: 2, type: "regular" },
          { row: "B", number: 3, type: "regular" },
          { row: "B", number: 4, type: "regular" },
          { row: "B", number: 5, type: "regular" },
          { row: "C", number: 1, type: "premium" },
          { row: "C", number: 2, type: "premium" },
          { row: "C", number: 3, type: "premium" },
          { row: "C", number: 4, type: "premium" },
          { row: "C", number: 5, type: "premium" },
          { row: "D", number: 1, type: "vip" },
          { row: "D", number: 2, type: "vip" },
          { row: "D", number: 3, type: "vip" },
          { row: "D", number: 4, type: "vip" }
        ]
      },
      {
        name: "Screen 2",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "A", number: 4, type: "regular" },
          { row: "B", number: 1, type: "premium" },
          { row: "B", number: 2, type: "premium" },
          { row: "B", number: 3, type: "premium" },
          { row: "B", number: 4, type: "premium" },
          { row: "C", number: 1, type: "vip" },
          { row: "C", number: 2, type: "vip" }
        ]
      },
      {
        name: "Screen 3",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "B", number: 1, type: "regular" },
          { row: "B", number: 2, type: "regular" },
          { row: "B", number: 3, type: "regular" },
          { row: "C", number: 1, type: "premium" },
          { row: "C", number: 2, type: "premium" }
        ]
      }
    ]
  },
  {
    name: "INOX Nehru Place",
    location: {
      name: "Nehru Place Metro Station",
      city: "New Delhi",
      state: "Delhi"
    },
    screens: [
      {
        name: "Screen 1",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "A", number: 4, type: "regular" },
          { row: "A", number: 5, type: "regular" },
          { row: "A", number: 6, type: "regular" },
          { row: "B", number: 1, type: "regular" },
          { row: "B", number: 2, type: "regular" },
          { row: "B", number: 3, type: "regular" },
          { row: "B", number: 4, type: "regular" },
          { row: "B", number: 5, type: "regular" },
          { row: "B", number: 6, type: "regular" },
          { row: "C", number: 1, type: "premium" },
          { row: "C", number: 2, type: "premium" },
          { row: "C", number: 3, type: "premium" },
          { row: "C", number: 4, type: "premium" }
        ]
      },
      {
        name: "Screen 2",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "B", number: 1, type: "premium" },
          { row: "B", number: 2, type: "premium" },
          { row: "B", number: 3, type: "premium" },
          { row: "C", number: 1, type: "vip" },
          { row: "C", number: 2, type: "vip" }
        ]
      }
    ]
  },
  {
    name: "Cinepolis Fun Republic",
    location: {
      name: "Andheri West",
      city: "Mumbai",
      state: "Maharashtra"
    },
    screens: [
      {
        name: "Screen 1",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "A", number: 4, type: "regular" },
          { row: "B", number: 1, type: "regular" },
          { row: "B", number: 2, type: "regular" },
          { row: "B", number: 3, type: "regular" },
          { row: "B", number: 4, type: "regular" },
          { row: "C", number: 1, type: "premium" },
          { row: "C", number: 2, type: "premium" },
          { row: "C", number: 3, type: "premium" },
          { row: "D", number: 1, type: "vip" },
          { row: "D", number: 2, type: "vip" }
        ]
      },
      {
        name: "Screen 2",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "B", number: 1, type: "premium" },
          { row: "B", number: 2, type: "premium" },
          { row: "C", number: 1, type: "vip" },
          { row: "C", number: 2, type: "vip" }
        ]
      }
    ]
  },
  {
    name: "Carnival Cinemas Rave",
    location: {
      name: "Mani Square",
      city: "Kolkata",
      state: "West Bengal"
    },
    screens: [
      {
        name: "Screen 1",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "A", number: 4, type: "regular" },
          { row: "A", number: 5, type: "regular" },
          { row: "B", number: 1, type: "regular" },
          { row: "B", number: 2, type: "regular" },
          { row: "B", number: 3, type: "regular" },
          { row: "B", number: 4, type: "regular" },
          { row: "B", number: 5, type: "regular" },
          { row: "C", number: 1, type: "premium" },
          { row: "C", number: 2, type: "premium" },
          { row: "C", number: 3, type: "premium" }
        ]
      },
      {
        name: "Screen 2",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "B", number: 1, type: "premium" },
          { row: "B", number: 2, type: "premium" },
          { row: "C", number: 1, type: "vip" },
          { row: "C", number: 2, type: "vip" }
        ]
      },
      {
        name: "Screen 3",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "B", number: 1, type: "regular" },
          { row: "B", number: 2, type: "regular" },
          { row: "C", number: 1, type: "premium" },
          { row: "C", number: 2, type: "premium" }
        ]
      }
    ]
  },
  {
    name: "AGS Cinemas Navalur",
    location: {
      name: "OMR",
      city: "Chennai",
      state: "Tamil Nadu"
    },
    screens: [
      {
        name: "Screen 1",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "A", number: 4, type: "regular" },
          { row: "B", number: 1, type: "regular" },
          { row: "B", number: 2, type: "regular" },
          { row: "B", number: 3, type: "regular" },
          { row: "B", number: 4, type: "regular" },
          { row: "C", number: 1, type: "premium" },
          { row: "C", number: 2, type: "premium" },
          { row: "D", number: 1, type: "vip" },
          { row: "D", number: 2, type: "vip" }
        ]
      },
      {
        name: "Screen 2",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "B", number: 1, type: "premium" },
          { row: "B", number: 2, type: "premium" },
          { row: "C", number: 1, type: "vip" },
          { row: "C", number: 2, type: "vip" }
        ]
      }
    ]
  },
  {
    name: "Miraj Cinemas Wadala",
    location: {
      name: "Wadala East",
      city: "Mumbai",
      state: "Maharashtra"
    },
    screens: [
      {
        name: "Screen 1",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "A", number: 4, type: "regular" },
          { row: "A", number: 5, type: "regular" },
          { row: "B", number: 1, type: "regular" },
          { row: "B", number: 2, type: "regular" },
          { row: "B", number: 3, type: "regular" },
          { row: "B", number: 4, type: "regular" },
          { row: "B", number: 5, type: "regular" },
          { row: "C", number: 1, type: "premium" },
          { row: "C", number: 2, type: "premium" },
          { row: "C", number: 3, type: "premium" },
          { row: "C", number: 4, type: "premium" }
        ]
      },
      {
        name: "Screen 2",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "B", number: 1, type: "premium" },
          { row: "B", number: 2, type: "premium" },
          { row: "C", number: 1, type: "vip" },
          { row: "C", number: 2, type: "vip" }
        ]
      }
    ]
  },
  {
    name: "PVR Vegas Mall",
    location: {
      name: "Dwarka",
      city: "New Delhi",
      state: "Delhi"
    },
    screens: [
      {
        name: "Screen 1",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "A", number: 4, type: "regular" },
          { row: "B", number: 1, type: "regular" },
          { row: "B", number: 2, type: "regular" },
          { row: "B", number: 3, type: "regular" },
          { row: "B", number: 4, type: "regular" },
          { row: "C", number: 1, type: "premium" },
          { row: "C", number: 2, type: "premium" },
          { row: "C", number: 3, type: "premium" }
        ]
      },
      {
        name: "Screen 2",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "B", number: 1, type: "premium" },
          { row: "B", number: 2, type: "premium" },
          { row: "C", number: 1, type: "vip" },
          { row: "C", number: 2, type: "vip" }
        ]
      },
      {
        name: "Screen 3",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "B", number: 1, type: "regular" },
          { row: "B", number: 2, type: "regular" },
          { row: "B", number: 3, type: "regular" }
        ]
      }
    ]
  },
  {
    name: "INOX GVK One",
    location: {
      name: "Banjara Hills",
      city: "Hyderabad",
      state: "Telangana"
    },
    screens: [
      {
        name: "Screen 1",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "A", number: 4, type: "regular" },
          { row: "A", number: 5, type: "regular" },
          { row: "B", number: 1, type: "regular" },
          { row: "B", number: 2, type: "regular" },
          { row: "B", number: 3, type: "regular" },
          { row: "B", number: 4, type: "regular" },
          { row: "B", number: 5, type: "regular" },
          { row: "C", number: 1, type: "premium" },
          { row: "C", number: 2, type: "premium" },
          { row: "C", number: 3, type: "premium" },
          { row: "D", number: 1, type: "vip" },
          { row: "D", number: 2, type: "vip" }
        ]
      },
      {
        name: "Screen 2",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "B", number: 1, type: "premium" },
          { row: "B", number: 2, type: "premium" },
          { row: "C", number: 1, type: "vip" },
          { row: "C", number: 2, type: "vip" }
        ]
      }
    ]
  },
  {
    name: "Cinepolis Seasons Mall",
    location: {
      name: "Magarpatta",
      city: "Pune",
      state: "Maharashtra"
    },
    screens: [
      {
        name: "Screen 1",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "A", number: 4, type: "regular" },
          { row: "B", number: 1, type: "regular" },
          { row: "B", number: 2, type: "regular" },
          { row: "B", number: 3, type: "regular" },
          { row: "B", number: 4, type: "regular" },
          { row: "C", number: 1, type: "premium" },
          { row: "C", number: 2, type: "premium" },
          { row: "C", number: 3, type: "premium" }
        ]
      },
      {
        name: "Screen 2",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "B", number: 1, type: "premium" },
          { row: "B", number: 2, type: "premium" },
          { row: "C", number: 1, type: "vip" },
          { row: "C", number: 2, type: "vip" }
        ]
      }
    ]
  },
  {
    name: "PVR Orion Mall",
    location: {
      name: "Rajajinagar",
      city: "Bengaluru",
      state: "Karnataka"
    },
    screens: [
      {
        name: "Screen 1",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "A", number: 4, type: "regular" },
          { row: "A", number: 5, type: "regular" },
          { row: "A", number: 6, type: "regular" },
          { row: "B", number: 1, type: "regular" },
          { row: "B", number: 2, type: "regular" },
          { row: "B", number: 3, type: "regular" },
          { row: "B", number: 4, type: "regular" },
          { row: "B", number: 5, type: "regular" },
          { row: "B", number: 6, type: "regular" },
          { row: "C", number: 1, type: "premium" },
          { row: "C", number: 2, type: "premium" },
          { row: "C", number: 3, type: "premium" },
          { row: "C", number: 4, type: "premium" },
          { row: "D", number: 1, type: "vip" },
          { row: "D", number: 2, type: "vip" },
          { row: "D", number: 3, type: "vip" }
        ]
      },
      {
        name: "Screen 2",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "A", number: 4, type: "regular" },
          { row: "B", number: 1, type: "premium" },
          { row: "B", number: 2, type: "premium" },
          { row: "B", number: 3, type: "premium" },
          { row: "C", number: 1, type: "vip" },
          { row: "C", number: 2, type: "vip" }
        ]
      },
      {
        name: "Screen 3",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "B", number: 1, type: "premium" },
          { row: "B", number: 2, type: "premium" }
        ]
      }
    ]
  },
  {
    name: "Carnival Cinemas City Centre",
    location: {
      name: "Salt Lake",
      city: "Kolkata",
      state: "West Bengal"
    },
    screens: [
      {
        name: "Screen 1",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "A", number: 4, type: "regular" },
          { row: "B", number: 1, type: "regular" },
          { row: "B", number: 2, type: "regular" },
          { row: "B", number: 3, type: "regular" },
          { row: "B", number: 4, type: "regular" },
          { row: "C", number: 1, type: "premium" },
          { row: "C", number: 2, type: "premium" },
          { row: "D", number: 1, type: "vip" },
          { row: "D", number: 2, type: "vip" }
        ]
      },
      {
        name: "Screen 2",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "B", number: 1, type: "premium" },
          { row: "B", number: 2, type: "premium" },
          { row: "C", number: 1, type: "vip" }
        ]
      }
    ]
  },
  {
    name: "INOX Himalaya Mall",
    location: {
      name: "Drive In Road",
      city: "Ahmedabad",
      state: "Gujarat"
    },
    screens: [
      {
        name: "Screen 1",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "A", number: 4, type: "regular" },
          { row: "A", number: 5, type: "regular" },
          { row: "B", number: 1, type: "regular" },
          { row: "B", number: 2, type: "regular" },
          { row: "B", number: 3, type: "regular" },
          { row: "B", number: 4, type: "regular" },
          { row: "B", number: 5, type: "regular" },
          { row: "C", number: 1, type: "premium" },
          { row: "C", number: 2, type: "premium" },
          { row: "C", number: 3, type: "premium" }
        ]
      },
      {
        name: "Screen 2",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "B", number: 1, type: "premium" },
          { row: "B", number: 2, type: "premium" },
          { row: "C", number: 1, type: "vip" },
          { row: "C", number: 2, type: "vip" }
        ]
      }
    ]
  },
  {
    name: "PVR Lulu Mall",
    location: {
      name: "Edappally",
      city: "Kochi",
      state: "Kerala"
    },
    screens: [
      {
        name: "Screen 1",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "A", number: 4, type: "regular" },
          { row: "B", number: 1, type: "regular" },
          { row: "B", number: 2, type: "regular" },
          { row: "B", number: 3, type: "regular" },
          { row: "B", number: 4, type: "regular" },
          { row: "C", number: 1, type: "premium" },
          { row: "C", number: 2, type: "premium" },
          { row: "C", number: 3, type: "premium" },
          { row: "D", number: 1, type: "vip" },
          { row: "D", number: 2, type: "vip" }
        ]
      },
      {
        name: "Screen 2",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "B", number: 1, type: "premium" },
          { row: "B", number: 2, type: "premium" },
          { row: "C", number: 1, type: "vip" },
          { row: "C", number: 2, type: "vip" }
        ]
      },
      {
        name: "Screen 3",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "B", number: 1, type: "premium" },
          { row: "B", number: 2, type: "premium" }
        ]
      }
    ]
  },
  {
    name: "Cinepolis Mantri Square",
    location: {
      name: "Malleshwaram",
      city: "Bengaluru",
      state: "Karnataka"
    },
    screens: [
      {
        name: "Screen 1",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "A", number: 4, type: "regular" },
          { row: "A", number: 5, type: "regular" },
          { row: "B", number: 1, type: "regular" },
          { row: "B", number: 2, type: "regular" },
          { row: "B", number: 3, type: "regular" },
          { row: "B", number: 4, type: "regular" },
          { row: "B", number: 5, type: "regular" },
          { row: "C", number: 1, type: "premium" },
          { row: "C", number: 2, type: "premium" },
          { row: "C", number: 3, type: "premium" },
          { row: "C", number: 4, type: "premium" }
        ]
      },
      {
        name: "Screen 2",
        seats: [
          { row: "A", number: 1, type: "regular" },
          { row: "A", number: 2, type: "regular" },
          { row: "A", number: 3, type: "regular" },
          { row: "B", number: 1, type: "premium" },
          { row: "B", number: 2, type: "premium" },
          { row: "C", number: 1, type: "vip" },
          { row: "C", number: 2, type: "vip" }
        ]
      }
    ]
  },
];


export default cinemaData;