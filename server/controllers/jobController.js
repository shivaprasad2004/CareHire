const { Job, User } = require('../models');
const { Op } = require('sequelize');

exports.getAllJobs = async (req, res) => {
  try {
    const { scope, type, search } = req.query;
    const where = { isActive: true };

    if (scope && scope !== 'all') {
      where.scope = scope;
    }

    if (type) {
      where.type = type;
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { hospital: { [Op.like]: `%${search}%` } },
        { location: { [Op.like]: `%${search}%` } }
      ];
    }

    const jobs = await Job.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching jobs' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createJob = async (req, res) => {
  try {
    // Only recruiters or admins can create jobs (simple check)
    if (req.user.role !== 'recruiter' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only recruiters can post jobs.' });
    }

    const { title, hospital, location, type, salaryRange, description, requirements, scope } = req.body;

    const newJob = await Job.create({
      title,
      hospital,
      location,
      type,
      salaryRange,
      description,
      requirements,
      scope,
      recruiterId: req.user.id
    });

    res.status(201).json({ message: 'Job posted successfully', job: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating job' });
  }
};
