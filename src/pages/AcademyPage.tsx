import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import { useAppStore } from '../store/appStore';

function AcademyPage() {
  const selectedCourse = useAppStore(state => state.selectedCourse);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  if (!selectedCourse) {
    return (
      <Container maxWidth="md" sx={{ py: 2, mb: 8 }}>
        <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
          No course selected. Please configure your course in Settings.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 2, mb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#7FCC39', fontWeight: 'bold', mb: 2 }}>
          Academy
        </Typography>
        <Typography variant="body2" sx={{ color: '#CCCCCC' }}>
          Training sessions for {selectedCourse.name}
        </Typography>
      </Box>

      <Box>
        {selectedCourse.trainingModules && selectedCourse.trainingModules.length > 0 ? (
          selectedCourse.trainingModules.map((module: any, index: number) => (
            <Card 
              key={index}
              sx={{ 
                backgroundColor: '#234F71', 
                mb: 2,
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#2D5A84' }
              }}
              onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: '#7FCC39', mb: 1 }}>
                  {module.title}
                </Typography>
                {expandedModule === module.id && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ color: '#FFFFFF', mb: 2 }}>
                      {module.description}
                    </Typography>
                    <Button 
                      variant="contained" 
                      sx={{ backgroundColor: '#7FCC39', color: '#1B3A52' }}
                    >
                      Start Training
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
            No training modules available for this course.
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default AcademyPage;
