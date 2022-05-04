import axios, { AxiosRequestConfig } from "axios";
import { store } from "../redux/store";
import { fetchData } from "./fetchData";

describe('fetchData', () => {
  let spyGet: jest.SpyInstance<Promise<unknown>, [url: string, config?: AxiosRequestConfig]>;
  let spyPost: jest.SpyInstance<Promise<unknown>, [url: string, data?: any, config?: AxiosRequestConfig]>;
  const dispatch = jest.fn();

  beforeAll(() => {
    spyGet = jest.spyOn(axios, 'get');
    spyPost = jest.spyOn(axios, 'post');
  });

  beforeEach(() => {
    spyGet.mockClear();
    spyPost.mockClear();
    dispatch.mockClear();
  })

  afterAll(() => {
    spyGet.mockRestore();
    spyPost.mockRestore();
  })

  it(`should return request's status and data`, async () => {
    spyGet.mockResolvedValue({
      data: 'data',
      status: 200
    });

    const request = () => axios.get('/api/v1/users');
    const { status, data } = await fetchData(request, dispatch);

    expect(status).toBe(200);
    expect(data).toEqual('data');
  });

  it(`should unpack the response's data`, async () => {
    spyGet.mockResolvedValue({
      data: {
        data: 'data'
      },
      status: 200
    });

    const request = () => axios.get('/api/v1/users');
    const { status, data } = await fetchData(request, dispatch);

    expect(status).toBe(200);
    expect(data).toEqual('data');
  });

  it(`should try get a new refresh token if the request's status is 401`, async () => {
    spyGet.mockRejectedValueOnce({ response: { status: 401 }})
    spyGet.mockResolvedValueOnce({
      data: 'data',
      status: 200
    });

    spyPost.mockResolvedValue({ status: 200 });

    const request = () => axios.get('/api/v1/users');
    const { status, data } = await fetchData(request, dispatch);

    expect(spyGet).toBeCalledTimes(2);
    expect(spyPost).toBeCalledTimes(1);

    expect(status).toBe(200);
    expect(data).toEqual('data');
  });

  it(`should open the Log in page if the operation to get a new refresh token failed`, async () => {    
    spyGet.mockRejectedValueOnce({ response: { status: 401 }})
    spyGet.mockRejectedValueOnce({ response: { status: 401 }})

    spyPost.mockRejectedValueOnce({ response: { status: 404 }});

    const request = () => axios.get('/api/v1/users');
    await fetchData(request, dispatch);

    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith({ type: 'user/openLoginPage', payload: undefined });
  });

  it(`should return the status 400 if the status of the axios's response is undefined`, async () => {
    spyGet.mockRejectedValueOnce({ response: undefined });

    const request = () => axios.get('/api/v1/users');
    const { status } = await fetchData(request, dispatch);

    expect(status).toBe(400);
  });
})