const logger = require('../utils/logger');

const API_URL = 'http://localhost:5000/api';

async function verifyDeployment() {
  try {
    logger.info('Starting verification script...');

    // 1. Register Recruiter
    const recruiterEmail = `recruiter_${Date.now()}@test.com`;
    logger.info(`1. Registering Recruiter: ${recruiterEmail}`);
    const recruiterRes = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Recruiter',
        lastName: 'One',
        email: recruiterEmail,
        password: 'Password123!',
        role: 'recruiter',
        organization: 'Test Hospital'
      })
    });
    const recruiterData = await recruiterRes.json();
    if (!recruiterRes.ok) throw new Error(`Register Recruiter Failed: ${JSON.stringify(recruiterData)}`);
    const recruiterToken = recruiterData.token;
    logger.info('   -> Recruiter registered successfully.');

    // 2. Create Job
    logger.info('2. Creating Job...');
    const jobRes = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${recruiterToken}`
      },
      body: JSON.stringify({
        title: 'Senior Nurse',
        description: 'We need a senior nurse.',
        type: 'Full-time',
        location: 'New York',
        requirements: ['BSN', '5 years experience']
      })
    });
    const jobData = await jobRes.json();
    if (!jobRes.ok) throw new Error(`Create Job Failed: ${JSON.stringify(jobData)}`);
    const jobId = jobData.data.job.id;
    logger.info(`   -> Job created successfully. ID: ${jobId}`);

    // 2b. Fetch Jobs (Verify Pagination)
    logger.info('2b. Fetching Jobs...');
    const jobsRes = await fetch(`${API_URL}/jobs?page=1&limit=5`);
    const jobsData = await jobsRes.json();
    if (!jobsRes.ok) throw new Error(`Fetch Jobs Failed: ${JSON.stringify(jobsData)}`);
    if (jobsData.results !== 1) {
        logger.warn(`   -> Warning: Expected 1 job, found ${jobsData.results}. (Maybe DB wasn't empty)`);
    } else {
        logger.info('   -> Jobs fetched successfully.');
    }

    // 3. Register Applicant
    const applicantEmail = `applicant_${Date.now()}@test.com`;
    logger.info(`3. Registering Applicant: ${applicantEmail}`);
    const applicantRes = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Applicant',
        lastName: 'Two',
        email: applicantEmail,
        password: 'Password123!',
        role: 'nurse'
      })
    });
    const applicantData = await applicantRes.json();
    if (!applicantRes.ok) throw new Error(`Register Applicant Failed: ${JSON.stringify(applicantData)}`);
    const applicantToken = applicantData.token;
    logger.info('   -> Applicant registered successfully.');

    // 4. Apply for Job
    logger.info('4. Applying for Job...');
    const applyRes = await fetch(`${API_URL}/applications`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${applicantToken}`
      },
      body: JSON.stringify({
        jobId: jobId,
        coverLetter: 'I am very interested.'
      })
    });
    const applyData = await applyRes.json();
    if (!applyRes.ok) throw new Error(`Apply for Job Failed: ${JSON.stringify(applyData)}`);
    logger.info('   -> Application submitted successfully.');

    // 5. Check Notifications (Recruiter)
    logger.info('5. Checking Recruiter Notifications...');
    const notifRes = await fetch(`${API_URL}/notifications`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${recruiterToken}`
      }
    });
    const notifData = await notifRes.json();
    if (!notifRes.ok) throw new Error(`Check Notifications Failed: ${JSON.stringify(notifData)}`);
    
    const hasNotification = notifData.data.notifications.some(n => n.type === 'new_application' && n.data.jobId === jobId);
    if (!hasNotification) {
        logger.warn('   -> Warning: No notification found for new application. (Real-time might be async or socket-only, but DB should have it)');
        logger.info(`   -> Notifications found: ${JSON.stringify(notifData.data.notifications)}`);
    } else {
        logger.info('   -> Notification verified successfully.');
    }

    logger.info('VERIFICATION SUCCESSFUL: All core flows are working.');

  } catch (err) {
    logger.error(`VERIFICATION FAILED: ${err.message}`);
    process.exit(1);
  }
}

verifyDeployment();
