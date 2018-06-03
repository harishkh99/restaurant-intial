import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from '../../Components/Header';
import LocationSearchInput from '../../Components/Input';
import config from '../../Config';
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
class Home extends React.Component {
    state = {
        gmapsLoaded: false,
        locationLoaded: false,
        currentLocation: null
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
        var self = this;
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by your browser");
            return;
        }
        function success(position) {
            self.props.history.push({
                pathname: '/restaurants',
                state: {
                    latLng: { lat: position.coords.latitude, lng: position.coords.longitude },
                    area: `${(+position.coords.latitude || 0).toFixed(6)},${(+position.coords.longitude || 0).toFixed(6)}`
                }
            });
        }

        function error() {
            console.log("Unable to retrieve your location");
        }
        navigator.geolocation.getCurrentPosition(success, error);
    }
    render() {
        const { classes, location, history } = this.props;
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
                                        <LocationSearchInput history={history} getLocation={this.getLocation} />
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
Home.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withRouter(withStyles(styles)(Home));