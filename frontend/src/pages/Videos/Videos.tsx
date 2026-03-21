import React, { useEffect, useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { Pagination, AccordionDetails, AccordionSummary, Box, Step, StepLabel, Stepper, Typography, Tab, IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { CustomTypography } from "../../materials/Typography";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import VideoData from "./VideoData";
import { ThumbUp } from '@mui/icons-material';

import { CustomButton } from "../../materials/Button";
import Title from '../../components/Title';
import { useThumbsUp } from '../../hooks/useThumbsUp';
import Theme from "../../Theme";

interface HomeProps {
  home?: boolean;
}

export default function Videos({ home }: HomeProps) {
  
  const { thumbsUpCounts, handleThumbsUp } = useThumbsUp('video');

  const items = VideoData;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const youtubeWidth = window.innerWidth > 600 ? "50%" : "100%";
  const youtubeHeight = window.innerWidth > 600 ? "50vw" : "30vw";
  
  const [elapsedTimes, setElapsedTimes] = useState<number[]>(items.map(() => 0));

  const [activeSteps, setActiveSteps] = useState<number[]>(items.map(() => 0));
  const [skippedSteps, setSkippedSteps] = useState<Set<number>[]>(items.map(() => new Set()));
  
  const [value, setValue] = useState<number>(1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentPage(newValue);
    setValue(newValue);
  };

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (itemIndex: number, step: number) => {
    return skippedSteps[itemIndex]?.has(step);
  };

  const handleNext = (itemIndex: number) => {
    setActiveSteps((prev) => {
      const newSteps = [...prev];
      newSteps[itemIndex]++;
      return newSteps;
    });

    setElapsedTimes((prev) => {
    const newTimes = [...prev];
    newTimes[itemIndex] = 0;
    return newTimes;
  });
  };

  const handleBack = (itemIndex: number) => {
    setActiveSteps((prev) => {
      const newSteps = [...prev];
      newSteps[itemIndex]--;
      return newSteps;
    });

    setElapsedTimes((prev) => {
      const newTimes = [...prev];
      newTimes[itemIndex] = 0;
      return newTimes;
  });
  };

  const handleSkip = (itemIndex: number) => {
    if (!isStepOptional(activeSteps[itemIndex])) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveSteps((prev) => {
      const newSteps = [...prev];
      newSteps[itemIndex]++;
      return newSteps;
    });

    setElapsedTimes((prev) => {
      const newTimes = [...prev];
      newTimes[itemIndex] = 0;
      return newTimes;
    });

    setSkippedSteps((prev) => {
      const newSkipped = [...prev];
      const newSet = new Set(newSkipped[itemIndex]);
      newSet.add(activeSteps[itemIndex]);
      newSkipped[itemIndex] = newSet;
      return newSkipped;
    });
  };

  const handleReset = (itemIndex: number) => {
    setActiveSteps((prev) => {
      const newSteps = [...prev];
      newSteps[itemIndex] = 0;
      return newSteps;
    });

    setElapsedTimes((prev) => {
      const newTimes = [...prev];
      newTimes[itemIndex] = 0;
      return newTimes;
    });
  };

  const handlePageChange = (itemIndex: number, pageNumber: number) => {
    setCurrentPage(pageNumber);
    setActiveSteps((prev) => {
      const newSteps = [...prev];
      newSteps[itemIndex] = 0;
      return newSteps;
    });
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTimes((prev) =>
        prev.map((time) => time + 0.01)
      );
    }, 10);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
      <>
      <Title children={"Videos I've Made"} />
      <TabContext value={value}>
        <Box sx={{
          padding: '2vw',
          display: 'flex', 
          flexDirection: 'column', 
          backgroundColor: Theme.palette.primary.main, 
          borderRadius: '8px',
        }}>
          <List dense={true}>
            <TabList onChange={handleChange} aria-label="tabslist" sx={{ 
              backgroundColor: Theme.palette.secondary.light,
              display: 'flex',
              borderRadius: '8px',
              gap: "1rem",
              width: '100%',
              '& .MuiTabs-flexContainer': {
                justifyContent: 'center',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: Theme.palette.secondary.contrastText,
                height: '7px',
                borderRadius: '8px',
              },
              '& .MuiTabs-active': {
                backgroundColor: Theme.palette.secondary.dark,
                height: '7px',
              },
              '& .MuiTab-root': {
                color: '#fff',
                backgroundColor: Theme.palette.secondary.main,
                minWidth: 'auto',
                transition: 'all 0.3s ease',
                borderRadius: '8px',
              '&.Mui-selected': {
                backgroundColor: Theme.palette.secondary.dark,
                color: Theme.palette.secondary.contrastText,
              }
              }
            }}>
            {items.map((item, index) => (
              <Tab key={index} label={`${item.title}`} value={index + 1} />
            ))}
          </TabList>
          {items
            .filter((item) => items.indexOf(item) === currentPage - 1)
            .map((item, index) => {
              const itemIndex = items.indexOf(item);
              const currentStep = activeSteps[itemIndex];
              const isCompleted = currentStep === item.steps.titles.length;

            return (
              <ListItem
                key={itemIndex}
                sx={{
                  backgroundColor: Theme.palette.primary.main,
                  borderRadius: "8px",
                }}
              >
                <Box sx={{ marginTop: 0, width: '100%', padding: '2vw', justifyContent: 'center', alignItems: 'center', display: 'flex', backgroundColor: Theme.palette.primary.light, flexDirection: 'column', borderRadius: '8px' }}>
                  <Typography variant="h4" gutterBottom component="span" sx={{ flexWrap: 'wrap', textAlign: 'center' }}>
                    {items[currentPage - 1].title} - {items[currentPage - 1].description}
                  </Typography>
                  <Stepper activeStep={currentStep}>
                    {item.steps.titles.map((label, stepIndex) => {
                      const stepProps: { completed?: boolean } = {};

                      if (isStepSkipped(itemIndex, stepIndex)) {
                        stepProps.completed = false;
                      }

                      return (
                        <Step key={`step-${itemIndex}-${stepIndex}`} {...stepProps}>
                          <StepLabel>
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                              <div>
                                {label}
                              </div>
                              <div>
                                {item.steps.descriptions[stepIndex]}
                              </div>
                              <div>
                                Uploaded: {item.steps.uploadDates[stepIndex]}
                              </div>
                            </Box>
                          </StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                  <>
                  {isCompleted ? (
                      <React.Fragment>
                        <CustomTypography sx={{ mt: 1, mb: 1 }}>
                          You can find more videos on the {item.channel} Youtube Channel. Thank you.
                        </CustomTypography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                          <Box sx={{ flex: '1 1 auto' }} />
                          <CustomButton onClick={() => handleReset(itemIndex)}>Reset</CustomButton>
                        </Box>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                          <CustomButton
                            disabled={currentStep === 0}
                            onClick={() => handleBack(itemIndex)}
                            sx={{ mr: 1 }}
                          >
                            Back
                          </CustomButton>
                          <Box sx={{ flex: '1 1 auto' }} />
                          {isStepOptional(currentStep) && (
                            <CustomButton
                              color="inherit"
                              onClick={() => handleSkip(itemIndex)}
                              sx={{ mr: 1 }}
                            >
                              Skip
                            </CustomButton>
                          )}
                          <CustomButton onClick={() => handleNext(itemIndex)}>
                            {currentStep === item.steps.titles.length - 1
                              ? 'Finish'
                              : 'Next'}
                          </CustomButton>
                        </Box>
                      </React.Fragment>
                    )}
                  </>
                  
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      width: youtubeWidth,
                      height: { sm: '25vw' },

                    }}
                  >
                    <iframe
                      src={item.src[currentStep % item.src.length]}
                      title="YouTube video player"
                      style={{
                        borderRadius: "8px",
                        width: "100%",
                        height: "100%",
                        marginTop: "1vw",
                      }}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                      <IconButton 
                        onClick={() => handleThumbsUp(item.title)}
                        size="large"
                        sx={{color: Theme.palette.primary.dark, backgroundColor: Theme.palette.primary.main}}
                      >
                        <ThumbUp />
                      </IconButton>
                      <Typography variant="body2">
                        {thumbsUpCounts[item.title] || 0}
                      </Typography>
                    </Box>
                    {item.stepsLabels ? (
                    <Accordion sx={{maxHeight: '200px', overflowY: 'auto' }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                      >
                        <CustomTypography component="span">Click for Transcriptions</CustomTypography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {item.stepsLabels[currentStep]}
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    ''
                  )}
                  </Box>
                  </ListItem>
            );     })}
          </List>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
          
          <Typography variant="caption" component="span" sx={{ ml: 2 }}>
            {items[currentPage - 1].title} - {items[currentPage - 1].description}
          </Typography>
          
          <Pagination
            count={items.length}
            page={currentPage}
            onChange={(event, pageNumber) => {
              setCurrentPage(pageNumber);
              setActiveSteps((prev) => {
                const newSteps = [...prev];
                newSteps[0] = 0;
                return newSteps;
              });
            }}
            color="primary"
          />
          
          <Typography variant="caption" component="span" sx={{ ml: 2 }}>
            (Page {currentPage} of {items.length})
          </Typography>
        
        </Box>
      
      </TabContext>
      </>
  );
}
