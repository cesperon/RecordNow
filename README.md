# unearth_audio_prj

## Description
Web client that records user audio with the MediaRecorder api. When the record button is engaged, media recorder stores audio chunks into an array that later gets converted to a blob file and sent off to local server. Reads in based 64 encoded blob files from server and converts them into audio elements that can be played on browser.
## Project setup
```
npm install 
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
