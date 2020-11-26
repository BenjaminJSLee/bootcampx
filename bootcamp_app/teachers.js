const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx',
});

const args = process.argv;

const cohort = `%${args[2] || 'JUL02'}%`;

const query = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teachers.id=teacher_id
JOIN students ON student_id=students.id
JOIN cohorts ON cohort_id=cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teachers.name ASC;
`;

pool.query(query,[cohort])
.then(res => {
  res.rows.forEach( (assist) => {
    console.log(`${assist.cohort}: ${assist.teacher}`);
  });
})
.catch(err => console.error('query error', err.stack));
