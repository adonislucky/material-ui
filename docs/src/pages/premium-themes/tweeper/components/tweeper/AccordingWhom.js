import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import atoms from '../atoms';

const { Avatar, Typography } = atoms;

const twitterList = [
  {
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    primary: 'Never stop thinking',
    secondary: '@never_stop',
  },
  {
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    primary: 'React Geek',
    secondary: '@react',
  },
  {
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    primary: 'Thailand',
    secondary: '@wonderful_th',
  },
];

function AccordingWhom() {
  return (
    <List subheader={<ListSubheader>According to whom</ListSubheader>}>
      {twitterList.map(({ image, primary, secondary }) => (
        <React.Fragment key={primary}>
          <ListItem button>
            <Avatar alt="Avatar" link src={image} />
            <ListItemText primary={primary} secondary={secondary} />
            <Button variant="outlined" color="primary">
              Follow
            </Button>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
      <ListItem button>
        <ListItemText>
          <Typography link>Show More</Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
}

export default AccordingWhom;
