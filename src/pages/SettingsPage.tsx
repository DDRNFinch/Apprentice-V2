import React from 'react';
import { Box, Container, Typography, Card, CardContent, Select, MenuItem, FormControl, FormLabel } from '@mui/material';
import { useAppStore } from '../store/appStore';

function SettingsPage() {
  const selectedCourse = useAppStore(state => state.selectedCourse);
  const setCourse = useAppStore(state => state.setCourse);

  const availableCourses = [
    {
      id: 'course1',
      name: 'Data Analytics',
      progress: 45,
      trainingModules: [
        { id: 'mod1', title: 'Introduction to Data', description: 'Learn the basics of data analysis' },
        { id: 'mod2', title: 'Data Visualization', description: 'Create meaningful charts and graphs' },
      ],
      ksbs: [
        { category: 'Knowledge', description: 'Understand data structures and databases' },
        { category: 'Skill', description: 'Analyze large datasets using Python' },
        { category: 'Behaviour', description: 'Communicate findings to stakeholders' },
      ],
      assignments: [
        { id: 'assign1', title: 'Data Analysis Project', description: 'Analyze a provided dataset' },
        { id: 'assign2', title: 'Visualization Report', description: 'Create visualizations from raw data' },
      ],
      documents: [
        { id: 'doc1', title: 'Course Handbook', description: 'Complete course guide' },
        { id: 'doc2', title: 'Assessment Criteria', description: 'How you will be assessed' },
      ],
    },
    {
      id: 'course2',
      name: 'Software Development',
      progress: 60,
      trainingModules: [
        { id: 'mod3', title: 'Web Development Basics', description: 'HTML, CSS, and JavaScript fundamentals' },
        { id: 'mod4', title: 'Backend Development', description: 'Server-side programming with Node.js' },
      ],
      ksbs: [
        { category: 'Knowledge', description: 'Understand software development principles' },
        { category: 'Skill', description: 'Write clean, efficient code' },
        { category: 'Behaviour', description: 'Work effectively in development teams' },
      ],
      assignments: [
        { id: 'assign3', title: 'Build a Web App', description: 'Create a functional web application' },
        { id: 'assign4', title: 'API Development', description: 'Develop RESTful APIs' },
      ],
      documents: [
        { id: 'doc3', title: 'Development Standards', description: 'Code style guidelines' },
        { id: 'doc4', title: 'Project Requirements', description: 'Detailed project specifications' },
      ],
    },
  ];

  const handleCourseChange = (courseId: string) => {
    const course = availableCourses.find(c => c.id === courseId);
    if (course) {
      setCourse(course);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 2, mb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#7FCC39', fontWeight: 'bold', mb: 2 }}>
          Settings
        </Typography>
      </Box>

      <Card sx={{ backgroundColor: '#234F71', mb: 3 }}>
        <CardContent>
          <FormControl fullWidth>
            <FormLabel sx={{ color: '#FFFFFF', mb: 2 }}>Select Your Course</FormLabel>
            <Select
              value={selectedCourse?.id || ''}
              onChange={(e) => handleCourseChange(e.target.value)}
              sx={{
                color: '#FFFFFF',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#7FCC39',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#7FCC39',
                },
                '& .MuiSvgIcon-root': {
                  color: '#7FCC39',
                },
              }}
            >
              <MenuItem value="">Select a course...</MenuItem>
              {availableCourses.map(course => (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {selectedCourse && (
        <Card sx={{ backgroundColor: '#234F71' }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#7FCC39', mb: 2 }}>
              Current Course Information
            </Typography>
            <Typography variant="body1" sx={{ color: '#FFFFFF', mb: 2 }}>
              <strong>Course:</strong> {selectedCourse.name}
            </Typography>
            <Typography variant="body1" sx={{ color: '#FFFFFF', mb: 2 }}>
              <strong>Progress:</strong> {selectedCourse.progress}%
            </Typography>
            <Typography variant="body1" sx={{ color: '#FFFFFF', mb: 2 }}>
              <strong>Training Modules:</strong> {selectedCourse.trainingModules?.length || 0}
            </Typography>
            <Typography variant="body1" sx={{ color: '#FFFFFF', mb: 2 }}>
              <strong>Assignments:</strong> {selectedCourse.assignments?.length || 0}
            </Typography>
            <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
              <strong>Documents:</strong> {selectedCourse.documents?.length || 0}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default SettingsPage;
