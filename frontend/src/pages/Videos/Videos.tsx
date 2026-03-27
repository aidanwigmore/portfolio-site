import React, { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { AccordionDetails, AccordionSummary, Box, Step, StepLabel, Stepper, Tab } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { CustomTypography } from "@/materials/Typography";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import VideoData from "@/pages/Videos/VideoData";

import ThumbUp from '@/components/ThumbUp';
import CustomTooltip from '@/materials/Tooltip';
import { CustomButton } from "@/materials/Button";
import Title from '@/components/Title';
import { useThumbsUp } from '@/hooks/useThumbsUp';
import Theme from "@/Theme";

interface VideosProps {
  home?: boolean;
}

export default function Videos({ home }: VideosProps) {
  
  const { handleThumbsUp } = useThumbsUp('video');

  const items = VideoData;

  const [currentPage, setCurrentPage] = useState<number>(1);

  // const youtubeWidth = window.innerWidth > 600 ? "50%" : "100%";
  // const youtubeHeight = window.innerWidth > 600 ? "50vw" : "30vw";
  
  const [__waelapsedTimes, setElapsedTimes] = useState<number[]>(items.map(() => 0));

  const [activeSteps, setActiveSteps] = useState<number[]>(items.map(() => 0));
  const [skippedSteps, setSkippedSteps] = useState<Set<number>[]>(items.map(() => new Set()));
  
  const [value, setValue] = useState<number>(1);
  const handleChange = (__event: React.SyntheticEvent, newValue: number) => {
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

  React.useEffect(() => {
      const handleTabWheel = (event: Event) => {
        const wheelEvent = event as WheelEvent;
        if (wheelEvent.shiftKey) {
          event.preventDefault();
          const nextValue = wheelEvent.deltaY > 0 
            ? Math.min(value + 1, items.length)
            : Math.max(value - 1, 1);
          
          if (nextValue !== value) {
            setValue(nextValue);
            setCurrentPage(nextValue);
          }
        }
      };
  
      const tabList = document.querySelector('[aria-label="tabslist"]');
      if (tabList) {
        tabList.addEventListener('wheel', handleTabWheel as EventListener, { passive: false });
      }
  
      return () => {
        if (tabList) {
          tabList.removeEventListener('wheel', handleTabWheel as EventListener);
        }
      };
    }, [value, items.length]);

  return (
      <>
      <TabContext value={value}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: Theme.palette.secondary.light, 
        }}>
          <Title children={"My Youtube Videos"} />
          <List dense={false}>
            <CustomTooltip 
              text="Shift + scroll or click each button" 
              placement="top"
            >
              <TabList 
                id={'video-tabslist'}
                onChange={handleChange} 
                aria-label="video-tabslist"
                sx={{'& .MuiTabs-flexContainer': {
                    gap: "0.5rem",
                    justifyContent: 'center',
                  }, 
                }}
              >
              {items.map((item, index) => (
                <Tab key={index} label={`${item.title}`} value={index + 1} />
              ))}
            </TabList>
          </CustomTooltip>
          {items
            .filter((item) => items.indexOf(item) === currentPage - 1)
            .map((item, __index) => {
              const itemIndex = items.indexOf(item);
              const currentStep = activeSteps[itemIndex];
              const isCompleted = currentStep === item.steps.titles.length;

            return (
              <ListItem
                key={itemIndex}
                sx={{
                  backgroundColor: Theme.palette.secondary.light,
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box 
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex', 
                    backgroundColor: Theme.palette.primary.light,
                    flexDirection: 'column', 
                    borderRadius: '8px',
                    padding: '1rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}>
                  <CustomTypography variant={home ? "h6" : "h4"} gutterBottom component="span" sx={{ flexWrap: 'wrap', textAlign: 'center' }}>
                    {items[currentPage - 1].title} - {items[currentPage - 1].description}
                  </CustomTypography>
                  <Stepper activeStep={currentStep}>
                    {item.steps.titles.map((label, stepIndex) => {
                      const stepProps: { completed?: boolean } = {};

                      if (isStepSkipped(itemIndex, stepIndex)) {
                        stepProps.completed = false;
                      }

                      return (
                        <Step
                          sx={{
                            '& circle': {
                              fill: Theme.palette.secondary.light,
                            },
                            '&.Mui-active circle': {
                              fill: Theme.palette.secondary.main,
                            },
                            '&.Mui-completed circle': {
                              fill: Theme.palette.secondary.dark,
                            },
                          }}
                         key={`step-${itemIndex}-${stepIndex}`} {...stepProps}>
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
                  <Box>
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
                  </Box>
                  
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column"
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        height: { sm: '25vw' },
                      }}
                    >
                      <ThumbUp
                        index={currentStep}
                        name={item.steps.titles[currentStep]}
                        ratingCode={item.steps.ratingCodes[currentStep]}
                        onThumbsUp={() => handleThumbsUp(item.steps.ratingCodes[currentStep])}
                      />
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
                        {item.stepsLabels ? (
                        <Accordion sx={{maxHeight: '500px', overflowY: 'auto' }}>
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
        </Box>
      </TabContext>
      </>
  );
}
