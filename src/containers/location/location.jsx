import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import LocationIcon from '@material-ui/icons/GpsFixed';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Header from '../header';
import LocationSearchInput from './LocationSearchInput';
import config from '../../config';
import {
    changeMiles,
    requestRestaurant
} from '../../modules/restaurant';

const styles = theme => ({
    restaurantContiner: {
        paddingTop: "24px",
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingBottom: "24px",
    },
    button: {
        margin: theme.spacing.unit,
    },
    root: {
        flexGrow: 1,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

const locationData = [13.107831, 80.096470];
class Location extends React.Component {
    state = {
        gmapsLoaded: false
    }
    initMap = () => {
        this.setState({
            gmapsLoaded: true,
        })
    }

    componentDidMount() {
        window.initMap = this.initMap
        const gmapScriptEl = document.createElement(`script`)
        gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${config.pAPIKey}&libraries=places&callback=initMap`
        document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
    }
    getLocation = () => {
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by your browser");
            return;
        }
        function success(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            locationData[0] = latitude;
            locationData[1] = longitude;
            requestRestaurant(locationData, 5);
        }

        function error() {
            console.log("Unable to retrieve your location");
        }
        navigator.geolocation.getCurrentPosition(success, error);
    }
    render() {
        const { classes, location, requestRestaurant, changePage } = this.props;
        return (
            <div>
                <Header location={location} />
                <div className={classes.restaurantContiner}>
                    <br />
                    <div className={classes.root}>
                        <Grid container justify="center" spacing={16}>
                            <Grid item className={classes.paper} xs={6} >
                                {
                                    this.state.gmapsLoaded &&
                                    (<div>
                                        <LocationSearchInput requestRestaurant={requestRestaurant} changePage={changePage} />
                                        <Button onClick={this.getLocation} className={classes.button} variant="raised" color="default">
                                            Locate Me
                                        <LocationIcon className={classes.rightIcon} />
                                        </Button>
                                    </div>)
                                }
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>

        );
    }

}
const mapStateToProps = state => ({
    miles: state.miles,
    restaurants: state.isFetching,
    isFetching: state.restaurants
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            changeMiles,
            requestRestaurant,
            changePage: () => push('/restaurants')
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Location));
