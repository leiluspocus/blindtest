import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Sound from 'react-sound';

class App extends Component {
  state = {
    songs: [],
    randomAnswers : [],
    shuffled: [],
    sound: Sound.status.STOPPED,
    found: false
  }
  constructor(props) {
    super(props);
    // Fetch couple of songs to guess
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/3135556`)
      .then(track => {
        // console.log(track);
        this.setState({songs:[...this.state.songs, {mp3: track.data.preview, title: track.data.title}]});

        // shuffle answers
        let a = [...this.state.randomAnswers, this.state.songs[0].title];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        this.setState({shuffled: a});
      });
    
    // Populate randon answers array
    let randomAnswers = [];
    randomAnswers.push("Staying Alive");
    randomAnswers.push("Les démons de minuit");
    randomAnswers.push("Get Lucky");
    randomAnswers.push("Uptown Funk");
    this.state.randomAnswers = randomAnswers;
  }

  checkAnswer(item) {
    if ( item === this.state.songs[0].title ) {
      alert("OUIII");
      this.setState({found: true});
      this.startSound();
    }
    else {
      alert("FAUX");
    }
  }

  startSound() { 
    if ( this.state.sound === Sound.status.PLAYING) {
      this.setState({sound : Sound.status.STOPPED});
    }
    else {
      this.setState({sound : Sound.status.PLAYING});
    }
  }

  render() {
    if ( typeof this.state.songs[0] !== "undefined") { 
      return (
        <div className="App">
          <header className="App-header"> 
            <p>
              Blind Test
            </p> 
            Devinez quel est ce titre ... 
            <Sound url={this.state.songs[0].mp3} playStatus={this.state.sound}/>
            <button onClick={() => this.startSound()}>Écouter !</button>
            <hr />
            {this.state.shuffled.map((item, key) =>
                <button onClick={() => this.checkAnswer(item)} key={key}><strong>{item}</strong></button>
            )}
            {this.state.found &&
              <h2>
                BRAVO, VOUS AVEZ TROUVÉ OH LÀ LÀ
              </h2>
            }
          </header>
        </div>
      );
    }
    return (
      <div className="App">
        <header className="App-header"> 
          <p>
            Blind Test
          </p>
        </header>
      </div>
    );
  }
}

export default App;
