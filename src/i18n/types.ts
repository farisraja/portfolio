export type Locale = 'id' | 'en'

export interface Dictionary {
  common: {
    language: string
    indonesian: string
    english: string
    otherLanguages: string
    switchLanguage: string
    currentLanguage: string
    close: string
    translateNotice: string
  }
  nav: {
    home: string
    projects: string
    skills: string
    about: string
    certificates: string
    experience: string
    contact: string
    contactMe: string
    toggleTheme: string
    cv?: string
  }
  hero: {
    typingPhrases: string[]
    subtitle: string
    viewProjects: string
    contactMe: string
    downloadCv: string
  }
  about: {
    badge: string
    title: string
    summary: string
  }
  experience: {
    badge: string
    title: string
    present: string
    roles: {
      pusdikMk: {
        title: string
        description: string
      }
      fmipaUnpak: {
        title: string
        description: string
      }
      surveyor: {
        title: string
        description: string
      }
    }
  }
  education: {
    badge: string
    title: string
    present: string
    degrees: {
      unpak: string
    }
  }
  skills: {
    badge: string
    title: string
    subtitle: string
  }
  projects: {
    selectedWork: string
    title: string
    description: string
    mode3D: string
    modeGrid: string
    viewDetails: string
    liveDemo: string
    sourceCode: string
    previous: string
    next: string
    slideOf: string
    appPreview: string
    projectsMap: Record<string, {
      title?: string
      summary?: string
      description?: string
    }>
  }
  certificates: {
    badge: string
    title: string
    description: string
    tabKhusus: string
    tabUmum: string
    tabKhususDesc: string
    tabUmumDesc: string
    clickToEnlarge: string
    closePreview: string
    credentialIdLabel: string
    verifyOnline: string
    noCertificates: string
    noCertificatesDesc: string
    certTranslations: Record<string, {
      title?: string
      description?: string
      categoryLabel?: string
    }>
  }
  contact: {
    badge: string
    title: string
    descriptionPrefix: string
    orText: string
    orProfileText: string
    period: string
  }
  projectDetail: {
    backToProjects: string
    visitWebsite: string
    sourceCode: string
    problemOrNeed: string
    myContribution: string
    keyFeatures: string
    technologiesUsed: string
    screenshotGallery: string
    clickToEnlarge: string
    resultsAndLearnings: string
    demo: string
  }
  footer: {
    rightsReserved: string
  }
}
