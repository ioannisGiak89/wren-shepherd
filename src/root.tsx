import * as React from 'react';
import { range } from 'lodash';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import { useEffect } from 'react';
// import { Container, CssBaseline, Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            height: 140,
            width: 100,
            backgroundColor: 'green',
        },
    })
);

const Root = () => {
    const classes = useStyles();

    useEffect(() => {});

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                {range(5).map((raws) => (
                    <Grid key={raws} container justify="center" spacing={0}>
                        {range(6).map((column) => (
                            <Grid key={column} item>
                                <div className={classes.paper} />
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
            <Grid item xs={12}>
                <img src={} />;
            </Grid>
        </Grid>
    );
};

export { Root };
