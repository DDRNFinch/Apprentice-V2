import React from 'react';
import { Box, Container, Typography, Card, CardContent, LinearProgress } from '@mui/material';
import { useAppStore } from '../store/appStore';

function HomePage() {
  const selectedCourse = useAppStore(state => state.selectedCourse);

  return (
    <Container maxWidth="md" sx={{ py: 2, mb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#7FCC39', fontWeight: 'bold', mb: 2 }}>
          Welcome to Apprentice+
        </Typography>
        <Typography variant="body1" sx={{ color: '#FFFFFF', mb: 2 }}>
          Your Course, Your Way
        </Typography>
      </Box>

      {selectedCourse ? (
        <Box>
          <Card sx={{ backgroundColor: '#234F71', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#7FCC39', mb: 2 }}>
                Current Course
              </Typography>
              <Typography variant="body1" sx={{ color: '#FFFFFF', mb: 2 }}>
                {selectedCourse.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#CCCCCC', mb: 2 }}>
                Progress Overview
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={selectedCourse.progress || 0}
                sx={{
                  backgroundColor: '#1B3A52',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#7FCC39',
                  },
                }}
              />
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Card sx={{ backgroundColor: '#234F71' }}>
          <CardContent>
            <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
              No course selected. Please go to Settings to select a course.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default HomePage;
