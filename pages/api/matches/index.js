import dbConnect from '../../../utils/db';
import Match from '../../../models/Match';

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
        try {
            const match = new Match(req.body);
            await match.save();
            res.status(201).json(match);
        } catch (error) {
            res.status(400).json({ message: 'Error creating match' });
        }
    } else {
        res.status(405).end(); 
    }
}
