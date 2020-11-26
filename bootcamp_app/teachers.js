const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx',
});

const args = process.argv;

pool.query(`
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teachers.id=teacher_id
JOIN students ON student_id=students.id
JOIN cohorts ON cohort_id=cohorts.id
WHERE cohorts.name LIKE '%${args[2] || 'JUL02'}%'
ORDER BY teachers.name ASC;
`)
.then(res => {
  res.rows.forEach( (assist) => {
    console.log(`${assist.cohort}: ${assist.teacher}`);
  });
})
.catch(err => console.error('query error', err.stack));
