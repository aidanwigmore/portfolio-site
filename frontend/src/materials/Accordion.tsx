import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import { CustomTypography } from '@/materials/Typography';

import { useTheme } from '@mui/material/styles';

interface CustomAccordionProps {
    item: {
        stepsLabels: string[];
    };
    currentStep: number;
}

export function CustomAccordion({ item, currentStep }: CustomAccordionProps) {
    const theme = useTheme();

    return (
        <Accordion
            sx={{
                backgroundColor: theme.palette.primary.contrastText,
                color: 'black',
                maxHeight: '500px',
                overflowY: 'auto',
            }}
        >
            <AccordionSummary
                expandIcon={
                    <ExpandMoreIcon
                        sx={{
                            fill: theme.palette.primary.main,
                        }}
                    />
                }
                aria-controls="panel1-content"
            >
                <CustomTypography color={theme.palette.primary.main} component="span">
                    Click for Transcriptions
                </CustomTypography>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    backgroundColor: theme.palette.secondary.light,
                }}
            >
                <CustomTypography component="span">
                    {item.stepsLabels[currentStep]}
                </CustomTypography>
            </AccordionDetails>
        </Accordion>
    );
}
