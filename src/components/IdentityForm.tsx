import { FormControl, InputLabel, Input, FormHelperText, Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { withRouter } from "react-router-dom";

class IdentityForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {

    }
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const name = target?.name;
    const value = target?.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit () {
    axios.post('https://vacc-api.herokuapp.com/consumers', {
      name: this.state.name,
      nationalId: this.state.nid,
    })
    .then(({data}) => {
      console.log(data);
      localStorage.setItem( 'userInfo', JSON.stringify(data) );
      this.props.history.push('/centres')
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <React.Fragment>
      <form noValidate autoComplete="off">
        <div>
        <FormControl>
          <InputLabel htmlFor="nid">National Id</InputLabel>
          <Input id="nid" name="nid" required onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)} />
          <FormHelperText id="nid">Enter your National ID</FormHelperText>
        </FormControl>
        </div>
        <div>
        <FormControl>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input id="name" required name="name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e)}  />
          <FormHelperText id="name">Enter your full name</FormHelperText>

          <Button variant="contained" color="primary" onClick={() => this.handleSubmit()} >
            Submit
          </Button>
        </FormControl>
        </div>
        </form>
        </React.Fragment>
    )
  }
}

export default withRouter(IdentityForm);

