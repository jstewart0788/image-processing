/* global cv*/
import React, { PureComponent } from "react";
import ReactDOM from 'react-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrowOutlined';
import AddBox from '@material-ui/icons/AddBoxOutlined';
import Button from '@material-ui/core/Button';

import AddImageModal from '../AddImageModal';

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
    color: theme.palette.text.secondary
  },
  output: {
    padding: theme.spacing.unit * 2,
    margin: 20,
    minHeight: '60vh',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spacer: {
    flex: 1
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  flexCenter: {
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
  iconRotate: {
    fontSize: 32,
    transform: 'rotate(90deg)'
  },
  inputImage: {
    width: '100%'
  },
  selectedInputImage: {
    width: '100%',
    border: '3px solid red'
  },
  marginLeft: {
    marginLeft: 16
  }
});
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      method: '',
      labelWidth: 0,
      image: null,
      modalOpen: false,
      imageAddresses: [],
      imageInCanvas: false
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
    this.setState({ image });
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  }

  handleModalClose = value => {
    this.setState({ modalOpen: false });
  };

  addImage = (address) => {
    this.setState({ imageAddresses: [...this.state.imageAddresses, address], modalOpen: false });
  }

  downloadCanvas = () => {
    const download = document.getElementById("download");
    const image = document.getElementById("canvasOutput").toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
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
      switch (method) {
        case 'grey':
          cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
          break;
        case 'filter':
          let M = cv.Mat.eye(3, 3, cv.CV_32FC1);
          let anchorFilter = new cv.Point(-1, -1);
          cv.filter2D(src, dst, cv.CV_8U, M, anchorFilter, 0, cv.BORDER_DEFAULT);
          break;
        case 'blur':
          let ksize = new cv.Size(3, 3);
          let anchorBlur = new cv.Point(-1, -1);
          cv.blur(src, dst, ksize, anchorBlur, cv.BORDER_DEFAULT);
          break;
        case 'laplacian':
          cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
          cv.Laplacian(src, dst, cv.CV_8U, 1, 1, 0, cv.BORDER_DEFAULT);
          break;
        default:
          break;
      }
      cv.imshow('canvasOutput', dst);
      src.delete(); dst.delete();
      this.setState({ imageInCanvas: true })
    }
  }

  render() {
    const { classes } = this.props;
    const { image, error, modalOpen, imageAddresses, imageInCanvas } = this.state;
    return (
      <div className={classes.container}>
        <AddImageModal open={modalOpen} onClose={this.handleModalClose} addImage={this.addImage} />
        <Grid container className={classes.container} spacing={0}>
          <Grid item xs={12} lg={4}>
            <Paper className={classes.paper} elevation={1}>
              <div className={classes.flexCenter}>
                <h2 className={classes.marginLeft}>Images</h2> <span className={classes.spacer} />
                <Tooltip title="Add New Image">
                  <IconButton
                    color="inherit"
                    onClick={this.openModal}
                  >
                    <AddBox className={classes.icon} />
                  </IconButton>
                </Tooltip>
              </div>
              <div>
                <Grid container className={classes.container} spacing={24}>
                  <Grid item xs={12} md={6} lg={image === 1 ? 12 : 6}>
                    <img
                      id="image1"
                      onClick={this.handleImageSelect.bind(null, 1)}
                      className={image === 1 ? classes.selectedInputImage : classes.inputImage}
                      src={image1}
                      alt="Provided"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={image === 2 ? 12 : 6}>
                    <img
                      id="image2"
                      onClick={this.handleImageSelect.bind(null, 2)}
                      className={image === 2 ? classes.selectedInputImage : classes.inputImage}
                      src={image4}
                      alt="Provided"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={image === 3 ? 12 : 6}>
                    <img
                      id="image3"
                      onClick={this.handleImageSelect.bind(null, 3)}
                      className={image === 3 ? classes.selectedInputImage : classes.inputImage}
                      src={image5}
                      alt="Provided"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={image === 4 ? 12 : 6}>
                    <img
                      id="image4"
                      onClick={this.handleImageSelect.bind(null, 4)}
                      className={image === 4 ? classes.selectedInputImage : classes.inputImage}
                      src={image6}
                      alt="Provided"
                    />
                  </Grid>
                  {imageAddresses.map((address, i) => (
                    <Grid item xs={12} md={6} lg={image === (5 + i) ? 12 : 6} key={`userimage${i}`}>
                      <img
                        id={`image${5 + i}`}
                        onClick={this.handleImageSelect.bind(null, 5 + i)}
                        className={image === (5 + i) ? classes.selectedInputImage : classes.inputImage}
                        src={address}
                        alt={`User Uploaded ${i + 1}`}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Paper>
          </Grid>
          <Grid item className={classes.flexCenter} xs={12} lg={2} >
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
                <MenuItem value={'filter'}>Filter</MenuItem>
                <MenuItem value={'blur'}>Blur</MenuItem>
                <MenuItem value={'laplacian'}>Laplacian</MenuItem>
              </Select>
            </FormControl>
            <IconButton
              onClick={this.processImage}
              color="inherit"
            >
              <Hidden mdDown>
                <PlayArrow className={classes.icon} />
              </Hidden>
              <Hidden lgUp>
                <PlayArrow className={classes.iconRotate} />
              </Hidden>
            </IconButton>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Paper className={classes.output} elevation={1}>
              <Grid item xs={12}>
                <h2>Output</h2>
                {error && <h3 style={{ color: 'red' }}> Please select an image and method!</h3>}
                <canvas id="canvasOutput" ></canvas>
              </Grid>
              <span className={classes.spacer} />
              {imageInCanvas &&
                <a id="download" download="output-image.png">
                  <Button variant="contained" color="primary" onClick={this.downloadCanvas}>
                    Download
                  </Button>
                </a>
              }
            </Paper>
          </Grid>
        </Grid >
      </div >
    );
  }
}
export default withStyles(styles)(Home);