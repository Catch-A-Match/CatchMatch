
const { Match } = require('../models/Matches');
const { User } = require('../models/User');

/**
 * Add a new Match b/w user1 and user2 using Jaccard Similarity Index on their Abstracts
 */
exports.createMatch = async (req, res) => {
    const user1Id = req.body.user1Id;
    const user2Id = req.body.user2Id;

    User.findById(user1Id, (err, user1) => {
        if (err) {
            return res.status(500).json({ msg: err })
        } 
        if (!user1) {
            return res.status(404).json({ msg: 'User not Found' });
        }

        User.findById(user2Id, (err, user2) => {
            if (err) {
                return res.status(500).json({ msg: err });
            }
            if (!user2) {
                return res.status(404).json({ msg: 'User not Found' });
            }
            
            /**
             * Jaccard Similarity Index
             */
            const abstract1 = user1.Abstract;
            const abstract2 = user2.Abstract;
        
            // Split 
            const user1Words = abstract1.split(' ')
            const user2Words = abstract2.split(' ')

            // Find Intersection and union of two word sets
            const intersection = user1Words.filter((word) => user2Words.includes(word));
            const union = [...new Set([...user1Words, ...user2Words])];

            // Jaccard Similarity
            const similarity = intersection.length / union.length;
            const match = new Match({
                user1Id: user1Id,
                user2Id: user2Id,
                similarity: similarity
            });
            match.save((err, match) => {
                if (err) {
                return res.status(500).send(err);
                }
                return res.send(match);
            });
        })
    })
}

/**
 * Update the Match
 */
exports.updateMatch = async (req, res) => {
    try {
        const match = Match.findById(req.params.id);
        if (!match) {
            return res.status(404).json({ msg: 'Match not Found' });
        }

        // Update fields
        match.user1 = req.body.user1;
        match.user2 = req.body.user2;
        match.similarity = req.body.similarity;
        
        // Save the updated Object to DB
        await match.save();
        return res.json(match);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Error updating Match' });
    }
};

/**
 * Delete a Match
 */
exports.deleteMatch = async (req, res) => {
    try {
        // Find Match by Id
        const match = await Match.findByIdAndDelete(req.params.id);
        if (!match) {
            return res.status(404).json({ msg: 'Match not Found' });
        }

        res.json(match);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Error Deleting Match' });
    }
};