import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import RestaurantCard from '../../Components/RestaurantCard';
import Header from '../../Components/Header';
import configData from '../../Config';

const styles = theme => ({
    restaurantContiner: {
        paddingTop: "24px",
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingBottom: "24px",
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});
class Restaurants extends React.Component {
    state = {
        currentLocation: null,
        radius: 5000,
        area: null,
        fetching: true,
        error: false,
        restaurants: null,
    }

    changeRadius = (newRadius) => {
        this.setState(prevState => {
            return {
                ...prevState,
                radius: newRadius
            }
        });
    }
    fetchRestaurants = (newLocation) => {
        if (newLocation) {
            const coordString = `${newLocation.lat},${newLocation.lng}`
            axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordString}&radius=${this.state.radius}&type=restaurant&key=${configData.pAPIKey}`)
                .then(response => {
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            fetching: false,
                            restaurants: (response.data && response.data.results && response.data.results.length > 0) ? response.data.results : []
                        }
                    });
                    console.log(response.data.results);
                })
                .catch(error => {
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            fetching: false,
                            erro: true,
                            restaurants: null
                        }
                    });
                    console.log('fet retaurants error');
                });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.currentLocation && nextState.restaurants === null) {
            this.fetchRestaurants(nextState.currentLocation);
            return false;
        }

        if (nextState.radius !== this.state.radius) {
            this.fetchRestaurants(nextState.currentLocation);
            return false;
        }
        return true;
    }
    componentDidMount() {
        if (this.props.location && this.props.location.state)
            this.setState(prevState => {
                return {
                    ...prevState,
                    currentLocation: this.props.location.state.latLng,
                    area: this.props.location.state.area
                }
            });
    }
    render() {
        const { classes, location } = this.props;
        const { restaurants, currentLocation, area, fetching, radius } = this.state;
        return (
            <div>
                <Header
                    currentLocation={currentLocation}
                    location={location}
                    radius={radius}
                    area={area}
                    fetching={fetching}
                    fetchRestaurants={this.fetchRestaurants}
                    changeRadius={this.changeRadius} />
                {!fetching && currentLocation &&
                    <div className={classes.restaurantContiner}>
                        <br />
                        <div className={classes.root}>
                            <Grid container spacing={16}>
                                {
                                    restaurants && restaurants.length > 0 &&
                                    restaurants.map((restaurant, i) => {
                                        return (<Grid item xs={6} sm={3} key={restaurant.id}>
                                            <RestaurantCard data={restaurant} className={classes.paper} />
                                        </Grid>)
                                    })
                                }
                                {
                                    restaurants && restaurants.length === 0 &&
                                    <Typography>
                                        Opps...!! No Restaurants Found
                                </Typography>
                                }
                            </Grid>
                        </div>
                    </div>
                }
                {
                    !fetching && !currentLocation &&
                    (<div>
                        Unable to detect location.
                         <Link to='/' >Click here to select location</Link>
                    </div>)
                }
                {
                    fetching &&
                    (<Grid container justify="center" className={classes.root} spacing={16}>
                        <Grid item xs={12} >
                            <CircularProgress className={classes.progress} size={200} />
                        </Grid>
                    </Grid>)
                }
            </div>

        );
    }

}

Restaurants.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withRouter(withStyles(styles)(Restaurants));
