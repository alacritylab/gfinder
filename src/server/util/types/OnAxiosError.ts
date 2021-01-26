import { AxiosResponse } from 'axios';

type OnAxiosError = (error: any) => Promise<AxiosResponse> | null;
export default OnAxiosError;
