import * as configFile from "./project-config.json"

export enum Environment {
  DEV = "DEV",
  INT = "INT",
  PRE_PROD = "PRE_PROD",
  PROD = "PROD",
}

export interface ProjectConfig {
    resourcePrefix: string
    projectPrefix: string
    environments: {
      [key in Environment]: EnvironmentConfig
    }
  }

  export interface EnvironmentConfig {
  }

const projectConfig = <ProjectConfig>configFile
export default projectConfig
