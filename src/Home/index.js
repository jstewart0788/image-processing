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

const styles = theme => ({
  container: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 20,
    height: '60vh',
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
  }
});
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      method: '',
      labelWidth: 0,
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

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Grid container className={classes.container} spacing={0}>
          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={1}>
              <h2>Images</h2>
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
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <IconButton
              onClick={this.handleMenu}
              color="inherit"
            >
              <PlayArrow className={classes.icon} />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper} elevation={1}>
              <h2>Output</h2>
            </Paper>
          </Grid>
        </Grid >
      </div>
    );
  }
}
export default withStyles(styles)(Home);