import { Candidate, getCandidates } from "./adminStore";

// Mock candidate auth for the prototype: no passwords, a magic-link style
// access token (or email) issued by the admin identifies the candidate.
// Replace with real signed-token verification before production.

const SESSION_KEY = "mnext_candidate_session";

export type CandidateSession = { email: string; loginAt: string };

export function candidateLogin(identifier: string): Candidate | null {
  const value = identifier.trim().toLowerCase();
  if (!value) return null;
  const candidate = getCandidates().find(
    (c) => c.email.toLowerCase() === value || c.accessToken.toLowerCase() === value,
  );
  if (!candidate) return null;
  if (typeof window !== "undefined") {
    const session: CandidateSession = { email: candidate.email, loginAt: new Date().toISOString() };
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  return candidate;
}

export function candidateLogout() {
  if (typeof window !== "undefined") window.localStorage.removeItem(SESSION_KEY);
}

export function getCandidateSession(): CandidateSession | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CandidateSession;
  } catch {
    return null;
  }
}

export function getCurrentCandidate(): Candidate | null {
  const session = getCandidateSession();
  if (!session) return null;
  return getCandidates().find((c) => c.email.toLowerCase() === session.email.toLowerCase()) || null;
}
