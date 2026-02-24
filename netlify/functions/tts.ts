import { Handler } from '@netlify/functions';
const textToSpeech = require('@google-cloud/text-to-speech');

const client = new textToSpeech.TextToSpeechClient({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON!)
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { text, voiceName = 'hi-IN-Neural2-A', speakingRate = 1.0 } = JSON.parse(event.body || '{}');

    const request = {
      input: { text },
      voice: { languageCode: 'hi-IN', name: voiceName },
      audioConfig: { audioEncoding: 'MP3', speakingRate },
    };

    const [response] = await client.synthesizeSpeech(request);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ audio: response.audioContent.toString('base64') }),
    };
  } catch (error: any) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
