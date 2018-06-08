const mongoose = require('mongoose'),
      Group = require('../models/group'),
      ObjectId = mongoose.Types.ObjectId;

module.exports = {
    getOne: async (groupID) => {
        try {                
            const group = await Group
                .findById(groupID)
                .populate({
                    path: 'members admins',
                    select: 'name login'
                })
                .then(result => {return result})
                .catch(err => {return err});
            return group;
        } catch (err) {
            return err.message;
        }
    },

    getAll: async () => {
        try {
            let groups = await Group.find();
            return tasks;
        } catch (err){
            return err.message;
        }
    },

    insert: async (group) => {
        await group.admins.forEach(admin => {group.members.push(admin)});
        const newGroup = new Group({
            name: group.name,
            members: group.members,
            admins: group.admins
        });
        return newGroup
                .save()
                .then(result => { return result })
                .catch(err => { return err.message })            
    },

    update: (groupID, newGroup) => {
        const options = {
            new: true,
            upsert: false
        };
        return Group
            .findByIdAndUpdate({'_id': groupID}, newGroup, options)
            .then(result => { return result })
            .catch(err => { return err.message });
    },

    remove: (groupID) => {
        return Group
                .findByIdAndRemove(groupID)
                .exec()
                .then(result => { return result })
                .catch(err => { return err.message });
    },

    removeAll: () => {
        return Group
                .remove({})
                .exec()
                .then(result => { return result })
                .catch(err => { return err.message });
    },

    getAllGroupsForUser: (userID) => {
        return Group
                .aggregate([
                    {$unwind: '$members'},
                    {$match: {'members': ObjectId(userID)}}
                ])
                .exec()
                .then(result => { return result })
                .catch(err => { return err.message });
    }
};
