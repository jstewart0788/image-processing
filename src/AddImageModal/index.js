import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const styles = () => ({
  imagePreview: {
    maxHeight: 300,
    maxWidth: 300
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  margin: {
    margin: 16
  }
});

const fileTypes = [
  'image/jpeg',
  'image/pjpeg',
  'image/png'
]

const validFileType = file => {
  for (var i = 0; i < fileTypes.length; i++) {
    if (file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}

class AddImageModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      address: null
    }
  }

  imagePreview = e => {
    const file = e.target.files[0];
    if (file && validFileType(file))
      this.setState({ address: window.URL.createObjectURL(file) })
    else
      this.setState({ address: null })
  }

  render() {
    const { address } = this.state;
    const { classes, addImage, open, onClose } = this.props;
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth={'sm'}>
        <DialogTitle>Choose an image to add</DialogTitle>
        <div className={classes.margin}>
          <input type="file" accept=".jpg, .jpeg, .png" onChange={this.imagePreview} />
        </div>
        <div className={classes.margin}>
          {address ? <img src={address} alt="To be uploaded" className={classes.imagePreview} /> : <p> No image selected </p>}
        </div>
        <div className={classes.flexCenter}>
          <Button variant="contained" className={classes.margin} color="primary" onClick={addImage.bind(null, address)} disabled={!address}>
            Upload
         </Button>
          <Button variant="contained" className={classes.margin} color="secondary" onClick={onClose}>
            Cancel
         </Button>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(styles)(AddImageModal);