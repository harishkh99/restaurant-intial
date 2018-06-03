import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Rating from 'react-rating';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Directions from '@material-ui/icons/Directions';
import StarBorder from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';

const styles = theme => ({
    card: {
        maxWidth: 800,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class RestaurantCard extends React.Component {
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    render() {
        const { classes, data } = this.props;

        const avatar = (<Avatar aria-label="Recipe" className={classes.avatar}> {data.name.charAt(0)} </Avatar>);
        const iconButton = (<IconButton> <MoreVertIcon /></IconButton>);

        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={avatar}
                        action={iconButton}
                        title={data.name}
                        subheader={
                            <Rating
                                initialRating={data.rating}
                                styles={{ textSize: "12px" }}
                                emptySymbol={<StarBorder />}
                                fullSymbol={<Star />} />
                        }
                    />
                    <CardMedia
                        className={classes.media}
                        image={data.icon}
                        title={data.name}
                    />
                    <CardContent>
                        <Typography component="p">
                            {data.vicinity}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Directions" onClick={() => { window.open('https://www.google.com/maps/dir/?api=1&destination=' + data.geometry.location.lat + ',' + data.geometry.location.lng, '_blank'); }}>
                            <Directions />
                        </IconButton>
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph variant="body2">
                                Additional Info:
              </Typography>
                            <Typography paragraph>
                                Additional info related to the restaurants will be shown here
              </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        );
    }
}

RestaurantCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RestaurantCard);
