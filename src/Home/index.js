/* global cv*/
import React, { PureComponent } from "react";
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrowOutlined';

import image1 from '../Global/Images/1.jpg'
import image4 from '../Global/Images/4.jpg'
import image5 from '../Global/Images/5.jpg'
import image6 from '../Global/Images/6.jpg'


const styles = theme => ({
  container: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 20,
    minHeight: '60vh',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  dropdownContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  icon: {
    fontSize: 32
  },
  inputImage: {
    width: '100%'
  },
  selectedInputImage: {
    width: '100%',
    border: '3px solid red'
  }
});
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      method: '',
      labelWidth: 0,
      image: null
    }
  }
  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleImageSelect = image => {
    this.setState({ image })
  }

  processImage = () => {
    const { method, image } = this.state
    if (!method || !image) {
      this.setState({ error: true })
    }
    else {
      this.setState({ error: false })
      const src = cv.imread(document.getElementById(`image${image}`));
      const dst = new cv.Mat();
      cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
      cv.imshow('canvasOutput', dst);
      src.delete(); dst.delete();
    }
  }

  render() {
    const { classes } = this.props;
    const { image, error } = this.state;
    return (
      <div className={classes.container}>
        <Grid container className={classes.container} spacing={0}>
          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={1}>
              <h2>Images</h2>
              <div>
                <Grid container className={classes.container} spacing={24}>
                  <Grid item xs={image === 1 ? 12 : 6}>
                    <img
                      id="image1"
                      onClick={this.handleImageSelect.bind(null, 1)}
                      className={image === 1 ? classes.selectedInputImage : classes.inputImage}
                      src={image1}
                      alt="image1"
                    />
                  </Grid>
                  <Grid item xs={image === 2 ? 12 : 6}>
                    <img
                      id="image2"
                      onClick={this.handleImageSelect.bind(null, 2)}
                      className={image === 2 ? classes.selectedInputImage : classes.inputImage}
                      src={image4}
                      alt="image4"
                    />
                  </Grid>
                  <Grid item xs={image === 3 ? 12 : 6}>
                    <img
                      id="image3"
                      onClick={this.handleImageSelect.bind(null, 3)}
                      className={image === 3 ? classes.selectedInputImage : classes.inputImage}
                      src={image5}
                      alt="image5"
                    />
                  </Grid>
                  <Grid item xs={image === 4 ? 12 : 6}>
                    <img
                      id="image4"
                      onClick={this.handleImageSelect.bind(null, 4)}
                      className={image === 4 ? classes.selectedInputImage : classes.inputImage}
                      src={image6}
                      alt="image6"
                    />
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Grid>
          <Grid item className={classes.dropdownContainer} xs={2}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-age-simple"
              >
                Method
          </InputLabel>
              <Select
                value={this.state.method}
                onChange={this.handleChange}
                input={
                  <OutlinedInput
                    labelWidth={this.state.labelWidth}
                    name="method"
                    id="outlined-age-simple"
                  />
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'grey'}>Greyscale</MenuItem>
              </Select>
            </FormControl>
            <IconButton
              onClick={this.processImage}
              color="inherit"
            >
              <PlayArrow className={classes.icon} />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper} elevation={1}>
              <h2>Output</h2>
              {error && <h3 style={{ color: 'red' }}> Please select an image and method!</h3>}
              <canvas id="canvasOutput" ></canvas>
            </Paper>
          </Grid>
        </Grid >
      </div >
    );
  }
}
export default withStyles(styles)(Home);