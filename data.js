window.APP_DATA = {
  app: {
    name: "Apprentice+",
    tagline: "Your Course, Your Way",
    version: "1.0.0-phase1",
    build: "2.4b"
  },
  defaultProfile: {
    firstName: "",
    lastName: "",
    preferredName: "",
    email: "",
    college: "",
    employer: "",
    signature: ""
  },
  defaultSettings: {
    activeTab: "home",
    activeCourseId: "bricklayer-st0095",
    notifications: true,
    dailyMotivation: true,
    appearance: "light",
    autoGeneratePdfs: true
  },
  courses: [
    {
      id: "bricklayer-st0095",
      name: "Bricklayer",
      reference: "ST0095",
      version: "1.2",
      level: 2,
      assignmentCount: 19,
      assignments: Array.from({ length: 19 }, (_, i) => ({
        id: `brick-a${i + 1}`,
        number: i + 1,
        title: [
          "Health and Safety", "Safe Systems of Work", "Environmental Practice", "Communication", "Inclusion and Wellbeing",
          "Drawings and Resources", "Tools and Equipment", "Materials and Mortar", "Brickwork Principles", "Standards and Quality",
          "Modern Methods and Digital", "Solid Walling", "Joint Finishes", "Measuring and Cutting", "Brick on Edge and Soldier Courses",
          "Cavity Wall Set-Out", "Cavity Wall with Openings", "Decorative Brickwork and Piers", "Integrated Brickwork Project"
        ][i],
        status: "not-started",
        ksbs: []
      })),
      ksbs: {
        knowledge: Array.from({ length: 31 }, (_, i) => ({ id: `K${i + 1}`, description: `Bricklayer knowledge requirement ${i + 1}` })),
        skills: Array.from({ length: 22 }, (_, i) => ({ id: `S${i + 1}`, description: `Bricklayer skill requirement ${i + 1}` })),
        behaviours: Array.from({ length: 6 }, (_, i) => ({ id: `B${i + 1}`, description: `Bricklayer behaviour requirement ${i + 1}` }))
      }
    },
    {
      id: "site-carpentry-st0264",
      name: "Site Carpentry",
      reference: "ST0264",
      version: "1.4",
      level: 2,
      assignmentCount: 20,
      assignments: Array.from({ length: 20 }, (_, i) => ({ id: `site-a${i + 1}`, number: i + 1, title: `Site Carpentry Assignment ${i + 1}`, status: "not-started", ksbs: [] })),
      ksbs: { knowledge: [], skills: [], behaviours: [] }
    },
    {
      id: "architectural-joiner-st0264",
      name: "Architectural Joiner",
      reference: "ST0264",
      version: "1.4",
      level: 2,
      assignmentCount: 20,
      assignments: Array.from({ length: 20 }, (_, i) => ({ id: `bench-a${i + 1}`, number: i + 1, title: `Architectural Joinery Assignment ${i + 1}`, status: "not-started", ksbs: [] })),
      ksbs: { knowledge: [], skills: [], behaviours: [] }
    },
    {
      id: "pmo-st0171",
      name: "Property Maintenance Operative",
      reference: "ST0171",
      version: "1.1",
      level: 2,
      assignmentCount: 24,
      assignments: Array.from({ length: 24 }, (_, i) => ({ id: `pmo-a${i + 1}`, number: i + 1, title: `Property Maintenance Assignment ${i + 1}`, status: "not-started", ksbs: [] })),
      ksbs: { knowledge: [], skills: [], behaviours: [] }
    }
  ],
  academyCategories: [
    { id: "core", title: "Core Learning", description: "Health, safety, equality, wellbeing and professional practice." },
    { id: "trade", title: "Trade Learning", description: "Course-specific technical knowledge and revision." },
    { id: "functional", title: "Functional Skills", description: "Maths and English support for apprentices." },
    { id: "epa", title: "EPA Preparation", description: "Mock tests, professional discussion and practical preparation." }
  ]
};
