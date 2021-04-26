import React, { useEffect, useRef, useState } from 'react';
import { Field } from './components/field';
import { Button, createStyles, Grid, makeStyles, Typography } from '@material-ui/core';
import { Form } from './components/form';
import { Sheep } from './types';
import { v4 as uuidv4 } from 'uuid';
import { SheepTable } from './components/sheepTable';
import { GridSelectionModelChangeParams } from '@material-ui/data-grid';
import { isBreedingPossible } from './utils/isBreedingPossible';
const faker = require('faker');

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        padding: {
            paddingTop: '100px',
        },
        button: {
            margin: '5% 40%',
        },
        text: {},
    })
);

/**
 * The main page of the app
 * Renders the main grid
 *
 * @constructor
 */
const Root = () => {
    const [gridWidth, setGridWidth] = useState<number>(100);
    const [sheep, setSheep] = useState<{ [key: string]: Sheep }>({});
    const [matingList, setMatingList] = useState<(string | number)[]>([]);
    const [totalSheep, setTotalSheep] = useState<number>(0);
    const containerRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<string>(
        "Hey! Let's start by creating some sheep. You need at least two sheep in oder to start breeding." +
            ' Use the form to add some sheep in the field :)'
    );
    const classes = useStyles();

    useEffect(() => {
        if (containerRef.current) {
            setGridWidth(containerRef.current.offsetWidth / 20);
        }
    }, [containerRef]);

    /**
     * It is adding a new sheep to the state and increases the sheep counter
     * @param sheepToAdd
     */
    const addSheep = (sheepToAdd: Sheep): void => {
        setSheep({
            ...sheep,
            [uuidv4()]: sheepToAdd,
        });
        setTotalSheep(totalSheep + 1);

        if (totalSheep === 1) {
            setMessage(
                'Good! Now you can select any sheep and encourage them to breed by using the button above!'
            );
        }
    };

    /**
     * It updates the state with the new selected for breeding sheep
     * @param param
     */
    const handleSelect = (param: GridSelectionModelChangeParams): void => {
        setMatingList(param.selectionModel);
    };

    /**
     * It updates the state by updates the branded status
     * @param id
     * @param isBranded
     */
    const handleBranding = (id: string, isBranded: boolean): void => {
        setSheep({
            ...sheep,
            [id]: {
                ...sheep[id],
                isBranded,
            },
        });
    };

    /**
     * Adds a new sheep to the state when there is a newborn
     */
    const handleMating = () => {
        if (!isBreedingPossible(setMessage)(matingList, sheep, totalSheep)) {
            return;
        }

        // There is 50% possibility for sheep to give birth after breeding
        if (Math.random() < 0.5) {
            const gender = faker.name.gender(['male', 'female']).toLowerCase();
            const name = faker.name.firstName(gender);
            addSheep({
                name,
                gender,
                isBranded: false,
                box: totalSheep,
            });
            setMessage(`Well done there is a newborn ${gender} sheep called ${name}!`);
        } else {
            setMessage('No luck this time. Keep trying :)');
        }
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3} ref={containerRef}>
                <Grid item xs={6} spacing={0}>
                    <Field
                        gridWidth={gridWidth}
                        sheep={sheep}
                        handleBranding={handleBranding}
                        matingList={matingList}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Grid item>
                        <Form handleSubmit={addSheep} totalSheep={totalSheep} />
                    </Grid>
                    <Grid className={classes.padding} xs={6} item>
                        <SheepTable handleSelect={handleSelect} sheep={sheep} />
                        <Button
                            className={classes.button}
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={handleMating}
                        >
                            Breed
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="div" align={'center'} variant={'subtitle1'}>
                        {message}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export { Root };
