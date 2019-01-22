import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import OpenCV from '../Global/Images/opencv.png'
import GammaCV from '../Global/Images/gammacv'


function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  header:{
    paddingLeft: 20
  },
  root: {
    margin: '30px auto',
    backgroundColor: theme.palette.background.paper,
    width: '80%',
    height: '60vh'
  },
  svg: {
    height: 30
  }
});

class Libraries extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <>
        <h1 className={classes.header}>Image Processing and Computer Vision Libraries</h1>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="OpenCV" />
              <Tab label="jsfeat" />
              <Tab label="ConvNetJS" />
              <Tab label="GammaCV" />
              <Tab label="tracking.js" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <TabContainer dir={theme.direction}>
              <h2>OpenCV.js</h2>
              <img alt="OpenCV Logo" src={OpenCV} />
              <p>
                OpenCV is an open source library, which gives you access to thousands of computer vision algorithms.
                It's supported with a variet of languages such as C++, Python, Java, and now JavaScript. OpenCV.js
                leverages WebAssembly and provides a Javascript API for developers to interact with.
            </p>
              <p>
                With the web hosting a massive amount of images and videos, developers could use inovative ways
                to process and manipulate them. The potential is especially high with the increased used of virtual and
                augmented reality.
             </p>
              <a target="_blank" rel="noopener noreferrer" href="https://docs.opencv.org/3.4/d5/d10/tutorial_js_root.html">https://docs.opencv.org/3.4/d5/d10/tutorial_js_root.html</a>
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <h2>JsFeat</h2>
              <p>jsfeat is a robust computer vision library that with a large feature set. It allows for an image
              to be broken down into a matrix and for mathematical operations to be carried out on it. This
            allows for a wide range of image manipulation such as grayscale, resampling, pyrdown, and many more. </p>
              <a target="_blank" rel="noopener noreferrer" href="https://inspirit.github.io/jsfeat">https://inspirit.github.io/jsfeat</a>
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <h2>ConvNetJS</h2>
              <p> ConvNetJS is a deep learning library written in javascript. You can use your browser to create
            Neural Networks and train them to do a variety of tasks, such as object detection, create an image, read numbers, and more. </p>
              <a target="_blank" rel="noopener noreferrer" href="https://cs.stanford.edu/people/karpathy/convnetjs/">https://cs.stanford.edu/people/karpathy/convnetjs/</a>
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <h2>GammaCV</h2>
              <GammaCV />
              <p> GammaCV is a inovative library that uses a computer's GPU in order to power their algorithms. With a paradigm
              focused on data flow, this library offers a roubust selection of features such as Down/Up sampling,
            Canny edge detection, HSVColorConverter, and others  </p>
              <a target="_blank" rel="noopener noreferrer" href="https://gammacv.com/">https://gammacv.com/</a>
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <h2>tracking.js</h2>
              <p>Tracking.js is open source library that is meant to be paired with a video or image stream.
               It's built around for purpose of real time color tracking. This can be used in a variety of
            purposes such as face detection, controling inputs using a webcam, color detection, and more. </p>
              <a target="_blank" rel="noopener noreferrer" href="https://trackingjs.com/">https://trackingjs.com/</a>
            </TabContainer>
          </SwipeableViews>
        </div>
      </>
    );
  }
}

Libraries.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Libraries);