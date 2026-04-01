import React from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import { CustomTypography } from '@/materials/Typography';

import { useTheme } from '@mui/material/styles';

interface FilterModalProps {
  children?: React.ReactNode;
  filterModalOpen?: boolean;
  handleFilterModalClose?: () => void;
  availableTags?: string[];
  handleTagClick?: (tagName: string) => void;
  selectedTags?: Set<string>;
  handleClearFilters?: () => void;
  transitionSpeed?: number;
  handleTransitionSpeedChange?: (_event: Event, newValue: number | number[]) => void;
  setSortOrder?: React.Dispatch<React.SetStateAction<'newest' | 'oldest'>>;
  sortOrder?: 'newest' | 'oldest';
}

function FilterModal({
  filterModalOpen,
  handleFilterModalClose,
  availableTags,
  handleTagClick,
  selectedTags,
  handleClearFilters,
  transitionSpeed,
  handleTransitionSpeedChange,
  setSortOrder,
  sortOrder,
}: FilterModalProps) {
  const theme = useTheme();

  return (
    <>
      <Modal
        open={filterModalOpen || false}
        onClose={handleFilterModalClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.primary.contrastText,
            borderRadius: '8px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: `0 4px 16px ${theme.palette.secondary.light}`,
          }}
        >
          <CustomTypography
            color={theme.palette.primary.main}
            variant="h6"
            sx={{ marginBottom: '1.5rem' }}
          >
            Gallery Filters
          </CustomTypography>

          <Stack spacing={2}>
            {/* Tag Filters */}
            <Box>
              <CustomTypography
                color={theme.palette.primary.main}
                variant="subtitle2"
                sx={{ marginBottom: '0.75rem' }}
              >
                Filter by Tags
              </CustomTypography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {availableTags?.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onClick={() => handleTagClick?.(tag)}
                    variant={selectedTags?.has(tag) ? 'filled' : 'outlined'}
                    sx={{
                      backgroundColor: selectedTags?.has(tag)
                        ? theme.palette.primary.main
                        : 'transparent',
                      color: selectedTags?.has(tag)
                        ? theme.palette.primary.contrastText
                        : theme.palette.primary.main,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </Stack>
              {selectedTags && selectedTags.size > 0 && (
                <Chip
                  label="Clear Filters"
                  onClick={handleClearFilters}
                  variant="outlined"
                  color="error"
                  sx={{
                    cursor: 'pointer',
                    marginTop: '0.75rem',
                  }}
                />
              )}
            </Box>

            {/* Date Sort */}
            <Box>
              <CustomTypography
                color={theme.palette.primary.main}
                variant="subtitle2"
                sx={{ marginBottom: '0.75rem' }}
              >
                Sort by Date
              </CustomTypography>
              <RadioGroup
                row
                value={sortOrder}
                sx={{
                  color: theme.palette.primary.main,
                }}
                onChange={(e) => setSortOrder?.(e.target.value as 'newest' | 'oldest')}
              >
                <FormControlLabel
                  value="newest"
                  control={<Radio sx={{ color: theme.palette.primary.main }} />}
                  label="Newest First"
                />
                <FormControlLabel
                  value="oldest"
                  control={<Radio sx={{ color: theme.palette.primary.main }} />}
                  label="Oldest First"
                />
              </RadioGroup>
            </Box>

            {/* Transition Speed Slider */}
            <Box>
              <CustomTypography
                color={theme.palette.primary.main}
                variant="subtitle2"
                sx={{ marginBottom: '0.75rem' }}
              >
                Transition Speed: {transitionSpeed}s
              </CustomTypography>
              <Slider
                value={transitionSpeed || 5}
                onChange={handleTransitionSpeedChange}
                min={1}
                max={15}
                step={0.5}
                marks={[
                  { value: 1, label: '1s' },
                  { value: 8, label: '8s' },
                  { value: 15, label: '15s' },
                ]}
                valueLabelDisplay="auto"
                sx={{
                  '& .MuiSlider-markLabel': {
                    color: theme.palette.primary.main,
                  },
                  width: '100%',
                }}
              />
            </Box>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default FilterModal;
