import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  User
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App (reuse if already initialized)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/forms.body',
  'https://www.googleapis.com/auth/forms.responses.readonly'
];

const provider = new GoogleAuthProvider();
WORKSPACE_SCOPES.forEach(scope => provider.addScope(scope));
provider.setCustomParameters({
  prompt: 'consent',
  access_type: 'offline'
});

// Cache the access token in memory only
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Google Workspace authentication');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Workspace Sign-in Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
  cachedAccessToken = null;
};

// Helper: Convert string to base64url format for Gmail API
function base64urlEncode(str: string): string {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  utf8Bytes.forEach((b) => (binary += String.fromCharCode(b)));
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Send an email directly using Gmail API
 */
export async function sendEmailViaGmail({
  to,
  subject,
  bodyText
}: {
  to: string;
  subject: string;
  bodyText: string;
}): Promise<{ id: string; threadId: string }> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Please sign in with Google first to send via Gmail');
  }

  const emailRaw = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    '',
    bodyText
  ].join('\r\n');

  const encoded = base64urlEncode(emailRaw);

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ raw: encoded })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gmail API error: ${res.statusText}`);
  }

  return await res.json();
}

/**
 * Create a draft email in user's Gmail
 */
export async function createGmailDraft({
  to,
  subject,
  bodyText
}: {
  to: string;
  subject: string;
  bodyText: string;
}): Promise<{ id: string; message: any }> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Please sign in with Google first to create a Gmail draft');
  }

  const emailRaw = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    '',
    bodyText
  ].join('\r\n');

  const encoded = base64urlEncode(emailRaw);

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/drafts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: { raw: encoded }
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gmail Draft API error: ${res.statusText}`);
  }

  return await res.json();
}

/**
 * Create a new Google Form for Client Onboarding / Project Scoping
 */
export async function createIntakeGoogleForm({
  title,
  serviceName,
  clientName
}: {
  title: string;
  serviceName: string;
  clientName?: string;
}): Promise<{ formId: string; responderUri: string; editUri: string }> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Please sign in with Google first to create a Google Form');
  }

  // 1. Create form
  const createRes = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      info: {
        title: title || 'Solita Solutions — Project Intake & Technical Scope',
        documentTitle: `Solita Intake: ${clientName || 'Client'} - ${serviceName || 'Consultation'}`
      }
    })
  });

  if (!createRes.ok) {
    const errorData = await createRes.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Google Forms API creation error: ${createRes.statusText}`);
  }

  const formData = await createRes.json();
  const formId = formData.formId;
  const responderUri = formData.responderUri;

  // 2. Add structured intake questions via batchUpdate
  const questionsPayload = {
    requests: [
      {
        createItem: {
          item: {
            title: 'Full Name & Organization',
            description: 'Provide your name, title, and organization or brand name.',
            questionItem: {
              question: {
                required: true,
                textQuestion: { paragraph: false }
              }
            }
          },
          location: { index: 0 }
        }
      },
      {
        createItem: {
          item: {
            title: 'Technical Requirement / Service Needed',
            description: 'What technology area does this initiative fall under?',
            questionItem: {
              question: {
                required: true,
                choiceQuestion: {
                  type: 'RADIO',
                  options: [
                    { value: 'AI Solutions & Autonomous Agents' },
                    { value: 'Business & WhatsApp Automation' },
                    { value: 'Web Platforms & SaaS Development' },
                    { value: 'Mobile Applications (Android/Cross-platform)' },
                    { value: 'Digital Business Systems & Custom Dashboards' },
                    { value: 'Proprietary Product Inquiry (Vistaro AI / SplitPro)' },
                    { value: 'Other Technical Problem' }
                  ]
                }
              }
            }
          },
          location: { index: 1 }
        }
      },
      {
        createItem: {
          item: {
            title: 'Detailed Problem Description & Current Bottlenecks',
            description: 'Explain what you want to build, automate, or resolve.',
            questionItem: {
              question: {
                required: true,
                textQuestion: { paragraph: true }
              }
            }
          },
          location: { index: 2 }
        }
      },
      {
        createItem: {
          item: {
            title: 'Estimated Budget & Desired Delivery Horizon',
            description: 'Select your anticipated budget allocation.',
            questionItem: {
              question: {
                required: false,
                choiceQuestion: {
                  type: 'RADIO',
                  options: [
                    { value: 'Flexible / Discovery Phase' },
                    { value: '$1,000 - $3,000' },
                    { value: '$3,000 - $10,000' },
                    { value: '$10,000 - $25,000' },
                    { value: '$25,000+' }
                  ]
                }
              }
            }
          },
          location: { index: 3 }
        }
      }
    ]
  };

  await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(questionsPayload)
  }).catch((err) => {
    console.warn('Batch question update optional error:', err);
  });

  return {
    formId,
    responderUri: responderUri || `https://docs.google.com/forms/d/e/${formId}/viewform`,
    editUri: `https://docs.google.com/forms/d/${formId}/edit`
  };
}

/**
 * Fetch Google Form metadata
 */
export async function getGoogleForm(formId: string): Promise<any> {
  const token = await getAccessToken();
  if (!token) throw new Error('Sign in required');
  const res = await fetch(`https://forms.googleapis.com/v1/forms/${formId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error(`Failed to load Google Form ${formId}`);
  return await res.json();
}

/**
 * Fetch Google Form responses
 */
export async function getGoogleFormResponses(formId: string): Promise<any> {
  const token = await getAccessToken();
  if (!token) throw new Error('Sign in required');
  const res = await fetch(`https://forms.googleapis.com/v1/forms/${formId}/responses`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error(`Failed to load responses for Form ${formId}`);
  return await res.json();
}
