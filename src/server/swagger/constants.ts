import * as packageJson from '../../../package.json';

export const SWAGGER_API_ROOT = 'api/docs';
export const SWAGGER_API_NAME = packageJson.name || 'Simple API';
export const SWAGGER_API_DESCRIPTION =
    packageJson.description || 'Simple API Description';
export const SWAGGER_API_CURRENT_VERSION = packageJson.version || '1.0';
