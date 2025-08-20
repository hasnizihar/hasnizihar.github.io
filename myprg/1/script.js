const courses = [
    { module: "MA", credits: 3 },
    { module: "CS", credits: 3 },
    { module: "EE", credits: 2 },
    { module: "CE", credits: 2 },
    { module: "MT", credits: 2 },
    { module: "ME", credits: 2 }
  ];
  
  const gradePoints = {
    "A+": 4.0,
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D": 1.0,
    "F": 0.0
  };
  
  // Populate the course rows in the table
  const tbody = document.getElementById('course-rows');
  courses.forEach((course, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${course.module}</td>
      <td>${course.credits}</td>
      <td>
        <select onchange="updateGPA()">
          ${Object.keys(gradePoints).map(grade => `<option value="${gradePoints[grade]}">${grade}</option>`).join('')}
        </select>
      </td>
      <td class="gpa-value">4</td>
      <td class="product">0</td>
    `;
    tbody.appendChild(row);
  });
  
  function updateGPA() {
    let totalCredits = 0;
    let totalPoints = 0;
  
    const rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {
      const credits = parseInt(row.children[1].textContent, 10);
      const gpa = parseFloat(row.children[2].children[0].value);
      row.children[3].textContent = gpa;
      row.children[4].textContent = (credits * gpa).toFixed(1);
  
      totalCredits += credits;
      totalPoints += credits * gpa;
    });
  
    document.getElementById('total-credits').textContent = totalCredits;
    document.getElementById('sgpa').textContent = (totalPoints / totalCredits).toFixed(2);
  }
  
  // Initialize the GPA calculation
  updateGPA();
  
