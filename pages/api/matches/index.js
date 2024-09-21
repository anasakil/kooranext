import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary'; // For Cloudinary integration
import dbConnect from '../../../utils/db';
import Match from '../../../models/Match';

export const config = {
  api: {
    bodyParser: false, // Disable the built-in body parser to handle multipart form data
  },
};

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ message: 'Error parsing form data' });
      }

      try {
        const { teamA, teamB, status, videoUrl, matchDate, tournament } = fields;
        const teamAImg = files.teamAImg ? files.teamAImg.filepath : null;
        const teamBImg = files.teamBImg ? files.teamBImg.filepath : null;

        // Upload images to Cloudinary
        const resultA = await cloudinary.uploader.upload(teamAImg, { folder: 'matches' });
        const resultB = await cloudinary.uploader.upload(teamBImg, { folder: 'matches' });

        const match = new Match({
          teamA,
          teamB,
          status,
          videoUrl,
          matchDate,
          tournament,
          teamAImg: resultA.secure_url,
          teamBImg: resultB.secure_url,
        });

        await match.save();
        res.status(201).json(match);
      } catch (error) {
        res.status(500).json({ message: 'Error creating match' });
      }
    });
  } else {
    res.status(405).end(); // Method not allowed
  }
}
