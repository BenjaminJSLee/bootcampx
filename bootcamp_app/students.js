const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx',
});

const args = process.argv;

const values = [`%${args[2] || ''}%`,`${args[3] || 5}`];

const query = `
SELECT students.id, students.name AS student, cohorts.name AS cohort
FROM students
JOIN cohorts ON students.cohort_id=cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

pool.query(query,values)
.then(res => {
  res.rows.forEach( (user) => {
    console.log(`${user.student} has an id of ${user.id} and was in the ${user.cohort} cohort`);
  });
})
.catch(err => console.error('query error', err.stack));