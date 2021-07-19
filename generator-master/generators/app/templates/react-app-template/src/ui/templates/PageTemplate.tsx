import * as React from 'react';
import { Container, createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
  page: {
    width: '100%',
    padding: theme.spacing(0),
    display: 'flex',
    alignItems: 'center',
  },
}));

interface IPageTemplateProps {}

type TPageTemplateProps = IPageTemplateProps;

export const PageTemplate: React.FC<TPageTemplateProps> = (props) => {
  const { children } = props;
  const classes = useStyles();

  if (!children) return null;

  return (
    <div className={classes.page}>
      <Container maxWidth="xs">
        {children}
      </Container>
    </div>
  );
};
