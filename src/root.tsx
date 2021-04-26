import React, { useEffect, useRef, useState } from 'react';
import { Field } from './components/field';
import { createStyles, Grid, makeStyles } from '@material-ui/core';
import { Form } from './components/form';
import { Sheep } from './types';
import { v4 as uuidv4 } from 'uuid';
import { SheepTable } from './components/sheepTable';
// import { GridSelectionModelChangeParams } from '@material-ui/data-grid';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        padding: {
            paddingTop: '100px',
        },
    })
);

const Root = () => {
    const [gridWidth, setGridWidth] = useState(100);
    const [sheep, setSheep] = useState<{ [key: string]: Sheep }>({});
    const [totalSheep, setTotalSheep] = useState(0);
    const containerRef = useRef<HTMLInputElement>(null);
    const classes = useStyles();

    useEffect(() => {
        if (containerRef.current) {
            setGridWidth(containerRef.current.offsetWidth / 20);
        }
    }, [containerRef]);

    const handleSubmit = (sheepToAdd: Sheep): void => {
        setSheep({
            ...sheep,
            [uuidv4()]: sheepToAdd,
        });
        setTotalSheep(totalSheep + 1);
    };

    // const handleSelect = (param: GridSelectionModelChangeParams): void => {
    //     console.log(param.selectionModel);
    //     let sheepInState = sheep;
    //     const
    //     setSheep({
    //         ...sheep,
    //         [param.selectionModel[0]]: {
    //             ...sheep[param.selectionModel[0]],
    //             isSelected: !sheep[param.selectionModel[0]].isSelected,
    //         },
    //     });
    // };

    const handleBranding = (id: string, isBranded: boolean): void => {
        setSheep({
            ...sheep,
            [id]: {
                ...sheep[id],
                isBranded,
            },
        });
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3} ref={containerRef}>
                <Grid item xs={6}>
                    <Field gridWidth={gridWidth} sheep={sheep} handleBranding={handleBranding} />
                </Grid>
                <Grid item xs={6}>
                    <Grid item>
                        <Form handleSubmit={handleSubmit} totalSheep={totalSheep} />
                    </Grid>
                    <Grid className={classes.padding} xs={6} item>
                        {/*<SheepTable handleSelect={handleSelect} sheep={sheep} />*/}
                        <SheepTable sheep={sheep} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export { Root };
