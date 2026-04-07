/** Drop `resume.pdf` into `/public` — same filename keeps this link working. */
export const RESUME_HREF = "/resume.pdf";

/** Placeholder — swap for your public profile. */
export const LINKEDIN_HREF = "https://www.linkedin.com/in/your-profile";

export const CONTACT_EMAIL = "you@example.com";

/**
 * Short facts recruiters scan first. Edit to match your résumé.
 */
export const resumeGlance = {
  role: "Software Engineer",
  location: "City, ST · Open to remote",
  experience: "7+ years",
  education: "B.S. Computer Science",
  workAuthorization: "Authorized to work in the U.S.",
  availability: "Open to full-time roles",
  highlights: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "System design",
  ] as const,
};
