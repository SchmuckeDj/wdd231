const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web.',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will teach the correct use of functions.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce object-oriented programming.',
    technology: ['C#'],
    completed: false
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on Web Fundamentals.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will teach students to create responsive frontend websites.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

function displayCourses(list) {
  const container = document.getElementById('course-cards');
  const creditsEl = document.getElementById('credits-count');

  container.innerHTML = list.map(c => `
    <div class="course-card ${c.completed ? 'completed' : ''}">
      <span class="course-code">${c.subject} ${c.number}</span>
      <span class="course-name">${c.title}</span>
      <span class="course-credits">${c.credits} credits</span>
    </div>
  `).join('');

  const total = list.reduce((sum, c) => sum + c.credits, 0);
  creditsEl.textContent = total;
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const filtered = filter === 'all'
      ? courses
      : courses.filter(c => c.subject === filter);

    displayCourses(filtered);
  });
});

displayCourses(courses);
