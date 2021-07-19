import * as React from 'react';
import {
  Box, createStyles, Paper, Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { PageTemplate } from './PageTemplate';

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
    marginBottom: theme.spacing(2),
  },
  text: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  buttonBox: {
    marginTop: theme.spacing(4),
  },
}));

interface IErrorTemplateProps {
  action: () => void;
  actionText: string;
  description: string;
  title: string;
}

type TErrorTemplateProps = IErrorTemplateProps;

export const ErrorTemplate: React.FC<TErrorTemplateProps> = (props) => {
  const {
    action,
    actionText,
    description,
    title,
  } = props;
  const classes = useStyles();

  return (
    <PageTemplate>
      <Paper className={classes.layout}>
        <Typography variant="h1" className={classes.title}>{title}</Typography>
        <Typography variant="h2" className={classes.text}>{description}</Typography>
        <Box className={classes.buttonBox}>
          <Button
            data-bcs-id="btn-link-main"
            variant="contained"
            color="primary"
            onClick={action}
          >
            {actionText}
          </Button>
        </Box>
      </Paper>
    </PageTemplate>
  );
};
