import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ScrapSellerData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  panCard?: string;
  carNumber?: string;
  verified: boolean;
  loginMethod: 'google';
  createdAt: string;
  lastLoginAt: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, userData, uid } = await req.json();

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
      uid: 'firebase-admin',
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

    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/scrap_sellers`;

    if (action === 'create' || action === 'update') {
      const scrapSellerData: ScrapSellerData = {
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName || '',
        photoURL: userData.photoURL || '',
        phoneNumber: userData.phoneNumber || '',
        address: userData.address || '',
        city: userData.city || '',
        state: userData.state || '',
        pincode: userData.pincode || '',
        panCard: userData.panCard || '',
        carNumber: userData.carNumber || '',
        verified: userData.verified || false,
        loginMethod: 'google',
        createdAt: userData.createdAt || new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };

      const method = action === 'create' ? 'POST' : 'PATCH';
      const url = action === 'create' ? firestoreUrl : `${firestoreUrl}/${userData.uid}`;

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            uid: { stringValue: scrapSellerData.uid },
            email: { stringValue: scrapSellerData.email },
            displayName: { stringValue: scrapSellerData.displayName },
            photoURL: { stringValue: scrapSellerData.photoURL },
            phoneNumber: { stringValue: scrapSellerData.phoneNumber },
            address: { stringValue: scrapSellerData.address },
            city: { stringValue: scrapSellerData.city },
            state: { stringValue: scrapSellerData.state },
            pincode: { stringValue: scrapSellerData.pincode },
            panCard: { stringValue: scrapSellerData.panCard },
            carNumber: { stringValue: scrapSellerData.carNumber },
            verified: { booleanValue: scrapSellerData.verified },
            loginMethod: { stringValue: scrapSellerData.loginMethod },
            createdAt: { timestampValue: scrapSellerData.createdAt },
            lastLoginAt: { timestampValue: scrapSellerData.lastLoginAt }
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Firebase error:', errorText);
        throw new Error(`Failed to ${action} scrap seller: ${response.status}`);
      }

      const result = await response.json();
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Scrap seller ${action}d successfully`,
          data: result
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );

    } else if (action === 'get') {
      const response = await fetch(`${firestoreUrl}/${uid}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          return new Response(
            JSON.stringify({ success: true, data: null }),
            {
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
        throw new Error(`Failed to get scrap seller: ${response.status}`);
      }

      const result = await response.json();
      return new Response(
        JSON.stringify({ 
          success: true, 
          data: result
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    throw new Error('Invalid action');

  } catch (error: any) {
    console.error('Error in firebase-auth function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to process request' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);