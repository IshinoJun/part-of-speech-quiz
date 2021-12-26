import { protos, TextToSpeechClient } from '@google-cloud/text-to-speech';
import fs from 'fs';
import { google } from 'googleapis';
import util from 'util';
import { Quiz } from '../models/Quiz';

const client = new TextToSpeechClient({
  auth: new google.auth.GoogleAuth({
    projectId: process.env.GOOGLE_PROJECTED,
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
    },
  }),
});

export async function buildSounds(quizList: Quiz[]): Promise<void> {
  // Construct the request
  for (const quiz of quizList) {
    const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
      {
        input: { text: quiz.word },
        // Select the language and SSML voice gender (optional)
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        // select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' },
      };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    if (response.audioContent) {
      const writeFile = util.promisify(fs.writeFile);
      await writeFile(
        `./public/sounds/${quiz.word}.mp3`,
        response.audioContent,
        'binary',
      );
    }
  }
}
