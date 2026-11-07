import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from '@better-auth/mongo-adapter';

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db('hire_loop');

export const auth = betterAuth({
     emailAndPassword: {
          enabled: true,
     },

     user: {
          additionalFields: {
               phone: {
                    type: 'string',
                    required: false,
                    input: true,
               },
               role: {
                    type: ['seeker', 'recruiter'],
                    input: true,
                    defaultValue: 'seeker',
               },
          },
     },
     database: mongodbAdapter(db, {
          client,
     }),
});
