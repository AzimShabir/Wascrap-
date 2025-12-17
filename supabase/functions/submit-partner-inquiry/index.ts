import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PartnerInquiry {
  name: string;
  email: string;
  phone: string;
  company: string;
  partnerType: string;
  message: string;
  submittedAt: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.json();
    
    const partnerInquiry: PartnerInquiry = {
      ...formData,
      submittedAt: new Date().toISOString()
    };

    // Get Firebase credentials from environment
    const projectId = Deno.env.get('FIREBASE_PROJECT_ID');
    const privateKey = Deno.env.get('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n');
    const clientEmail = Deno.env.get('FIREBASE_CLIENT_EMAIL');

    if (!projectId || !privateKey || !clientEmail) {
      throw new Error('Firebase credentials not properly configured');
    }

    // Create JWT for Firebase Auth
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: clientEmail,
      sub: clientEmail,
      aud: `https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit`,
      iat: now,
      exp: now + 3600,
      uid: 'partner-service',
      claims: {}
    };

    // Import crypto for JWT signing
    const encoder = new TextEncoder();
    const keyData = await crypto.subtle.importKey(
      'pkcs8',
      encoder.encode(privateKey),
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
      },
      false,
      ['sign']
    );

    const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
    const payloadBase64 = btoa(JSON.stringify(payload));
    const signatureData = encoder.encode(`${header}.${payloadBase64}`);
    
    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      keyData,
      signatureData
    );
    
    const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
    const jwt = `${header}.${payloadBase64}.${signatureBase64}`;

    // Store in Firebase Firestore
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/partner_inquiries`;
    
    const firestoreResponse = await fetch(firestoreUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          name: { stringValue: partnerInquiry.name },
          email: { stringValue: partnerInquiry.email },
          phone: { stringValue: partnerInquiry.phone },
          company: { stringValue: partnerInquiry.company },
          partnerType: { stringValue: partnerInquiry.partnerType },
          message: { stringValue: partnerInquiry.message },
          submittedAt: { timestampValue: partnerInquiry.submittedAt },
          status: { stringValue: 'pending' }
        }
      })
    });

    if (!firestoreResponse.ok) {
      const errorText = await firestoreResponse.text();
      console.error('Firebase error:', errorText);
      throw new Error(`Failed to store in Firebase: ${firestoreResponse.status}`);
    }

    const result = await firestoreResponse.json();
    console.log('Partner inquiry stored successfully:', result.name);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Partner inquiry submitted successfully',
        inquiryId: result.name
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in submit-partner-inquiry function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to submit partner inquiry' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);