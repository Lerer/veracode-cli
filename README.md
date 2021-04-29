# veracode-cli

This project is build to be extended when needed based on existing API and for other on their personal and organizational need.

Please follow the instruction in the readme file

## Existing commands
### SCA (Software Composition Analysis)
- __listWorkspaces__ - List the existing workspaces
- __identifyRedundantWorkspaces__ - create a list of Workspace candidate for deletion (base on no project and as a duplicate workspace name)
- __deleteWorkspaces__ - remove workspace specified in input file

For the above SCA Workspace related command options, the structure of data in the input (and/or output) file is as follow:
```
[
    {
        name:string, // Workspace name
        guid: string, // workspace GUID
        id:string, // workspace lagacy id AKA slug
        projects_count: number // workspace's projects count
    },
    ...
]
```

### SAST (Static Application Security Testing)
- __listApplications__ - List (or search) applications by either their partial name, lagacy ID or GUID
- __TBC - Find applications with active policy scan which is not completed for X amount of hours__
- __TBC - delete last policy scan based on application GUID__

## Installation

1. Have Node and NPM install
2. Execute `npm install -g @ylveracode/veracode-cli`

## Usage
simply type `veracode-cli --help` in your shell and follow the available options.

    
          

### Please post request/s for additional commands options as an issue in the code repository
