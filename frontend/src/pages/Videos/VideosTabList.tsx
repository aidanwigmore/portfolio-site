import React, { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { Box, Tab, Stepper, Step, StepLabel } from '@mui/material';

import { CustomTypography } from '@/materials/Typography';

import { CustomAccordion } from '@/materials/Accordion';

import ThumbUp from '@/components/ThumbUp';

import TabList from '@mui/lab/TabList';
import { useTheme } from '@mui/material/styles';
import CustomButton from '@/materials/Button';

interface VideosTabListProps {
  children?: React.ReactNode;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;

  items: any[];
  currentPage: number;
  home?: boolean;
  handleThumbsUp: (ratingCode: string) => void;
}

function VideosTabListProps({
  handleChange,
  items,
  currentPage,
  home,
  handleThumbsUp,
}: VideosTabListProps) {
  const theme = useTheme();
  const [activeSteps, setActiveSteps] = useState<number[]>(items.map(() => 0));
  const [skipped, setSkipped] = useState<Set<number>>(new Set());

  const isStepOptional = (step: number) => step === 1;
  const isStepSkipped = (itemIndex: number, step: number) =>
    skipped.has(itemIndex * 100 + step);

  const handleNext = (itemIndex: number) => {
    setActiveSteps((prevActiveStep) => {
      const newSteps = [...prevActiveStep];
      newSteps[itemIndex] += 1;
      return newSteps;
    });
  };

  const handleBack = (itemIndex: number) => {
    setActiveSteps((prevActiveStep) => {
      const newSteps = [...prevActiveStep];
      newSteps[itemIndex] -= 1;
      return newSteps;
    });
  };

  const handleSkip = (itemIndex: number) => {
    if (!isStepOptional(activeSteps[itemIndex])) {
      return;
    }

    setActiveSteps((prevActiveStep) => {
      const newSteps = [...prevActiveStep];
      newSteps[itemIndex] += 1;
      return newSteps;
    });
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(itemIndex * 100 + activeSteps[itemIndex]);
      return newSkipped;
    });
  };

  const handleReset = (itemIndex: number) => {
    setActiveSteps((prevActiveStep) => {
      const newSteps = [...prevActiveStep];
      newSteps[itemIndex] = 0;
      return newSteps;
    });
  };

  return (
    <>
      <List dense={false}>
        <TabList
          onChange={handleChange}
          aria-label="video-tabslist"
          sx={{
            '& .MuiTabs-flexContainer': {
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
              gap: '8px',
            },
            width: '100%',
          }}
        >
          {items.map((item, index) => (
            <Tab
              sx={{
                backgroundColor: theme.palette.primary.contrastText,
                color: theme.palette.primary.main,
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.contrastText,
                  boxShadow: `0 4px 16px ${theme.palette.primary.main}`,
                },
              }}
              key={index}
              label={`${item.title}`}
              value={index + 1}
            />
          ))}
        </TabList>
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
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    backgroundColor: theme.palette.primary.contrastText,
                    flexDirection: 'column',
                    borderRadius: '8px',
                    padding: '1rem',
                    boxShadow: `0 8px 32px ${theme.palette.primary.contrastText}`,
                  }}
                >
                  <CustomTypography
                    color={theme.palette.primary.main}
                    variant={home ? 'h6' : 'h4'}
                    gutterBottom
                    component="span"
                    sx={{ flexWrap: 'wrap', textAlign: 'center' }}
                  >
                    {items[currentPage - 1].title}
                  </CustomTypography>
                  <CustomTypography
                    color={theme.palette.primary.main}
                    variant={home ? 'caption' : 'caption'}
                    gutterBottom
                    component="span"
                    sx={{ flexWrap: 'wrap', textAlign: 'center' }}
                  >
                    {item.description}
                  </CustomTypography>
                  <Stepper activeStep={currentStep}>
                    {item.steps.titles.map((label: string, stepIndex: number) => {
                      const stepProps: {
                        completed?: boolean;
                      } = {};

                      if (isStepSkipped(itemIndex, stepIndex)) {
                        stepProps.completed = false;
                      }

                      return (
                        <Step
                          sx={{
                            '& circle': {
                              fill: theme.palette.primary.main,
                            },
                            '&.Mui-active circle': {
                              fill: theme.palette.primary.main,
                            },
                            '&.Mui-completed circle': {
                              fill: theme.palette.primary.main,
                            },
                          }}
                          key={`step-${itemIndex}-${stepIndex}`}
                          {...stepProps}
                        >
                          <StepLabel>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <CustomTypography
                                color={theme.palette.primary.main}
                                variant={home ? 'caption' : 'caption'}
                                gutterBottom
                                component="span"
                                sx={{
                                  flexWrap: 'wrap',
                                  textAlign: 'center',
                                  textDecoration:
                                    currentStep === stepIndex ? 'underline' : 'none',
                                }}
                              >
                                {label}
                              </CustomTypography>
                              <CustomTypography
                                color={theme.palette.primary.main}
                                variant={home ? 'caption' : 'caption'}
                                gutterBottom
                                component="span"
                                sx={{
                                  flexWrap: 'wrap',
                                  textAlign: 'center',
                                }}
                              >
                                Uploaded: {item.steps.uploadDates[stepIndex]}
                              </CustomTypography>
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
                          You can find more videos on the {item.channel} Youtube
                          Channel. Thank you.
                        </CustomTypography>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            pt: 2,
                          }}
                        >
                          <Box sx={{ flex: '1 1 auto' }} />
                          <CustomButton onClick={() => handleReset(itemIndex)}>
                            Reset
                          </CustomButton>
                        </Box>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            pt: 2,
                          }}
                        >
                          <CustomButton
                            disabled={currentStep === 0}
                            onClick={() => handleBack(itemIndex)}
                            sx={{ mr: 1 }}
                          >
                            Back
                          </CustomButton>
                          <Box
                            sx={{
                              flex: '1 1 auto',
                            }}
                          />
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
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <CustomTypography
                      color={theme.palette.primary.main}
                      variant={home ? 'caption' : 'caption'}
                      gutterBottom
                      component="span"
                      sx={{
                        flexWrap: 'wrap',
                        textAlign: 'center',
                      }}
                    >
                      {item.steps.descriptions[currentStep]}
                    </CustomTypography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: { sm: '25vw' },
                      }}
                    >
                      <ThumbUp
                        index={currentStep}
                        name={item.steps.titles[currentStep]}
                        ratingCode={item.steps.ratingCodes[currentStep]}
                        onThumbsUp={() =>
                          handleThumbsUp(item.steps.ratingCodes[currentStep])
                        }
                      />
                      <iframe
                        src={item.src[currentStep % item.src.length]}
                        title="YouTube video player"
                        style={{
                          borderRadius: '8px',
                          width: '50vw',
                          height: '20vw',
                        }}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </Box>

                    {/* transcriptions */}
                    {item.stepsLabels ? (
                      <CustomAccordion item={item} currentStep={currentStep} />
                    ) : (
                      ''
                    )}
                  </Box>
                </Box>
              </ListItem>
            );
          })}
      </List>
    </>
  );
}

export default VideosTabListProps;
