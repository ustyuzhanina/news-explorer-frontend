export default class Header {
  constructor(props) {
    this.backgroundColor = props.backgroundColor; // yet do not know what to do with this thing
    this.isLoggedIn = props.isLoggedIn;
    this.userName = props.userName;
    this.render = this.render.bind(this);
  }

  render() {

  }
}

