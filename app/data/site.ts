// Replace the null values when the studio's details are confirmed.
// Missing values are deliberately shown as labelled placeholders on the site.
export const siteDetails: {
  email: string | null;
  person: { name: string | null; role: string | null; location: string | null };
  specialisms: string | null;
  introduction: string | null;
  services: string[] | null;
  approach: string | null;
} = {
  email: null,
  person: { name: null, role: null, location: null },
  specialisms: null,
  introduction: null,
  services: null,
  approach: null,
};
