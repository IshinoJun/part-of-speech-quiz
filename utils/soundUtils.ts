import { protos, TextToSpeechClient } from '@google-cloud/text-to-speech';
import crypto from 'crypto';
import fs from 'fs';
import { CredentialBody } from 'google-auth-library';
import { google } from 'googleapis';
import util from 'util';
import { Quiz } from '../models/Quiz';
import service from '../service-account.enc';

const algorithm = 'aes-128-cbc';
const decipher = crypto.createDecipheriv(
  algorithm,
  process.env.SERVICE_ENCRYPTION_KEY as string,
  process.env.SERVICE_ENCRYPTION_IV as string,
);
let decryptedData = decipher.update(service.encrypted, 'hex', 'utf-8');
decryptedData += decipher.final('utf8');

const client = new TextToSpeechClient({
  auth: new google.auth.GoogleAuth({
    projectId: process.env.GOOGLE_PROJECTED,
    credentials: JSON.parse(decryptedData) as CredentialBody,
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
      const path = `./public/sounds`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
      await writeFile(
        `${path}/${quiz.word}.mp3`,
        response.audioContent,
        'binary',
      );
    }
  }
}
