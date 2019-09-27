import User from '../models/User';
import Profile from '../models/Profile';
import Note from '../models/Note';

// ROUTE            >     GET  /api/profiles
// DESC             >     GET ALL PROFILES
// ACCESS CONTROL   >     PUBLIC
export const getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find()
      .sort({ date: -1 })
      .exec();

    if (profiles.length < 1) return res.status(409).send('No profiles found!');

    return res.status(200).json(profiles);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Something went wrong!');
  }
};

// ROUTE            >     GET  /api/profiles/:id
// DESC             >     GET PROFILE BY ID
// ACCESS CONTROL   >     PUBLIC
export const getProfile = async (req, res, next) => {
  const { id } = req.params;

  try {
    const profile = await Profile.findById(id).exec();

    if (!profile) return res.status(400).send('Profile not found!');

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Something went wrong!');
  }
};

// ROUTE            >     GET  /api/profiles/me
// DESC             >     GET AUTH USER PROFILE
// ACCESS CONTROL   >     PRIVATE
export const getMyProfile = async (req, res, next) => {
  const { id } = req.user;

  try {
    const profile = await Profile.findOne({ user: id }).exec();

    if (!profile) return res.status(400).send('Profile not found!');

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Something went wrong!');
  }
};

// ROUTE            >     POST  /api/profiles/change
// DESC             >     CREATE / UPDATE PROFILE
// ACCESS CONTROL   >     PRIVATE
export const createOrUpdateProfile = async (req, res, next) => {
  const {
    name,
    company,
    website,
    location,
    status,
    age,
    profession,
    skills,
    bio,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
    github
  } = req.body;

  try {
    const user = await User.findById(req.user.id).exec();

    if (!user) return res.status(400).send('Profile not found!');

    const profile = await Profile.findOne({ user: req.user.id }).exec();

    const profileObject = {};

    profileObject.user = req.user.id;
    if (name) profileObject.name = name;
    if (company) profileObject.company = company;
    if (website) profileObject.website = website;
    if (location) profileObject.location = location;
    if (status) profileObject.status = status;
    if (age) profileObject.age = age;
    if (profession) profileObject.profession = profession;
    if (skills)
      profileObject.skills = skills.split(',').map(skill => skill.trim());
    if (bio) profileObject.bio = bio;

    const socialObject = {};

    if (youtube) socialObject.youtube = youtube;
    if (facebook) socialObject.facebook = facebook;
    if (twitter) socialObject.twitter = twitter;
    if (linkedin) socialObject.linkedin = linkedin;
    if (instagram) socialObject.instagram = instagram;
    if (github) socialObject.github = github;

    profileObject.social = socialObject;

    let profile;

    if (profile) {
      // UPDATE AN EXISTING PROFILE
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileObject },
        { new: true }
      ).exec();

      return res.status(200).json(profile);
    }

    // CREATE A NEW PROFILE INSTANCE
    profile = new Profile(profileObject);

    profile = await profile.save();

    await user.profile = profile.id;

    return res.status(201).json(profile);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Something went wrong!');
  }
};

// ROUTE            >     DELETE  /api/profiles/:id
// DESC             >     DELETE PROFILE
// ACCESS CONTROL   >     PRIVATE
export const deleteProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).exec();

    if (!user) return res.status(400).send('User not found!');

    if (user.profile.toString() !== req.params.id.toString()) return res.status(400).send('Profile not found!');

    await Profile.deleteOne({ id: req.params.id }).exec();

    const notes = await Note.find({ user: req.user.id }).exec();

    if (notes.length > 1) return await Note.deleteMany({ user: req.user.id }).exec()

    await User.deleteOne({ id: req.user.id }).exec();

    return res.status(200).send('Profile deleted!');
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Something went wrong!');
  }
};
