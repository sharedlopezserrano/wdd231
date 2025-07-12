document.addEventListener("DOMContentLoaded", function () {
  const allBtn = document.getElementById("btn-all");
  const cseBtn = document.getElementById("btn-cse");
  const wddBtn = document.getElementById("btn-wdd");
  const certificateSection = document.getElementById("certificate-section");
  const creditInfo = document.querySelector(".credit-info");
  const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    }
    ,
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

  let currentCourses = courses;
  let selectedIdx = null;

  function updateCredits(courseList) {
    const total = courseList.reduce((sum, course) => sum + course.credits, 0);
    creditInfo.textContent = `The total credits for courses listed above is ${total}`;
  }

  function renderCourses(courseList) {
    certificateSection.innerHTML = "";
    const row = document.createElement("div");
    row.className = "course-row";
    courseList.forEach((course, idx) => {
      const btn = document.createElement("button");
      btn.className = `course-mini-btn ${course.completed ? "completed" : "not-completed"}`;
      btn.textContent = `${course.subject} ${course.number}`;
      btn.addEventListener("click", () => {
        selectedIdx = idx;
        renderCourses(courseList);
      });
      row.appendChild(btn);
    });
    certificateSection.appendChild(row);

    if (selectedIdx !== null && courseList[selectedIdx]) {
      const course = courseList[selectedIdx];
      const details = document.createElement("div");
      details.className = `course-details-big ${course.completed ? "completed" : "not-completed"}`;
      details.innerHTML = `
        <h3>${course.subject} ${course.number}: ${course.title}</h3>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technology:</strong> ${course.technology.join(", ")}</p>
        <span class="status">${course.completed ? "Completed" : "Not Completed"}</span>
      `;
      certificateSection.appendChild(details);
    }

    updateCredits(courseList);
  }

  function filterCourses(dept) {
    if (dept === "all") {
      currentCourses = courses;
    } else {
      currentCourses = courses.filter(course => course.subject.toLowerCase() === dept);
    }
    selectedIdx = null;
    renderCourses(currentCourses);
  }

  allBtn.addEventListener("click", () => filterCourses("all"));
  cseBtn.addEventListener("click", () => filterCourses("cse"));
  wddBtn.addEventListener("click", () => filterCourses("wdd"));

  renderCourses(courses);

  const modSpan = document.getElementById("last-modified");
  modSpan.textContent = document.lastModified;
});