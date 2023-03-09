var _Environments = {
   
    staging: {BASE_URL: 'https://combuyn.in/staging/', API_KEY: ''},
}

// function getEnvironment() {
//     // Insert logic here to get the current platform (e.g. staging, production, etc)
//     var platform = getPlatform()

//     // ...now return the correct environment
//     return _Environments[platform]
// }

var Environment = _Environments.staging
// GENERATE_SOURCEMAP=false
export default Environment;