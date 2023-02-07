import * as React from 'react';

// MUI imports
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

// Import Controls
import { useStore } from '../../store/SimulationStore';

// Material icons
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import FastForwardIcon from '@mui/icons-material/FastForward';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { SimulationState } from '../../apiary/simulation/SimulationState';
import { SimulationStore } from '../../store/SimulationStoreVanilla';

type SimulationControlsProps = {
  onPlay  : () => void
  onPause : () => void
}

const SimulationControls: React.FC<SimulationControlsProps> = (props) => {

  // Internal state
  const runningRef = React.useRef<SimulationStore>();
  runningRef.current = useStore();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <div style={{
        marginTop:'32px',
        borderRadius:'32px',
        backgroundColor:'#FFFFFF'
      }}>
        {runningRef.current ? <ButtonGroup variant="text" aria-label="text button group" style={{transform:"translate(0,-10%)"}}>
          {/* Play or Pause the Simulation */}
          {runningRef.current.simulationState === SimulationState.PAUSED ?
            <IconButton color="primary" aria-label="Start Simulation" component="label" onClick={() => {
              runningRef.current.play();
              props.onPlay();
            }}>
              <PlayCircleOutlineIcon/>
            </IconButton>
          : 
            <IconButton color="primary" aria-label="Pause Simulation" component="label" onClick={() => {
              runningRef.current.pause();
              props.onPause();
            }}>
              <PauseCircleOutlineIcon/>
            </IconButton>
          }
          
          <IconButton
            color="primary"
            aria-label="Step Simulation"
            disabled={runningRef.current.simulationState === SimulationState.RUNNING}
            component="label" 
            onClick={() => {
              runningRef.current.setFrameAdvance(true);
            }
          }>
            <FastForwardIcon/>
          </IconButton>

          <IconButton color="primary" aria-label="Pause Simulation" component="label" onClick={() => {
            runningRef.current.pause();
            props.onPause();
          }}>
            <RestartAltIcon/>
          </IconButton>

        </ButtonGroup> : <></>}
      </div>
    </Box>
  );
}

export default SimulationControls;