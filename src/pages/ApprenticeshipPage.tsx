import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { useAppStore } from '../store/appStore';

function ApprenticeshipPage() {
  const selectedCourse = useAppStore(state => state.selectedCourse);
  const [selectedTab, setSelectedTab] = useState<'ksb' | 'assignments'>('ksb');
  const [expandedAssignment, setExpandedAssignment] = useState<string | null>(null);
  const [submissionDialog, setSubmissionDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [images, setImages] = useState<File[]>([]);
  const [essay, setEssay] = useState('');

  if (!selectedCourse) {
    return (
      <Container maxWidth="md" sx={{ py: 2, mb: 8 }}>
        <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
          No course selected. Please configure your course in Settings.
        </Typography>
      </Container>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages([...images, ...files]);
  };

  const handleSubmitAssignment = () => {
    if (images.length < 6 || essay.length < 100) {
      alert('Please add 6 images and a 100+ word essay');
      return;
    }
    console.log('Assignment submitted:', selectedAssignment, images, essay);
    setSubmissionDialog(false);
    setImages([]);
    setEssay('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 2, mb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#7FCC39', fontWeight: 'bold', mb: 2 }}>
          Apprenticeship
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button
            variant={selectedTab === 'ksb' ? 'contained' : 'outlined'}
            onClick={() => setSelectedTab('ksb')}
            sx={{
              backgroundColor: selectedTab === 'ksb' ? '#7FCC39' : 'transparent',
              color: selectedTab === 'ksb' ? '#1B3A52' : '#7FCC39',
            }}
          >
            KSB Matrix
          </Button>
          <Button
            variant={selectedTab === 'assignments' ? 'contained' : 'outlined'}
            onClick={() => setSelectedTab('assignments')}
            sx={{
              backgroundColor: selectedTab === 'assignments' ? '#7FCC39' : 'transparent',
              color: selectedTab === 'assignments' ? '#1B3A52' : '#7FCC39',
            }}
          >
            Assignments
          </Button>
        </Box>
      </Box>

      {selectedTab === 'ksb' && (
        <Box>
          <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2 }}>
            Knowledge, Skills & Behaviours
          </Typography>
          {selectedCourse.ksbs && selectedCourse.ksbs.length > 0 ? (
            <Box>
              {selectedCourse.ksbs.map((ksb: any, index: number) => (
                <Card key={index} sx={{ backgroundColor: '#234F71', mb: 2 }}>
                  <CardContent>
                    <Typography variant="body2" sx={{ color: '#7FCC39', mb: 1 }}>
                      {ksb.category}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
                      {ksb.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
              No KSBs available for this course.
            </Typography>
          )}
        </Box>
      )}

      {selectedTab === 'assignments' && (
        <Box>
          <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2 }}>
            Assignments
          </Typography>
          {selectedCourse.assignments && selectedCourse.assignments.length > 0 ? (
            <Box>
              {selectedCourse.assignments.map((assignment: any, index: number) => (
                <Card 
                  key={index}
                  sx={{ 
                    backgroundColor: '#234F71', 
                    mb: 2,
                    cursor: 'pointer',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#7FCC39', mb: 1 }}>
                      {assignment.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#CCCCCC', mb: 2 }}>
                      {assignment.description}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setSelectedAssignment(assignment);
                        setSubmissionDialog(true);
                      }}
                      sx={{ backgroundColor: '#7FCC39', color: '#1B3A52' }}
                    >
                      Submit Assignment
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
              No assignments available for this course.
            </Typography>
          )}
        </Box>
      )}

      <Dialog 
        open={submissionDialog} 
        onClose={() => setSubmissionDialog(false)}
        PaperProps={{ sx: { backgroundColor: '#234F71' } }}
      >
        <DialogTitle sx={{ color: '#7FCC39' }}>Submit Assignment</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#FFFFFF', mb: 2 }}>
              Upload 6 images ({images.length}/6)
            </Typography>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              style={{ marginBottom: 16 }}
            />
            {images.map((img, idx) => (
              <Typography key={idx} variant="caption" sx={{ color: '#CCCCCC', display: 'block' }}>
                {img.name}
              </Typography>
            ))}

            <Typography variant="body2" sx={{ color: '#FFFFFF', mb: 2, mt: 3 }}>
              Essay (minimum 100 words) ({essay.length} words)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              placeholder="Write your essay here..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#FFFFFF',
                  '& fieldset': { borderColor: '#7FCC39' },
                },
              }}
            />
          </Box>
        </DialogContent>
        <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
          <Button 
            onClick={() => setSubmissionDialog(false)}
            sx={{ color: '#7FCC39' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmitAssignment}
            variant="contained"
            sx={{ backgroundColor: '#7FCC39', color: '#1B3A52' }}
          >
            Submit
          </Button>
        </Box>
      </Dialog>
    </Container>
  );
}

export default ApprenticeshipPage;
