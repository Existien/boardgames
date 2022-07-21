import React  from 'react'
import { IconButton, InputBase } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import { Dispatch } from '../../util';
import {setUser, selectUser} from "./slice"
import { connect } from 'react-redux';
import { RootState } from '../../store';

const StyledBackground = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
}));

interface StateProps {
  user: string;
}

interface DispatchProps {
    onChange: (user: string) => void;
}

type Props = StateProps & DispatchProps

export const UserInput: React.FC<Props> = (props: Props) => {
    return (
        <StyledBackground>
            <IconButton href={`/?user=${props.user}`}>
              <PersonIcon style={{color: 'white'}}/>
              </IconButton>
            <StyledInputBase
                placeholder="User"
                value={props.user}
                onChange={((e)=>props.onChange(e.target.value))}
            />
        </StyledBackground>
    )
}

const mapStateToProps = (state: RootState): StateProps => ({
  user: selectUser(state)
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>  ({
  onChange(user) {
    dispatch(setUser(user))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInput)