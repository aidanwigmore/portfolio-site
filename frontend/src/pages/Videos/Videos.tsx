import React, { useEffect, useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { Pagination, AccordionDetails, AccordionSummary, Box, Button, Step, StepLabel, Stepper, Typography, Tab } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { CustomTypography } from "../../materials/Typography";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import VideoData from "./VideoData";

export default function Videos() {
  const items = VideoData;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const youtubeWidth = window.innerWidth > 600 ? "50%" : "100%";
  const youtubeHeight = window.innerWidth > 600 ? "50vh" : "30vh";
  
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
      <TabContext value={value}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="caption" component="span" sx={{ ml: 2 }}>
            {items[currentPage - 1].title} - {items[currentPage - 1].description}
          </Typography>
        </Box>
        <List dense={false}>
        <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
          {items.map((item, index) => (
            <Tab key={index} label={`${item.title}`} value={index + 1} />
          ))}
        </TabList>
        {items
          .filter((item) => items.indexOf(item) === currentPage - 1)
          .map((item, index) => {
            const itemIndex = items.indexOf(item);
            const currentStep = activeSteps[itemIndex];
            const isCompleted = currentStep === item.steps.length;

          return (
            <ListItem
              key={itemIndex}
              sx={{
                backgroundColor: itemIndex % 2 === 0 ? "#f9f9f9" : "#eaeaea",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <Box sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                <Stepper activeStep={currentStep}>
                  {item.steps.map((label, stepIndex) => {
                    const stepProps: { completed?: boolean } = {};

                    if (isStepSkipped(itemIndex, stepIndex)) {
                      stepProps.completed = false;
                    }

                    return (
                      <Step key={`step-${itemIndex}-${stepIndex}`} {...stepProps}>
                        <StepLabel>{label}</StepLabel>
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
                        <Button onClick={() => handleReset(itemIndex)}>Reset</Button>
                      </Box>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                          color="inherit"
                          disabled={currentStep === 0}
                          onClick={() => handleBack(itemIndex)}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(currentStep) && (
                          <Button
                            color="inherit"
                            onClick={() => handleSkip(itemIndex)}
                            sx={{ mr: 1 }}
                          >
                            Skip
                          </Button>
                        )}
                        <Button onClick={() => handleNext(itemIndex)}>
                          {currentStep === item.steps.length - 1
                            ? 'Finish'
                            : 'Next'}
                        </Button>
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
                    marginY: 2,
                  }}
                >
                  <iframe
                    src={item.src[currentStep % item.src.length]}
                    title="YouTube video player"
                    style={{
                      borderRadius: "8px",
                      width: "100%",
                      height: "100%",
                    }}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
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
                </Box>
                </ListItem>
          );     })}
        </List>
        
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
