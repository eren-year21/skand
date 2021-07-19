import * as React from 'react';
import { createStyles, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PageTemplate } from '../templates';

const useStyles = makeStyles((theme) => createStyles({
  layout: {
    padding: theme.spacing(12),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'min-content',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
}));

interface IRootPageProps {}

type TRootPageProps = IRootPageProps;

export const RootPage: React.FC<TRootPageProps> = () => {
  const classes = useStyles();

  return (
    <PageTemplate>
      <Paper className={classes.layout}>
        <Typography variant="h1" className={classes.title}>Главная страница приложения</Typography>
      </Paper>
    </PageTemplate>
  );
};
