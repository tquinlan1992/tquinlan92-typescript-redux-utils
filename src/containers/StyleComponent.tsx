import React from 'react';
import { WithStyles, withStyles } from '../tquinlan92-typescript-redux-utils';
import { connectProps } from '../store';

function ComponentToStyle({ value, classes }: { value: string; } & WithStyles<typeof styles>) {
    return <h1 className={classes.header}>{value}</h1>
}

const styles = { header: { color: 'orange' } };
const StyledComponent = withStyles(styles)(ComponentToStyle);

export const { Connected: ComponentWithProps } = connectProps(
    (state, { valueFromProp }: { valueFromProp: string;}) => {
        return {
            valueFromProp
        }
    })(({ valueFromProp }) => {
        return <StyledComponent value={valueFromProp} />;
    })
