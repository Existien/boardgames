import React, { useState } from 'react'
import { IconButton, InputBase } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

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

interface Props {
    onSearch: (user: string) => void
}

export const UserInput: React.FC<Props> = (props: Props) => {
    const [user, setUser] = useState("");
    return (
        <StyledBackground>
            <IconButton
              onClick={()=>props.onSearch(user)}
            >
              <SearchIcon style={{color: 'white'}}/>
              </IconButton>
            <StyledInputBase
                placeholder="User"
                value={user}
                onChange={((e)=>setUser(e.target.value))}
            />
        </StyledBackground>
    )
}