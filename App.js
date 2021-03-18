import './App.css';

import React, { Component } from 'react';


var token;
var options;

var stats = {

  acousticnessArray : [],
  danceabilityArray : [],
  energyArray : [],
  instrumentalnessArray : [],
  keyArray :[],
  modeArray :[],
  livenessArray : [],
  loudnessArray :[], 
  speechinessArray :[],
  tempoArray : [],
  valenceArray : [] 

}

function getTrackIds(data){
var ids = [];
    for(var i = 0; i < Object.keys(data).length; i++)
    {
      var track = data[i];
      ids +=track.id+",";
    }
  getAudioFeatures(ids).then(info => {
   console.log(info);
   parseAudioFeatures(info);
  });;
}


async function getAudioFeatures(ids)
{
	const response = await fetch("https://api.spotify.com/v1/audio-features?ids="+ids,options)
  const data = await response.json();
  return data;  
}

async function getTopSongs()
{
  const response = await fetch("https://api.spotify.com/v1/me/top/tracks",options);
  const data = await response.json();
  return data;
}

function parseAudioFeatures(data){
  for(var i = 0; i < Object.keys(data.audio_features).length; i++)
  {
    var song = data.audio_features[i];
    generateLists(song.acousticness, song.danceability, song.energy, song.instrumentalness, song.key, song.mode, song.liveness, song.loudness, song.speechiness, song.tempo, song.valence);
  }

  console.log(stats);
}

function generateLists(acousticness, danceability, energy, instrumentalness, key, mode, liveness, loudness, speechiness, tempo, valence)
{
  stats.acousticnessArray.push(acousticness);
  stats.danceabilityArray.push(danceability);
  stats.energyArray.push(energy);
  stats.instrumentalnessArray.push(instrumentalness);
  stats.keyArray.push(key);
  stats.modeArray.push(mode);
  stats.livenessArray.push(liveness); 
  stats.loudnessArray.push(loudness);
  stats.speechinessArray.push(speechiness);
  stats.tempoArray.push(tempo);
  stats.valenceArray.push(valence);
}


class App extends Component {

  constructor(){
    super();
	  const params = this.getHashParams();
    token = params.access_token;
    this.state = { data: [] };

    options = {  
      method: "GET",
      headers: {
        "Authorization": "Bearer "+token
      }
    }
    
	  console.log(token);
	  console.log("SUCCESS");
    
    getTopSongs().then(response => { 
      
      getTrackIds(response.items); 
      console.log(response.items);
    });
	  
	}
  
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  render() {
      return (
      <div className="App">
        <button className = "login" ><a href='http://localhost:8888/login'> Login to Spotify </a></button>
      </div>
      );
     }
  }   

export default App;