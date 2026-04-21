export const en = {
  meta: {
    title: "Social Comment Generator",
    description:
      "Create transparent PNG TikTok-style and Instagram-style comment mockups.",
    landingTitle: "Social Comment Generator | TikTok & Instagram Comment Mockups",
    landingDescription:
      "Create realistic TikTok-style and Instagram-style comment mockups as transparent PNGs. Independent tool for creators, marketers, parody, education, and concept work.",
    generatorTitle: "Comment Mockup Generator | TikTok & Instagram PNG Export",
    generatorDescription:
      "Generate bilingual social comment mockups with custom avatars, colors, replies, verified badges, and transparent PNG export.",
  },
  nav: {
    home: "Home",
    generator: "Generator",
    login: "Login",
    logout: "Logout",
    language: "Language",
  },
  footer: {
    disclaimer:
      "Independent mockup-generation tool. Not affiliated with TikTok, Instagram, Meta, or WhatsApp.",
    terms: "Terms",
    privacy: "Privacy",
  },
  landing: {
    eyebrow: "Bilingual social mockup studio",
    title: "Social Comment Generator",
    body: "Build convincing comment visuals for edits, decks, concepts, and social content without leaving your browser.",
    primaryCta: "Open generator",
    secondaryCta: "View preview",
    stats: ["Transparent PNG", "TikTok-style", "Instagram-style"],
    featuresTitle: "Phase 1 tools",
    features: [
      {
        title: "Platform-specific mockups",
        body: "Switch between TikTok-style and Instagram-style renderers with reusable data.",
      },
      {
        title: "Local recent history",
        body: "Keep the last five mockups in your browser and reuse any of them instantly.",
      },
      {
        title: "Account-aware output",
        body: "Anonymous exports include a subtle watermark; logged-in exports unlock verified badges and remove it.",
      },
    ],
    useCasesTitle: "Made for fast creator workflows",
    useCases: ["Short-form edits", "Marketing concepts", "Presentation assets"],
    ctaTitle: "Start with a polished comment, then export it cleanly.",
    ctaBody:
      "The first phase keeps everything lightweight: local form state, browser history, and transparent PNG export.",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        question: "How do I generate a comment mockup?",
        answer:
          "Open the generator, choose a style, edit the comment details, then export a transparent PNG.",
      },
      {
        question: "Do I need a real Instagram or TikTok account?",
        answer:
          "No. This creates visual mockups only and does not connect to real social accounts.",
      },
      {
        question: "Is this an official TikTok or Instagram tool?",
        answer:
          "No. It is an independent mockup tool and is not affiliated with TikTok, Instagram, Meta, or WhatsApp.",
      },
      {
        question:
          "Can I use generated mockups for content, parody, education, or concept work?",
        answer:
          "Yes, as long as you use them responsibly and do not present mockups as guaranteed real comments.",
      },
      {
        question: "What are the free limits?",
        answer:
          "Anonymous users can generate 10 mockups per day; logged-in users can generate 20.",
      },
      {
        question: "What does premium unlock?",
        answer:
          "Premium is planned to support higher limits and future creative options while funding hosting and maintenance.",
      },
    ],
    discoverTitle: "Discover more tools",
    discoverTools: [
      {
        title: "My Astrology App",
        body: "A polished astrology experience from the same maker.",
        url: "https://my-astrology-app.vercel.app",
      },
    ],
  },
  generator: {
    title: "Generator",
    subtitle:
      "Compose a social comment mockup, preview it live, and export only the transparent comment asset.",
    platform: "Platform",
    tiktok: "TikTok-style",
    instagram: "Instagram-style",
    accountState: "Account state",
    anonymous: "Anonymous",
    anonymousHint: "Exports include a small watermark. Log in to unlock verified badges.",
    loggedIn: "Logged in",
    formTitle: "Comment details",
    username: "Username",
    handle: "Handle",
    comment: "Comment",
    color: "Comment color",
    reply: "Reply",
    addReply: "Add reply",
    removeReply: "Remove reply",
    timestamp: "Timestamp",
    likes: "Likes",
    avatar: "Avatar",
    verified: "Verified badge",
    verifiedLocked: "Log in to enable verified badges.",
    preview: "Preview",
    export: "Export PNG",
    saveRecent: "Save mockup",
    saved: "Saved",
    exportFailed: "Export failed. Try again after the preview finishes rendering.",
    recentTitle: "Recent mockups",
    recentEmpty: "Saved mockups will appear here.",
    reuse: "Reuse",
    clear: "Clear",
    usage: "Daily usage",
    usageLimitReached: "Daily export limit reached. Try again tomorrow.",
    watermark: "Made with Social Comment Generator",
    avatarSource: "Avatar source",
    avatarGenerated: "Generated",
    avatarUploaded: "Uploaded",
    avatarUpload: "Custom profile image",
    avatarUploadHelp: "PNG, JPG, or WEBP up to 4 MB. Cropped locally in your browser.",
    avatarChooseFile: "Choose image",
    avatarRemove: "Remove upload",
    avatarUploadTypeError: "Use a PNG, JPG, JPEG, or WEBP image.",
    avatarUploadSizeError: "Use an image smaller than 4 MB.",
    avatarUploadGenericError: "Could not read that image. Try another file.",
    avatarCropTitle: "Crop profile image",
    avatarCropHelp: "Adjust the crop so it reads clearly as a circular avatar.",
    avatarCropApply: "Use avatar",
    avatarCropCancel: "Cancel",
    avatarCropError: "Could not crop that image. Try another file.",
    avatarZoom: "Zoom",
    avatarPositionX: "Horizontal position",
    avatarPositionY: "Vertical position",
  },
  auth: {
    title: "Login",
    body: "Phase 1 is wired with an auth boundary so Google/Supabase can be connected next. Use the generator account toggle to preview logged-in behavior for now.",
    button: "Continue with Google",
    alreadyLoggedIn: "You are logged in. Open the generator to export without a watermark.",
    pending:
      "Supabase Auth is prepared in the codebase but not connected to production credentials yet.",
  },
  legal: {
    terms: {
      title: "Terms",
      body: [
        "Social Comment Generator creates mockups for content planning, storytelling, and design workflows.",
        "It is intended for parody, education, creative use, design references, and visual mockups.",
        "Users should not present generated mockups as guaranteed real comments or official platform records.",
        "The product is free to use with limits. A premium version is planned to help support infrastructure, domains, and ongoing maintenance.",
        "The product is independent and does not claim affiliation with TikTok, Instagram, Meta, or WhatsApp.",
      ],
    },
    privacy: {
      title: "Privacy",
      body: [
        "Phase 1 stores recent mockups, selected colors, and preferences in your browser localStorage.",
        "No permanent cloud mockup archive, payments, or uploaded avatars are implemented in this phase.",
        "Future Supabase Auth integration may store account identity, plan state, and usage counts so free and premium limits can work reliably.",
        "The app does not need access to a real TikTok or Instagram account to create mockups.",
      ],
    },
  },
};
