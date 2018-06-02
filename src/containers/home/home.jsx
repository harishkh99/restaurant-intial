import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import RestaurantCard from '../restaurant';
import {
  changeMiles,
  requestRestaurant
} from '../../modules/restaurant';
import Header from '../header'

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
});
const restaurantList = [
  {
    "geometry": {
      "location": {
        "lat": 13.0223602,
        "lng": 80.2194985
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
    "id": "b37a19e6f6d1b38ae29decec899b290e29145ea5",
    "name": "Saidapet varthaga Sangam Cheap Mess",
    "rating": 5,
    "vicinity": "railway station, near, West Saidapet, West Saidapet, Chennai"
  },
  {
    "geometry": {
      "location": {
        "lat": 13.0223602,
        "lng": 80.2194985
      }
    },
    "rating": 4,
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
    "id": "19864f2f71c70a31e995775f7b7a1e809fe2662b",
    "name": "Sppizzy Hut",
    "vicinity": "West Saidapet, West Saidapet, Chennai"
  }, {
    "geometry": {
      "location": {
        "lat": 13.0223602,
        "lng": 80.2194985
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
    "id": "b37a19e6f6d1b38ae29decec899b290e29145ea5",
    "name": "Saidapet varthaga Sangam Cheap Mess",
    "rating": 5,
    "vicinity": "railway station, near, West Saidapet, West Saidapet, Chennai"
  },
  {
    "geometry": {
      "location": {
        "lat": 13.0223602,
        "lng": 80.2194985
      }
    },
    "rating": 4,
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
    "id": "19864f2f71c70a31e995775f7b7a1e809fe2662b",
    "name": "Sppizzy Hut",
    "vicinity": "West Saidapet, West Saidapet, Chennai"
  }, {
    "geometry": {
      "location": {
        "lat": 13.0223602,
        "lng": 80.2194985
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
    "id": "b37a19e6f6d1b38ae29decec899b290e29145ea5",
    "name": "Saidapet varthaga Sangam Cheap Mess",
    "rating": 5,
    "vicinity": "railway station, near, West Saidapet, West Saidapet, Chennai"
  },
  {
    "geometry": {
      "location": {
        "lat": 13.0223602,
        "lng": 80.2194985
      }
    },
    "rating": 4,
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
    "id": "19864f2f71c70a31e995775f7b7a1e809fe2662b",
    "name": "Sppizzy Hut",
    "vicinity": "West Saidapet, West Saidapet, Chennai"
  }, {
    "geometry": {
      "location": {
        "lat": 13.0223602,
        "lng": 80.2194985
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
    "id": "b37a19e6f6d1b38ae29decec899b290e29145ea5",
    "name": "Saidapet varthaga Sangam Cheap Mess",
    "rating": 5,
    "vicinity": "railway station, near, West Saidapet, West Saidapet, Chennai"
  },
  {
    "geometry": {
      "location": {
        "lat": 13.0223602,
        "lng": 80.2194985
      }
    },
    "rating": 4,
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
    "id": "19864f2f71c70a31e995775f7b7a1e809fe2662b",
    "name": "Sppizzy Hut",
    "vicinity": "West Saidapet, West Saidapet, Chennai"
  }
];
class Home extends React.Component {

  render() {
    const { classes, location, requestRestaurant, restaurants } = this.props;
    return (
      <div>
        <Header location={location} />
        <div className={classes.restaurantContiner}>
          <br />
          <div className={classes.root}>
            <Grid container spacing={16}>
              {
                restaurantList.map((restaurant, i) => {
                  return (<Grid item xs={6} sm={3}>
                    <RestaurantCard data={restaurant} className={classes.paper} key={i} />
                  </Grid>)
                })
              }
            </Grid>
          </div>
        </div>
      </div>

    );
  }

}
const mapStateToProps = state => ({
  miles: state.miles,
  restaurants: state.restaurants,
  isFetching: state.isFetching
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeMiles,
      requestRestaurant,
      changePage: () => push('/about-us')
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
