window.CourseEngine = (() => {
  function getAllCourses(state) {
    return [...APP_DATA.courses, ...(state.customCourses || [])];
  }

  function getActiveCourse(state) {
    const courses = getAllCourses(state);
    return courses.find(c => c.id === state.settings.activeCourseId) || courses[0];
  }

  function ensureProgress(state, course) {
    if (!state.progress[course.id]) {
      state.progress[course.id] = {
        assignments: {},
        practicals: {},
        academy: {},
        ksbEvidence: {}
      };
    }
    return state.progress[course.id];
  }

  function assignmentStats(state, course) {
    const progress = ensureProgress(state, course);
    const total = course.assignments.length;
    const completed = course.assignments.filter(a => progress.assignments[a.id]?.completed).length;
    return { completed, total, percent: total ? Math.round((completed / total) * 100) : 0 };
  }

  function overallProgress(state, course) {
    const assignments = assignmentStats(state, course).percent;
    return Math.round(assignments * 0.6);
  }

  function setActiveCourse(state, courseId) {
    const exists = getAllCourses(state).some(c => c.id === courseId);
    if (!exists) throw new Error("Course not found");
    state.settings.activeCourseId = courseId;
    return state;
  }

  return { getAllCourses, getActiveCourse, ensureProgress, assignmentStats, overallProgress, setActiveCourse };
})();
