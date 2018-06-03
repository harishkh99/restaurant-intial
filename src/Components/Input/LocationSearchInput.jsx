import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { Button, Typography } from '@material-ui/core';
import LocationIcon from '@material-ui/icons/GpsFixed';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});
class LocationSearchInput extends React.Component {
    state = {
        address: ''
    }

    handleChange = (address) => {
        this.setState({ address })
    }

    handleSelect = (address) => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng);
                this.props.history.push({
                    pathname: '/restaurants',
                    state: {
                        latLng,
                        area: address.split(',')[0]
                    }
                });
            })
            .catch(error => console.error('Error', error))
    }

    render() {
        const { classes, getLocation } = this.props;
        return (
            <div>
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                        <div>
                            <input
                                {...getInputProps({
                                    placeholder: 'Search for places to find restaurants...',
                                    className: 'location-search-input'
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div {...getSuggestionItemProps(suggestion, { className, style })}>
                                            <span>{suggestion.description}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
                <br />
                <br />
                <Typography variant="display2" gutterBottom>
                    OR
                </Typography>
                <Button onClick={getLocation} className={classes.button} variant="raised" color="default">
                    Locate Me
                    <LocationIcon className={classes.rightIcon} />
                </Button>
            </div>
        );
    }
}

LocationSearchInput.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(LocationSearchInput);