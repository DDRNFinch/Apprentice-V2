import React from 'react';
import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import { useAppStore } from '../store/appStore';
import DownloadIcon from '@mui/icons-material/Download';

function DocumentsPage() {
  const selectedCourse = useAppStore(state => state.selectedCourse);

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
          Documents
        </Typography>
        <Typography variant="body2" sx={{ color: '#CCCCCC' }}>
          Course materials for {selectedCourse.name}
        </Typography>
      </Box>

      <Box>
        {selectedCourse.documents && selectedCourse.documents.length > 0 ? (
          selectedCourse.documents.map((doc: any, index: number) => (
            <Card key={index} sx={{ backgroundColor: '#234F71', mb: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#7FCC39', mb: 2 }}>
                  {doc.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#CCCCCC', mb: 2 }}>
                  {doc.description}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  sx={{ backgroundColor: '#7FCC39', color: '#1B3A52' }}
                >
                  Download
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
            No documents available for this course.
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default DocumentsPage;
