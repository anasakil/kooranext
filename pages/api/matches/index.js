import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '../../../utils/db';
import Match from '../../../models/Match';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false, 
  },
};

const formidable = require('formidable');

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const matches = await Match.find({});
      res.status(200).json(matches);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching matches' });
    }
  } else if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ message: 'Error parsing form data' });
      }
      
      try {
        // Upload teamAImg to Cloudinary
        let teamAImg = null;
        if (files.teamAImg) {
          const resultA = await cloudinary.uploader.upload(files.teamAImg.filepath, {
            folder: 'matches',
          });
          teamAImg = resultA.secure_url;
        }

        // Upload teamBImg to Cloudinary
        let teamBImg = null;
        if (files.teamBImg) {
          const resultB = await cloudinary.uploader.upload(files.teamBImg.filepath, {
            folder: 'matches',
          });
          teamBImg = resultB.secure_url;
        }

        const match = new Match({
          teamA: fields.teamA,
          teamB: fields.teamB,
          status: fields.status,
          videoUrl: fields.videoUrl,
          matchDate: fields.matchDate,
          tournament: fields.tournament,
          teamAImg: teamAImg,
          teamBImg: teamBImg,
        });

        await match.save();
        res.status(201).json(match);
      } catch (error) {
        res.status(400).json({ message: 'Error creating match' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
