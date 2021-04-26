import React, { useState } from 'react';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from '@material-ui/core';

import { Sheep } from '../types';

/**
 * Renders the form for adding new sheep to the field
 * @param handleSubmit
 * @param totalSheep
 * @constructor
 */
const Form = ({ handleSubmit, totalSheep }: FormProps) => {
    const [gender, setGender] = useState<string>('female');
    const [name, setName] = useState<string>('');
    const [helperText, setHelperText] = useState<string>('Add a sheep');
    const [error, setError] = useState<boolean>(false);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender((event.target as HTMLInputElement).value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName((event.target as HTMLInputElement).value);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (totalSheep === 20) {
            setHelperText('You can not add more sheep. Leave some space for newborns!');
            setError(true);
            return;
        }

        handleSubmit({ name, gender, box: totalSheep, isBranded: false });
    };

    return (
        <form onSubmit={onSubmit}>
            <FormControl component="fieldset" error={error} style={{ top: 50 }}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={gender}
                    onChange={handleRadioChange}
                    row
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
                <TextField
                    value={name}
                    onChange={handleNameChange}
                    id="outlined-basic"
                    variant="outlined"
                    label="Name"
                    required
                    error={error}
                />
                <FormHelperText>{helperText}</FormHelperText>
                <Button style={{ top: 5 }} type="submit" variant="contained" color="primary">
                    Add sheep
                </Button>
            </FormControl>
        </form>
    );
};

interface FormProps {
    handleSubmit: (sheepToAdd: Sheep) => void;
    totalSheep: number;
}

export { Form };
