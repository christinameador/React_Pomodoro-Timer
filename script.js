class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: 25,
      break: 5,
      running: false,
      secondsRemaining: 1500,
      currentMinute: "25",
      currentSecond: "00",
      sessionOrBreak: "Session" };

    this.count = 0;

    this.run = this.run.bind(this);
    this.increaseSession = this.increaseSession.bind(this);
    this.increaseBreak = this.increaseBreak.bind(this);
    this.decreaseSession = this.decreaseSession.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);
    this.stop = this.stop.bind(this);
    this.toggle = this.toggle.bind(this);
    this.reset = this.reset.bind(this);

    this.ref = React.createRef();
  }

  // Handle timer.
  run() {
    this.count = setInterval(() => {
      if (this.state.secondsRemaining >= 1) {
        this.setState(st => ({
          running: true,
          secondsRemaining: st.secondsRemaining - 1 }));


        let minute = Math.floor(this.state.secondsRemaining / 60);
        let second = Math.floor(this.state.secondsRemaining % 60);

        let minuteToShow = String(minute).padStart(2, 0);
        let secondToShow = String(second).padStart(2, 0);

        this.setState(st => ({
          currentMinute: minuteToShow,
          currentSecond: secondToShow }));

      } else {
        this.ref.current.volume = 0.5;
        this.ref.current.play();
        if (this.state.sessionOrBreak === "Session") {
          this.setState(st => ({
            sessionOrBreak: "Break",
            secondsRemaining: this.state.break * 60 + 1 }));

        } else {
          this.setState(st => ({
            sessionOrBreak: "Session",
            secondsRemaining: this.state.session * 60 + 1 }));

        }
      }
    }, 1000);
  }

  // Increase Session
  increaseSession() {
    if (this.state.session < 60) {
      this.setState(st => ({
        session: st.session + 1,
        currentMinute: String(Number(st.currentMinute) + 1).padStart(2, 0),
        secondsRemaining: st.secondsRemaining + 60 }));

    }
  }

  // Increase Break
  increaseBreak() {
    if (this.state.break < 60) {
      this.setState(st => ({
        break: st.break + 1 }));

    }
  }

  // Decrease Session
  decreaseSession() {
    if (this.state.session > 1) {
      this.setState(st => ({
        session: st.session - 1,
        currentMinute: String(Number(st.currentMinute) - 1).padStart(2, 0),
        secondsRemaining: st.secondsRemaining - 60 }));

    }
  }

  // Decrease Break
  decreaseBreak() {
    if (this.state.break > 1) {
      this.setState(st => ({
        break: st.break - 1 }));

    }
  }

  // Stop timer
  stop() {
    clearInterval(this.count);
    this.setState({ running: false });
  }

  // Toggle Timer
  toggle() {
    if (this.state.running) {
      this.stop();
    } else {
      this.run();
    }
  }

  // Reset Timer
  reset() {
    this.stop();
    this.setState({
      session: 25,
      break: 5,
      running: false,
      secondsRemaining: 1500,
      currentMinute: "25",
      currentSecond: "00",
      sessionOrBreak: "Session" });

    this.ref.current.pause();
    this.ref.current.currentTime = 0;
  }

  render() {
    return (
      React.createElement("div", { id: "App" },
      React.createElement("div", { id: "control-container" },
      React.createElement(Control, {
        length: this.state.session,
        lengthId: "session-length",
        increment: this.increaseSession,
        decrement: this.decreaseSession,
        label: "Session Length",
        labelId: "session-label",
        incrementId: "session-increment",
        decrementId: "session-decrement",
        running: this.state.running }),

      React.createElement(Control, {
        length: this.state.break,
        lengthId: "break-length",
        increment: this.increaseBreak,
        decrement: this.decreaseBreak,
        label: "Break Length",
        labelId: "break-label",
        incrementId: "break-increment",
        decrementId: "break-decrement",
        running: this.state.running })),


      React.createElement("div", { id: "timer-div" },
      React.createElement("p", { id: "timer-label" }, this.state.sessionOrBreak),
      React.createElement("p", { id: "time-left" }, `${this.state.currentMinute}:${this.state.currentSecond}`)),

      React.createElement("div", { id: "toggle-div" },
      React.createElement("div", { id: "start_stop", onClick: this.toggle },
      React.createElement("i", { className: this.state.running ? "fas fa-pause fa-lg" : "fas fa-play fa-lg" })),

      React.createElement("div", { id: "reset", onClick: this.reset },
      React.createElement("i", { className: "fas fa-redo fa-lg" }))),


      React.createElement("audio", { id: "beep", ref: this.ref, src: "https://www.soundjay.com/cloth/sounds/belt-1.mp3" })));


  }}


class Control extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      React.createElement("div", { className: "control-div" },
      React.createElement("div", { id: this.props.labelId }, this.props.label),
      React.createElement("div", { className: "buttons-indicator" },
      React.createElement("div", { id: this.props.incrementId, onClick: this.props.increment, disabled: this.props.running },
      React.createElement("i", { className: "fas fa-plus-circle fa-lg" })),

      React.createElement("div", { id: this.props.lengthId }, React.createElement("span", { className: "control-length" }, this.props.length)),
      React.createElement("div", { id: this.props.decrementId, onClick: this.props.decrement, disabled: this.props.running },
      React.createElement("i", { className: "fas fa-minus-circle fa-lg" })))));




  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("root"));