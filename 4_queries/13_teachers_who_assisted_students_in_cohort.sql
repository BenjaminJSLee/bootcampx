SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort,
COUNT(assistance_requests.id) AS total_assistances
FROM teachers
JOIN assistance_requests ON teachers.id=teacher_id
JOIN students ON student_id=students.id
JOIN cohorts ON cohort_id=cohorts.id
WHERE cohorts.name = 'JUL02'
GROUP BY teacher, cohort
ORDER BY teachers.name ASC;
