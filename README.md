[![NPM version](https://img.shields.io/npm/v/@ylveracode/veracode-cli.svg)](https://www.npmjs.com/package/@ylveracode/veracode-cli)

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
- __identifyOpenPolicyScans__ - try to filter applications with active policy scan which is not completed for X amount of hours
> Note - "Try" is there since there is no attribute to query via API for the exact time the scan status changed

The output for the last command is:
```json
[
  {
    "appId": number,
    "name": string,
    "guid": "3235b5ra-ffd2-4b2c-9730-1ef23a9e14c7",
    "policyBuild": {
      "version": "19 Jan 2021 Static",
      "build_id": string,
      "submitter": string,
      "platform": "Not Specified",
      "lifecycle_stage": "Not Specified",
      "results_ready": "false",
      "policy_name": string,
      "policy_version": "1",
      "policy_compliance_status": "Pass",
      "policy_updated_date": "2021-01-19T05:03:50-05:00",
      "rules_status": "Pass",
      "grace_period_expired": "true",
      "scan_overdue": "true",
      "legacy_scan_engine": "false",
      "launch_date": "2021-01-18T23:51:15-05:00"
    }
  }
]
```

## Installation

1. Have Node and NPM install
2. Execute `npm install -g @ylveracode/veracode-cli`

## Usage
simply type `veracode-cli --help` in your shell and follow the available options.

    
          

### Please post request/s for additional commands options as an issue in the code repository
